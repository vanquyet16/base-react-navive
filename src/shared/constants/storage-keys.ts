/**
 * STORAGE KEYS CONSTANTS
 * ======================
 * Centralized storage keys cho AsyncStorage/MMKV.
 * Prefix để tránh conflict với libraries khác.
 * 
 */

const PREFIX = '@rn_base:';

/**
 * Authentication related storage keys
 */
export const AUTH_KEYS = {
    ACCESS_TOKEN: `${PREFIX}access_token`,
    REFRESH_TOKEN: `${PREFIX}refresh_token`,
    USER_DATA: `${PREFIX}user_data`,
    BIOMETRIC_ENABLED: `${PREFIX}biometric_enabled`,
} as const;

/**
 * App settings storage keys
 */
export const SETTINGS_KEYS = {
    THEME: `${PREFIX}theme`,
    LANGUAGE: `${PREFIX}language`,
    NOTIFICATIONS_ENABLED: `${PREFIX}notifications_enabled`,
    FIRST_LAUNCH: `${PREFIX}first_launch`,
} as const;

/**
 * Cache storage keys
 */
export const CACHE_KEYS = {
    LAST_SYNC: `${PREFIX}last_sync`,
    OFFLINE_DATA: `${PREFIX}offline_data`,
} as const;

/**
 * All storage keys combined
 */
export const STORAGE_KEYS = {
    ...AUTH_KEYS,
    ...SETTINGS_KEYS,
    ...CACHE_KEYS,
} as const;

/**
 * Type helper cho storage operations
 */
export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
