/**
 * MAIN DRAWER NAVIGATOR
 * =====================
 * Quản lý Side Menu Drawer của ứng dụng.
 * Bọc trực tiếp MainStackNavigator mà không qua tầng trung gian nào,
 * tối ưu hiệu năng và làm phẳng cây điều hướng (Flat Navigation Hierarchy).
 */

import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerParamList } from '@/shared/types/navigation.types';
import { NAVIGATION_KEYS } from '@/navigation/config/navigationConfig';
import { MainStackNavigator } from './MainStackNavigator';
import CustomDrawer from '@/components/navigation/CustomDrawer';

const Drawer = createDrawerNavigator<DrawerParamList>();

const renderDrawerContent = (props: DrawerContentComponentProps) => (
  <CustomDrawer {...props} />
);

/**
 * Main Drawer Navigator Component
 */
export const MainDrawer: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName={NAVIGATION_KEYS.ROOT.MAIN_STACK}
      drawerContent={renderDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '80%',
        },
        drawerType: 'front',
        overlayColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <Drawer.Screen
        name={NAVIGATION_KEYS.ROOT.MAIN_STACK}
        component={MainStackNavigator}
      />
    </Drawer.Navigator>
  );
};
