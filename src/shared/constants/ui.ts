/**
 * UI CONSTANTS
 * ============
 * Layout, spacing, sizing constants for UI components
 */

/**
 * Khung thiết kế gốc (dp) — PHẢI khớp với khung của bản thiết kế (Figma/Stitch).
 * Engine responsive (useResponsiveSize) co giãn mọi kích thước theo tỉ lệ so với khung này;
 * đổi tại đây là toàn app khớp lại, không cần sửa từng màn.
 */
export const DESIGN_FRAME = { width: 390, height: 844 } as const;

/**
 * Screen padding and margins
 */
export const SCREEN_PADDING = 16;

/**
 * Default border radius
 */
export const BORDER_RADIUS = 8;

