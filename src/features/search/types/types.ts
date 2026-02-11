/**
 * Search Feature Types
 * ===================
 * Type definitions cho search functionality
 */

/**
 * Một menu item trong search results
 */
export interface SearchMenuItem {
    /** Unique identifier */
    id: string;
    /** Tiêu đề hiển thị */
    title: string;
    /** Icon name (Feather icons) */
    icon: string;
    /** Badge text (optional, ví dụ: "Mới") */
    badge?: string;
    /** Category mà item này thuộc về */
    category: string;
}

/**
 * Section cho grouped search results
 */
export interface SearchSection {
    /** Section title */
    title: string;
    /** Array of menu items trong section */
    data: SearchMenuItem[];
}
