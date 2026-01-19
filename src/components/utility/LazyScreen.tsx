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
const LazyScreen: React.FC<LazyScreenProps> = ({
  component,
  componentProps = {},
  fallback = <LoadingScreen />,
}) => {
  // Lazy load component
  const LazyComponent = React.lazy(component);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...componentProps} />
    </Suspense>
  );
};

export default LazyScreen;
