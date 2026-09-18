/**
 * APP ROOT
 * ========
 * App root component - entry point cho app.
 * Wrap providers, handle initialization, render navigator.
 *
 */

import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProviders } from './app-providers';
import { useAppInit } from '@/app/hooks/use-app-init';
import { useTheme } from '@/shared/theme/use-theme';
import { useSplashScreen } from '@/shared/hooks';
import {
  ErrorBoundary,
  LoadingScreen,
} from '@/components';
import { AppNavigator } from './app-navigator';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

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
  const { hideSplash } = useSplashScreen();

  useEffect(() => {
    if (isReady || error) {
      hideSplash();
    }
  }, [isReady, error, hideSplash]);

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
      <ErrorBoundary>
        <StatusBar
          barStyle={theme.isDark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <AppNavigator />
      </ErrorBoundary>
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
    <GestureHandlerRootView style={styles.root}>
      <ErrorBoundary>
        <AppProviders>
          <AppContent />
        </AppProviders>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
};

