/**
 * ERROR HANDLER
 * =============
 * Chuyển lỗi (thường là AppHttpError) thành thông báo thân thiện + toast.
 * Chống spam: cùng một thông báo chỉ hiển thị một lần trong `DEDUPE_WINDOW_MS`.
 */

import { logError } from './logger';
import CustomToast from './CustomToast';
import { createHttpError } from '@/shared/services/http/http-error';
import { HTTP_STATUS } from '@/shared/constants/http';

const MESSAGES = {
    TIMEOUT_OR_OFFLINE: 'Không có kết nối mạng hoặc máy chủ phản hồi quá lâu',
    SERVER: 'Lỗi hệ thống từ máy chủ',
    UNAUTHORIZED: 'Phiên đăng nhập đã hết hạn',
    FORBIDDEN: 'Không có quyền truy cập',
    NOT_FOUND: 'Không tìm thấy dữ liệu',
    UNKNOWN: 'Đã có lỗi xảy ra',
} as const;

const DEDUPE_WINDOW_MS = 3000;

export enum ErrorType {
    NETWORK = 'NETWORK',
    AUTH = 'AUTH',
    VALIDATION = 'VALIDATION',
    SERVER = 'SERVER',
    UNKNOWN = 'UNKNOWN',
}

export interface ErrorInfo {
    type: ErrorType;
    message: string;
    statusCode?: number;
}

export const describeError = (error: unknown): ErrorInfo => {
    const httpError = createHttpError(error);
    const { statusCode } = httpError;

    if (httpError.isNetworkError) {
        return { type: ErrorType.NETWORK, message: MESSAGES.TIMEOUT_OR_OFFLINE };
    }
    if (statusCode === HTTP_STATUS.UNAUTHORIZED) {
        return { type: ErrorType.AUTH, message: MESSAGES.UNAUTHORIZED, statusCode };
    }
    if (statusCode === HTTP_STATUS.FORBIDDEN) {
        return { type: ErrorType.AUTH, message: MESSAGES.FORBIDDEN, statusCode };
    }
    if (statusCode === HTTP_STATUS.NOT_FOUND) {
        return { type: ErrorType.SERVER, message: MESSAGES.NOT_FOUND, statusCode };
    }
    if (statusCode === HTTP_STATUS.BAD_REQUEST || statusCode === HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return { type: ErrorType.VALIDATION, message: httpError.message, statusCode };
    }
    if (httpError.isServerError) {
        return { type: ErrorType.SERVER, message: MESSAGES.SERVER, statusCode };
    }
    return { type: ErrorType.UNKNOWN, message: httpError.message || MESSAGES.UNKNOWN, statusCode };
};

class ErrorHandler {
    private lastShown = new Map<string, number>();

    handleApiError(error: unknown, context?: string, showToast = true): ErrorInfo {
        const info = describeError(error);
        logError(error, context);
        if (showToast) {
            this.showErrorToast(info.message);
        }
        return info;
    }

    private showErrorToast(message: string): void {
        const now = Date.now();
        const last = this.lastShown.get(message) ?? 0;
        if (now - last < DEDUPE_WINDOW_MS) {
            return;
        }
        this.lastShown.set(message, now);
        CustomToast.error(message);
    }
}

export const errorHandler = new ErrorHandler();

export const handleApiError = (error: unknown, context?: string): ErrorInfo =>
    errorHandler.handleApiError(error, context);
