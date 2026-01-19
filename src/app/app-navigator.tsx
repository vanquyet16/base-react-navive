/**
 * APP NAVIGATOR
 * =============
 * Navigation setup với React Navigation.
 * Auth-aware navigation: switch giữa Auth stack và Main stack.
 *
 * @senior-pattern Auth-aware navigation với type-safe routes
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsAuthenticated } from '@/store/selectors';
import { ROUTES, ROOT_STACKS } from '@/constants/routes';
import { AppText, ScreenContainer } from '@/components';
import { LoginScreen } from '@/features/auth';

/**
 * Root Stack Param List
 * Include both stack names và actual screen names cho type-safety
 */
type RootStackParamList = {
  // Stack names
  [ROOT_STACKS.AUTH_STACK]: undefined;
  [ROOT_STACKS.MAIN_STACK]: undefined;

  // Actual screen names
  [ROUTES.AUTH.LOGIN]: undefined;
  [ROUTES.MAIN.HOME]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

/**
 * Placeholder screens - replace với real screens sau
 */
// const LoginScreen = () => (
//   <ScreenContainer>
//     <AppText variant='h1'>Login Screen</AppText>
//     <AppText variant='body' color='secondary'>
//       TODO: Implement login screen
//     </AppText>
//   </ScreenContainer>
// );

const HomeScreen = () => (
  <ScreenContainer>
    <AppText variant='h1'>Home Screen</AppText>
    <AppText variant='body' color='secondary'>
      Welcome! Theme system working ✅
    </AppText>
  </ScreenContainer>
);

/**
 * Auth Stack
 */
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.AUTH.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};

/**
 * Main Stack (authenticated)
 */
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.MAIN.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

/**
 * AppNavigator
 * Switch giữa Auth và Main stack based on authentication
 */
export const AppNavigator: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name={ROOT_STACKS.MAIN_STACK} component={MainStack} />
        ) : (
          <Stack.Screen name={ROOT_STACKS.AUTH_STACK} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
