/**
 * AXIOS INTERCEPTORS
 * ==================
 * - Request: gắn access token; nếu token sắp hết hạn thì refresh TRƯỚC khi gửi.
 * - Response: 401 → refresh một lần (single-flight, dùng chung cho mọi request đồng thời) rồi
 *   gửi lại; refresh bị server từ chối → báo phiên hết hạn. Mọi lỗi được chuẩn hoá thành AppHttpError.
 *
 * Tầng HTTP không biết gì về feature auth: logic phiên được cung cấp qua `configureHttpAuth`
 * (gọi một lần trong bootstrap) — tránh import vòng và dễ mock khi test.
 *
 * Certificate pinning được thực thi ở tầng native (network_security_config / ATS),
 * không kiểm tra ở JS.
 */

import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { HttpRequestConfig } from './http-types';
import { createHttpError } from './http-error';
import { HTTP_STATUS } from '@/shared/constants/http';
import { logger } from '@/shared/utils/logger';

export interface HttpAuthBridge {
    getAccessToken: () => string | null;
    isAccessTokenExpired: () => boolean;
    /** Lấy access token mới bằng refresh token. Reject bằng AppHttpError nếu thất bại. */
    refreshAccessToken: () => Promise<string>;
    /** Gọi khi refresh bị server từ chối — phiên không còn hợp lệ. Phải idempotent. */
    onSessionExpired: () => void;
}

let authBridge: HttpAuthBridge | null = null;
let refreshInFlight: Promise<string> | null = null;

export const configureHttpAuth = (bridge: HttpAuthBridge | null): void => {
    authBridge = bridge;
    refreshInFlight = null;
};

type RetriableConfig = InternalAxiosRequestConfig & HttpRequestConfig & { _retried?: boolean };

/** Single-flight: N request cùng gặp 401 chỉ tạo đúng 1 lời gọi refresh */
const refreshOnce = (bridge: HttpAuthBridge): Promise<string> => {
    if (!refreshInFlight) {
        refreshInFlight = bridge.refreshAccessToken().finally(() => {
            refreshInFlight = null;
        });
    }
    return refreshInFlight;
};

/** Refresh bị từ chối vì refresh token hết hạn/thu hồi (không phải lỗi mạng tạm thời) */
const isRefreshRejected = (error: unknown): boolean => {
    const { statusCode } = createHttpError(error);
    return (
        statusCode === HTTP_STATUS.BAD_REQUEST ||
        statusCode === HTTP_STATUS.UNAUTHORIZED ||
        statusCode === HTTP_STATUS.FORBIDDEN
    );
};

const refreshOrExpire = async (bridge: HttpAuthBridge): Promise<string> => {
    try {
        return await refreshOnce(bridge);
    } catch (error) {
        if (isRefreshRejected(error)) {
            bridge.onSessionExpired();
        }
        throw createHttpError(error);
    }
};

const setBearer = (config: InternalAxiosRequestConfig, token: string): void => {
    config.headers.set('Authorization', `Bearer ${token}`);
};

export const registerInterceptors = (instance: AxiosInstance): void => {
    instance.interceptors.request.use(async (config: RetriableConfig) => {
        if (!config.skipAuth && authBridge) {
            let token = authBridge.getAccessToken();
            if (token && !config.skipRefresh && authBridge.isAccessTokenExpired()) {
                token = await refreshOrExpire(authBridge);
            }
            if (token) {
                setBearer(config, token);
            }
        }
        if (__DEV__) {
            logger.debug(`[HTTP] → ${config.method?.toUpperCase()} ${config.baseURL ?? ''}${config.url ?? ''}`);
        }
        return config;
    });

    instance.interceptors.response.use(
        response => {
            if (__DEV__) {
                logger.debug(`[HTTP] ← ${response.status} ${response.config.url ?? ''}`);
            }
            return response;
        },
        async (error: AxiosError) => {
            const config = error.config as RetriableConfig | undefined;
            const status = error.response?.status;

            if (__DEV__) {
                logger.debug(`[HTTP] ✕ ${status ?? error.code} ${config?.url ?? ''}`);
            }

            const canRefresh =
                status === HTTP_STATUS.UNAUTHORIZED &&
                config &&
                !config._retried &&
                !config.skipAuth &&
                !config.skipRefresh &&
                authBridge?.getAccessToken();

            if (!canRefresh || !authBridge) {
                throw createHttpError(error);
            }

            config._retried = true;
            const token = await refreshOrExpire(authBridge);
            setBearer(config, token);
            return instance(config);
        },
    );
};
