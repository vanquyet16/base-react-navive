/**
 * VALIDATION CONSTANTS
 * ====================
 * Regex patterns and validation rules
 */

/**
 * Regex patterns for form validation
 */
export const VALIDATION_PATTERNS = {
    /** Username: alphanumeric and dots only */
    USER_NAME: /^[a-zA-Z0-9.]*$/,

    /** Phone number: 10-11 digits */
    PHONE: /^[0-9]{10,11}$/,

    /** Email pattern standard */
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
} as const;

/**
 * Validation limits and constraints
 */
export const VALIDATION_LIMITS = {
    /** Minimum password length */
    PASSWORD_MIN_LENGTH: 6,
} as const;
