// ============================================================================
// AUTH STACK NAVIGATOR - AUTHENTICATION FLOW
// ============================================================================

/**
 * Auth Stack Navigator
 *
 * Mục đích:
 * - Chứa tất cả screens liên quan đến authentication (Login, Register)
 * - Được hiển thị khi user chưa đăng nhập
 * - Sử dụng generic factory để tạo navigator
 *
 * Cấu trúc:
 * - Login Screen: Màn hình đăng nhập
 * - Register Screen: Màn hình đăng ký
 *
 * @senior-pattern Separation of concerns - dedicated navigator file
 */

import React from 'react';
import { AuthStackParamList } from '@/shared/types';
import { AUTH_SCREENS } from '../config/navigationConfig';
import { createStackNavigatorComponent } from '../factories/navigatorFactory';
import { logger } from '@/shared/utils/logger';

// ============================================================================
// LOGGER INSTANCE
// ============================================================================

const authNavLogger = logger;

// ============================================================================
// AUTH STACK NAVIGATOR COMPONENT
// ============================================================================

/**
 * AuthStackNavigator - Stack navigator cho authentication flow
 *
 * Features:
 * - Type-safe với AuthStackParamList
 * - Tự động tạo screens từ AUTH_SCREENS config
 * - Initial route: Login
 * - Không có additional screens
 *
 * @returns Configured Auth Stack Navigator component
 */
export const AuthStackNavigator: React.FC = () => {
  // Logging cho debugging
  authNavLogger.debug('AuthStackNavigator: Rendering', {
    screenCount: AUTH_SCREENS.length,
    initialRoute: 'Login',
  });

  // Sử dụng generic factory để tạo navigator
  const Navigator = React.useMemo(
    () =>
      createStackNavigatorComponent<AuthStackParamList>(
        AUTH_SCREENS,
        'Login', // Initial route name
        [], // Không có additional screens
        true, // isAuthStack = true
      ),
    [],
  );

  return <Navigator />;
};

// Set display name cho debugging
AuthStackNavigator.displayName = 'AuthStackNavigator';
