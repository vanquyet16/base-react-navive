// ============================================================================
// APPLICATION CONFIGURATION
// ============================================================================
// Centralized app-level configuration
// Environment-dependent settings, API domains, storage, app metadata

/**
 * Environment detection
 * Single source of truth cho environment checks
 */
export const ENV = {
    DEV: __DEV__,
    PROD: !__DEV__,
    TEST: false,
} as const;

/**
 * API Configuration - Multi Domain Support
 * Each service can have its own domain
 */
export const API_CONFIG = {
    /**
     * API Domains
     * Configure different base URLs for dev/prod per domain
     */
    DOMAINS: {
        MAIN: {
            DEV: 'http://172.20.20.175:40000/',
            PROD: 'https://api.production.com/',
        },
        AUTH: {
            DEV: 'http://172.20.20.175:40000/',
            PROD: 'https://auth.production.com/',
        },
        MANAGER: {
            DEV: 'http://172.20.20.175:40000/',
            PROD: 'https://manager.production.com/',
        },
    } as const,

    /** Common config for all domains */
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
} as const;

/**
 * Type for domain keys (type-safe)
 */
export type ApiDomain = keyof typeof API_CONFIG.DOMAINS;

/**
 * Helper: Get API URL based on environment
 * @param domain - Domain to get URL for
 * @returns Base URL for the domain
 */
export const getApiUrl = (domain: ApiDomain = 'MAIN'): string => {
    const domainConfig = API_CONFIG.DOMAINS[domain];
    return ENV.DEV ? domainConfig.DEV : domainConfig.PROD;
};

/**
 * @deprecated Use getApiUrl() or createHttpClient() with specific domain
 */
export const BASE_URL = getApiUrl('MAIN');

/**
 * Application Metadata
 * App name, version, bundle info
 */
export const APP_INFO = {
    NAME: 'React Native Base',
    VERSION: '1.0.0',
    BUILD_NUMBER: '1',
    BUNDLE_ID: 'com.reactnativebase.app',
} as const;

/**
 * Storage Configuration
 * AsyncStorage keys and prefixes
 */
export const STORAGE = {
    /** Storage key names */
    KEYS: {
        ACCESS_TOKEN: 'access_token',
        REFRESH_TOKEN: 'refresh_token',
        USER_DATA: 'user_data',
        THEME: 'theme',
        LANGUAGE: 'language',
        APP_SETTINGS: 'app_settings',
    },
    /** Prefix for all storage keys */
    PREFIX: 'app_',
} as const;
