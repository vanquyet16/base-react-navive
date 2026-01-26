/**
 * QUERY DEFAULTS CONSTANTS
 * =========================
 * Default configuration cho TanStack Query.
 * Centralized để dễ tune performance.
 * 
 */

/**
 * Stale time configs - thời gian data được coi là "fresh"
 * Trade-off: Cao hơn =ít request hơn nhưng data có thể outdated
 */
export const STALE_TIME = {
    /** Data thay đổi realtime (messages, notifications) */
    INSTANT: 0,
    /** Data thay đổi nhanh (feeds, search results) */
    SHORT: 30 * 1000, // 30 giây
    /** Data thay đổi vừa phải (user profile, settings) */
    MEDIUM: 5 * 60 * 1000, // 5 phút
    /** Data ít thay đổi (static content, configs) */
    LONG: 30 * 60 * 1000, // 30 phút
} as const;

/**
 * Cache time (gcTime) configs - thời gian giữ data trong cache khi inactive
 * Trade-off: Cao hơn = ít re-fetch nhưng dùng nhiều memory
 */
export const CACHE_TIME = {
    SHORT: 5 * 60 * 1000, // 5 phút
    MEDIUM: 10 * 60 * 1000, // 10 phút
    LONG: 60 * 60 * 1000, // 1 giờ
} as const;

/**
 * Retry configs - số lần retry khi request fail
 */
export const RETRY_CONFIG = {
    /** Queries - retry nhiều hơn vì đọc data */
    QUERY: 3,
    /** Mutations - retry ít hơn để tránh duplicate actions */
    MUTATION: 1,
    /** Critical operations - không retry */
    NONE: 0,
} as const;

/**
 * Default query options
 */
export const DEFAULT_QUERY_OPTIONS = {
    staleTime: STALE_TIME.MEDIUM,
    gcTime: CACHE_TIME.MEDIUM,
    retry: RETRY_CONFIG.QUERY,
    refetchOnWindowFocus: false, // Mobile app không cần vì không có window focus
    refetchOnReconnect: true, // Re-fetch khi reconnect internet
} as const;

/**
 * Default mutation options
 */
export const DEFAULT_MUTATION_OPTIONS = {
    retry: RETRY_CONFIG.MUTATION,
} as const;
