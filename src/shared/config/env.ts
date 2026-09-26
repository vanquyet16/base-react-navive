/**
 * ENVIRONMENT CONFIG
 * ==================
 * Nguồn sự thật duy nhất cho môi trường chạy, đọc từ file .env.<flavor> qua react-native-config.
 *
 * Hai trục độc lập:
 * - APP_ENV (dev | staging | prod): quyết định URL API và chính sách bảo mật.
 * - __DEV__: chỉ phản ánh bundle debug hay release — dùng cho log/dev tooling.
 *   Nhờ vậy APK release của flavor dev vẫn trỏ về server dev.
 *
 * Cấu hình sai sẽ throw ngay khi khởi động (fail fast) thay vì chạy với giá trị ngầm định.
 */

import Config from 'react-native-config';

export type AppEnv = 'dev' | 'staging' | 'prod';

const APP_ENVS: readonly AppEnv[] = ['dev', 'staging', 'prod'];

export class EnvConfigError extends Error {
    constructor(message: string) {
        super(`[Env] ${message}`);
        this.name = 'EnvConfigError';
    }
}

const readAppEnv = (): AppEnv => {
    const value = Config.APP_ENV as AppEnv | undefined;
    if (!value || !APP_ENVS.includes(value)) {
        throw new EnvConfigError(`APP_ENV không hợp lệ: "${value}". Kiểm tra file .env của flavor.`);
    }
    // Android: BuildConfig.FLAVOR phải khớp APP_ENV — chặn trường hợp nhúng nhầm .env
    const flavor = Config.FLAVOR;
    if (flavor && flavor !== value) {
        throw new EnvConfigError(`Flavor "${flavor}" nhưng APP_ENV="${value}". Build lại đúng flavor.`);
    }
    return value;
};

const APP_ENV = readAppEnv();

const readUrl = (key: 'API_MAIN_URL' | 'API_AUTH_URL' | 'API_MANAGER_URL'): string => {
    const value = Config[key];
    if (!value) {
        throw new EnvConfigError(`Thiếu ${key}`);
    }
    if (APP_ENV !== 'dev' && !value.startsWith('https://')) {
        throw new EnvConfigError(`${key} phải dùng https:// ở môi trường ${APP_ENV}`);
    }
    return value.endsWith('/') ? value : `${value}/`;
};

const readNumber = (key: string, fallback: number): number => {
    const raw = Config[key];
    if (raw === undefined || raw === '') {
        return fallback;
    }
    const value = Number(raw);
    if (!Number.isFinite(value) || value < 0) {
        throw new EnvConfigError(`${key} phải là số không âm (hiện tại: "${raw}")`);
    }
    return value;
};

export const ENV = {
    APP_ENV,
    IS_DEV_ENV: APP_ENV === 'dev',
    IS_PROD: APP_ENV === 'prod',
    /** Bundle debug (Metro) — chỉ dùng cho log/dev tooling */
    IS_DEBUG_BUNDLE: __DEV__,
} as const;

export const API_URLS = {
    MAIN: readUrl('API_MAIN_URL'),
    AUTH: readUrl('API_AUTH_URL'),
    MANAGER: readUrl('API_MANAGER_URL'),
} as const;

export type ApiDomain = keyof typeof API_URLS;

export const API_TIMEOUT_MS = readNumber('API_TIMEOUT_MS', 15000);
