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
import { TAB_SCREENS, NAVIGATION_KEYS } from './config';

const Tab = createBottomTabNavigator<MainTabParamList>();

// ============================================================================
// TẠO TAB SCREEN WRAPPERS
// ============================================================================

// Tạo các wrapper đặc biệt cho các tab chính với MainLayout
const HomeScreenWrapper: React.FC = () => {
  // Xử lý tìm kiếm
  const handleSearch = (text: string) => {
    console.log('Tìm kiếm:', text);
  };

  // Xử lý thông báo
  const handleNotificationPress = () => {
    console.log('Thông báo được nhấn');
  };

  return (
    <MainLayout
      showHeader={true}
      showTabs={false} // Tabs được quản lý bởi Tab.Navigator
      headerProps={{
        title: 'Trang chủ',
        subtitle: 'Chào mừng trở lại!',
        showProfile: true,
        showSearch: true,
        showNotification: true,
        showMenu: true,
        onSearch: handleSearch,
        onNotificationPress: handleNotificationPress,
        notificationCount: 3,
      }}>
      <LazyScreen component={() => import('@/screens/main/HomeScreen')} />
    </MainLayout>
  );
};

// Wrapper cho Profile screen
const ProfileScreenWrapper: React.FC = () => (
  <MainLayout
    showHeader={true}
    showTabs={false}
    headerProps={{
      title: 'Hồ sơ',
      type: 'minimal',
      showMenu: true,
    }}>
    <LazyScreen component={() => import('@/screens/main/ProfileScreen')} />
  </MainLayout>
);

// Wrapper cho Settings screen
const SettingsScreenWrapper: React.FC = () => (
  <MainLayout
    showHeader={true}
    showTabs={false}
    headerProps={{
      title: 'Cài đặt',
      type: 'minimal',
      showMenu: true,
    }}>
    <LazyScreen component={() => import('@/screens/main/SettingsScreen')} />
  </MainLayout>
);

// Wrapper cho ResponsiveDemo screen
const ResponsiveDemoWrapper: React.FC = () => (
  <MainLayout
    showHeader={true}
    showTabs={false}
    headerProps={{
      title: 'Responsive Demo',
      type: 'minimal',
      showMenu: true,
    }}>
    <LazyScreen component={() => import('@/screens/example/ResponsiveDemoScreen')} />
  </MainLayout>
);

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
      {/* Home Tab - Trang chủ */}
      <Tab.Screen
        name={NAVIGATION_KEYS.TAB.HOME}
        component={HomeScreenWrapper}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => <Icon name='home' size={size} color={color} />,
        }}
      />

      {/* Profile Tab - Hồ sơ */}
      <Tab.Screen
        name={NAVIGATION_KEYS.TAB.PROFILE}
        component={ProfileScreenWrapper}
        options={{
          tabBarLabel: 'Hồ sơ',
          tabBarIcon: ({ color, size }) => <Icon name='person' size={size} color={color} />,
        }}
      />

      {/* Settings Tab - Cài đặt */}
      <Tab.Screen
        name={NAVIGATION_KEYS.TAB.SETTINGS}
        component={SettingsScreenWrapper}
        options={{
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({ color, size }) => <Icon name='settings' size={size} color={color} />,
        }}
      />

      {/* Responsive Demo Tab - Demo responsive */}
      <Tab.Screen
        name={NAVIGATION_KEYS.TAB.RESPONSIVE_DEMO}
        component={ResponsiveDemoWrapper}
        options={{
          tabBarLabel: 'Responsive',
          tabBarIcon: ({ color, size }) => <Icon name='aspect-ratio' size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
