/**
 * DESIGN TOKENS
 * =============
 * Atomic design tokens: colors, spacing, typography, radius.
 * Single source of truth cho design decisions.
 * 
 * @responsive All spacing and typography values are responsive using sizeMatters
 */

import { scale, verticalScale, moderateScale } from '@/shared/utils/sizeMatters';

/**
 * Color Palette
 * HSL-based colors cho dễ customize và theme switching
 */
export const colors = {
    // Primary brand colors - Government Blue
    primary: {
        50: '#e8eef7',
        100: '#c5d3e9',
        200: '#9fb6da',
        300: '#7999cb',
        400: '#5c83c0',
        500: '#2B4B9B', // Main primary - Button navy
        600: '#00235a', // Gradient dark
        700: '#001f4d', // Darker navy
        800: '#003d8f', // Gradient light
        900: '#001233',
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

    // Neutrals (grayscale) - Tailwind-based
    gray: {
        50: '#f9fafb', // Input backgrounds
        100: '#f3f4f6', // Borders, hover states
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af', // Tertiary text, icons
        500: '#6b7280', // Secondary text, labels
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#1a1f36', // Primary text (darker than standard)
    },

    // Semantic colors - Match UI mockups
    success: {
        light: '#d1fae5', // emerald-100
        main: '#10b981',  // emerald-500
        dark: '#065f46',  // emerald-800
    },
    warning: {
        light: '#fed7aa', // orange-200
        main: '#f97316',  // orange-500
        dark: '#c2410c',  // orange-700
    },
    error: {
        light: '#fee2e2', // red-100
        main: '#dc2626',  // red-600
        dark: '#991b1b',  // red-800
    },
    info: {
        light: '#dbeafe', // blue-100
        main: '#3b82f6',  // blue-500
        dark: '#1e40af',  // blue-800
    },

    // Special colors - UI elements
    special: {
        avatarBorder: '#eab308',   // gold/yellow for avatar accent
        orangeAccent: '#f97316',   // section indicators
        blueAccent: '#2B4B9B',     // section indicators
        redNotification: '#ef4444', // notification badge

    },

    blue: {
        blueText: '#BFDBFE', // Primary text (darker than standard)
    },

    // Common
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
} as const;

/**
 * Spacing Scale (Responsive)
 * 4px base unit - scaled automatically theo width màn hình
 * Dùng scale() để ensure consistent spacing across devices
 */
export const spacing = {
    0: 0,
    1: moderateScale(4, 0.3),
    2: moderateScale(8, 0.3),
    3: moderateScale(12, 0.3),
    4: moderateScale(16, 0.3),
    5: moderateScale(20, 0.3),
    6: moderateScale(24, 0.3),
    8: moderateScale(32, 0.3),
    10: moderateScale(40, 0.3),
    12: moderateScale(48, 0.3),
    16: moderateScale(64, 0.3),
    20: moderateScale(80, 0.3),
    24: moderateScale(96, 0.3),
} as const;

// Optional: vertical spacing (khi cần chắc chắn theo height)
export const spacingV = {
    0: 0,
    1: verticalScale(4),
    2: verticalScale(8),
    3: verticalScale(12),
    4: verticalScale(16),
    5: verticalScale(20),
    6: verticalScale(24),
    8: verticalScale(32),
    10: verticalScale(40),
    12: verticalScale(48),
    16: verticalScale(64),
    20: verticalScale(80),
    24: verticalScale(96),
} as const;

/**
 * Border Radius Scale (Responsive)
 * Scaled theo width để consistent trên mọi devices
 */
export const radius = {
    none: 0,
    sm: moderateScale(4, 0.3),
    md: moderateScale(8, 0.3),
    lg: moderateScale(12, 0.3),
    xl: moderateScale(16, 0.3),
    '2xl': moderateScale(24, 0.3),
    '3xl': moderateScale(32, 0.3),
    full: 9999,
} as const;

/**
 * Typography Scale
 * Font sizes, line heights, font weights
 */
export const typography = {
    fontSizes: {
        xs: moderateScale(12, 0.3),   // Scale ít aggressive hơn cho text
        sm: moderateScale(14, 0.3),
        base: moderateScale(16, 0.3),
        lg: moderateScale(18, 0.3),
        xl: moderateScale(20, 0.3),
        '2xl': moderateScale(24, 0.3),
        '3xl': moderateScale(30, 0.3),
        '4xl': moderateScale(36, 0.3),
        '5xl': moderateScale(48, 0.3),
        '6xl': moderateScale(60, 0.3),
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
