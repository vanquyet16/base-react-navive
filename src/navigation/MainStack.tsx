// ============================================================================
// MAIN STACK NAVIGATOR - STACK NAVIGATION CHÍNH
// ============================================================================

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './MainTabs';
import { MAIN_STACK_SCREENS, NAVIGATION_KEYS } from './config';
import { createMainStackScreenWrappers } from './factories/screenFactory';

const Stack = createStackNavigator();

// ============================================================================
// TẠO SCREEN WRAPPERS TỪ CONFIG
// ============================================================================

// Tạo tất cả screen wrappers từ config sử dụng factory pattern
const screenWrappers = createMainStackScreenWrappers(MAIN_STACK_SCREENS);

// ============================================================================
// MAIN STACK COMPONENT
// ============================================================================

/**
 * MainStack - Stack navigation chính của ứng dụng
 *
 * Chức năng:
 * - Chứa MainTabs (bottom tabs navigation)
 * - Chứa tất cả screens demo và utility
 * - Quản lý navigation giữa các screens
 *
 * Cấu trúc:
 * - MainTabs: Bottom tabs với 4 tabs chính
 * - Demo screens: Các màn hình demo từ config
 * - Utility screens: Các màn hình tiện ích
 */
const MainStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Ẩn header mặc định (sử dụng custom header)
        // Thêm animation cho smooth transitions
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        }),
      }}>
      {/* MainTabs - màn hình chính với bottom tabs */}
      <Stack.Screen
        name={NAVIGATION_KEYS.MAIN_STACK.MAIN_TABS}
        component={MainTabs}
        options={{
          // Disable animation cho MainTabs để tránh conflict với tab navigation
          cardStyleInterpolator: undefined,
        }}
      />

      {/* Các màn hình demo và utility từ config */}
      {Object.entries(screenWrappers).map(([screenName, ScreenWrapper]) => {
        const config = MAIN_STACK_SCREENS[screenName];
        return (
          <Stack.Screen
            key={screenName}
            name={screenName}
            component={ScreenWrapper as React.ComponentType<any>}
            options={{
              // Cấu hình gesture navigation cho từng screen
              gestureEnabled: config.gestureEnabled ?? true,
              gestureDirection: config.gestureDirection ?? 'horizontal',
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default MainStack;
