/**
 * APP ROOT
 * ========
 * Providers → khởi tạo (bootstrap) → điều hướng.
 */

import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProviders } from './app-providers';
import { AppNavigator } from './app-navigator';
import { useAppInit } from './hooks/use-app-init';
import { useTheme } from '@/shared/theme/use-theme';
import { useSplashScreen } from '@/shared/hooks/useSplashScreen';
import ErrorBoundary from '@/components/utility/ErrorBoundary';
import LoadingScreen from '@/components/utility/LoadingScreen';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const AppContent: React.FC = () => {
  const { status, error, retry } = useAppInit();
  const theme = useTheme();
  const { hideSplash } = useSplashScreen();

  useEffect(() => {
    if (status !== 'loading') {
      hideSplash();
    }
  }, [status, hideSplash]);

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  if (status === 'error') {
    return <ErrorBoundary error={error} title="Không thể khởi động ứng dụng" onRetry={retry} />;
  }

  return (
    <ErrorBoundary>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <AppNavigator />
    </ErrorBoundary>
  );
};

export const AppRoot: React.FC = () => (
  <GestureHandlerRootView style={styles.root}>
    <ErrorBoundary>
      <AppProviders>
        <AppContent />
      </AppProviders>
    </ErrorBoundary>
  </GestureHandlerRootView>
);
