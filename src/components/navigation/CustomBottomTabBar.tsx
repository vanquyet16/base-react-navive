import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import type { MainTabParamList } from '@/shared/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

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

  const baseStyles = useBaseStyles();

  return (
    <SafeAreaView edges={['bottom']} style={baseStyles.container}>
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

          const styles = useStyles({ isActive: isFocused });
          const color = isFocused
            ? theme.colors.primary
            : theme.colors.textSecondary;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={() => onTabPress(route, isFocused)}
              onLongPress={() => onTabLongPress(route.key)}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.tabContent,
                  {
                    transform: [{ scale: isFocused ? 1.1 : 1 }],
                  },
                ]}
              >
                <View style={styles.iconContainer}>
                  {IconComponent &&
                    IconComponent({ focused: isFocused, color, size: 24 })}

                  {/* Badge */}
                  {!!badgeCount && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {typeof badgeCount === 'number' && badgeCount > 99
                          ? '99+'
                          : badgeCount}
                      </Text>
                    </View>
                  )}
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
              </Animated.View>

              {/* Active indicator */}
              {isFocused && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default memo(CustomBottomTabBar);

// Base styles không phụ thuộc vào props
const useBaseStyles = createStyles(
  theme => ({
    container: {
      backgroundColor: theme.colors.background,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      borderTopLeftRadius: moderateScale(40),
      borderTopRightRadius: moderateScale(40),

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: moderateVerticalScale(-3),
      },
      shadowOpacity: 0.08,
      shadowRadius: moderateScale(6),
      elevation: 6,
      borderTopWidth: 0,
      paddingBottom: 0,
    },

    tabsContainer: {
      flexDirection: 'row',
      height: moderateVerticalScale(50),
      paddingHorizontal: scale(8),

      backgroundColor: 'transparent',

      paddingBottom: moderateVerticalScale(10),
    },
  }),
  true,
);

// Styles phụ thuộc vào props (isActive)
const useStyles = createStyles<
  {
    tab: ViewStyle;
    tabContent: ViewStyle;
    iconContainer: ViewStyle;
    tabLabel: TextStyle;
    activeTabLabel: TextStyle;
    activeIndicator: ViewStyle;
    badge: ViewStyle;
    badgeText: TextStyle;
  },
  { isActive: boolean }
>(
  (theme, props) => ({
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
      marginTop: '40%',
      marginBottom: moderateVerticalScale(4),

      position: 'relative',

      width: scale(32),
      height: scale(32),

      justifyContent: 'center',
      alignItems: 'center',
    },

    tabLabel: {
      fontSize: moderateScale(10),

      fontWeight: props.isActive ? '700' : '500',
      textAlign: 'center',

      color: props.isActive
        ? theme.colors.primary
        : theme.colors.textSecondary ?? theme.colors.text,

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
      fontSize: moderateScale(10),
      fontWeight: '700',
      lineHeight: moderateScale(12),
    },
  }),
  true,
);
