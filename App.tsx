import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as AntProvider } from '@ant-design/react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { queryClient } from '@/shared/utils/queryClient';
import { useTheme } from '@/stores/appStore';
import RootNavigator from '@/navigation/RootNavigator';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import { MainLayout } from '@/components';

const AppContent: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor='transparent'
        translucent
      />
      {/* <MainLayout> */}
      <RootNavigator />
      {/* </MainLayout> */}
      <Toast />
    </>
  );
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AntProvider>
            <AppContent />
          </AntProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
};

export default App;
