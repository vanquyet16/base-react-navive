/**
 * APP NAVIGATOR
 * =============
 * Navigation setup với React Navigation.
 * Auth-aware navigation: switch giữa Auth stack và Drawer navigator.
 *
 * Pattern:
 * - Navigators được tạo trong dedicated files (navigators/)
 * - app-navigator chỉ chứa root switching logic
 * - Clean, concise, dễ maintain
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsAuthenticated } from '@/shared/store/selectors';
import { ROOT_STACKS } from '@/shared/constants/routes';
import { RootStackParamList } from '@/shared/types/navigation.types';
import { AuthStackNavigator, MainDrawer } from '@/navigation/navigators';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * AppNavigator - Root Navigation Component
 *
 * Chức năng:
 * - Switch giữa Auth Stack và Drawer Stack dựa trên authentication state
 * - AuthStack: Chứa Login, Register screens
 * - Drawer: Chứa MainStack và Menu
 *
 * Pattern:
 * - Sử dụng useIsAuthenticated hook để get authentication state
 * - Conditional rendering based on auth state
 * - Sử dụng MainDrawer khi authenticated
 *
 * @returns Root navigation container
 */
export const AppNavigator: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <NavigationContainer>
      <Stack.Navigator
        id="RootNavigator"
        screenOptions={{ headerShown: false }}
      >
        {isAuthenticated ? (
          <Stack.Screen name={ROOT_STACKS.DRAWER} component={MainDrawer} />
        ) : (
          <Stack.Screen
            name={ROOT_STACKS.AUTH_STACK}
            component={AuthStackNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
