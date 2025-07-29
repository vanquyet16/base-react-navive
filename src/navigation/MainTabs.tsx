import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainLayout from '@/components/layout/MainLayout';
import {COLORS} from '@/constants';
import {LazyScreen} from '@/components/common';
import {MainTabParamList} from '@/types';
import {View} from 'react-native';
import {CustomTabBar} from '@/components/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Wrapper components với MainLayout và LazyScreen
const HomeScreenWrapper = () => {
  const handleSearch = (text: string) => {
    console.log('Tìm kiếm:', text);
  };

  const handleNotificationPress = () => {
    console.log('Thông báo được nhấn');
  };

  return (
    <MainLayout
      showHeader={true}
      showTabs={false} // Tabs được quản lý bởi Tab.Navigator
      headerProps={{
        title: 'Trang chủ',
        subtitle: 'Chào mừng trở lại!',
        showProfile: true,
        showSearch: true,
        showNotification: true,
        onSearch: handleSearch,
        onNotificationPress: handleNotificationPress,
        notificationCount: 3,
      }}>
      <LazyScreen component={() => import('../screens/main/HomeScreen')} />
    </MainLayout>
  );
};

const ProfileScreenWrapper = () => (
  <MainLayout
    showHeader={true}
    showTabs={false}
    headerProps={{
      title: 'Hồ sơ',
      type: 'minimal',
    }}>
    <LazyScreen component={() => import('../screens/main/ProfileScreen')} />
  </MainLayout>
);

const SettingsScreenWrapper = () => (
  <MainLayout
    showHeader={true}
    showTabs={false}
    headerProps={{
      title: 'Cài đặt',
      type: 'minimal',
    }}>
    <LazyScreen component={() => import('../screens/main/SettingsScreen')} />
  </MainLayout>
);

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={CustomTabBar}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreenWrapper}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreenWrapper}
        options={{
          tabBarLabel: 'Hồ sơ',
          tabBarIcon: ({color, size}) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreenWrapper}
        options={{
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
