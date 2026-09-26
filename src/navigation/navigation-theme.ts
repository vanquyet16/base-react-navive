/**
 * NAVIGATION THEME
 * ================
 * Ánh xạ theme của app sang theme React Navigation: nền màn hình, header, tab bar đúng màu
 * sáng/tối, không nháy trắng khi chuyển màn.
 */

import { DarkTheme, DefaultTheme, type Theme as NavigationTheme } from '@react-navigation/native';
import type { Theme } from '@/shared/theme/theme';

export const toNavigationTheme = (theme: Theme): NavigationTheme => {
  const base = theme.isDark ? DarkTheme : DefaultTheme;
  return {
    ...base,
    dark: theme.isDark,
    colors: {
      ...base.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.error,
    },
  };
};
