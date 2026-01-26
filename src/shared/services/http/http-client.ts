/**
 * HTTP CLIENT WRAPPER
 * ===================
 * Type-safe HTTP client wrapper around axios.
 * Provides clean API với generics cho request/response types.
 * 
 */

import type { AxiosInstance } from 'axios';
import { axiosInstance } from './axios-interceptors';
import type { HttpRequestConfig, HttpResponse } from './http-types';

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
 * Singleton HTTP client instance
 * Sử dụng: import { httpClient } from '@/shared/services/http/http-client';
 */
export const httpClient = new HttpClient(axiosInstance);

/**
 * Export class nếu cần create custom instances
 */
export { HttpClient };
