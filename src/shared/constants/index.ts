/**
 * SHARED CONSTANTS - INDEX
 * =========================
 * Re-exports all constants from organized modules
 */

// UI Constants
export { SCREEN_PADDING, BORDER_RADIUS } from './ui';

// Validation Constants
export { VALIDATION_PATTERNS, VALIDATION_LIMITS } from './validation';

// Backward compatibility: Combined VALIDATION object
export const VALIDATION = {
    // From VALIDATION_PATTERNS
    USER_NAME_REGEX: /^[a-zA-Z0-9.]*$/,
    PHONE_REGEX: /^[0-9]{10,11}$/,
    EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    // From VALIDATION_LIMITS
    PASSWORD_MIN_LENGTH: 6,
} as const;

// Error Messages
export {
    NETWORK_ERRORS,
    VALIDATION_ERRORS,
    ERROR_MESSAGES, // Backward compatibility
} from './messages';
