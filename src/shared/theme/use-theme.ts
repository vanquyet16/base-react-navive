/**
 * USE THEME
 * =========
 * Theme hiện hành = lựa chọn của người dùng (settings) hoặc theo hệ điều hành khi chọn 'system'.
 * Tự cập nhật khi người dùng đổi chế độ sáng/tối của máy.
 */

import { useColorScheme } from 'react-native';
import { useThemeMode } from '@/shared/store/selectors';
import type { ThemeMode } from '@/shared/types/common';
import { getTheme, type Theme, type ThemeName } from './theme';

export const resolveThemeName = (mode: ThemeMode, systemScheme: string | null | undefined): ThemeName => {
    if (mode === 'system') {
        return systemScheme === 'dark' ? 'dark' : 'light';
    }
    return mode;
};

export const useTheme = (): Theme => {
    const mode = useThemeMode();
    const systemScheme = useColorScheme();
    return getTheme(resolveThemeName(mode, systemScheme));
};

export const useIsDarkMode = (): boolean => useTheme().isDark;
