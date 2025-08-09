// ============================================================================
// DRAWER NAVIGATOR - NAVIGATION VỚI MENU BÊN
// ============================================================================

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStack from './MainStack';
import CustomDrawer from '@/components/navigation/CustomDrawer';
import { COLORS } from '@/shared/constants';
import { DrawerParamList } from '@/shared/types';
import { NAVIGATION_KEYS } from './config';

const Drawer = createDrawerNavigator<DrawerParamList>();

/**
 * DrawerNavigator - Navigation với menu bên (drawer)
 *
 * Chức năng:
 * - Hiển thị menu bên khi ấn vào hamburger icon
 * - Chứa MainStack (bao gồm MainTabs và các screens khác)
 * - Custom drawer content với styling riêng
 *
 * Cấu hình:
 * - Disable swipe gesture (chỉ mở qua menu button)
 * - Custom drawer style và colors
 * - Custom drawer content component
 */
const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawer props={props} />}
      screenOptions={{
        headerShown: false, // Ẩn header mặc định
        // Disable swipe gesture để chỉ mở drawer qua menu button
        swipeEnabled: false,
        // Disable edge swipe gesture
        swipeEdgeWidth: 0,
        // Disable keyboard dismiss khi mở drawer
        keyboardDismissMode: 'none',
        // Cấu hình style cho drawer
        drawerStyle: {
          width: 280, // Chiều rộng drawer
          backgroundColor: COLORS.background,
        },
        // Màu sắc cho drawer items
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.textSecondary,
        // Style cho drawer labels
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
      }}>
      {/* MainStack - Chứa tất cả screens chính */}
      <Drawer.Screen
        name='MainStack'
        component={MainStack}
        options={{
          drawerLabel: 'Trang chủ', // Label hiển thị trong drawer
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
