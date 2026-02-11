/**
 * ERROR MESSAGES
 * ==============
 * User-facing error messages (Vietnamese)
 */

/**
 * Network and API error messages
 */
export const NETWORK_ERRORS = {
    NETWORK_ERROR: 'Lỗi kết nối mạng',
    SERVER_ERROR: 'Lỗi server',
    UNAUTHORIZED: 'Phiên đăng nhập đã hết hạn',
} as const;

/**
 * Validation error messages
 */
export const VALIDATION_ERRORS = {
    VALIDATION_ERROR: 'Dữ liệu không hợp lệ',
    EMAIL_INVALID: 'Email không hợp lệ',
    USER_NAME_INVALID: 'Tài khoản không hợp lệ',
    PASSWORD_TOO_SHORT: 'Mật khẩu phải có ít nhất 6 ký tự',
    REQUIRED_FIELD: 'Trường này là bắt buộc',
} as const;

/**
 * All error messages combined
 * Convenient export for general use
 */
export const ERROR_MESSAGES = {
    ...NETWORK_ERRORS,
    ...VALIDATION_ERRORS,
} as const;
