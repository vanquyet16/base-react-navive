// ============================================================================
// ERROR HANDLER UTILITY - XỬ LÝ LỖI TẬP TRUNG VÀ CHUYÊN NGHIỆP
// ============================================================================

import { logger, logError } from './logger';
import { ERROR_MESSAGES } from '@/config/app.config';
import Toast from 'react-native-toast-message';

// Định nghĩa các loại lỗi
export enum ErrorType {
    NETWORK = 'NETWORK',
    AUTH = 'AUTH',
    VALIDATION = 'VALIDATION',
    SERVER = 'SERVER',
    UNKNOWN = 'UNKNOWN',
}

// Interface cho error info
export interface ErrorInfo {
    type: ErrorType;
    message: string;
    code?: string | number;
    details?: any;
    showToast?: boolean;
    logError?: boolean;
}

// Class Error Handler chính
class ErrorHandler {
    private static instance: ErrorHandler;
    private errorCount: Map<string, number> = new Map();
    private readonly maxErrorCount = 5; // Số lần lỗi tối đa trước khi suppress

    private constructor() { }

    static getInstance(): ErrorHandler {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }

    // Method để xử lý lỗi từ API response
    handleApiError(error: any, context?: string): ErrorInfo {
        const errorInfo: ErrorInfo = {
            type: ErrorType.UNKNOWN,
            message: ERROR_MESSAGES.NETWORK.UNKNOWN,
            showToast: true,
            logError: true,
        };

        // Xử lý lỗi network
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
            errorInfo.type = ErrorType.NETWORK;
            errorInfo.message = ERROR_MESSAGES.NETWORK.TIMEOUT;
        } else if (error.code === 'ERR_NETWORK') {
            errorInfo.type = ErrorType.NETWORK;
            errorInfo.message = ERROR_MESSAGES.NETWORK.NO_INTERNET;
        }
        // Xử lý lỗi HTTP status
        else if (error.response?.status) {
            errorInfo.code = error.response.status;

            switch (error.response.status) {
                case 400:
                    errorInfo.type = ErrorType.VALIDATION;
                    errorInfo.message = error.response.data?.message || ERROR_MESSAGES.VALIDATION.REQUIRED;
                    break;
                case 401:
                    errorInfo.type = ErrorType.AUTH;
                    errorInfo.message = ERROR_MESSAGES.AUTH.SESSION_EXPIRED;
                    break;
                case 403:
                    errorInfo.type = ErrorType.AUTH;
                    errorInfo.message = ERROR_MESSAGES.AUTH.UNAUTHORIZED;
                    break;
                case 404:
                    errorInfo.type = ErrorType.SERVER;
                    errorInfo.message = 'Tài nguyên không tìm thấy';
                    break;
                case 500:
                    errorInfo.type = ErrorType.SERVER;
                    errorInfo.message = ERROR_MESSAGES.NETWORK.SERVER_ERROR;
                    break;
                default:
                    errorInfo.type = ErrorType.SERVER;
                    errorInfo.message = error.response.data?.message || ERROR_MESSAGES.NETWORK.SERVER_ERROR;
            }
        }
        // Xử lý lỗi validation từ server
        else if (error.response?.data?.errors) {
            errorInfo.type = ErrorType.VALIDATION;
            errorInfo.message = Array.isArray(error.response.data.errors)
                ? error.response.data.errors.join(', ')
                : error.response.data.errors;
        }

        // Log error nếu được yêu cầu
        if (errorInfo.logError) {
            logError(error, context);
        }

        // Hiển thị toast nếu được yêu cầu
        if (errorInfo.showToast) {
            this.showErrorToast(errorInfo.message);
        }

        return errorInfo;
    }

    // Method để xử lý lỗi validation
    handleValidationError(field: string, value: any, rules: any): ErrorInfo {
        const errorInfo: ErrorInfo = {
            type: ErrorType.VALIDATION,
            message: ERROR_MESSAGES.VALIDATION.REQUIRED,
            showToast: false, // Validation errors thường không cần toast
            logError: false,
        };

        // Kiểm tra required
        if (rules.required && (!value || value.toString().trim() === '')) {
            errorInfo.message = `${field} là bắt buộc`;
        }
        // Kiểm tra email
        else if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorInfo.message = ERROR_MESSAGES.VALIDATION.INVALID_EMAIL;
        }
        // Kiểm tra phone
        else if (rules.phone && value && !/^[0-9]{10,11}$/.test(value)) {
            errorInfo.message = ERROR_MESSAGES.VALIDATION.INVALID_PHONE;
        }
        // Kiểm tra min length
        else if (rules.minLength && value && value.length < rules.minLength) {
            errorInfo.message = `${field} phải có ít nhất ${rules.minLength} ký tự`;
        }
        // Kiểm tra max length
        else if (rules.maxLength && value && value.length > rules.maxLength) {
            errorInfo.message = `${field} không được vượt quá ${rules.maxLength} ký tự`;
        }
        // Kiểm tra pattern
        else if (rules.pattern && value && !rules.pattern.test(value)) {
            errorInfo.message = rules.message || `${field} không đúng định dạng`;
        }

        return errorInfo;
    }

    // Method để xử lý lỗi JavaScript/TypeScript
    handleJsError(error: Error, context?: string): ErrorInfo {
        const errorInfo: ErrorInfo = {
            type: ErrorType.UNKNOWN,
            message: error.message || ERROR_MESSAGES.NETWORK.UNKNOWN,
            showToast: true,
            logError: true,
        };

        // Log error
        logError(error, context);

        // Hiển thị toast
        this.showErrorToast(errorInfo.message);

        return errorInfo;
    }

    // Method để hiển thị error toast
    private showErrorToast(message: string): void {
        const errorKey = message.substring(0, 50); // Tạo key từ message
        const currentCount = this.errorCount.get(errorKey) || 0;

        // Chỉ hiển thị toast nếu chưa vượt quá giới hạn
        if (currentCount < this.maxErrorCount) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: message,
                position: 'top',
                visibilityTime: 4000,
            });

            // Tăng counter
            this.errorCount.set(errorKey, currentCount + 1);
        }
    }

    // Method để reset error count (có thể gọi sau một khoảng thời gian)
    resetErrorCount(): void {
        this.errorCount.clear();
    }

    // Method để lấy thống kê lỗi
    getErrorStats(): Record<string, number> {
        const stats: Record<string, number> = {};
        this.errorCount.forEach((count, key) => {
            stats[key] = count;
        });
        return stats;
    }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance();

// Utility functions cho các trường hợp đặc biệt
export const handleApiError = (error: any, context?: string): ErrorInfo => {
    return errorHandler.handleApiError(error, context);
};

export const handleValidationError = (field: string, value: any, rules: any): ErrorInfo => {
    return errorHandler.handleValidationError(field, value, rules);
};

export const handleJsError = (error: Error, context?: string): ErrorInfo => {
    return errorHandler.handleJsError(error, context);
};


