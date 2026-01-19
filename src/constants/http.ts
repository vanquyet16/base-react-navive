/**
 * HTTP CONSTANTS
 * ==============
 * HTTP-related constants: timeouts, headers, status codes.
 * Centralized để dễ adjust cho performance.
 * 
 * @senior-pattern Magic numbers thành named constants
 */

/**
 * Timeout configs - milliseconds
 * Trade-off: Ngắn = UX tốt nhưng có thể fail với slow connection
 */
export const TIMEOUT = {
    /** Request timeout mặc định */
    DEFAULT: 10000, // 10 giây
    /** Upload timeout - dài hơn vì file có thể lớn */
    UPLOAD: 30000, // 30 giây
    /** Download timeout */
    DOWNLOAD: 30000, // 30 giây
    /** Quick operations (health check, ping) */
    QUICK: 5000, // 5 giây
} as const;

/**
 * Common HTTP headers
 */
export const HEADERS = {
    CONTENT_TYPE: {
        JSON: 'application/json',
        FORM_DATA: 'multipart/form-data',
        URL_ENCODED: 'application/x-www-form-urlencoded',
    },
    ACCEPT: {
        JSON: 'application/json',
        ALL: '*/*',
    },
} as const;

/**
 * HTTP status codes - typed constants
 * Chỉ define những codes mà app cần handle riêng
 */
export const HTTP_STATUS = {
    // Success
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,

    // Client Errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,

    // Server Errors
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
} as const;

/**
 * HTTP Methods
 */
export const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
} as const;

/**
 * Retry delays - milliseconds
 * Exponential backoff pattern
 */
export const RETRY_DELAY = {
    FIRST: 1000, // 1 giây
    SECOND: 2000, // 2 giây
    THIRD: 4000, // 4 giây
} as const;

/**
 * Type helpers
 */
export type HttpMethod = typeof HTTP_METHOD[keyof typeof HTTP_METHOD];
export type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];
