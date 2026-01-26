// ============================================================================
// MAIN STACK NAVIGATOR - AUTHENTICATED USER FLOW
// ============================================================================

/**
 * Main Stack Navigator
 *
 * Mục đích:
 * - Chứa tất cả screens sau khi user đã đăng nhập
 * - Bao gồm MainTabs và các screens khác
 * - Sử dụng generic factory để tạo navigator
 *
 * Cấu trúc:
 * - MainTabs: Bottom tabs navigation (Home, Profile, Settings, ResponsiveDemo)
 * - ProductScreen: Màn hình quản lý sản phẩm
 * - LazyDemoScreen, ApiLazyDemoScreen: Demo screens
 * - CacheDemoScreen: Demo cache functionality
 * - PdfDemoScreen, PdfFileManagerScreen: PDF features
 * - PerformanceDemoScreen: Performance monitoring
 * - Và các screens khác...
 *
 * @senior-pattern Separation of concerns - dedicated navigator file
 */

import React from 'react';
import { MainStackParamList } from '@/shared/types';
import { MAIN_STACK_SCREENS } from '../config/navigationConfig';
import {
  createStackNavigatorComponent,
  convertScreenConfigsToArray,
} from '../factories/navigatorFactory';
import MainTabs from '../MainTabs';
import { logger } from '@/shared/utils/logger';

// ============================================================================
// LOGGER INSTANCE
// ============================================================================

const mainNavLogger = logger;

// ============================================================================
// MAIN STACK NAVIGATOR COMPONENT
// ============================================================================

/**
 * MainStackNavigator - Stack navigator cho authenticated user flow
 *
 * Features:
 * - Type-safe với MainStackParamList
 * - Tự động tạo screens từ MAIN_STACK_SCREENS config
 * - Initial route: MainTabs
 * - Includes MainTabs như additional screen
 *
 * @returns Configured Main Stack Navigator component
 */
export const MainStackNavigator: React.FC = () => {
  // Logging cho debugging
  mainNavLogger.debug('MainStackNavigator: Rendering', {
    screenCount: Object.keys(MAIN_STACK_SCREENS).length,
    initialRoute: 'MainTabs',
  });

  // Convert MAIN_STACK_SCREENS object thành array format
  const screenConfigsArray = React.useMemo(
    () => convertScreenConfigsToArray(MAIN_STACK_SCREENS),
    [],
  );

  // Sử dụng generic factory để tạo navigator
  const Navigator = React.useMemo(
    () =>
      createStackNavigatorComponent<MainStackParamList>(
        screenConfigsArray,
        'MainTabs', // Initial route name
        [
          // MainTabs như additional screen vì nó không từ config
          {
            name: 'MainTabs',
            component: MainTabs,
            options: {
              headerShown: false,
            },
          },
        ],
        false, // isAuthStack = false
      ),
    [screenConfigsArray],
  );

  return <Navigator />;
};

// Set display name cho debugging
MainStackNavigator.displayName = 'MainStackNavigator';
