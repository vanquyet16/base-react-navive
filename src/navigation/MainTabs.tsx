/**
 * MAIN TABS NAVIGATOR - BOTTOM TABS NAVIGATION
 * ============================================
 * Bottom Tabs Navigator chính của ứng dụng.
 * Triển khai theo mô hình Declarative Navigator chuẩn React Navigation v7.
 */

import React, { useCallback, memo } from 'react';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { AppIcon, type IconType } from '@/components';
import { MainTabParamList } from '@/shared/types/navigation.types';
import { CustomBottomTabBar } from '@/components/navigation';
import { useTheme } from '@/shared/theme/use-theme';
import { MainLayout, AppHeader } from '@/components/layout';
import { NAVIGATION_KEYS } from '@/navigation/config/navigationConfig';

// Feature screens — import qua feature barrel
import { HomeScreen } from '@/features/home';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Ảnh nền header dùng chung
const HEADER_BG = require('@/assets/images/imgbgrheader.jpg');

// ============================================================================
// TAB SCREEN WRAPPERS (MEMOIZED)
// ============================================================================

/**
 * Tab Home: Header "Trang chủ" + menu
 */
const HomeTabScreen: React.FC = memo(() => {
  return (
    <MainLayout
      enableScroll={true}
      headerNode={
        <AppHeader
          title="Trang chủ"
          subtitle="Cổng dịch vụ thông minh"
          leftAction="menu"
          backgroundImage={HEADER_BG}
        />
      }
    >
      <HomeScreen />
    </MainLayout>
  );
});
HomeTabScreen.displayName = 'HomeTabScreen';

interface TabBarIconProps {
  name: string;
  type?: IconType;
  color: string;
  size: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = memo(({ name, type, color, size }) => (
  <AppIcon name={name} size={size} color={color} type={type} />
));
TabBarIcon.displayName = 'TabBarIcon';

const renderHomeIcon = ({ color, size }: { color: string; size: number }) => (
  <TabBarIcon name="home" type="feather" color={color} size={size} />
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const MainTabs: React.FC = () => {
  const theme = useTheme();

  const renderTabBar = useCallback(
    (props: BottomTabBarProps) => <CustomBottomTabBar {...props} />,
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
      {/* 1. Trang chủ */}
      <Tab.Screen
        name={NAVIGATION_KEYS.TAB.HOME}
        component={HomeTabScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: renderHomeIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
