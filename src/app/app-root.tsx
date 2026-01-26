/**
 * APP ROOT
 * ========
 * App root component - entry point cho app.
 * Wrap providers, handle initialization, render navigator.
 *
 */

import React from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProviders } from './app-providers';
import { useAppInit } from '@/app/hooks/use-app-init';
import { useTheme } from '@/shared/theme/use-theme';
import { CustomText, ScreenContainer } from '@/components';
import { AppNavigator } from './app-navigator';

/**
 * Loading Screen
 * Show khi app đang initialize
 */
const LoadingScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <ScreenContainer>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <View style={{ height: theme.spacing[4] }} />
        <CustomText variant="body" color="secondary">
          Đang khởi tạo...
        </CustomText>
      </View>
    </ScreenContainer>
  );
};

/**
 * Error Screen
 * Show khi app initialization failed
 */
const ErrorScreen: React.FC<{ error: Error }> = ({ error }) => {
  return (
    <ScreenContainer>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CustomText variant="h3" color="error">
          Lỗi khởi tạo
        </CustomText>
        <View style={{ height: 16 }} />
        <CustomText variant="body" color="secondary" align="center">
          {error.message}
        </CustomText>
      </View>
    </ScreenContainer>
  );
};

/**
 * App Content
 * Rendered sau khi initialization complete
 */
const AppContent: React.FC = () => {
  const { isLoading, isReady, error } = useAppInit();
  const theme = useTheme();

  // Show loading
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show error
  if (error) {
    return <ErrorScreen error={error} />;
  }

  // Show app
  if (isReady) {
    return (
      <>
        <StatusBar
          barStyle={theme.isDark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <AppNavigator />
      </>
    );
  }

  // Fallback
  return <LoadingScreen />;
};

/**
 * AppRoot Component
 * Top-level component
 */
export const AppRoot: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProviders>
        <AppContent />
      </AppProviders>
    </GestureHandlerRootView>
  );
};
