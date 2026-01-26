// ============================================================================
// MAIN TABS NAVIGATOR - BOTTOM TABS NAVIGATION
// ============================================================================

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '@/shared/constants';
import { MainTabParamList } from '@/shared/types';
import { CustomTabBar } from '@/components/navigation';
import { logger } from '@/shared/utils/logger';
import { NAVIGATION_KEYS, TAB_SCREENS } from './config';
import { createTabScreenWrappers } from './factories/screenFactory';

const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Logger instance cho MainTabs
 */
const tabLogger = logger;

/**
 * Tạo tab wrappers từ config
 * Memoized để tránh tạo lại mỗi lần render
 */
const TAB_WRAPPERS = createTabScreenWrappers(TAB_SCREENS);

// ============================================================================
// MAIN TABS COMPONENT
// ============================================================================

/**
 * MainTabs - Bottom tabs navigation chính
 *
 * Chức năng:
 * - Hiển thị 4 tabs chính: Home, Profile, Settings, ResponsiveDemo
 * - Custom tab bar với styling riêng
 * - Mỗi tab có wrapper riêng với MainLayout
 * - Error handling cho missing wrappers
 *
 * Cấu trúc:
 * - Home: Trang chủ với search và notification
 * - Profile: Hồ sơ người dùng
 * - Settings: Cài đặt ứng dụng
 * - ResponsiveDemo: Demo responsive design
 */
const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
      }}
    >
      {TAB_SCREENS.map(cfg => {
        const tabName = cfg.name as keyof MainTabParamList;
        const Wrapper = TAB_WRAPPERS[tabName];

        // Error handling: Log nếu wrapper không tìm thấy
        if (!Wrapper) {
          tabLogger.error('Tab wrapper not found', {
            tabName,
            availableWrappers: Object.keys(TAB_WRAPPERS),
          });
          return null;
        }

        return (
          <Tab.Screen
            key={tabName}
            name={tabName}
            component={Wrapper}
            options={{
              tabBarLabel: cfg.title,
              tabBarIcon: ({ color, size }) => (
                <Icon name={cfg.icon} size={size} color={color} />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default MainTabs;
