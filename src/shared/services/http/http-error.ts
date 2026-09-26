/**
 * HTTP ERROR
 * ==========
 * Mọi lỗi đi ra khỏi tầng HTTP đều là `AppHttpError` — phía trên (query, UI) chỉ cần đọc
 * `statusCode` / các cờ phân loại, không phụ thuộc cấu trúc lỗi của axios.
 */

import { isAxiosError } from 'axios';
import { HTTP_STATUS } from '@/shared/constants/http';
import { ERROR_MESSAGES } from '@/shared/constants';
import { HttpErrorType, type HttpError } from './http-types';

const NETWORK_ERROR_CODES = new Set(['ERR_NETWORK', 'ECONNABORTED', 'ETIMEDOUT']);

interface ErrorBody {
    message?: unknown;
    code?: unknown;
    errors?: unknown;
}

export class AppHttpError extends Error implements HttpError {
    public readonly statusCode: number;
    public readonly code?: string;
    public readonly originalError?: unknown;
    public readonly validationErrors?: Record<string, string[]>;
    public readonly isNetworkError: boolean;
    public readonly isServerError: boolean;
    public readonly isClientError: boolean;
    public readonly isAuthError: boolean;

    constructor(error: unknown) {
        const response = isAxiosError(error) ? error.response : undefined;
        const body = (response?.data ?? undefined) as ErrorBody | undefined;
        const axiosCode = isAxiosError(error) ? error.code : undefined;
        const isNetwork = isAxiosError(error) && !response && (!axiosCode || NETWORK_ERROR_CODES.has(axiosCode));

        super(AppHttpError.resolveMessage(error, body, isNetwork));

        this.name = 'AppHttpError';
        this.originalError = error;
        this.statusCode = response?.status ?? 0;
        this.code = typeof body?.code === 'string' ? body.code : axiosCode;
        this.validationErrors =
            body?.errors && typeof body.errors === 'object' && !Array.isArray(body.errors)
                ? (body.errors as Record<string, string[]>)
                : undefined;
        this.isNetworkError = isNetwork;
        this.isServerError = this.statusCode >= 500 && this.statusCode < 600;
        this.isClientError = this.statusCode >= 400 && this.statusCode < 500;
        this.isAuthError =
            this.statusCode === HTTP_STATUS.UNAUTHORIZED || this.statusCode === HTTP_STATUS.FORBIDDEN;
    }

    private static resolveMessage(error: unknown, body: ErrorBody | undefined, isNetwork: boolean): string {
        if (typeof body?.message === 'string' && body.message) {
            return body.message;
        }
        if (isNetwork) {
            return ERROR_MESSAGES.NETWORK_ERROR;
        }
        if (error instanceof Error && error.message) {
            return error.message;
        }
        return ERROR_MESSAGES.SERVER_ERROR;
    }

    public getType(): HttpErrorType {
        if (this.isNetworkError) {
            return HttpErrorType.NETWORK;
        }
        switch (this.statusCode) {
            case HTTP_STATUS.UNAUTHORIZED:
                return HttpErrorType.UNAUTHORIZED;
            case HTTP_STATUS.FORBIDDEN:
                return HttpErrorType.FORBIDDEN;
            case HTTP_STATUS.NOT_FOUND:
                return HttpErrorType.NOT_FOUND;
            case HTTP_STATUS.UNPROCESSABLE_ENTITY:
                return HttpErrorType.VALIDATION;
        }
        return this.isServerError ? HttpErrorType.SERVER : HttpErrorType.UNKNOWN;
    }
}

export const createHttpError = (error: unknown): AppHttpError =>
    error instanceof AppHttpError ? error : new AppHttpError(error);

export const isAppHttpError = (error: unknown): error is AppHttpError => error instanceof AppHttpError;
