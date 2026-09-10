/**
 * MAIN STACK NAVIGATOR
 * ====================
 * Navigator cho main application flow sau khi authenticated.
 * Triển khai theo mô hình Declarative Navigator chuẩn React Navigation v7.
 *
 * Senior Architecture:
 * - Declarative Screen Definition: Trực quan, dễ hiểu, dễ debug
 * - Không phụ thuộc Factory hay HOC lồng nhau
 * - Type-Safe tuyệt đối với MainStackParamList
 * - Header Slot Pattern thông qua AppHeader
 */

import React, { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '@/shared/types/navigation.types';
import { NAVIGATION_KEYS } from '@/navigation/config/navigationConfig';
import MainTabs from '@/navigation/MainTabs';
import { MainLayout, AppHeader } from '@/components/layout';
// Import qua feature barrel (Single Source of Truth per feature)
import { CreateFeedbackScreen } from '@/features/feedback';
import { SearchScreen } from '@/features/search';
import { ProfileScreen } from '@/features/profile';

const MainStack = createNativeStackNavigator<MainStackParamList>();

// Ảnh nền header dùng chung
const HEADER_BG = require('@/assets/images/imgbgrheader.jpg');

/**
 * Screen Wrapper: Tạo phản ánh
 */
const CreateFeedbackScreenWrapper: React.FC = memo(() => (
  <MainLayout
    enableScroll={true}
    headerNode={
      <AppHeader
        title="Tạo phản ánh"
        leftAction="back"
        backgroundImage={HEADER_BG}
      />
    }
  >
    <CreateFeedbackScreen />
  </MainLayout>
));
CreateFeedbackScreenWrapper.displayName = 'CreateFeedbackScreenWrapper';

/**
 * Screen Wrapper: Tìm kiếm
 */
const SearchScreenWrapper: React.FC = memo(() => (
  <MainLayout
    enableScroll={false}
    headerNode={
      <AppHeader
        title="Tìm kiếm"
        leftAction="back"
        backgroundImage={HEADER_BG}
      />
    }
  >
    <SearchScreen />
  </MainLayout>
));
SearchScreenWrapper.displayName = 'SearchScreenWrapper';

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
      {/* 1. Bottom Tabs chính */}
      <MainStack.Screen
        name={NAVIGATION_KEYS.MAIN_STACK.MAIN_TABS}
        component={MainTabs}
      />

      {/* 2. Màn hình tạo phản ánh */}
      <MainStack.Screen
        name={NAVIGATION_KEYS.MAIN_STACK.CREATE_FEEDBACK}
        component={CreateFeedbackScreenWrapper}
      />

      {/* 3. Màn hình tìm kiếm */}
      <MainStack.Screen
        name={NAVIGATION_KEYS.MAIN_STACK.SEARCH}
        component={SearchScreenWrapper}
      />

      {/* 4. Màn hình thông tin cá nhân */}
      <MainStack.Screen
        name={NAVIGATION_KEYS.MAIN_STACK.PROFILE}
        component={ProfileScreen}
      />
    </MainStack.Navigator>
  );
};
