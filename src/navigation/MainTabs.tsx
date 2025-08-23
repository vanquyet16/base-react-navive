// ============================================================================
// MAIN TABS NAVIGATOR - BOTTOM TABS NAVIGATION
// ============================================================================

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainLayout from '@/components/layout/MainLayout';
import { COLORS } from '@/shared/constants';
import { LazyScreen } from '@/shared/components';
import { MainTabParamList } from '@/shared/types';
import { CustomTabBar } from '@/components/navigation';
import { NAVIGATION_KEYS, TAB_SCREENS } from './config';
import { createTabScreenWrappers } from './factories/screenFactory';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Dùng factory chung để tạo tất cả tab wrappers (tận dụng createTabScreenWrapper)
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
 *
 * Cấu trúc:
 * - Home: Trang chủ với search và notification
 * - Profile: Hồ sơ người dùng
 * - Settings: Cài đặt ứng dụng
 * - ResponsiveDemo: Demo responsive design
 */
const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={CustomTabBar} // Sử dụng custom tab bar
      screenOptions={{
        headerShown: false, // Ẩn header mặc định (sử dụng MainLayout header)
        // Màu sắc cho tab icons
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
      }}>
      {TAB_SCREENS.map(cfg => {
        const Wrapper = TAB_WRAPPERS[cfg.name as string];
        if (!Wrapper) return null;
        return (
          <Tab.Screen
            key={cfg.name as string}
            name={cfg.name as any}
            component={Wrapper}
            options={{
              tabBarLabel: cfg.title,
              tabBarIcon: ({ color, size }) => <Icon name={cfg.icon} size={size} color={color} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default MainTabs;
