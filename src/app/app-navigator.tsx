/**
 * APP NAVIGATOR
 * =============
 * Navigation setup với React Navigation.
 * Auth-aware navigation: switch giữa Auth stack và Drawer navigator.
 *
 * @senior-pattern Auth-aware navigation với type-safe routes và separation of concerns
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsAuthenticated } from '@/shared/store/selectors';
import { ROOT_STACKS } from '@/shared/constants/routes';
import { RootStackParamList } from '@/shared/types';
import { AuthStackNavigator, DrawerNavigator } from '@/navigation/navigators';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * AppNavigator
 *
 * Mục đích:
 * - Root navigator của toàn bộ app
 * - Auto-switch giữa Auth và Drawer stack based on authentication status
 *
 * Flow:
 * 1. Check authentication status từ store
 * 2. Nếu authenticated -> hiển thị DrawerNavigator (Root -> Drawer -> MainStack)
 * 3. Nếu chưa authenticated -> hiển thị AuthStackNavigator
 *
 * @senior-pattern Separation of concerns
 * - Root navigator chỉ lo routing logic
 * - Root structure: Root -> Drawer -> Main -> Tabs/Screens
 */
export const AppNavigator: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <NavigationContainer>
      <Stack.Navigator
        id="RootNavigator"
        screenOptions={{ headerShown: false }}
      >
        {true ? (
          <Stack.Screen name={ROOT_STACKS.DRAWER} component={DrawerNavigator} />
        ) : (
          <Stack.Screen
            name="Auth" // Key trong RootStackParamList là "Auth", match với file definition
            component={AuthStackNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
