/**
 * AXIOS INSTANCE FACTORY
 * ======================
 * Mỗi domain API có đúng một axios instance (cache trong http-client.ts).
 * Base URL / timeout lấy từ env của flavor đang build.
 */

import axios, { type AxiosInstance } from 'axios';
import { API_TIMEOUT_MS, API_URLS, type ApiDomain } from '@/shared/config/env';
import { HEADERS } from '@/shared/constants/http';
import { registerInterceptors } from './axios-interceptors';

export const createAxiosInstance = (domain: ApiDomain): AxiosInstance => {
    const instance = axios.create({
        baseURL: API_URLS[domain],
        timeout: API_TIMEOUT_MS,
        headers: {
            'Content-Type': HEADERS.CONTENT_TYPE.JSON,
            Accept: HEADERS.ACCEPT.JSON,
        },
    });
    registerInterceptors(instance);
    return instance;
};

export type { AxiosInstance };
