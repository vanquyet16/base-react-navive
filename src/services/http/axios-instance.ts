/**
 * AXIOS INSTANCE
 * ==============
 * Configured axios instance với base URL, timeout, headers.
 * Singleton pattern - chỉ 1 instance trong toàn app.
 * 
 * @senior-pattern Singleton axios instance với typed config
 */

import axios, { AxiosInstance } from 'axios';
import { ENV } from '@/config';
import { TIMEOUT, HEADERS } from '@/constants/http';

/**
 * Create và configure axios instance
 */
const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        // Base URL từ environment config
        baseURL: ENV.API_BASE_URL,

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
