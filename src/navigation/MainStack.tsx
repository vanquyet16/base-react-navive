import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabs from './MainTabs';
import {LazyScreen} from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';

const Stack = createStackNavigator();

// Wrapper cho ProductScreen
const ProductScreenWrapper = () => (
  <MainLayout
    showHeader={true}
    showTabs={false}
    headerProps={{
      title: 'Quản lý sản phẩm',
      type: 'minimal',
    }}>
    <LazyScreen component={() => import('../screens/example/ProductScreen')} />
  </MainLayout>
);

// Wrapper cho LazyDemoScreen
const LazyDemoScreenWrapper = () => (
  <MainLayout
    showHeader={true}
    showTabs={false}
    headerProps={{
      title: 'Demo Lazy Loading',
      type: 'minimal',
    }}>
    <LazyScreen component={() => import('../screens/example/LazyDemoScreen')} />
  </MainLayout>
);

// Wrapper cho LazyTestScreen
const LazyTestScreenWrapper = () => (
  <MainLayout
    showHeader={true}
    showTabs={false}
    headerProps={{
      title: 'Bài Test Lazy Loading',
      type: 'minimal',
    }}>
    <LazyScreen component={() => import('../screens/example/LazyTestScreen')} />
  </MainLayout>
);

// Wrapper cho ApiLazyDemoScreen
const ApiLazyDemoScreenWrapper = () => (
  <MainLayout
    showHeader={true}
    showTabs={false}
    headerProps={{
      title: 'API Lazy Loading Demo',
      type: 'minimal',
    }}>
    <LazyScreen
      component={() => import('../screens/example/ApiLazyDemoScreen')}
    />
  </MainLayout>
);

// Wrapper cho CacheDemoScreen
const CacheDemoScreenWrapper = () => (
  <MainLayout
    showHeader={true}
    showTabs={false}
    headerProps={{
      title: 'Cache Demo',
      type: 'minimal',
    }}>
    <LazyScreen
      component={() => import('../screens/example/CacheDemoScreen')}
    />
  </MainLayout>
);

// Wrapper cho PdfDemoScreen
const PdfDemoScreenWrapper = () => (
  <MainLayout
    showHeader={true}
    showTabs={false}
    headerProps={{
      title: 'PDF Viewer Demo',
      type: 'minimal',
    }}>
    <LazyScreen component={() => import('../screens/example/PdfDemoScreen')} />
  </MainLayout>
);

// Wrapper cho PdfFileManagerScreen
const PdfFileManagerScreenWrapper = () => (
  <MainLayout
    showHeader={true}
    showTabs={false}
    headerProps={{
      title: 'Quản lý File PDF',
      type: 'minimal',
    }}>
    <LazyScreen
      component={() => import('../screens/example/PdfFileManagerScreen')}
    />
  </MainLayout>
);

// Có thể thêm các màn hình khác ở đây
// Ví dụ: DetailScreen, SearchScreen, NotificationScreen, etc.

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* MainTabs - màn hình chính với bottom tabs */}
      <Stack.Screen name="MainTabs" component={MainTabs} />

      {/* Các màn hình không có trong bottom tabs */}
      <Stack.Screen name="ProductScreen" component={ProductScreenWrapper} />
      <Stack.Screen name="LazyDemoScreen" component={LazyDemoScreenWrapper} />
      <Stack.Screen name="LazyTestScreen" component={LazyTestScreenWrapper} />
      <Stack.Screen
        name="ApiLazyDemoScreen"
        component={ApiLazyDemoScreenWrapper}
      />
      <Stack.Screen name="CacheDemoScreen" component={CacheDemoScreenWrapper} />
      <Stack.Screen name="PdfDemoScreen" component={PdfDemoScreenWrapper} />
      <Stack.Screen
        name="PdfFileManagerScreen"
        component={PdfFileManagerScreenWrapper}
      />

      {/* Có thể thêm các màn hình khác ở đây */}
      {/* <Stack.Screen name="DetailScreen" component={DetailScreenWrapper} /> */}
      {/* <Stack.Screen name="SearchScreen" component={SearchScreenWrapper} /> */}
      {/* <Stack.Screen name="NotificationScreen" component={NotificationScreenWrapper} /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
