/**
 * THEME CONFIGURATION
 * ===================
 * Light và Dark theme definitions.
 * Semantic color mappings từ design tokens.
 * 
 */

import { colors, spacing, radius, typography, shadows, zIndex } from './tokens';

/**
 * Theme interface
 * Define structure cho theme objects
 */
export interface Theme {
    // Colors - semantic mappings
    colors: {
        // Backgrounds
        background: string;
        backgroundSecondary: string;
        backgroundTertiary: string;
        inputBackground: string; // Added for input fields

        // Text
        text: string;
        textSecondary: string;
        textTertiary: string;
        textInverse: string;
        textTertiarySeccon: string;

        // Borders
        border: string;
        borderLight: string;

        // Brand colors
        primary: string;
        primaryLight: string;
        primaryDark: string;

        secondary: string;
        secondaryLight: string;
        secondaryDark: string;

        // Gradient colors for headers
        gradientStart: string;
        gradientEnd: string;

        // Semantic colors
        success: string;
        successLight: string;
        warning: string;
        warningLight: string;
        error: string;
        errorLight: string;
        info: string;
        infoLight: string;

        // Special UI elements
        avatarBorder: string;
        orangeAccent: string;
        blueAccent: string;
        redNotification: string;

        // Common
        white: string;
        black: string;
        transparent: string;
    };

    // Re-export từ tokens
    spacing: typeof spacing;
    radius: typeof radius;
    typography: typeof typography;
    shadows: typeof shadows;
    zIndex: typeof zIndex;

    // Theme metadata
    isDark: boolean;
}

/**
 * Light Theme
 */
export const lightTheme: Theme = {
    colors: {
        // Backgrounds - Match UI mockups
        background: '#f5f7fa',        // Main app background (light gray)
        backgroundSecondary: '#f9fafb', // Secondary surfaces
        backgroundTertiary: '#ffffff',  // Cards, elevated surfaces
        inputBackground: '#f8f9fb',     // Input fields

        // Text
        text: colors.gray[900],         // #1a1f36 - Primary text
        textSecondary: colors.gray[500], // #6b7280 - Secondary text, labels
        textTertiary: colors.gray[400],  // #9ca3af - Tertiary text, placeholders
        textInverse: colors.white,
        textTertiarySeccon: colors.blue.blueText,


        // Borders
        border: colors.gray[100],       // #f3f4f6 - Main borders
        borderLight: colors.gray[50],   // #f9fafb - Subtle borders

        // Brand - Government Blue
        primary: colors.primary[500],      // #2B4B9B - Main primary (buttons)
        primaryLight: colors.primary[100], // Light tint
        primaryDark: colors.primary[700],  // #001f4d - Darker shade

        secondary: colors.secondary[500],
        secondaryLight: colors.secondary[100],
        secondaryDark: colors.secondary[700],

        // Gradient colors for headers
        gradientStart: colors.primary[600], // #00235a - Dark navy
        gradientEnd: colors.primary[800],   // #003d8f - Mid blue

        // Semantic
        success: colors.success.main,
        successLight: colors.success.light,
        warning: colors.warning.main,
        warningLight: colors.warning.light,
        error: colors.error.main,
        errorLight: colors.error.light,
        info: colors.info.main,
        infoLight: colors.info.light,

        // Special UI elements
        avatarBorder: colors.special.avatarBorder,
        orangeAccent: colors.special.orangeAccent,
        blueAccent: colors.special.blueAccent,
        redNotification: colors.special.redNotification,

        // Common
        white: colors.white,
        black: colors.black,
        transparent: colors.transparent,
    },

    // Re-export tokens
    spacing,
    radius,
    typography,
    shadows,
    zIndex,

    isDark: false,
};

/**
 * Dark Theme
 */
export const darkTheme: Theme = {
    colors: {
        // Backgrounds - inverted
        background: colors.gray[900],
        backgroundSecondary: colors.gray[800],
        backgroundTertiary: colors.gray[700],
        inputBackground: colors.gray[800], // Dark input background

        // Text - inverted
        text: colors.gray[50],
        textSecondary: colors.gray[300],
        textTertiary: colors.gray[400],
        textInverse: colors.gray[900],
        textTertiarySeccon: colors.blue.blueText,
        // Borders
        border: colors.gray[700],
        borderLight: colors.gray[600],

        // Brand - slightly adjusted cho dark mode
        primary: colors.primary[400],
        primaryLight: colors.primary[900],
        primaryDark: colors.primary[300],

        secondary: colors.secondary[400],
        secondaryLight: colors.secondary[900],
        secondaryDark: colors.secondary[300],

        // Gradient colors for headers (lighter in dark mode)
        gradientStart: colors.primary[700],
        gradientEnd: colors.primary[500],

        // Semantic - adjusted
        success: colors.success.main,
        successLight: '#1a4d2e',
        warning: colors.warning.main,
        warningLight: '#4d3800',
        error: colors.error.main,
        errorLight: '#4d1a1a',
        info: colors.info.main,
        infoLight: '#1a3d5c',

        // Special UI elements (same in dark mode)
        avatarBorder: colors.special.avatarBorder,
        orangeAccent: colors.special.orangeAccent,
        blueAccent: colors.special.blueAccent,
        redNotification: colors.special.redNotification,

        // Common
        white: colors.white,
        black: colors.black,
        transparent: colors.transparent,
    },

    // Re-export tokens
    spacing,
    radius,
    typography,
    shadows,
    zIndex,

    isDark: true,
};

/**
 * Get theme by name
 */
export const getTheme = (themeName: 'light' | 'dark'): Theme => {
    return themeName === 'dark' ? darkTheme : lightTheme;
};

/**
 * Export theme type
 */
export type ThemeName = 'light' | 'dark';
