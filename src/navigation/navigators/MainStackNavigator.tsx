/**
 * MAIN STACK NAVIGATOR
 * ====================
 * Navigator cho main application flow sau khi authenticated.
 * Triển khai theo mô hình Declarative Navigator chuẩn React Navigation v7.
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '@/shared/types/navigation.types';
import { NAVIGATION_KEYS } from '@/navigation/config/navigationConfig';
import { MainTabsNavigator } from './MainTabsNavigator';

const MainStack = createNativeStackNavigator<MainStackParamList>();

/**
 * Main Stack Navigator Component
 */
export const MainStackNavigator: React.FC = () => {
  return (
    <MainStack.Navigator
      initialRouteName={NAVIGATION_KEYS.MAIN_STACK.MAIN_TABS}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* 1. Màn hình MainTabs (chứa Home) */}
      <MainStack.Screen
        name={NAVIGATION_KEYS.MAIN_STACK.MAIN_TABS}
        component={MainTabsNavigator}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
