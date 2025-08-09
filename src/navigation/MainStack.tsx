import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabs from './MainTabs';
import {LazyScreen} from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';

const Stack = createStackNavigator();

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface ScreenConfig {
  title: string;
  component: () => Promise<any>;
  showHeader?: boolean;
  showTabs?: boolean;
  headerType?: 'minimal' | 'default';
}

// ============================================================================
// SCREEN CONFIGURATIONS
// ============================================================================

const SCREEN_CONFIGS: Record<string, ScreenConfig> = {
  ProductScreen: {
    title: 'Quản lý sản phẩm',
    component: () => import('../screens/example/ProductScreen'),
    showHeader: true,
    showTabs: false,
    headerType: 'minimal',
  },
  LazyDemoScreen: {
    title: 'Demo Lazy Loading',
    component: () => import('../screens/example/LazyDemoScreen'),
    showHeader: true,
    showTabs: false,
    headerType: 'minimal',
  },
  LazyTestScreen: {
    title: 'Bài Test Lazy Loading',
    component: () => import('../screens/example/LazyTestScreen'),
    showHeader: true,
    showTabs: false,
    headerType: 'minimal',
  },
  ApiLazyDemoScreen: {
    title: 'API Lazy Loading Demo',
    component: () => import('../screens/example/ApiLazyDemoScreen'),
    showHeader: true,
    showTabs: false,
    headerType: 'minimal',
  },
  CacheDemoScreen: {
    title: 'Cache Demo',
    component: () => import('../screens/example/CacheDemoScreen'),
    showHeader: true,
    showTabs: false,
    headerType: 'minimal',
  },
  PdfDemoScreen: {
    title: 'PDF Viewer Demo',
    component: () => import('../screens/example/PdfDemoScreen'),
    showHeader: true,
    showTabs: false,
    headerType: 'minimal',
  },
  PdfFileManagerScreen: {
    title: 'Quản lý File PDF',
    component: () => import('../screens/example/PdfFileManagerScreen'),
    showHeader: true,
    showTabs: false,
    headerType: 'minimal',
  },
  ResponsiveDemoScreen: {
    title: 'Responsive Demo',
    component: () => import('../screens/example/ResponsiveDemoScreen'),
    showHeader: true,
    showTabs: false,
    headerType: 'minimal',
  },
  PdfAdvancedDemoScreen: {
    title: 'PDF Advanced Demo',
    component: () => import('../screens/example/PdfAdvancedDemoScreen'),
    showHeader: true,
    showTabs: false,
    headerType: 'minimal',
  },
};

// ============================================================================
// FACTORY FUNCTION
// ============================================================================

/**
 * Tạo wrapper component cho screen với MainLayout
 * @param screenName - Tên screen
 * @param config - Cấu hình screen
 * @returns React component
 */
const createScreenWrapper = (screenName: string, config: ScreenConfig) => {
  const ScreenWrapper: React.FC = () => (
    <MainLayout
      showHeader={config.showHeader ?? true}
      showTabs={config.showTabs ?? false}
      headerProps={{
        title: config.title,
        type: config.headerType ?? 'minimal',
      }}>
      <LazyScreen component={config.component} />
    </MainLayout>
  );

  // Đặt display name cho debugging
  ScreenWrapper.displayName = `${screenName}Wrapper`;

  return ScreenWrapper;
};

// ============================================================================
// SCREEN WRAPPERS
// ============================================================================

// Tạo tất cả screen wrappers từ config
const screenWrappers = Object.entries(SCREEN_CONFIGS).reduce(
  (acc, [screenName, config]) => {
    acc[screenName] = createScreenWrapper(screenName, config);
    return acc;
  },
  {} as Record<string, React.FC>,
);

// ============================================================================
// MAIN STACK COMPONENT
// ============================================================================

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // Thêm animation cho smooth transitions
        cardStyleInterpolator: ({current, layouts}) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        }),
      }}>
      {/* MainTabs - màn hình chính với bottom tabs */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          // Disable animation cho MainTabs
          cardStyleInterpolator: undefined,
        }}
      />

      {/* Các màn hình demo và utility */}
      {Object.entries(screenWrappers).map(([screenName, ScreenWrapper]) => (
        <Stack.Screen
          key={screenName}
          name={screenName}
          component={ScreenWrapper}
          options={{
            // Có thể thêm options riêng cho từng screen ở đây
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
      ))}

      {/* Có thể thêm các màn hình khác ở đây */}
      {/* 
      <Stack.Screen 
        name="DetailScreen" 
        component={createScreenWrapper('DetailScreen', {
          title: 'Chi tiết',
          component: () => import('../screens/DetailScreen'),
        })} 
      />
      */}
    </Stack.Navigator>
  );
};

export default MainStack;
