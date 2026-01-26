/**
 * HTTP TYPES
 * ==========
 * Types cho HTTP layer: request config, response, errors.
 * Tách riêng để axios-specific types không leak ra domain layer.
 * 
 */

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Custom request config - extend từ Axios config
 */
export interface HttpRequestConfig extends AxiosRequestConfig {
    /** Skip auth header cho request này (e.g., login, public endpoints) */
    skipAuth?: boolean;
    /** Skip token refresh nếu 401 (e.g., refresh token endpoint) */
    skipRefresh?: boolean;
    /** Custom error handler */
    onError?: (error: HttpError) => void;
}

/**
 * HTTP Response wrapper - generic type-safe response
 */
export interface HttpResponse<T = any> extends AxiosResponse<T> {
    data: T;
}

/**
 * HTTP Error interface
 * Normalized error structure cho consistent error handling
 */
export interface HttpError {
    /** Error message user-facing */
    message: string;
    /** HTTP status code */
    statusCode: number;
    /** Error code từ backend (nếu có) */
    code?: string;
    /** Original error object */
    originalError?: any;
    /** Validation errors cho forms */
    validationErrors?: Record<string, string[]>;
    /** Is network error (no internet, timeout) */
    isNetworkError: boolean;
    /** Is server error (5xx) */
    isServerError: boolean;
    /** Is client error (4xx) */
    isClientError: boolean;
    /** Is auth error (401, 403) */
    isAuthError: boolean;
}

/**
 * Error type discriminators
 */
export enum HttpErrorType {
    NETWORK = 'NETWORK',
    TIMEOUT = 'TIMEOUT',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT_FOUND',
    VALIDATION = 'VALIDATION',
    SERVER = 'SERVER',
    UNKNOWN = 'UNKNOWN',
}
