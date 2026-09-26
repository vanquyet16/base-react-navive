/**
 * HTTP CLIENT
 * ===========
 * Wrapper type-safe quanh axios: trả thẳng `response.data`, lỗi luôn là AppHttpError.
 *
 * Usage:
 *   const client = getHttpClient('AUTH');
 *   const res = await client.post<ApiResponse<LoginResponse>>(url, body, { skipAuth: true });
 */

import type { AxiosInstance } from 'axios';
import type { ApiDomain } from '@/shared/config/env';
import { createAxiosInstance } from './axios-instance';
import type { HttpRequestConfig, HttpResponse } from './http-types';

export class HttpClient {
    constructor(private readonly instance: AxiosInstance) {}

    public async get<TResponse>(url: string, config?: HttpRequestConfig): Promise<TResponse> {
        const response = await this.instance.get<TResponse>(url, config);
        return response.data;
    }

    public async post<TResponse, TRequest = unknown>(
        url: string,
        data?: TRequest,
        config?: HttpRequestConfig,
    ): Promise<TResponse> {
        const response = await this.instance.post<TResponse>(url, data, config);
        return response.data;
    }

    public async put<TResponse, TRequest = unknown>(
        url: string,
        data?: TRequest,
        config?: HttpRequestConfig,
    ): Promise<TResponse> {
        const response = await this.instance.put<TResponse>(url, data, config);
        return response.data;
    }

    public async patch<TResponse, TRequest = unknown>(
        url: string,
        data?: TRequest,
        config?: HttpRequestConfig,
    ): Promise<TResponse> {
        const response = await this.instance.patch<TResponse>(url, data, config);
        return response.data;
    }

    public async delete<TResponse>(url: string, config?: HttpRequestConfig): Promise<TResponse> {
        const response = await this.instance.delete<TResponse>(url, config);
        return response.data;
    }

    /** Khi cần headers/status của response */
    public getFullResponse<TResponse>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<TResponse>> {
        return this.instance.get<TResponse>(url, config);
    }
}

const clients = new Map<ApiDomain, HttpClient>();

/** Một client (một axios instance) cho mỗi domain — tạo lười, dùng lại */
export const getHttpClient = (domain: ApiDomain = 'MAIN'): HttpClient => {
    let client = clients.get(domain);
    if (!client) {
        client = new HttpClient(createAxiosInstance(domain));
        clients.set(domain, client);
    }
    return client;
};
