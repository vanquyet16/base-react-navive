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
import {
  CustomText,
  ErrorBoundary,
  LoadingScreen,
  ScreenContainer,
} from '@/components';
import { AppNavigator } from './app-navigator';

/**
 * Loading Screen
 * Show khi app đang initialize
 */

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
    return <ErrorBoundary error={error} />;
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
