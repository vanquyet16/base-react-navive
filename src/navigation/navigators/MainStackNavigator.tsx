/**
 * MAIN STACK NAVIGATOR
 * ====================
 * Navigator cho main application flow sau khi authenticated
 *
 * Sử dụng generic navigator factory để tạo navigator component
 * từ config, đảm bảo type-safe và tuân thủ separation of concerns.
 */

import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList } from '@/shared/types';
import { MAIN_STACK_SCREENS } from '@/navigation/config';
import { createMainStackNavigatorComponent } from '@/navigation/factories/navigatorFactory';
import MainTabs from '@/navigation/MainTabs';

/**
 * Main Stack Navigator instance
 * Typed với MainStackParamList cho type safety
 */
const MainStack = createStackNavigator<MainStackParamList>();

/**
 * Main Stack Navigator Component
 *
 * Tự động tạo từ MAIN_STACK_SCREENS config sử dụng generic factory.
 * Chứa MainTabs và tất cả feature screens.
 *
 * Features:
 * - MainTabs làm initial screen (bottom tabs navigation)
 * - Tất cả feature screens được wrap với MainLayout (header + optional tabs)
 * - Lazy loading screens qua LazyScreen wrapper
 * - Type-safe navigation
 * - Dynamic screen rendering từ config
 *
 * @example
 * // Sử dụng trong Root Navigation
 * <Stack.Screen name="MainStack" component={MainStackNavigator} />
 */
export const MainStackNavigator = createMainStackNavigatorComponent(
  MainStack,
  MAIN_STACK_SCREENS,
  {
    initialRouteName: 'MainTabs',
    screenOptions: { headerShown: false },
  },
  // Additional screens không có trong MAIN_STACK_SCREENS config
  [
    {
      name: 'MainTabs',
      component: MainTabs,
      options: { headerShown: false },
    },
  ],
);
