/**
 * APP NAVIGATOR
 * =============
 * Navigation setup với React Navigation.
 * Auth-aware navigation: switch giữa Auth stack và Main stack.
 *
 * @senior-pattern Auth-aware navigation với type-safe routes và separation of concerns
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsAuthenticated } from '@/shared/store/selectors';
import { ROOT_STACKS } from '@/shared/constants/routes';
import {
  AuthStackNavigator,
  MainStackNavigator,
} from '@/navigation/navigators';

/**
 * Root Stack Param List
 * Chỉ chứa stack names cho root navigator
 */
type RootStackParamList = {
  [ROOT_STACKS.AUTH_STACK]: undefined;
  [ROOT_STACKS.MAIN_STACK]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

/**
 * AppNavigator
 *
 * Mục đích:
 * - Root navigator của toàn bộ app
 * - Auto-switch giữa Auth và Main stack based on authentication status
 * - Clean code với dedicated navigator components
 *
 * Flow:
 * 1. Check authentication status từ store
 * 2. Nếu authenticated -> hiển thị MainStackNavigator
 * 3. Nếu chưa authenticated -> hiển thị AuthStackNavigator
 *
 * @senior-pattern Separation of concerns
 * - Root navigator chỉ lo routing logic
 * - Stack navigators được define riêng trong navigators/ folder
 * - Config-driven approach cho scalability
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
          <Stack.Screen
            name={ROOT_STACKS.MAIN_STACK}
            component={MainStackNavigator}
          />
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
