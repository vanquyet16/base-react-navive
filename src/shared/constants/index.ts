/**
 * Constants Module
 * Export tất cả constants từ các file riêng lẻ
 * 
 * NOTE: API_CONFIG, APP_CONFIG được export từ @/shared/config
 * ERROR_MESSAGES được import từ config và re-export dạng flat để backward compatibility
 */
import { ERROR_MESSAGES as RAW_ERROR_MESSAGES } from '../config/app.config';

export * from './api-endpoints';
export * from './http';
export * from './query-defaults';
export * from './routes';
export * from './storage-keys';

/**
 * Theme Colors
 * 
 * @deprecated Use theme system instead (`useTheme` hook from `@/shared/theme/use-theme`)
 * This constant will be removed in v2.0
 * 
 * Migration guide:
 * ```typescript
 * // ❌ Old way
 * import { COLORS } from '@/shared/constants';\n * color: COLORS.primary
 * 
 * // ✅ New way
 * import { useTheme } from '@/shared/theme/use-theme';\n * const theme = useTheme();
 * color: theme.colors. primary
 * ```
 */
export const COLORS = {
    primary: '#1890ff',
    secondary: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#13c2c2',
    text: '#262626',
    textSecondary: '#8c8c8c',
    background: '#ffffff',
    backgroundSecondary: '#f5f5f5',
    border: '#d9d9d9',
    placeholder: '#bfbfbf',
};

// Screen Dimensions
export const SCREEN_PADDING = 16;
export const BORDER_RADIUS = 8;
export const HEADER_HEIGHT = 56;

// Validation patterns
export const VALIDATION = {
    USER_NAME_REGEX: /^[a-zA-Z0-9.]*$/,
    PASSWORD_MIN_LENGTH: 6,
    PHONE_REGEX: /^[0-9]{10,11}$/,
};

/**
 * Error Messages - Flat structure cho backward compatibility
 * Src: @/shared/config/app.config.ts (nested structure)
 * 
 * @deprecated Import trực tiếp từ @/shared/config để dùng nested structure
 */
export const ERROR_MESSAGES = {
    // Validation errors
    REQUIRED_FIELD: RAW_ERROR_MESSAGES.VALIDATION.REQUIRED,
    EMAIL_INVALID: RAW_ERROR_MESSAGES.VALIDATION.INVALID_EMAIL,
    USER_NAME_INVALID: 'Tài khoản không hợp lệ', // Custom message
    PASSWORD_TOO_SHORT: 'Mật khẩu phải có ít nhất 6 ký tự', // Custom message

    // Network errors
    NETWORK_ERROR: RAW_ERROR_MESSAGES.NETWORK.NO_INTERNET,
    UNAUTHORIZED: RAW_ERROR_MESSAGES.AUTH.SESSION_EXPIRED,
    SERVER_ERROR: RAW_ERROR_MESSAGES.NETWORK.SERVER_ERROR,
    VALIDATION_ERROR: RAW_ERROR_MESSAGES.VALIDATION.REQUIRED,
};
