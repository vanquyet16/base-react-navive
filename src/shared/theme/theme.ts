/**
 * THEME CONFIGURATION
 * ===================
 * Light và Dark theme definitions.
 * Semantic color mappings từ design tokens.
 * 
 * @senior-pattern Semantic theme với accessibility
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

        // Text
        text: string;
        textSecondary: string;
        textTertiary: string;
        textInverse: string;

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

        // Semantic colors
        success: string;
        successLight: string;
        warning: string;
        warningLight: string;
        error: string;
        errorLight: string;
        info: string;
        infoLight: string;

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
        // Backgrounds
        background: colors.white,
        backgroundSecondary: colors.gray[50],
        backgroundTertiary: colors.gray[100],

        // Text
        text: colors.gray[900],
        textSecondary: colors.gray[700],
        textTertiary: colors.gray[500],
        textInverse: colors.white,

        // Borders
        border: colors.gray[300],
        borderLight: colors.gray[200],

        // Brand
        primary: colors.primary[500],
        primaryLight: colors.primary[100],
        primaryDark: colors.primary[700],

        secondary: colors.secondary[500],
        secondaryLight: colors.secondary[100],
        secondaryDark: colors.secondary[700],

        // Semantic
        success: colors.success.main,
        successLight: colors.success.light,
        warning: colors.warning.main,
        warningLight: colors.warning.light,
        error: colors.error.main,
        errorLight: colors.error.light,
        info: colors.info.main,
        infoLight: colors.info.light,

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

        // Text - inverted
        text: colors.gray[50],
        textSecondary: colors.gray[300],
        textTertiary: colors.gray[400],
        textInverse: colors.gray[900],

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

        // Semantic - adjusted
        success: colors.success.main,
        successLight: '#1a4d2e',
        warning: colors.warning.main,
        warningLight: '#4d3800',
        error: colors.error.main,
        errorLight: '#4d1a1a',
        info: colors.info.main,
        infoLight: '#1a3d5c',

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
