/**
 * APP ROOT
 * ========
 * App root component - entry point cho app.
 * Wrap providers, handle initialization, render navigator.
 *
 */

import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProviders } from './app-providers';
import { useAppInit } from '@/app/hooks/use-app-init';
import { useTheme } from '@/shared/theme/use-theme';
import { CustomText, ScreenContainer } from '@/components';
import { AppNavigator } from './app-navigator';
import { useSplashScreen } from '@/shared/hooks';

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
 * Rendered với splash screen integration
 */
const AppContent: React.FC = () => {
  const { isLoading, isReady, error } = useAppInit();
  const theme = useTheme();
  const { hideSplash } = useSplashScreen();

  /**
   * Auto hide splash khi app ready
   * Splash screen native sẽ thay thế LoadingScreen
   */
  useEffect(() => {
    if (isReady && !error) {
      // Hide splash với fade animation mượt mà
      hideSplash();
    }
  }, [isReady, error, hideSplash]);

  // Show error (sau khi hide splash)
  if (error) {
    // Đảm bảo splash đã ẩn khi show error
    hideSplash();
    return <ErrorScreen error={error} />;
  }

  // Show app khi ready
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

  // Trong khi loading, splash screen native sẽ hiển thị
  // Không cần LoadingScreen component nữa
  return null;
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
