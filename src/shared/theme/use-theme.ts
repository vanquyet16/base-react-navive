/**
 * USE THEME HOOK
 * ==============
 * Hook để access current theme trong components.
 * Integrates với Zustand store cho theme switching.
 * 
 * @senior-pattern Theme hook với type-safe access
 */

import { useAppStore } from '../store/app-store';
import { settingsSelectors } from '../store/settings-store';
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
    const themeName = useAppStore(settingsSelectors.theme);
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
