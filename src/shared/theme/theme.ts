/**
 * THEME CONFIGURATION (SENIOR ARCHITECTURE STANDARD)
 * ==================================================
 * Light và Dark theme definitions chuẩn 3-Tier Token System.
 * Semantic color mappings từ design tokens:
 * - Hỗ trợ đầy đủ Surface, Card, States, Borders, Muted/Placeholder
 * - Tích hợp sẵn helper `theme.alpha(color, opacity)`
 * - Tích hợp sẵn `theme.typography.presets` (h1-h5, body, caption, button)
 */

import { colors, spacing, spacingV, radius, typography, shadows, zIndex } from './tokens';
import { alpha, typographyPresets } from './helpers';

/**
 * Theme interface
 * Cấu trúc hoàn chỉnh của Theme object
 */
export interface Theme {
    colors: {
        // Core Surfaces & Backgrounds
        background: string;
        backgroundSecondary: string;
        backgroundTertiary: string;
        surface: string;            // Nền thẻ card / modal / sheet chuẩn
        card: string;               // Alias tiện lợi cho surface
        surfaceVariant: string;      // Nền phụ, hover, highlight
        inputBackground: string;
        inputBorder: string;

        // Typography & Text
        text: string;               // Chữ chính
        textSecondary: string;      // Chữ phụ
        textTertiary: string;       // Chữ mờ / placeholder
        textInverse: string;        // Chữ tương phản
        textTertiarySecond: string;
        muted: string;              // Alias cho textSecondary
        placeholder: string;        // Alias cho textTertiary

        // Borders & Dividers
        border: string;
        borderLight: string;
        borderFocus: string;        // Màu viền khi active/focus
        divider: string;

        // Brand colors
        primary: string;
        primaryLight: string;
        primaryDark: string;
        primary1000: string;

        secondary: string;
        secondaryLight: string;
        secondaryDark: string;

        // Header gradients
        gradientStart: string;
        gradientEnd: string;

        // Semantic states
        success: string;
        successLight: string;
        warning: string;
        warningLight: string;
        error: string;
        errorLight: string;
        info: string;
        infoLight: string;

        // Interactive States
        disabled: string;           // Màu chữ/icon khi bị disable
        disabledBackground: string; // Màu nền khi bị disable
        backdrop: string;           // Lớp phủ đen mờ khi mở modal

        // Special UI elements
        avatarBorder: string;
        orangeAccent: string;
        blueAccent: string;
        redNotification: string;

        // Common primitives
        white: string;
        black: string;
        transparent: string;
        scrim: string;

        // Logo
        borderColorLogo: string;

        // Specific Party Colors (Backward compatible)
        partyRed: string;
        partyYellow: string;
        partyBg: string;
        partyBorder: string;
        partyText: string;
        partyHeaderBg: string;
        partyGradientStart: string;
        partyGradientEnd: string;
        partySubText: string;

        // NewsBox Variants (Backward compatible)
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

        // Tabs
        tabs: {
            background: string;
            backgroundActive: string;
            text: string;
            textActive: string;
            border: string;
        };
    };

    // Design Tokens & DX Helpers
    spacing: typeof spacing;
    spacingV: typeof spacingV; // Scale dọc cho vertical rhythm
    radius: typeof radius;
    typography: typeof typography & {
        presets: typeof typographyPresets;
    };
    shadows: typeof shadows;
    zIndex: typeof zIndex;

    // Helper tạo màu trong suốt tiện lợi
    alpha: typeof alpha;

    // Metadata
    isDark: boolean;
}

/**
 * LIGHT THEME DEFINITION
 */
