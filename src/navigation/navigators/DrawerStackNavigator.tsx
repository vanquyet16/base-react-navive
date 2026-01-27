/**
 * DRAWER STACK NAVIGATOR
 * =======================
 * Stack navigator chứa các screens trong drawer.
 * Được wrap bởi DrawerNavigator để có drawer UI.
 *
 * Pattern:
 * - DrawerStack chứa MainStack và các screens khác trong drawer
 * - Type-safe với DrawerStackParamList
 * - Separation of concerns: drawer UI (DrawerNavigator) vs drawer content (DrawerStackNavigator)
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerStackParamList } from '@/shared/types';
import { MainStackNavigator } from './MainStackNavigator';
import { NAVIGATION_KEYS } from '@/navigation/config';

/**
 * Drawer Stack Navigator instance
 * Typed với DrawerStackParamList cho type safety
 */
const DrawerStack = createStackNavigator<DrawerStackParamList>();

/**
 * Drawer Stack Navigator Component
 *
 * Chứa các screens trong drawer:
 * - MainStack: Main application flow (nested navigator)
 *
 * Features:
 * - Type-safe navigation
 * - Header hidden (handled by MainStack)
 * - Initial route là MainStack
 *
 * @example
 * // Sử dụng trong DrawerNavigator
 * <Drawer.Screen name="DrawerStack" component={DrawerStackNavigator} />
 */
export const DrawerStackNavigator: React.FC = () => {
  return (
    <DrawerStack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* 
        Sử dụng NAVIGATION_KEYS.DRAWER_STACK để tạo dynamic screens 
        Giúp dễ dàng maintain và mở rộng
      */}
      {Object.entries(NAVIGATION_KEYS.DRAWER_STACK).map(([key, routeName]) => (
        <DrawerStack.Screen
          key={key}
          name={routeName as keyof DrawerStackParamList}
          component={MainStackNavigator}
          initialParams={{ screen: routeName }}
        />
      ))}
    </DrawerStack.Navigator>
  );
};
