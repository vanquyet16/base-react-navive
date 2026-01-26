/**
 * HTTP ERROR CLASS
 * ================
 * Normalized error class để consistent error handling.
 * Map từ axios errors sang business-friendly errors.
 * 
 */

import type { AxiosError } from 'axios';
import { HTTP_STATUS } from '@/shared/constants/http';
import { ERROR_MESSAGES } from '@/shared/config/app.config';
import type { HttpError, HttpErrorType } from './http-types';

/**
 * Create normalized HttpError từ AxiosError
 */
export class AppHttpError extends Error implements HttpError {
    public readonly statusCode: number;
    public readonly code?: string;
    public readonly originalError?: any;
    public readonly validationErrors?: Record<string, string[]>;
    public readonly isNetworkError: boolean;
    public readonly isServerError: boolean;
    public readonly isClientError: boolean;
    public readonly isAuthError: boolean;

    constructor(error: AxiosError | Error | any) {
        // Extract message
        const message = extractErrorMessage(error);
        super(message);

        this.name = 'AppHttpError';
        this.message = message;
        this.originalError = error;

        // Extract status code
        this.statusCode = extractStatusCode(error);

        // Extract error code
        this.code = extractErrorCode(error);

        // Extract validation errors
        this.validationErrors = extractValidationErrors(error);

        // Set error type flags
        this.isNetworkError = isNetworkError(error);
        this.isServerError = this.statusCode >= 500 && this.statusCode < 600;
        this.isClientError = this.statusCode >= 400 && this.statusCode < 500;
        this.isAuthError =
            this.statusCode === HTTP_STATUS.UNAUTHORIZED ||
            this.statusCode === HTTP_STATUS.FORBIDDEN;

        // Maintain proper stack trace (only available in V8/Node.js, not in RN JSC/Hermes)
        // Type assertion để bypass TypeScript error trong React Native environment
        if (typeof (Error as any).captureStackTrace === 'function') {
            (Error as any).captureStackTrace(this, AppHttpError);
        }
    }

    /**
     * Get error type enum
     */
    public getType(): HttpErrorType {
        if (this.isNetworkError) {
            return 'NETWORK' as HttpErrorType;
        }
        if (this.statusCode === HTTP_STATUS.UNAUTHORIZED) {
            return 'UNAUTHORIZED' as HttpErrorType;
        }
        if (this.statusCode === HTTP_STATUS.FORBIDDEN) {
            return 'FORBIDDEN' as HttpErrorType;
        }
        if (this.statusCode === HTTP_STATUS.NOT_FOUND) {
            return 'NOT_FOUND' as HttpErrorType;
        }
        if (this.statusCode === HTTP_STATUS.UNPROCESSABLE_ENTITY) {
            return 'VALIDATION' as HttpErrorType;
        }
        if (this.isServerError) {
            return 'SERVER' as HttpErrorType;
        }
        return 'UNKNOWN' as HttpErrorType;
    }
}

/**
 * Helper: Extract error message
 */
function extractErrorMessage(error: any): string {
    // From axios error response
    if (error?.response?.data?.message) {
        return error.response.data.message;
    }

    // From axios error
    if (error?.message) {
        // Network errors
        if (error.message === 'Network Error') {
            return ERROR_MESSAGES.NETWORK.NO_INTERNET;
        }
        // Timeout
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            return ERROR_MESSAGES.NETWORK.TIMEOUT;
        }
        return error.message;
    }

    // Fallback
    return ERROR_MESSAGES.NETWORK.UNKNOWN;
}

/**
 * Helper: Extract status code
 */
function extractStatusCode(error: any): number {
    return error?.response?.status || 0;
}

/**
 * Helper: Extract error code
 */
function extractErrorCode(error: any): string | undefined {
    return error?.response?.data?.code || error?.code;
}

/**
 * Helper: Extract validation errors
 */
function extractValidationErrors(
    error: any,
): Record<string, string[]> | undefined {
    return error?.response?.data?.errors;
}

/**
 * Helper: Check if network error
 */
function isNetworkError(error: any): boolean {
    return (
        !error?.response && // No response = network issue
        (error?.message === 'Network Error' ||
            error?.code === 'ECONNABORTED' ||
            error?.message?.includes('timeout'))
    );
}

/**
 * Factory function để create HttpError từ any error
 */
export const createHttpError = (error: any): AppHttpError => {
    if (error instanceof AppHttpError) {
        return error;
    }
    return new AppHttpError(error);
};
