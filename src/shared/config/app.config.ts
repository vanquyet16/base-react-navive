// ============================================================================
// CẤU HÌNH TẬP TRUNG CHO TOÀN BỘ ỨNG DỤNG
// ============================================================================

// Environment Configuration
export const ENV = {
    DEV: __DEV__,
    PROD: !__DEV__,
    TEST: false, // Hardcode false for React Native to avoid process.env issues
} as const;

// API Configuration
export const API_CONFIG = {
    BASE_URL: ENV.DEV
        ? 'http://172.20.20.175:40000/'
        : 'https://api.production.com/', // Thay đổi URL production
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
} as const;

// App Configuration
export const APP_CONFIG = {
    NAME: 'React Native Base',
    VERSION: '1.0.0',
    BUNDLE_ID: 'com.reactnativebase.app',
    BUILD_NUMBER: '1',
} as const;

// Storage Configuration
export const STORAGE_CONFIG = {
    KEYS: {
        ACCESS_TOKEN: 'access_token',
        REFRESH_TOKEN: 'refresh_token',
        USER_DATA: 'user_data',
        THEME: 'theme',
        LANGUAGE: 'language',
        APP_SETTINGS: 'app_settings',
    },
    PREFIX: 'rn_base_',
} as const;

// Theme Configuration
export const THEME_CONFIG = {
    COLORS: {
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
    },
    SPACING: {
        TINY: 4,
        SMALL: 8,
        NORMAL: 12,
        MEDIUM: 16,
        LARGE: 20,
        XLARGE: 24,
        XXLARGE: 32,
    },
    BORDER_RADIUS: {
        SMALL: 4,
        NORMAL: 8,
        LARGE: 12,
        XLARGE: 16,
    },
} as const;

// Validation Configuration
export const VALIDATION_CONFIG = {
    PATTERNS: {
        USER_NAME: /^[a-zA-Z0-9.]*$/,
        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        PHONE: /^[0-9]{10,11}$/,
        PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    },
    LIMITS: {
        USER_NAME_MIN: 3,
        USER_NAME_MAX: 50,
        PASSWORD_MIN: 8,
        PASSWORD_MAX: 128,
        PHONE_LENGTH: 10,
    },
} as const;

// Error Messages Configuration
export const ERROR_MESSAGES = {
    NETWORK: {
        TIMEOUT: 'Kết nối bị timeout, vui lòng thử lại',
        NO_INTERNET: 'Không có kết nối internet',
        SERVER_ERROR: 'Lỗi server, vui lòng thử lại sau',
        UNKNOWN: 'Đã xảy ra lỗi không xác định',
    },
    AUTH: {
        INVALID_CREDENTIALS: 'Tài khoản hoặc mật khẩu không đúng',
        SESSION_EXPIRED: 'Phiên đăng nhập đã hết hạn',
        UNAUTHORIZED: 'Bạn không có quyền truy cập',
    },
    VALIDATION: {
        REQUIRED: 'Trường này là bắt buộc',
        INVALID_EMAIL: 'Email không hợp lệ',
        INVALID_PHONE: 'Số điện thoại không hợp lệ',
        PASSWORD_TOO_WEAK: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số',
    },
} as const;

// Performance Configuration
export const PERFORMANCE_CONFIG = {
    CACHE: {
        QUERY_STALE_TIME: 5 * 60 * 1000, // 5 phút
        QUERY_CACHE_TIME: 10 * 60 * 1000, // 10 phút
        IMAGE_CACHE_SIZE: 100 * 1024 * 1024, // 100MB
    },
    DEBOUNCE: {
        SEARCH: 300,
        SCROLL: 100,
        BUTTON_PRESS: 200,
    },
} as const;
