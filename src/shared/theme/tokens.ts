/**
 * DESIGN TOKENS
 * =============
 * Single source of truth for design decisions.
 * Includes: Colors, Spacing, Typography, Radius, Shadows, zIndex.
 * 
 * @system Atomic Design
 * @responsive Uses react-native-size-matters for scaling
 */

// Đã gỡ bỏ react-native-size-matters: các token giữ nguyên giá trị thiết kế gốc (Raw Base Units).
// Việc co giãn kích thước động được đảm nhiệm hoàn toàn bởi useResponsiveSize.

/**
 * Color Palette
 * Defined using HSL-based or Tailwind-like scales for flexibility.
 */
export const colors = {
    // Primary brand colors - Government Blue
    primary: {
        50: '#fff3eb',
        100: '#ffe2d1',
        200: '#ffc2a3',
        300: '#ff9d70',
        400: '#ff7b42',
        500: '#E65100', // Brand Primary (Terracotta Orange)
        600: '#b83b1d',
        700: '#942b16',
        800: '#732213',
        900: '#5e1b0f',
        1000: '#FFE5D1',
    },

    // Secondary colors
    secondary: {
        50: '#e8eef7',
        100: '#c5d3e9',
        200: '#9fb6da',
        300: '#7999cb',
        400: '#5c83c0',
        500: '#2B4B9B', // Brand Secondary (Government Blue)
        600: '#00235a',
        700: '#001f4d',
        800: '#003d8f',
        900: '#001233',
    },

    // Neutrals (grayscale)
    gray: {

        50: '#f9fafb',
        75: '#D9E2EC',  // Dùng cho nền tab background (đổi từ 80 → 75 cho đúng Tailwind scale)
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#1a1f36',
    },

    // Semantic colors
    success: {
        light: '#d1fae5',
        main: '#10b981',
        dark: '#065f46',
    },
    warning: {
        light: '#fed7aa',
        main: '#f97316',
        dark: '#c2410c',
    },
    error: {
        light: '#fee2e2',
        main: '#dc2626',
        dark: '#991b1b',
    },
    info: {
        light: '#dbeafe',
        main: '#3b82f6',
        dark: '#1e40af',
    },

    // Special UI elements
    special: {
        avatarBorder: '#FFB300',
        orangeAccent: '#f97316',
        blueAccent: '#2B4B9B',
        redNotification: '#ef4444',
    },

    // Additional palettes (legacy or specific use-cases)
    blue: {
        blueText: '#BFDBFE',
    },

    // Common
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    backdrop: 'rgba(0, 0, 0, 0.2)',
} as const;

/**
 * Elevation / Shadows
 */
export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
} as const;

/**
 * Z-Index
 */
export const zIndex = {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    toast: 1400,
} as const;

/**
 * Breakpoints
 */
export const breakpoints = {
    sm: 320,
    md: 768,
    lg: 1024,
    xl: 1280,
} as const;
