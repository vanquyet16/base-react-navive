/**
 * Hệ thống Theme hợp nhất cho Base React Native
 * - Quản lý màu sắc (colors), bóng đổ (shadows), zIndex, alpha
 * - Tối ưu 60 FPS, memoized, type-safe
 */

import { colors, fontWeights, radii, shadows, spacing, typography, zIndex } from './tokens';
import { alpha } from './helpers';

/**
 * Theme interface
 * Cấu trúc hoàn chỉnh của Theme object (chuyên biệt cho Màu sắc, Shadows, Alpha và Dark/Light mode)
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

        // Tabs
        tabs: {
            background: string;
            backgroundActive: string;
            text: string;
            textActive: string;
            border: string;
        };
    };

    // Shadows & Depth
    shadows: typeof shadows;
    zIndex: typeof zIndex;

    // Layout & typography scales (không đổi giữa sáng/tối)
    spacing: typeof spacing;
    radii: typeof radii;
    typography: typeof typography;
    fontWeights: typeof fontWeights;

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

        // Tabs
        tabs: {
            background: colors.gray[75], // Cập nhật từ gray[80] → gray[75]
            backgroundActive: colors.primary[500],
            text: colors.gray[500],
            textActive: colors.white,
            border: colors.gray[100],
        },
    },

    shadows,
    zIndex,
    spacing,
    radii,
    typography,
    fontWeights,
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

        // Tabs
        tabs: {
            background: colors.gray[800],
            backgroundActive: colors.primary[500],
            text: colors.gray[400],
            textActive: colors.white,
            border: colors.gray[700],
        },
    },

    shadows,
    zIndex,
    spacing,
    radii,
    typography,
    fontWeights,
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
