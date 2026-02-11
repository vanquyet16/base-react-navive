// ============================================================================
// MAIN TABS NAVIGATOR - BOTTOM TABS NAVIGATION
// ============================================================================

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppIcon } from '@/components';
import { MainTabParamList } from '@/shared/types/navigation.types';
import { CustomBottomTabBar } from '@/components/navigation';
import { logger } from '@/shared/utils/logger';
import { TAB_SCREENS } from './config';
import { createTabScreenWrappers } from './factories/screenFactory';
import { useTheme } from '@/shared/theme/use-theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Logger instance cho MainTabs
 */
const tabLogger = logger;

/**
 * Tạo tab wrappers từ config
 * Memoized để tránh tạo lại mỗi lần render
 */
const TAB_WRAPPERS = createTabScreenWrappers(TAB_SCREENS);

// ============================================================================
// MAIN TABS COMPONENT
// ============================================================================

/**
 * MainTabs - Bottom tabs navigation chính
 *
 * Chức năng:
 * - Hiển thị 4 tabs chính: Home, Profile, Settings, ResponsiveDemo
 * - Custom tab bar với styling riêng
 * - Mỗi tab có wrapper riêng với MainLayout
 * - Error handling cho missing wrappers
 *
 * Cấu trúc:
 * - Home: Trang chủ với search và notification
 * - Profile: Hồ sơ người dùng
 * - Settings: Cài đặt ứng dụng
 * - ResponsiveDemo: Demo responsive design
 */
// ... imports
import { useCallback } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { IconType } from '@/components/base/AppIcon';

// ... const Tab = ...

const MainTabs: React.FC = () => {
  const theme = useTheme(); // Hook usage

  const renderTabBar = useCallback(
    (props: BottomTabBarProps) => <CustomBottomTabBar {...props} />, // Changed component
    [],
  );

  const renderIcon = useCallback(
    (iconName: string, iconType?: IconType) =>
      ({ color, size }: { color: string; size: number }) =>
        <AppIcon name={iconName} size={size} color={color} type={iconType} />,
    [],
  );

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      {TAB_SCREENS.map(cfg => {
        const tabName = cfg.name as keyof MainTabParamList;
        const Wrapper = TAB_WRAPPERS[tabName];

        // Error handling: Log nếu wrapper không tìm thấy
        if (!Wrapper) {
          tabLogger.error('Tab wrapper not found', {
            tabName,
            availableWrappers: Object.keys(TAB_WRAPPERS),
          });
          return null;
        }

        return (
          <Tab.Screen
            key={tabName}
            name={tabName}
            component={Wrapper}
            options={{
              tabBarLabel: cfg.title,
              tabBarIcon: renderIcon(cfg.icon, cfg.iconType),
              tabBarBadge: cfg.badge,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default MainTabs;
