/**
 * AUTH STACK NAVIGATOR
 * ====================
 * Quản lý luồng điều hướng Authentication (Đăng nhập, Đăng ký).
 * Triển khai theo mô hình Declarative Navigator chuẩn React Navigation v7.
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/shared/types/navigation.types';
import { NAVIGATION_KEYS } from '@/navigation/config/navigationConfig';
// Import qua feature barrel
import { LoginScreen, RegisterScreen } from '@/features/auth';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

/**
 * Auth Stack Navigator Component
 */
export const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={NAVIGATION_KEYS.AUTH.LOGIN}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <AuthStack.Screen name={NAVIGATION_KEYS.AUTH.LOGIN} component={LoginScreen} />
      <AuthStack.Screen name={NAVIGATION_KEYS.AUTH.REGISTER} component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};
