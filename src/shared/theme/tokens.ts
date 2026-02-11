/**
 * DESIGN TOKENS
 * =============
 * Single source of truth for design decisions.
 * Includes: Colors, Spacing, Typography, Radius, Shadows, zIndex.
 * 
 * @system Atomic Design
 * @responsive Uses react-native-size-matters for scaling
 */

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

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
        80: '#D9E2EC',
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
 * Spacing Scale
 * Base unit: 4px. Scaled responsively.
 */
export const spacing = {
    0: 0,
    1: moderateScale(4, 0.3),
    2: moderateScale(8, 0.3),
    2.5: moderateScale(10, 0.3),
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

/**
 * Vertical Spacing Scale
 * Used for strict vertical rhythm.
 */
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
 * Border Radius
 */
export const radius = {
    none: 0,
    sm: moderateScale(4, 0.3),
    md: moderateScale(8, 0.3),
    lg: moderateScale(12, 0.3),
    xl: moderateScale(16, 0.3),
    '2xl': moderateScale(24, 0.3),
    '3xl': moderateScale(32, 0.3),
    '4xl': moderateScale(48, 0.3),
    '5xl': moderateScale(64, 0.3),
    full: 9999,
} as const;

/**
 * Typography Scale
 */
export const typography = {
    fontSizes: {
        '3xs': moderateScale(8, 0.3),   // For very tiny text (micro badges, minimal tags)
        '2xs': moderateScale(10, 0.3),  // For tiny text (tab bar labels, small badges)
        xs: moderateScale(12, 0.3),     // Caption, helper text, timestamps
        sm: moderateScale(14, 0.3),     // Body small, labels, secondary text
        base: moderateScale(16, 0.3),   // Primary body text
        lg: moderateScale(18, 0.3),     // Highlighted text, large labels
        xl: moderateScale(20, 0.3),     // H4, screen titles
        '2xl': moderateScale(24, 0.3),  // H3, section titles
        '3xl': moderateScale(30, 0.3),  // H2
        '4xl': moderateScale(36, 0.3),  // H1
        '5xl': moderateScale(48, 0.3),  // Display text (rare)
        '6xl': moderateScale(60, 0.3),  // Hero text (rare)
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
    fontFamilies: {
        sans: 'System',
        mono: 'Courier',
    },
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

/**
 * Layout Constants
 */
export const layout = {
    headerHeight: moderateVerticalScale(56),
    screenPadding: spacing[4], // Chuẩn chung 16px (scaled)ß
} as const;
