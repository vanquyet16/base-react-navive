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
        inputBorder: string; // Added for input borders

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
        primary1000: string;

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
        scrim: string;

        // Logo
        boderColorLogo: string;

        // Specific Party Colors
        partyRed: string;
        partyYellow: string;
        partyBg: string;
        partyBorder: string;
        partyText: string;
        partyHeaderBg: string;
        partyGradientStart: string;
        partyGradientEnd: string;
        partySubText: string;

        // NewsBox Variants
        newsBox: {
            primary: {
                bg: string;
                border: string;
                text: string;
                headerBg: string;
                gradientStart: string;
                gradientEnd: string;
                subText: string;
            };
            success: {
                bg: string;
                border: string;
                text: string;
                headerBg: string;
                gradientStart: string;
                gradientEnd: string;
                subText: string;
            };
            info: {
                bg: string;
                border: string;
                text: string;
                headerBg: string;
                gradientStart: string;
                gradientEnd: string;
                subText: string;
            };
            party: {
                bg: string;
                border: string;
                text: string;
                headerBg: string;
                gradientStart: string;
                gradientEnd: string;
                subText: string;
            };
        };
        tabs: {
            background: string;
            backgroundActive: string;
            text: string;
            textActive: string;
            border: string;
        },
        divider: string;
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
        background: '#F8F9FB',        // Main app background (Ultra-clean modern gray)
        backgroundSecondary: '#EEF1F5', // Secondary surfaces
        backgroundTertiary: '#ffffff',  // Cards, elevated surfaces
        inputBackground: colors.white,     // Input fields
        inputBorder: colors.gray[200],   // Input borders

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
        primary1000: colors.primary[1000],

        secondary: colors.secondary[500],
        secondaryLight: colors.secondary[100],
        secondaryDark: colors.secondary[700],

        // Gradient colors for headers
        // Gradient colors for headers
        gradientStart: colors.primary[500], // #DA5531
        gradientEnd: colors.primary[600],   // #b83b1d

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
        scrim: colors.backdrop,

        ///logo
        boderColorLogo: colors.special.avatarBorder,

        // Party Colors
        partyRed: '#D71920',
        partyYellow: '#FFFF00',
        partyBg: '#FFF8E1',
        partyBorder: '#F5E0B7',
        partyText: '#D71920',
        partyHeaderBg: '#FFE5B4',
        partyGradientStart: '#D22D28',
        partyGradientEnd: '#F1B226',
        partySubText: colors.gray[500],

        // NewsBox Variants (Subtle, App-tone aligned)
        newsBox: {
            primary: {
                bg: '#F5F7FB',
                border: '#D1DCEA',
                text: colors.primary[700],
                headerBg: '#E8EDF7',
                gradientStart: colors.primary[500],
                gradientEnd: colors.primary[600],
                subText: colors.gray[600],
            },
            success: {
                bg: '#F4F9F6',
                border: '#D0E8D8',
                text: '#166534',
                headerBg: '#E6F4EA',
                gradientStart: '#22C55E',
                gradientEnd: '#16A34A',
                subText: colors.gray[600],
            },
            info: {
                bg: '#F4F8FB',
                border: '#CFE3F3',
                text: '#0369A1',
                headerBg: '#E7F2F9',
                gradientStart: '#3B82F6',
                gradientEnd: '#2563EB',
                subText: colors.gray[600],
            },
            party: {
                bg: '#FAF7F3',
                border: '#E8DED0',
                text: '#D71920',
                headerBg: '#F5EDE3',
                gradientStart: '#D22D28',
                gradientEnd: '#F1B226',
                subText: colors.gray[500],
            },
        },
        tabs: {
            background: colors.gray[80],
            backgroundActive: colors.primary[500],
            text: colors.gray[500],
            textActive: colors.white,
            border: colors.gray[100],
        },
        divider: '#E2E8F0',
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
        inputBorder: colors.gray[600],   // Dark input border

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
        primary1000: colors.primary[1000],

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
        scrim: colors.backdrop,

        // Logo
        boderColorLogo: colors.special.avatarBorder,

        // Party Colors
        partyRed: '#D71920',
        partyYellow: '#FFFF00',
        partyBg: '#FFF8E1',
        partyBorder: '#F5E0B7',
        partyText: '#D71920',
        partyHeaderBg: '#FFE5B4',
        partyGradientStart: '#D22D28',
        partyGradientEnd: '#F1B226',
        partySubText: colors.gray[500],

        // NewsBox Variants (dark mode optimized)
        newsBox: {
            primary: {
                bg: '#1E3A8A',
                border: colors.primary[600],
                text: colors.primary[100],
                headerBg: colors.primary[700],
                gradientStart: colors.primary[600],
                gradientEnd: colors.primary[700],
                subText: colors.gray[300],
            },
            success: {
                bg: '#14532D',
                border: '#15803D',
                text: '#BBF7D0',
                headerBg: '#166534',
                gradientStart: '#15803D',
                gradientEnd: '#166534',
                subText: colors.gray[300],
            },
            info: {
                bg: '#0C4A6E',
                border: '#0369A1',
                text: '#BAE6FD',
                headerBg: '#075985',
                gradientStart: '#0369A1',
                gradientEnd: '#075985',
                subText: colors.gray[300],
            },
            party: {
                bg: '#FFF8E1',
                border: '#F5E0B7',
                text: '#D71920',
                headerBg: '#FFE5B4',
                gradientStart: '#D22D28',
                gradientEnd: '#F1B226',
                subText: colors.gray[500],
            },

        },
        tabs: {
            background: colors.gray[80],
            backgroundActive: colors.primary[500],
            text: colors.gray[500],
            textActive: colors.white,
            border: colors.gray[100],
        },
        divider: '#E2E8F0',

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
