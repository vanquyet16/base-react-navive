/**
 * USE THEME HOOK
 * ==============
 * Hook để access current theme trong components.
 * Integrates với Zustand store cho theme switching.
 * 
 */

import { useTheme as useStoreTheme } from '@/shared/store/selectors';
import { getTheme, type Theme } from './theme';

/**
 * useTheme Hook
 * Returns current theme object based on store state
 * 
 * @example
 * const theme = useTheme();
 * const { colors, spacing } = theme;
 */
export const useTheme = (): Theme => {
    const themeName = useStoreTheme();
    return getTheme(themeName);
};

/**
 * useIsDarkMode Hook
 * Convenience hook để check dark mode
 */
export const useIsDarkMode = (): boolean => {
    const theme = useTheme();
    return theme.isDark;
};
