// API Configuration
export const API_CONFIG = {
    BASE_URL: __DEV__
        ? 'http://172.20.20.175:40000/'
        : 'http://172.20.20.175:40000/',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
};

// Storage Keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_DATA: 'user_data',
    THEME: 'theme',
    LANGUAGE: 'language',
};

// App Constants
export const APP_CONFIG = {
    NAME: 'React Native Base',
    VERSION: '1.0.0',
    BUNDLE_ID: 'com.reactnativebase.app',
};



// Screen Dimensions
export const SCREEN_PADDING = 16;
export const BORDER_RADIUS = 8;

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Lỗi kết nối mạng',
    UNAUTHORIZED: 'Phiên đăng nhập đã hết hạn',
    SERVER_ERROR: 'Lỗi server',
    VALIDATION_ERROR: 'Dữ liệu không hợp lệ',
    EMAIL_INVALID: 'Email không hợp lệ',
    USER_NAME_INVALID: 'Tài khoản không hợp lệ',
    PASSWORD_TOO_SHORT: 'Mật khẩu phải có ít nhất 6 ký tự',
    REQUIRED_FIELD: 'Trường này là bắt buộc',
};

export const VALIDATION = {
    USER_NAME_REGEX: /^[a-zA-Z0-9.]*$/,
    PASSWORD_MIN_LENGTH: 6,
    PHONE_REGEX: /^[0-9]{10,11}$/,
};


