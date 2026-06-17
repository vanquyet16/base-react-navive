import React, { memo, useMemo, useEffect, useState } from 'react';
import { colors } from '@/shared/theme/tokens';
import { createStyles } from '@/shared/theme/create-styles';
import {
  moderateScale,
  moderateVerticalScale,
} from '@/shared/utils/sizeMatters';
import {
  ScrollView,
  Pressable,
  Text,
  View,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/shared/theme/use-theme';

export interface CustomTabsProps {
  tabs: { title: string }[];
  page?: number;
  onTabClick?: (tab: any, index: number) => void;
  style?: ViewStyle;
  type?: 'pill' | 'underline' | 'chip' | 'solid';
}

/**
 * CustomTabs Component
 * Standalone Tab Bar component used with CustomTabNavigator.
 * Supports "Pill", "Underline", "Chip", and "Solid" styles.
 */
export const CustomTabs = memo<CustomTabsProps>(props => {
  const { tabs, page = 0, onTabClick, style, type = 'pill' } = props;
  const styles = useStyles();
  const theme = useTheme();

  // Animation state
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useSharedValue(0);
  const MARGIN = moderateScale(3);

  // Update animation value when page changes
  useEffect(() => {
    if (type === 'solid' && containerWidth > 0 && tabs.length > 0) {
      const tabWidth = containerWidth / tabs.length;
      const targetX = page * tabWidth + MARGIN;
      translateX.value = withTiming(targetX, { duration: 300 });
    }
  }, [page, containerWidth, tabs.length, type, translateX, MARGIN]);

  // Dynamic styles based on type
  const containerTypeStyle = useMemo(
    () => ({
      marginHorizontal:
        type === 'pill' || type === 'chip' || type === 'solid'
          ? moderateVerticalScale(8)
          : 0,
      marginVertical:
        type === 'pill' || type === 'chip' || type === 'solid'
          ? moderateVerticalScale(8)
          : 0,

      borderBottomWidth: type === 'underline' ? 1 : 0,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    }),
    [type, theme.colors.border, theme.colors.background],
  );

  // Animated Style for the Solid Indicator
  const animatedIndicatorStyle = useAnimatedStyle(() => {
    if (type !== 'solid' || containerWidth === 0 || tabs.length === 0) {
      return { opacity: 0 };
    }

    const tabWidth = containerWidth / tabs.length;
    const width = tabWidth - MARGIN * 2;

    return {
      transform: [{ translateX: translateX.value }],
      width,
      opacity: 1,
    };
  });

  // Determine content component based on layout type
  // 'solid' type uses View to allow flex:1 children to share width evenly
  const isScrollable = type !== 'solid';
  const Content = isScrollable ? ScrollView : View;

  const contentProps = isScrollable
    ? {
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        contentContainerStyle: [
          styles.scrollViewContent,
          type === 'chip' && styles.chipScrollView,
          type === 'underline' && styles.underlineContainer,
        ],
      }
    : {
        style: styles.solidContainer,
        onLayout: (e: LayoutChangeEvent) =>
          setContainerWidth(e.nativeEvent.layout.width),
      };

  return (
    <View style={[styles.container, containerTypeStyle, style]}>
      <Content {...contentProps}>
        {/* Animated Background Indicator for Solid Type */}
        {type === 'solid' && (
          <Animated.View
            style={[styles.solidIndicator, animatedIndicatorStyle]}
          />
        )}

        {tabs.map((tab, i) => {
          const isActive = page === i;

          // Dynamic styles based on type
          const containerStyle = [
            styles.baseTabItem,
            // Type specific base styles
            type === 'pill' && styles.pillItem,
            type === 'chip' && styles.chipItem,
            type === 'solid' && styles.solidItem,
            type === 'underline' && styles.underlineItem,

            // Active states
            isActive && type === 'pill' && styles.pillActive,
            isActive && type === 'chip' && styles.chipActive,
            isActive && type === 'solid' && styles.solidActive,
            isActive && type === 'underline' && styles.underlineActive,

            // Inactive states
            !isActive && type === 'pill' && styles.pillInactive,
            !isActive && type === 'solid' && styles.solidInactive,
            // Chip inactive is just default base
          ];

          const textStyle = [
            styles.baseText,
            // Active text colors
            isActive && type === 'pill' && styles.pillTextActive,
            isActive && type === 'chip' && styles.chipTextActive,
            isActive && type === 'solid' && styles.solidTextActive,
            isActive && type === 'underline' && styles.underlineTextActive,

            // Inactive text colors
            !isActive && styles.textInactive,
            !isActive && type === 'chip' && styles.chipTextInactive,
          ];

          return (
            <Pressable
              key={tab.title || i}
              onPress={() => {
                if (onTabClick) {
                  onTabClick(tab, i);
                }
              }}
              style={({ pressed }) => [
                ...containerStyle,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text style={textStyle}>{tab.title}</Text>
            </Pressable>
          );
        })}
      </Content>
    </View>
  );
});

CustomTabs.displayName = 'CustomTabs';

const useStyles = createStyles(
  theme => ({
    container: {
      backgroundColor: theme.colors.background,
    },
    scrollViewContent: {
      // paddingHorizontal: moderateScale(16),
      gap: moderateScale(8),
    },
    chipScrollView: {
      paddingHorizontal: moderateScale(4),
    },
    // Solid Container (Flex Row)
    solidContainer: {
      flexDirection: 'row',
      width: '100%',
      borderRadius: moderateScale(8),
      // padding: moderateScale(4),
      backgroundColor: theme.colors.tabs.background,
      position: 'relative', // Context for absolute positioning
    },

    // Base Styles
    baseTabItem: {
      paddingHorizontal: moderateScale(16),
      paddingVertical: moderateVerticalScale(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
    baseText: {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: '500',
    },
    textInactive: {
      color: theme.colors.textSecondary,
    },

    // Pill Styles (Original)
    pillItem: {
      borderRadius: moderateScale(20),
      marginBottom: moderateVerticalScale(8),
      marginTop: moderateVerticalScale(8),
      paddingVertical: moderateVerticalScale(10),
    },
    pillActive: {
      backgroundColor: theme.colors.secondary[500], // Government Blue
    },
    pillInactive: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    pillTextActive: {
      color: theme.colors.white,
      fontWeight: '600',
    },

    // Chip Styles (Image 0 - White Active, Shadow)
    chipItem: {
      borderRadius: moderateScale(8),
      paddingVertical: moderateVerticalScale(6),
      paddingHorizontal: moderateScale(12),
    },
    chipActive: {
      backgroundColor: theme.colors.white,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    chipTextActive: {
      color: theme.colors.text,
      fontWeight: '600',
    },
    chipTextInactive: {
      color: theme.colors.textSecondary,
    },

    // Solid Styles (Image 1 - Primary Active, No Border Inactive)
    solidItem: {
      borderRadius: moderateScale(8),
      paddingVertical: moderateVerticalScale(10),

      margin: moderateScale(3),
      flex: 1, // Expand to fill if needed, though ScrollView prevents flex grow usually
      zIndex: 1, // Text above indicator
    },
    solidActive: {
      // backgroundColor: theme.colors.tabs.backgroundActive, // Moved to indicator
      backgroundColor: 'transparent',
    },
    solidInactive: {
      backgroundColor: 'transparent',
    },
    solidTextActive: {
      color: theme.colors.tabs.textActive,
      fontWeight: '600',
    },
    solidIndicator: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      marginVertical: moderateScale(3), // To match item margin vertical
      height: 'auto',
      borderRadius: moderateScale(8),
      backgroundColor: theme.colors.tabs.backgroundActive,
      zIndex: 0,
    },

    // Underline Styles
    underlineContainer: {
      // paddingHorizontal: moderateScale(16),
      backgroundColor: '#FFFF',
      width: '100%',
    },
    underlineItem: {
      paddingVertical: moderateVerticalScale(12),
    },
    underlineActive: {
      borderBottomWidth: 3,
      borderBottomColor: theme.colors.secondary[500],
    },
    underlineTextActive: {
      color: theme.colors.tabs.textActive[500],
      fontWeight: '600',
    },
  }),
  true,
);
