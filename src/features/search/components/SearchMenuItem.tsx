/**
 * SearchMenuItem Component
 * ========================
 * Memoized component cho mỗi search result item
 *
 * Senior optimizations:
 * - React.memo để prevent unnecessary re-renders
 * - useMemo cho styles
 * - useCallback cho event handlers
 */

import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { AppIcon, CustomText } from '@/components';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

interface SearchMenuItemProps {
  /** Icon name (Feather) */
  icon: string;
  /** Menu item title */
  title: string;
  /** Optional badge text */
  badge?: string;
  /** Callback khi item được press */
  onPress: () => void;
}

/**
 * SearchMenuItem component
 * Hiển thị một item với icon, title và optional badge
 */
const SearchMenuItem: React.FC<SearchMenuItemProps> = memo(
  ({ icon, title, badge, onPress }) => {
    const theme = useTheme();
    const styles = useStyles();

    // Memoize badge style để tránh tạo object mới mỗi render
    const badgeStyle = useMemo(
      () => [styles.badge, { backgroundColor: theme.colors.error }],
      [styles.badge, theme.colors.error],
    );

    // Stable onPress handler
    const handlePress = useCallback(() => {
      onPress();
    }, [onPress]);

    return (
      <Pressable
        style={({ pressed }) => [
          styles.container,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={handlePress}
      >
        {/* Icon container */}
        <View style={styles.iconContainer}>
          <AppIcon name={icon} size={24} color={theme.colors.primary} />
        </View>

        {/* Title */}
        <CustomText variant="bodySmall" style={styles.title} numberOfLines={1}>
          {title}
        </CustomText>

        {/* Badge (nếu có) */}
        {badge && (
          <View style={badgeStyle}>
            <CustomText
              variant="caption"
              weight="semibold"
              style={styles.badgeText}
            >
              {badge}
            </CustomText>
          </View>
        )}

        {/* Chevron */}
        <AppIcon
          name="chevron-right"
          size={20}
          color={theme.colors.textTertiary}
        />
      </Pressable>
    );
  },
);

SearchMenuItem.displayName = 'SearchMenuItem';

/**
 * Styles với responsive sizing
 */
const useStyles = createStyles(
  theme => ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: moderateVerticalScale(14),
      paddingHorizontal: scale(16),
      // backgroundColor: theme.colors.white,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
    },
    iconContainer: {
      width: scale(40),
      height: scale(40),
      borderRadius: moderateScale(20),
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: scale(12),
    },
    title: {
      flex: 1,
      // fontSize, color, fontWeight đã được set bởi variant="bodySmall"
    },
    badge: {
      paddingHorizontal: scale(8),
      paddingVertical: moderateVerticalScale(4),
      borderRadius: moderateScale(4),
      marginRight: scale(8),
    },
    badgeText: {
      color: theme.colors.white,
      // fontSize và fontWeight đã được set bởi variant="caption" + weight="semibold"
    },
  }),
  true,
);

export default SearchMenuItem;
