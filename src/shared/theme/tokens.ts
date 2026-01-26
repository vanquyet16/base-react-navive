/**
 * DESIGN TOKENS
 * =============
 * Atomic design tokens: colors, spacing, typography, radius.
 * Single source of truth cho design decisions.
 * 
 * @senior-pattern Design tokens với semantic naming
 */

/**
 * Color Palette
 * HSL-based colors cho dễ customize và theme switching
 */
export const colors = {
    // Primary brand colors
    primary: {
        50: '#e6f2ff',
        100: '#bfe0ff',
        200: '#99cdff',
        300: '#73baff',
        400: '#4da8ff',
        500: '#2695ff', // Main primary
        600: '#0077e6',
        700: '#005bb3',
        800: '#003f80',
        900: '#00234d',
    },

    // Secondary colors
    secondary: {
        50: '#f3e8ff',
        100: '#e0c6ff',
        200: '#cca3ff',
        300: '#b980ff',
        400: '#a55dff',
        500: '#923BFF', // Main secondary
        600: '#7a1fff',
        700: '#6300e6',
        800: '#4c00b3',
        900: '#350080',
    },

    // Neutrals (grayscale)
    gray: {
        50: '#f8f9fa',
        100: '#f1f3f5',
        200: '#e9ecef',
        300: '#dee2e6',
        400: '#ced4da',
        500: '#adb5bd',
        600: '#868e96',
        700: '#495057',
        800: '#343a40',
        900: '#212529',
    },

    // Semantic colors
    success: {
        light: '#d4f4dd',
        main: '#52c41a',
        dark: '#3a9613',
    },
    warning: {
        light: '#fff7e6',
        main: '#faad14',
        dark: '#d48806',
    },
    error: {
        light: '#ffebee',
        main: '#ff4d4f',
        dark: '#d32f2f',
    },
    info: {
        light: '#e6f7ff',
        main: '#1890ff',
        dark: '#096dd9',
    },

    // Common
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
} as const;

/**
 * Spacing Scale
 * 4px base unit
 */
export const spacing = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
} as const;

/**
 * Border Radius Scale
 */
export const radius = {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
} as const;

/**
 * Typography Scale
 * Font sizes, line heights, font weights
 */
export const typography = {
    fontSizes: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
        '5xl': 48,
        '6xl': 60,
    },

    lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
    },

    fontWeights: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
    },

    // Font families - có thể customize khi add custom fonts
    fontFamilies: {
        sans: 'System',
        mono: 'Courier',
    },
} as const;

/**
 * Shadows (Elevation)
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
 * Z-index Scale
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
 * Breakpoints (cho responsive nếu cần)
 */
export const breakpoints = {
    sm: 320,
    md: 768,
    lg: 1024,
    xl: 1280,
} as const;