export const lightTheme: Theme = {
    colors: {
        // Surfaces & Backgrounds
        background: '#F8F9FB',
        backgroundSecondary: '#EEF1F5',
        backgroundTertiary: '#ffffff',
        surface: '#ffffff',
        card: '#ffffff',
        surfaceVariant: '#EEF1F5',
        inputBackground: colors.white,
        inputBorder: colors.gray[200],

        // Text
        text: colors.gray[900],         // #1a1f36
        textSecondary: colors.gray[500], // #6b7280
        textTertiary: colors.gray[400],  // #9ca3af
        textInverse: colors.white,
        textTertiarySecond: colors.blue.blueText,
        muted: colors.gray[500],
        placeholder: colors.gray[400],

        // Borders & Dividers
        border: colors.gray[100],       // #f3f4f6
        borderLight: colors.gray[50],   // #f9fafb
        borderFocus: colors.primary[500],
        divider: '#E2E8F0',

        // Brand
        primary: colors.primary[500],      // #E65100
        primaryLight: colors.primary[100],
        primaryDark: colors.primary[700],
        primary1000: colors.primary[1000],

        secondary: colors.secondary[500],  // #2B4B9B
        secondaryLight: colors.secondary[100],
        secondaryDark: colors.secondary[700],

        // Header gradients
        gradientStart: colors.primary[500],
        gradientEnd: colors.primary[600],

        // Semantic States
        success: colors.success.main,
        successLight: colors.success.light,
        warning: colors.warning.main,
        warningLight: colors.warning.light,
        error: colors.error.main,
        errorLight: colors.error.light,
        info: colors.info.main,
        infoLight: colors.info.light,

        // Interactive States
        disabled: colors.gray[400],
        disabledBackground: colors.gray[100],
        backdrop: colors.backdrop,

        // Special UI
        avatarBorder: colors.special.avatarBorder,
        orangeAccent: colors.special.orangeAccent,
        blueAccent: colors.special.blueAccent,
        redNotification: colors.special.redNotification,

        // Primitives
        white: colors.white,
        black: colors.black,
        transparent: colors.transparent,
        scrim: colors.backdrop,

        // Logo
        borderColorLogo: colors.special.avatarBorder,

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

        // NewsBox Variants
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

        // Tabs
        tabs: {
            background: colors.gray[75], // Cập nhật từ gray[80] → gray[75]
            backgroundActive: colors.primary[500],
            text: colors.gray[500],
            textActive: colors.white,
            border: colors.gray[100],
        },
    },

    // Tokens & Helpers
    spacing,
    spacingV,
    radius,
    typography: {
        ...typography,
        presets: typographyPresets,
    },
    shadows,
    zIndex,
    alpha,
    isDark: false,
};

/**
 * DARK THEME DEFINITION
 */
export const darkTheme: Theme = {
    colors: {
        // Surfaces & Backgrounds
        background: colors.gray[900],
        backgroundSecondary: colors.gray[800],
        backgroundTertiary: colors.gray[700],
        surface: colors.gray[800],
        card: colors.gray[800],
        surfaceVariant: colors.gray[700],
        inputBackground: colors.gray[800],
        inputBorder: colors.gray[600],

        // Text
        text: colors.gray[50],
        textSecondary: colors.gray[300],
        textTertiary: colors.gray[400],
        textInverse: colors.gray[900],
        textTertiarySecond: colors.blue.blueText,
        muted: colors.gray[400],
        placeholder: colors.gray[500],

        // Borders & Dividers
        border: colors.gray[700],
        borderLight: colors.gray[600],
        borderFocus: colors.primary[400],
        divider: colors.gray[700],

        // Brand
        primary: colors.primary[400],
        primaryLight: colors.primary[900],
        primaryDark: colors.primary[300],
        primary1000: colors.primary[1000],

        secondary: colors.secondary[400],
        secondaryLight: colors.secondary[900],
        secondaryDark: colors.secondary[300],

        // Header gradients
        gradientStart: colors.primary[700],
        gradientEnd: colors.primary[500],

        // Semantic States
        success: colors.success.main,
        successLight: '#1a4d2e',
        warning: colors.warning.main,
        warningLight: '#4d3800',
        error: colors.error.main,
        errorLight: '#4d1a1a',
        info: colors.info.main,
        infoLight: '#1a3d5c',

        // Interactive States
        disabled: colors.gray[600],
        disabledBackground: colors.gray[800],
        backdrop: colors.backdrop,

        // Special UI
        avatarBorder: colors.special.avatarBorder,
        orangeAccent: colors.special.orangeAccent,
        blueAccent: colors.special.blueAccent,
        redNotification: colors.special.redNotification,

        // Primitives
        white: colors.white,
        black: colors.black,
        transparent: colors.transparent,
        scrim: colors.backdrop,

        // Logo
        borderColorLogo: colors.special.avatarBorder,

        // Party Colors
        partyRed: '#FF8080',
        partyYellow: '#FFD700',
        partyBg: '#2C1313',
        partyBorder: '#4E1A1A',
        partyText: '#FF8080',
        partyHeaderBg: '#3D1414',
        partyGradientStart: '#8A1A16',
        partyGradientEnd: '#9C6A15',
        partySubText: colors.gray[300],

        // NewsBox Variants
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
                bg: '#2C1313',
                border: '#4E1A1A',
                text: '#FF8080',
                headerBg: '#3D1414',
                gradientStart: '#8A1A16',
                gradientEnd: '#9C6A15',
                subText: colors.gray[300],
            },
        },

        // Tabs
        tabs: {
            background: colors.gray[800],
            backgroundActive: colors.primary[500],
            text: colors.gray[400],
            textActive: colors.white,
            border: colors.gray[700],
        },
    },

    // Tokens & Helpers
    spacing,
    spacingV,
    radius,
    typography: {
        ...typography,
        presets: typographyPresets,
    },
    shadows,
    zIndex,
    alpha,
    isDark: true,
};

/**
 * Lấy Theme theo tên ('light' hoặc 'dark')
 */
export const getTheme = (themeName: 'light' | 'dark'): Theme => {
    return themeName === 'dark' ? darkTheme : lightTheme;
};

export type ThemeName = 'light' | 'dark';
