/**
 * LAZY SCREEN
 * ===========
 * Component wrapper để lazy load các screens
 * Sử dụng React.Suspense và LoadingScreen
 */

import React, { Suspense, ComponentType } from 'react';
import LoadingScreen from './LoadingScreen';

interface LazyScreenProps {
  // Component được lazy load
  component: () => Promise<{ default: ComponentType<any> }>;
  // Props sẽ được truyền vào component
  componentProps?: any;
  // Fallback component tùy chỉnh (mặc định là LoadingScreen)
  fallback?: React.ReactNode;
}

/**
 * Component wrapper để lazy load các screens
 * Dễ sử dụng và tái sử dụng cho tất cả các screens
 *
 * @example
 * // Cách sử dụng cơ bản
 * <LazyScreen component={() => import('@/screens/HomeScreen')} />
 *
 * @example
 * // Với props và fallback tùy chỉnh
 * <LazyScreen
 *   component={() => import('@/screens/ProductScreen')}
 *   componentProps={{ productId: 123 }}
 *   fallback={<CustomLoading />}
 * />
 */
// Map lưu trữ cache các lazy component theo dynamic import function để tránh tái tạo component mới mỗi lần render
const lazyComponentCache = new Map<
  () => Promise<{ default: ComponentType<any> }>,
  React.LazyExoticComponent<ComponentType<any>>
>();

const DEFAULT_COMPONENT_PROPS = {};

const getLazyComponent = (
  importer: () => Promise<{ default: ComponentType<any> }>,
): React.LazyExoticComponent<ComponentType<any>> => {
  let cached = lazyComponentCache.get(importer);
  if (!cached) {
    cached = React.lazy(importer);
    lazyComponentCache.set(importer, cached);
  }
  return cached;
};

const LazyScreen: React.FC<LazyScreenProps> = ({
  component,
  componentProps = DEFAULT_COMPONENT_PROPS,
  fallback = <LoadingScreen />,
}) => {
  // Lấy component từ cache, đảm bảo reference ổn định qua các lần render
  const LazyComponent = getLazyComponent(component);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...componentProps} />
    </Suspense>
  );
};

export default LazyScreen;

