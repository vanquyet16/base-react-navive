/**
 * AUTH STACK NAVIGATOR
 * ====================
 * Navigator cho authentication flow (Login, Register)
 *
 * Sử dụng generic navigator factory để tạo navigator component
 * từ config, đảm bảo type-safe và tuân thủ separation of concerns.
 */

import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '@/shared/types/navigation.types';
import { AUTH_SCREENS } from '@/navigation/config';
import { createAuthStackNavigatorComponent } from '@/navigation/factories/navigatorFactory';

/**
 * Auth Stack Navigator instance
 * Typed với AuthStackParamList cho type safety
 */
const AuthStack = createStackNavigator<AuthStackParamList>();

/**
 * Auth Stack Navigator Component
 *
 * Tự động tạo từ AUTH_SCREENS config sử dụng generic factory.
 * Chứa tất cả auth screens: Login, Register, etc.
 *
 * Features:
 * - Lazy loading screens qua LazyScreen wrapper
 * - Type-safe navigation
 * - Không có MainLayout (full screen auth UI)
 *
 * @example
 * // Sử dụng trong Root Navigation
 * <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
 */
export const AuthStackNavigator = createAuthStackNavigatorComponent(
  AuthStack,
  AUTH_SCREENS,
  {
    initialRouteName: 'Login',
    screenOptions: { headerShown: false },
  },
);
