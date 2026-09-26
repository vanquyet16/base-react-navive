/**
 * MAIN DRAWER NAVIGATOR
 * =====================
 * Drawer bọc MainStack. Vuốt mở drawer chỉ bật khi đang ở màn tab gốc — các màn chi tiết đẩy vào
 * MainStack sẽ không bị vuốt nhầm mở menu (xung đột với cử chỉ back).
 */

import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createDrawerNavigator, type DrawerContentComponentProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '@/shared/types/navigation.types';
import { useTheme } from '@/shared/theme/use-theme';
import { useResponsiveSize } from '@/shared/hooks/useResponsiveSize';
import { NAVIGATION_KEYS } from '@/navigation/config/navigationConfig';
import CustomDrawer from '@/navigation/components/CustomDrawer';
import { MainStackNavigator } from './MainStackNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

const renderDrawerContent = (props: DrawerContentComponentProps) => <CustomDrawer {...props} />;

export const MainDrawer: React.FC = () => {
  const theme = useTheme();
  const rs = useResponsiveSize();

  return (
    <Drawer.Navigator
      initialRouteName={NAVIGATION_KEYS.DRAWER.MAIN_STACK}
      drawerContent={renderDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: rs.isTablet && rs.isLandscape ? 'permanent' : 'front',
        drawerStyle: {
          // Phone: 80% màn hình; tablet: cố định để không chiếm quá nhiều diện tích
          width: rs.isTablet ? Math.min(rs.wp(40), 360) : rs.wp(80),
          backgroundColor: theme.colors.surface,
        },
        overlayColor: theme.colors.backdrop,
      }}
    >
      <Drawer.Screen
        name={NAVIGATION_KEYS.DRAWER.MAIN_STACK}
        component={MainStackNavigator}
        options={({ route }) => ({
          swipeEnabled:
            (getFocusedRouteNameFromRoute(route) ?? NAVIGATION_KEYS.MAIN_STACK.MAIN_TABS) ===
            NAVIGATION_KEYS.MAIN_STACK.MAIN_TABS,
        })}
      />
    </Drawer.Navigator>
  );
};
