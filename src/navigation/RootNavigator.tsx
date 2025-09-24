// ============================================================================
// ROOT NAVIGATOR - NAVIGATOR GỐC CỦA ỨNG DỤNG
// ============================================================================

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import DrawerNavigator from './DrawerNavigator';
import { LoadingScreen } from '@/shared/components';
import { NAVIGATION_KEYS } from './config';
import { authStore } from '@/features/auth';

const Stack = createStackNavigator();

/**
 * RootNavigator - Navigator gốc của ứng dụng
 *
 * Chức năng:
 * - Quản lý trạng thái authentication
 * - Chuyển đổi giữa Auth và Drawer navigation
 * - Hiển thị loading screen khi đang kiểm tra auth
 *
 * Cấu trúc:
 * - AuthStack: Màn hình đăng nhập/đăng ký
 * - DrawerNavigator: Màn hình chính với drawer menu
 */
const RootNavigator: React.FC = () => {
  // Lấy trạng thái authentication từ store
  const { isAuthenticated, isLoading } = authStore();

  // Log trạng thái authentication cho debug
  useEffect(() => {}, [isAuthenticated, isLoading]);

  // Hiển thị loading khi đang kiểm tra authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // Đã đăng nhập -> Hiển thị DrawerNavigator (bao gồm MainStack và drawer)
          <Stack.Screen name={NAVIGATION_KEYS.ROOT.DRAWER} component={DrawerNavigator} />
        ) : (
          // Chưa đăng nhập -> Hiển thị AuthStack
          <Stack.Screen name={NAVIGATION_KEYS.ROOT.AUTH} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
