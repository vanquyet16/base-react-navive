/**
 * MAIN TABS NAVIGATOR - BOTTOM TABS NAVIGATION
 * ============================================
 * Bottom Tabs Navigator chính của ứng dụng.
 * Triển khai theo mô hình Declarative Navigator chuẩn React Navigation v7.
 *
 * Senior Architecture:
 * - Khai báo Tab.Screen trực tiếp, không phụ thuộc factory runtime mapping
 * - Header Slot Pattern thông qua AppHeader
 * - Memoized wrappers tránh re-render layout
 */

import React, { useCallback, memo } from 'react';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { AppIcon, type IconType } from '@/components';
import { MainTabParamList } from '@/shared/types/navigation.types';
import { CustomBottomTabBar } from '@/components/navigation';
import { useTheme } from '@/shared/theme/use-theme';
import { MainLayout, AppHeader } from '@/components/layout';
import { useUnreadNotificationCount } from '@/features/notification/hooks/queries/useNotification';

// Feature screens — import qua feature barrel
import { HomeScreen } from '@/features/home';
import { EmergencyScreen } from '@/features/emergency';
import { FeedbackListScreen } from '@/features/feedback';
import { NotificationScreen } from '@/features/notification';
import AppScreen from '@/features/app/screens/AppScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Ảnh nền header dùng chung
const HEADER_BG = require('@/assets/images/imgbgrheader.jpg');

// ============================================================================
// TAB SCREEN WRAPPERS (MEMOIZED)
// ============================================================================

/**
 * Tab Home: Header "Trang chủ" + menu + nút tìm kiếm & thông báo
 */
const HomeTabScreen: React.FC = memo(() => {
  const navigation = useNavigation();

  return (
    <MainLayout
      enableScroll={true}
      headerNode={
        <AppHeader
          title="Trang chủ"
          subtitle="Cổng dịch vụ thông minh"
          leftAction="menu"
          backgroundImage={HEADER_BG}
          rightNode={
            <>
              <AppHeader.Action
                icon="magnify"
                iconType="material"
                onPress={() => navigation.navigate('SearchScreen')}
              />
              <AppHeader.Action
                icon="bell-outline"
                iconType="material"
                badgeCount={5}
                onPress={() => navigation.navigate('Notifications')}
              />
            </>
          }
        />
      }
    >
      <HomeScreen />
    </MainLayout>
  );
});
HomeTabScreen.displayName = 'HomeTabScreen';

/**
 * Tab Emergency: Header "Khẩn cấp" + menu
 */
const EmergencyTabScreen: React.FC = memo(() => (
  <MainLayout
    enableScroll={false}
    headerNode={
      <AppHeader
        title="Khẩn cấp"
        leftAction="menu"
      />
    }
  >
    <EmergencyScreen />
  </MainLayout>
));
EmergencyTabScreen.displayName = 'EmergencyTabScreen';

/**
 * Tab Feedback: Header "Phản Ánh" + menu + nút search
 */
const FeedbackTabScreen: React.FC = memo(() => {
  const navigation = useNavigation();

  return (
    <MainLayout
      enableScroll={false}
      headerNode={
        <AppHeader
          title="Phản Ánh"
          leftAction="menu"
          backgroundImage={HEADER_BG}
          rightNode={
            <AppHeader.Action
              icon="plus"
              iconType="material"
              onPress={() => navigation.navigate('CreateFeedbackScreen')}
            />
          }
        />
      }
    >
      {/* Tab hiển thị danh sách — tạo mới qua nút + ở header điến MainStack */}
      <FeedbackListScreen />
    </MainLayout>
  );
});
FeedbackTabScreen.displayName = 'FeedbackTabScreen';

/**
 * Tab Apps: Header "Ứng dụng" + menu
 */
const AppsTabScreen: React.FC = memo(() => (
  <MainLayout
    enableScroll={true}
    headerNode={
      <AppHeader
        title="Ứng dụng"
        leftAction="menu"
        backgroundImage={HEADER_BG}
      />
    }
  >
    <AppScreen />
  </MainLayout>
));
AppsTabScreen.displayName = 'AppsTabScreen';

/**
 * Tab Notifications: Header "Thông báo" + menu
 */
const NotificationsTabScreen: React.FC = memo(() => (
  <MainLayout
    enableScroll={false}
    headerNode={
      <AppHeader
        title="Thông báo"
        leftAction="menu"
        backgroundImage={HEADER_BG}
      />
    }
  >
    <NotificationScreen />
  </MainLayout>
));
NotificationsTabScreen.displayName = 'NotificationsTabScreen';

interface TabBarIconProps {
  name: string;
  type?: IconType;
  color: string;
  size: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = memo(({ name, type, color, size }) => (
  <AppIcon name={name} size={size} color={color} type={type} />
));
TabBarIcon.displayName = 'TabBarIcon';

// ============================================================================
// TAB ICON RENDERERS — khai báo ngoài component tránh react/no-unstable-nested-components
// ============================================================================

const renderHomeIcon = ({ color, size }: { color: string; size: number }) => (
  <TabBarIcon name="home" type="feather" color={color} size={size} />
);
const renderEmergencyIcon = ({ color, size }: { color: string; size: number }) => (
  <TabBarIcon name="phone" type="feather" color={color} size={size} />
);
const renderFeedbackIcon = ({ color, size }: { color: string; size: number }) => (
  <TabBarIcon name="send" type="feather" color={color} size={size} />
);
const renderAppsIcon = ({ color, size }: { color: string; size: number }) => (
  <TabBarIcon name="grid" type="feather" color={color} size={size} />
);
const renderNotificationsIcon = ({ color, size }: { color: string; size: number }) => (
  <TabBarIcon name="bell" type="feather" color={color} size={size} />
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const MainTabs: React.FC = () => {
  const theme = useTheme();
  // Badge count động từ API — thay thế hardcode 5
  const unreadCount = useUnreadNotificationCount();

  const renderTabBar = useCallback(
    (props: BottomTabBarProps) => <CustomBottomTabBar {...props} />,
    [],
  );

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      {/* 1. Trang chủ */}
      <Tab.Screen
        name="Home"
        component={HomeTabScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: renderHomeIcon,
        }}
      />

      {/* 2. Khẩn cấp */}
      <Tab.Screen
        name="Emergency"
        component={EmergencyTabScreen}
        options={{
          tabBarLabel: 'Khẩn cấp',
          tabBarIcon: renderEmergencyIcon,
        }}
      />

      {/* 3. Phản ánh */}
      <Tab.Screen
        name="Feedback"
        component={FeedbackTabScreen}
        options={{
          tabBarLabel: 'Phản Ánh',
          tabBarIcon: renderFeedbackIcon,
        }}
      />

      {/* 4. Ứng dụng */}
      <Tab.Screen
        name="Apps"
        component={AppsTabScreen}
        options={{
          tabBarLabel: 'Ứng dụng',
          tabBarIcon: renderAppsIcon,
        }}
      />

      {/* 5. Thông báo */}
      <Tab.Screen
        name="Notifications"
        component={NotificationsTabScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: renderNotificationsIcon,
          // Badge count lấy động từ API notification
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
