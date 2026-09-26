/**
 * MAIN TABS NAVIGATOR
 * ===================
 * Bottom tabs của luồng đã đăng nhập. Chỉ khai báo route — layout/header do từng màn hình tự quản.
 */

import React from 'react';
import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import AppIcon from '@/components/base/AppIcon';
import CustomBottomTabBar from '@/components/navigation/CustomBottomTabBar';
import type { MainTabParamList } from '@/shared/types/navigation.types';
import { useTheme } from '@/shared/theme/use-theme';
import { NAVIGATION_KEYS } from '@/navigation/config/navigationConfig';
import { HomeScreen } from '@/features/home';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <CustomBottomTabBar {...props} />;

const renderHomeIcon = ({ color, size }: { color: string; size: number }) => (
  <AppIcon name="home" type="feather" color={color} size={size} />
);

export const MainTabsNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      <Tab.Screen
        name={NAVIGATION_KEYS.TAB.HOME}
        component={HomeScreen}
        options={{ tabBarLabel: 'Trang chủ', tabBarIcon: renderHomeIcon }}
      />
    </Tab.Navigator>
  );
};
