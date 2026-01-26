/**
 * AXIOS INTERCEPTORS
 * ==================
 * Request interceptor: Attach access token
 * Response interceptor: Handle refresh token, normalize errors
 * 
 * @senior-pattern Token refresh với retry mechanism
 */

import type {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import { axiosInstance } from './axios-instance';
import type { HttpRequestConfig } from './http-types';
import { createHttpError } from './http-error';
import { HTTP_STATUS } from '@/shared/constants/http';

/**
 * Token storage - sẽ được inject từ auth service
 * Trade-off: Circular dependency avoidance bằng function injection
 */
let getAccessToken: (() => Promise<string | null>) | null = null;
let getRefreshToken: (() => Promise<string | null>) | null = null;
let refreshTokenFn: (() => Promise<string>) | null = null;
let onTokenRefreshFailed: (() => void) | null = null;

/**
 * Setup token functions
 * Gọi từ auth service sau khi initialize
 */
export const setupTokenHandlers = (handlers: {
    getAccessToken: () => Promise<string | null>;
    getRefreshToken: () => Promise<string | null>;
    refreshToken: () => Promise<string>;
    onTokenRefreshFailed: () => void;
}) => {
    getAccessToken = handlers.getAccessToken;
    getRefreshToken = handlers.getRefreshToken;
    refreshTokenFn = handlers.refreshToken;
    onTokenRefreshFailed = handlers.onTokenRefreshFailed;
};

/**
 * Request Interceptor
 * Attach access token vào headers
 */
axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig & HttpRequestConfig) => {
        // Skip auth nếu config.skipAuth = true (e.g., login endpoint)
        if (config.skipAuth) {
            return config;
        }

        // Get access token
        const token = getAccessToken ? await getAccessToken() : null;

        // Attach token vào Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request trong DEV mode
        if (__DEV__) {
            console.log(`[HTTP Request] ${config.method?.toUpperCase()} ${config.url}`, {
                params: config.params,
                data: config.data,
                headers: config.headers,
            });
        }

        return config;
    },
    (error: AxiosError) => {
        // Request setup error
        if (__DEV__) {
            console.error('[HTTP Request Error]', error);
        }
        return Promise.reject(createHttpError(error));
    },
);

/**
 * Response Interceptor
 * Handle success + errors, refresh token nếu 401
 */
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
}> = [];

/**
 * Process failed queue sau khi refresh
 */
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else if (token) {
            promise.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Success response - log trong DEV
        if (__DEV__) {
            console.log(`[HTTP Response] ${response.config.url}`, {
                status: response.status,
                data: response.data,
            });
        }
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig &
            HttpRequestConfig & { _retry?: boolean };

        // Log error trong DEV
        if (__DEV__) {
            console.error('[HTTP Response Error]', {
                url: error.config?.url,
                status: error.response?.status,
                message: error.message,
                data: error.response?.data,
            });
        }

        // Check if 401 Unauthorized và cần refresh token
        const is401 = error.response?.status === HTTP_STATUS.UNAUTHORIZED;
        const shouldRefresh =
            is401 && !originalRequest._retry && !originalRequest.skipRefresh;

        if (shouldRefresh && refreshTokenFn) {
            // Nếu đang refresh, queue request này
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(createHttpError(err));
                    });
            }

            // Mark as refreshing
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh token
                const newToken = await refreshTokenFn();

                // Process queued requests
                processQueue(null, newToken);

                // Retry original request với new token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                }
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Refresh failed - logout user
                processQueue(refreshError, null);
                if (onTokenRefreshFailed) {
                    onTokenRefreshFailed();
                }
                return Promise.reject(createHttpError(refreshError));
            } finally {
                isRefreshing = false;
            }
        }

        // Return normalized error
        return Promise.reject(createHttpError(error));
    },
);

/**
 * Export axios instance với interceptors đã setup
 */
export { axiosInstance };
