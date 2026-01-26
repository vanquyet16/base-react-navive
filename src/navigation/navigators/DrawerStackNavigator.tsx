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
 *
 * @senior-pattern Separation of concerns và type-safe navigation
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerStackParamList } from '@/shared/types';
import { MainStackNavigator } from './MainStackNavigator';

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
      <DrawerStack.Screen
        name="MainTabs"
        component={MainStackNavigator}
        initialParams={{ screen: 'MainTabs' }}
      />

      <DrawerStack.Screen
        name="ProductScreen"
        component={MainStackNavigator}
        initialParams={{ screen: 'ProductScreen' }}
      />

      <DrawerStack.Screen
        name="LazyDemoScreen"
        component={MainStackNavigator}
        initialParams={{ screen: 'LazyDemoScreen' }}
      />

      <DrawerStack.Screen
        name="ApiLazyDemoScreen"
        component={MainStackNavigator}
        initialParams={{ screen: 'ApiLazyDemoScreen' }}
      />

      <DrawerStack.Screen
        name="CacheDemoScreen"
        component={MainStackNavigator}
        initialParams={{ screen: 'CacheDemoScreen' }}
      />

      <DrawerStack.Screen
        name="PdfDemoScreen"
        component={MainStackNavigator}
        initialParams={{ screen: 'PdfDemoScreen' }}
      />

      <DrawerStack.Screen
        name="PerformanceDemoScreen"
        component={MainStackNavigator}
        initialParams={{ screen: 'PerformanceDemoScreen' }}
      />

      <DrawerStack.Screen
        name="ResponsiveDemoScreen"
        component={MainStackNavigator}
        initialParams={{ screen: 'ResponsiveDemoScreen' }}
      />
    </DrawerStack.Navigator>
  );
};
