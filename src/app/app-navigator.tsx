/**
 * APP NAVIGATOR
 * =============
 * Root stack chuyển giữa Auth và Drawer theo trạng thái phiên (SessionManager quản lý).
 * Conditional screens (React Navigation v7): đăng xuất tự gỡ toàn bộ màn hình đã đăng nhập.
 */

import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useIsAuthenticated } from '@/shared/store/selectors';
import { useTheme } from '@/shared/theme/use-theme';
import type { RootStackParamList } from '@/shared/types/navigation.types';
import { AuthStackNavigator, MainDrawer } from '@/navigation/navigators';
import { NAVIGATION_KEYS } from '@/navigation/config/navigationConfig';
import { navigationRef } from '@/navigation/navigation-ref';
import { linking } from '@/navigation/linking';
import { toNavigationTheme } from '@/navigation/navigation-theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const theme = useTheme();
  const navigationTheme = useMemo(() => toNavigationTheme(theme), [theme]);

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme} linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name={NAVIGATION_KEYS.ROOT.DRAWER} component={MainDrawer} />
        ) : (
          <Stack.Screen name={NAVIGATION_KEYS.ROOT.AUTH_STACK} component={AuthStackNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
