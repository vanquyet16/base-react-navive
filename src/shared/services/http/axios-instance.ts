/**
 * AXIOS INSTANCE
 * ==============
 * Configured axios instance với base URL, timeout, headers.
 * Singleton pattern - chỉ 1 instance trong toàn app.
 * 
 */

import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from '@/shared/config/app.config';
import { TIMEOUT, HEADERS } from '@/shared/constants/http';

/**
 * Create và configure axios instance
 */
const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        // Base URL từ environment config
        baseURL: API_CONFIG.BASE_URL,

        // Timeout
        timeout: TIMEOUT.DEFAULT,

        // Default headers
        headers: {
            'Content-Type': HEADERS.CONTENT_TYPE.JSON,
            Accept: HEADERS.ACCEPT.JSON,
        },

        // Disable automatic JSON parsing để có control hơn
        // (nếu cần custom parsing logic)
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

    return instance;
};

/**
 * Singleton axios instance
 * Sử dụng trong interceptors và http client
 */
export const axiosInstance = createAxiosInstance();

/**
 * Type helpers
 */
export type { AxiosInstance };
