/**
 * MAIN DRAWER
 * ===========
 * Navigator xử lý side menu drawer.
 * Bao bọc DrawerStackNavigator để có drawer UI.
 *
 * Sử dụng separation of concerns pattern:
 * - MainDrawer: UI layer (drawer menu, swipe gesture)
 * - DrawerStackNavigator: Content layer (screens trong drawer)
 * - Type-safe navigation với DrawerParamList
 */

import React, { useCallback } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerParamList } from '@/shared/types/navigation.types';
import { DrawerStackNavigator } from './DrawerStackNavigator';
import CustomDrawer from '@/components/navigation/CustomDrawer';
import { ROOT_STACKS } from '@/shared/constants/routes';
import { createDrawerNavigatorComponent } from '@/navigation/factories/navigatorFactory';

/**
 * Drawer Navigator instance
 * Typed với DrawerParamList cho type safety
 */
const Drawer = createDrawerNavigator<DrawerParamList>();

/**
 * Render function cho Drawer Content
 * Được định nghĩa bên ngoài để tránh re-creation
 */
const renderDrawerContent = (props: DrawerContentComponentProps) => (
  <CustomDrawer {...props} />
);

/**
 * Drawer Navigator Component
 *
 * Chức năng:
 * - Wrap DrawerStackNavigator làm content chính
 * - Sử dụng CustomDrawerComponent để render menu
 * - Config style drawer tại đây
 *
 * Features:
 * - Type-safe navigation
 * - Custom drawer content với user info và menu items
 * - Drawer style config (width, type, overlay)
 * - Header hidden (handled by nested navigators)
 *
 * Structure:
 * - MainDrawer (UI) -> DrawerStackNavigator (Stack) -> MainStackNavigator
 *
 * @example
 * // Sử dụng trong Root Navigation
 * <Stack.Screen name="Drawer" component={MainDrawer} />
 */
export const MainDrawer = createDrawerNavigatorComponent(
  Drawer,
  {
    initialRouteName: ROOT_STACKS.DRAWER_STACK,
    drawerContent: renderDrawerContent,
    screenOptions: {
      headerShown: false,
      drawerStyle: {
        width: '80%',
      },
      drawerType: 'front', // Slide over content
      overlayColor: 'rgba(0,0,0,0.5)',
    },
  },
  // Additional screens (DrawerStackNavigator)
  [
    {
      name: ROOT_STACKS.DRAWER_STACK,
      component: DrawerStackNavigator,
      options: {
        headerShown: false,
      },
    },
  ],
);
