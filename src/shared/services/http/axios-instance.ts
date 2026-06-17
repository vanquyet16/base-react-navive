/**
 * AXIOS INSTANCE
 * ==============
 * Configured axios instance với base URL, timeout, headers.
 * Hỗ trợ multiple domains cho các API services khác nhau.
 */

import axios, { AxiosInstance } from 'axios';
import { getApiUrl, type ApiDomain } from '@/shared/config/app.config';
import { TIMEOUT, HEADERS } from '@/shared/constants/http';
import { registerInterceptors } from './axios-interceptors';

/**
 * Factory function: Tạo axios instance cho domain cụ thể
 * @param domain - Domain cần tạo instance (MAIN, AUTH, MANAGER, etc.)
 * @returns Configured axios instance cho domain đó
 * 
 * Usage:
 * ```ts
 * const authClient = createAxiosInstance('AUTH');
 * const managerClient = createAxiosInstance('MANAGER');
 * ```
 */
export const createAxiosInstance = (domain: ApiDomain = 'MAIN'): AxiosInstance => {
    const instance = axios.create({
        // Base URL cho domain cụ thể
        baseURL: getApiUrl(domain),

        // Timeout
        timeout: TIMEOUT.DEFAULT,

        // Default headers
        headers: {
            'Content-Type': HEADERS.CONTENT_TYPE.JSON,
            Accept: HEADERS.ACCEPT.JSON,
        },

        // Custom JSON parsing để handle edge cases
        transformResponse: [
            (data) => {
                try {
                    return JSON.parse(data);
                } catch {
                    return data;
                }
            },
        ],
    });

    // Tự động gắn interceptors (access token, refresh token, error normalization)
    registerInterceptors(instance);

    return instance;
};

/**
 * Default axios instance cho MAIN domain
 * Sử dụng trong interceptors và http client mặc định
 * 
 * @deprecated Nên sử dụng createAxiosInstance() để tạo instance cho domain cụ thể
 */
export const axiosInstance = createAxiosInstance('MAIN');

/**
 * Type helpers
 */
export type { AxiosInstance };
