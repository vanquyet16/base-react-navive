import React, { useMemo } from 'react';
import { Tabs, TabsProps } from '@ant-design/react-native';
import { useTheme } from '@/shared/theme/use-theme';
import {
  moderateScale,
  moderateVerticalScale,
} from '@/shared/utils/sizeMatters';
import { TextStyle, ViewStyle } from 'react-native';

/**
 * CustomTabs Component
 * Wraps @ant-design/react-native Tabs with project-specific styling and theme support.
 * Optimized with React.memo and polished styles.
 *
 * @param props - Standard Ant Design Tabs props
 */
export const CustomTabs = React.memo<TabsProps>(props => {
  const theme = useTheme();

  // Memoize styles to prevent unnecessary calculations on re-render
  const styles = useMemo(() => {
    return {
      tabBarUnderlineStyle: {
        backgroundColor: theme.colors.primary,
        height: moderateVerticalScale(4), // Slightly thicker for modern look
        borderRadius: moderateScale(4), // Rounded pills look
        marginBottom: moderateVerticalScale(2), // Spacing from bottom
      } as ViewStyle,
      tabBarTextStyle: {
        fontSize: theme.typography.fontSizes.base,
        fontWeight: '600', // Semi-bold for better readability
        textTransform: 'none', // Allow natural case
        paddingVertical: moderateVerticalScale(2),
      } as TextStyle,
      tabBarStyle: {
        backgroundColor: theme.colors.backgroundTertiary, // Card background usually
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.borderLight,
        elevation: 0, // Flat design
      } as ViewStyle,
    };
  }, [theme]);

  return (
    <Tabs
      tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
      tabBarTextStyle={styles.tabBarTextStyle}
      tabBarActiveTextColor={theme.colors.primary}
      tabBarInactiveTextColor={theme.colors.textSecondary}
      tabBarBackgroundColor={theme.colors.backgroundTertiary}
      {...props}
    />
  );
});

CustomTabs.displayName = 'CustomTabs';
