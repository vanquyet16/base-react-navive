/**
 * API TYPES
 * =========
 * Types cho API responses, requests, errors.
 * Normalized structure cho consistency.
 * 
 * @senior-pattern Consistent API contract types
 */

import type { PaginationMeta } from './common';

/**
 * Generic API Response wrapper
 * Backend nên return consistent structure này
 * 
 * @example
 * type UserResponse = ApiResponse<User>;
 */
export interface ApiResponse<T = any> {
    /** Response data - generic type */
    data: T;
    /** Success flag */
    success: boolean;
    /** Optional message từ server */
    message?: string;
    /** Optional metadata */
    meta?: Record<string, any>;
}

/**
 * Paginated API Response
 * Dùng cho list endpoints với pagination
 * 
 * @example
 * type UserListResponse = PaginatedResponse<User>;
 */
export interface PaginatedResponse<T = any> {
    /** Array of items */
    data: T[];
    /** Pagination metadata */
    pagination: PaginationMeta;
    /** Success flag */
    success: boolean;
    /** Optional message */
    message?: string;
}

/**
 * API Error Response
 * Normalized error structure từ backend
 */
export interface ApiErrorResponse {
    /** Success false */
    success: false;
    /** Error message user-facing */
    message: string;
    /** Error code để handle specific cases */
    code?: string;
    /** Validation errors cho form fields */
    errors?: Record<string, string[]>;
    /** Stack trace (chỉ có ở DEV) */
    stack?: string;
}

/**
 * Validation Error detail
 * Dùng khi API return field-level validation errors
 */
export interface ValidationError {
    field: string;
    messages: string[];
}

/**
 * Request Config type
 * Extend từ axios config nhưng typed
 */
export interface RequestConfig {
    /** Request timeout */
    timeout?: number;
    /** Custom headers */
    headers?: Record<string, string>;
    /** Query params */
    params?: Record<string, any>;
    /** Cancel token */
    signal?: AbortSignal;
}

/**
 * Upload Progress callback type
 */
export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}

/**
 * File Upload Request
 */
export interface FileUploadRequest {
    file: {
        uri: string;
        type: string;
        name: string;
    };
    onProgress?: (progress: UploadProgress) => void;
}

/**
 * Generic List Request với pagination & filters
 * Dùng cho list endpoints
 */
export interface ListRequest {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filters?: Record<string, any>;
}

/**
 * Generic List Response (alias cho PaginatedResponse)
 */
export type ListResponse<T> = PaginatedResponse<T>;
