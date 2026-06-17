import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Platform,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import type { MainTabParamList } from '@/shared/types/navigation.types';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import CustomBadge from '../base/CustomBadge';

type TabRoute = {
  key: string;
  name: keyof MainTabParamList;
  params: MainTabParamList[keyof MainTabParamList];
};

const CustomBottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const theme = useTheme();
  const styles = useStyles();
  const tabRoutes = state.routes as unknown as TabRoute[];

  const typedNavigate = useCallback(
    (routeName: keyof MainTabParamList) => {
      // `BottomTabBarProps['navigation']` không generic theo ParamList trong version này,
      // nên ta tạo wrapper type-safe cho `MainTabParamList`.
      (
        navigation as unknown as {
          navigate: (name: keyof MainTabParamList) => void;
        }
      ).navigate(routeName);
    },
    [navigation],
  );

  const onTabPress = useCallback(
    (route: TabRoute, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        typedNavigate(route.name);
      }
    },
    [navigation, typedNavigate],
  );

  const onTabLongPress = useCallback(
    (routeKey: string) => {
      navigation.emit({
        type: 'tabLongPress',
        target: routeKey,
      });
    },
    [navigation],
  );

  const insets = useSafeAreaInsets();
  const baseStyles = useBaseStyles({ bottomInset: insets.bottom });

  return (
    <View style={baseStyles.container}>
      <View style={baseStyles.tabsContainer}>
        {tabRoutes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : typeof options.title === 'string'
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          // Lấy icon từ options
          const IconComponent = options.tabBarIcon;
          const badgeCount = options.tabBarBadge;

          const color = isFocused
            ? theme.colors.primary
            : theme.colors.textSecondary;

          // Custom styles for middle button (index 2)
          const isMiddleButton = index === 2; // Assuming 5 tabs, index 2 is middle

          if (isMiddleButton) {
            return (
              <Pressable
                key={route.key}
                style={({ pressed }) => [
                  styles.tab,
                  styles.middleTab,
                  { opacity: pressed ? 0.9 : 1 },
                ]}
                onPress={() => onTabPress(route, isFocused)}
                onLongPress={() => onTabLongPress(route.key)}
              >
                <View style={styles.middleIconContainer}>
                  {IconComponent &&
                    IconComponent({
                      focused: isFocused,
                      color: theme.colors.white, // Always white icon for middle button
                      size: 24,
                    })}
                </View>
                {/* No label for middle button */}
              </Pressable>
            );
          }

          return (
            <Pressable
              key={route.key}
              style={({ pressed }) => [
                styles.tab,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => onTabPress(route, isFocused)}
              onLongPress={() => onTabLongPress(route.key)}
            >
              <View
                style={[
                  styles.tabContent,
                  {
                    transform: [{ scale: isFocused ? 1.05 : 1 }],
                  },
                ]}
              >
                <View style={styles.iconContainer}>
                  <CustomBadge>
                    {IconComponent &&
                      IconComponent({
                        focused: isFocused,
                        color,
                        size: 24,
                      })}
                  </CustomBadge>
                </View>

                <Text
                  style={[
                    styles.tabLabel,
                    { color },
                    isFocused && styles.activeTabLabel,
                  ]}
                  numberOfLines={1}
                >
                  {label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default memo(CustomBottomTabBar);

// Base styles không phụ thuộc vào props
const useBaseStyles = createStyles<
  {
    container: ViewStyle;
    tabsContainer: ViewStyle;
  },
  { bottomInset: number }
>(
  (theme, props) => ({
    container: {
      backgroundColor: theme.colors.white,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: moderateVerticalScale(-3),
      },
      shadowOpacity: 0.08,
      shadowRadius: moderateScale(6),
      elevation: 6,
      borderTopWidth: 0,
      paddingBottom: props.bottomInset,
    },

    tabsContainer: {
      flexDirection: 'row',
      height: Platform.OS === 'ios' ? moderateVerticalScale(62) : moderateVerticalScale(62),
      paddingHorizontal: scale(8),

      backgroundColor: 'transparent',
    },
  }),
  true,
);

// Styles của CustomBottomTabBar
const useStyles = createStyles(
  theme => ({
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

      paddingVertical: moderateVerticalScale(4),

      position: 'relative',
    },

    tabContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    iconContainer: {
      marginTop: moderateVerticalScale(4),
      marginBottom: moderateVerticalScale(4),

      position: 'relative',

      width: scale(32),
      height: scale(32),

      justifyContent: 'center',
      alignItems: 'center',
    },

    tabLabel: {
      fontSize: theme.typography.fontSizes['2xs'],

      fontWeight: '500',
      textAlign: 'center',

      color: theme.colors.textSecondary ?? theme.colors.text,

      // ✅ giúp text cân hơn trên Android
      lineHeight: moderateScale(12),
    },

    activeTabLabel: {
      fontWeight: '700',
      color: theme.colors.primary,
    },

    activeIndicator: {
      display: 'none',
    },

    badge: {
      position: 'absolute',
      top: moderateVerticalScale(-2),
      right: scale(-6),
      backgroundColor: theme.colors.error,
      borderRadius: moderateScale(10),
      minWidth: scale(16),
      height: scale(16),

      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(4),

      borderWidth: 1,
      borderColor: theme.colors.background,
    },

    badgeText: {
      color: '#FFFFFF',
      fontSize: theme.typography.fontSizes['2xs'],
      fontWeight: '700',
      lineHeight: moderateScale(12),
    },

    // Middle Button Styles
    middleTab: {
      justifyContent: 'flex-start', // Align to top
      paddingVertical: 0,
    },
    middleIconContainer: {
      width: scale(50),
      height: scale(50),
      borderRadius: scale(50),
      backgroundColor: theme.colors.primary, // Blue background
      justifyContent: 'center',
      alignItems: 'center',
      // Lift it up
      marginTop: moderateVerticalScale(-10),
      // Shadow
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 10,
      borderWidth: 2,
      borderColor: theme.colors.background, // Match container bg to create gap effect
    },
  })
);
