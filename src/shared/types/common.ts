/**
 * COMMON TYPES
 * ============
 * Utility types dùng chung trong toàn bộ app.
 * Tránh duplicate type definitions.
 * 
 * @senior-pattern Reusable utility types cho DRY code
 */

/**
 * Nullable type - value có thể null hoặc undefined
 * Dùng khi data từ API hoặc optional fields
 */
export type Nullable<T> = T | null | undefined;

/**
 * ID type - strongly typed ID
 * Có thể string hoặc number tùy backend
 */
export type ID = string | number;

/**
 * Deep readonly - recursive readonly cho nested objects
 * Dùng cho immutable configs hoặc constants
 */
export type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Optional - tất cả properties thành optional
 * Dùng cho partial updates
 */
export type Optional<T> = {
    [P in keyof T]?: T[P];
};

/**
 * Required - tất cả properties thành required (opposite của Partial)
 * Dùng khi cần enforce tất cả fields
 */
export type RequiredAll<T> = {
    [P in keyof T]-?: T[P];
};

/**
 * Pick optional - pick một số fields và làm optional
 * Dùng cho update operations
 */
export type PartialPick<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Value of - extract value types từ object
 * Dùng để tạo union type từ object values
 */
export type ValueOf<T> = T[keyof T];

/**
 * Async function type
 */
export type AsyncFunction<T = void> = () => Promise<T>;

/**
 * Callback function types
 */
export type Callback<T = void> = (data: T) => void;
export type AsyncCallback<T = void> = (data: T) => Promise<void>;

/**
 * Empty object type - better than {}
 */
export type EmptyObject = Record<string, never>;

/**
 * Dictionary type - key-value pairs
 */
export type Dictionary<T = any> = Record<string, T>;

/**
 * Timestamp types
 */
export type Timestamp = number; // Unix timestamp in milliseconds
export type ISODateString = string; // ISO 8601 date string

/**
 * Coordinates for geolocation
 */
export interface Coordinates {
    latitude: number;
    longitude: number;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

/**
 * Sort order
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Status enum-like type
 */
export type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Theme type
 */
export type Theme = 'light' | 'dark';

/**
 * Language type - extend khi support thêm languages
 */
export type Language = 'vi' | 'en';
