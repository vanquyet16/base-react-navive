/**
 * HTTP CLIENT WRAPPER
 * ===================
 * Type-safe HTTP client wrapper around axios.
 * Provides clean API với generics cho request/response types.
 * Hỗ trợ multiple domains cho các API services khác nhau.
 */

import type { AxiosInstance } from 'axios';
import { axiosInstance, createAxiosInstance } from './axios-instance';
import type { HttpRequestConfig, HttpResponse } from './http-types';
import type { ApiDomain } from '@/shared/config/app.config';

/**
 * HTTP Client class
 * Wrapper để isolate axios và provide cleaner API
 */
class HttpClient {
    private instance: AxiosInstance;

    constructor(axiosInst: AxiosInstance) {
        this.instance = axiosInst;
    }

    /**
     * GET request
     * @param url - Request URL
     * @param config - Request config
     * @returns Promise<TResponse>
     */
    public async get<TResponse = any>(
        url: string,
        config?: HttpRequestConfig,
    ): Promise<TResponse> {
        const response = await this.instance.get<TResponse>(url, config);
        return response.data;
    }

    /**
     * POST request
     * @param url - Request URL
     * @param data - Request payload
     * @param config - Request config
     * @returns Promise<TResponse>
     */
    public async post<TResponse = any, TRequest = any>(
        url: string,
        data?: TRequest,
        config?: HttpRequestConfig,
    ): Promise<TResponse> {
        const response = await this.instance.post<TResponse>(url, data, config);
        return response.data;
    }

    /**
     * PUT request
     * @param url - Request URL
     * @param data - Request payload
     * @param config - Request config
     * @returns Promise<TResponse>
     */
    public async put<TResponse = any, TRequest = any>(
        url: string,
        data?: TRequest,
        config?: HttpRequestConfig,
    ): Promise<TResponse> {
        const response = await this.instance.put<TResponse>(url, data, config);
        return response.data;
    }

    /**
     * PATCH request
     * @param url - Request URL
     * @param data - Request payload
     * @param config - Request config
     * @returns Promise<TResponse>
     */
    public async patch<TResponse = any, TRequest = any>(
        url: string,
        data?: TRequest,
        config?: HttpRequestConfig,
    ): Promise<TResponse> {
        const response = await this.instance.patch<TResponse>(url, data, config);
        return response.data;
    }

    /**
     * DELETE request
     * @param url - Request URL
     * @param config - Request config
     * @returns Promise<TResponse>
     */
    public async delete<TResponse = any>(
        url: string,
        config?: HttpRequestConfig,
    ): Promise<TResponse> {
        const response = await this.instance.delete<TResponse>(url, config);
        return response.data;
    }

    /**
     * Get full response (với headers, status, etc.)
     * Dùng khi cần access response metadata
     */
    public async getFullResponse<TResponse = any>(
        url: string,
        config?: HttpRequestConfig,
    ): Promise<HttpResponse<TResponse>> {
        return this.instance.get<TResponse>(url, config);
    }

    /**
     * Get underlying axios instance nếu cần
     * Trade-off: Expose axios cho advanced use cases
     */
    public getAxiosInstance(): AxiosInstance {
        return this.instance;
    }
}

/**
 * Factory function: Tạo HTTP client cho domain cụ thể
 * @param domain - Domain cần tạo client (MAIN, AUTH, MANAGER, etc.)
 * @returns HttpClient instance cho domain đó
 * 
 * Usage:
 * ```ts
 * // Tạo client cho Auth API
 * const authClient = createHttpClient('AUTH');
 * await authClient.post('/login', credentials);
 * 
 * // Tạo client cho Manager API
 * const managerClient = createHttpClient('MANAGER');
 * await managerClient.get('/users');
 * ```
 */
export const createHttpClient = (domain: ApiDomain = 'MAIN'): HttpClient => {
    const instance = createAxiosInstance(domain);
    return new HttpClient(instance);
};

/**
 * Default HTTP client cho MAIN domain
 * Sử dụng: import { httpClient } from '@/shared/services/http/http-client';
 * 
 * @deprecated Nên sử dụng createHttpClient() để tạo client cho domain cụ thể
 */
export const httpClient = new HttpClient(axiosInstance);

/**
 * Export class nếu cần create custom instances
 */
export { HttpClient };

