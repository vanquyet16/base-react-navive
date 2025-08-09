// ============================================================================
// AUTH STACK NAVIGATOR - NAVIGATION CHO XÁC THỰC
// ============================================================================

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '@/shared/types';
import { AUTH_SCREENS, NAVIGATION_KEYS } from './config';
import { createAuthScreenWrappers } from './factories';

const Stack = createStackNavigator<AuthStackParamList>();

// ============================================================================
// TẠO AUTH SCREEN WRAPPERS
// ============================================================================

// Tạo tất cả auth screen wrappers từ config sử dụng factory pattern
const authScreenWrappers = createAuthScreenWrappers(AUTH_SCREENS);

// ============================================================================
// AUTH STACK COMPONENT
// ============================================================================

/**
 * AuthStack - Stack navigation cho xác thực
 *
 * Chức năng:
 * - Hiển thị màn hình đăng nhập/đăng ký
 * - Quản lý navigation giữa các auth screens
 * - Sử dụng LazyScreen để tối ưu performance
 *
 * Cấu trúc:
 * - Login: Màn hình đăng nhập
 * - Register: Màn hình đăng ký
 *
 * Đặc điểm:
 * - Không có header (sử dụng header của từng screen)
 * - Background màu trắng
 * - Tự động tạo screens từ config
 */
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Ẩn header mặc định
        cardStyle: { backgroundColor: 'white' }, // Background màu trắng
      }}>
      {/* Auth screens từ config - tự động tạo từ factory */}
      {Object.entries(authScreenWrappers).map(([screenName, ScreenWrapper]) => (
        <Stack.Screen
          key={screenName}
          name={screenName as keyof AuthStackParamList}
          component={ScreenWrapper}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;
