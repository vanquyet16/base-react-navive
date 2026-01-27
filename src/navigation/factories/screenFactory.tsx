// ============================================================================
// FACTORY PATTERN CHO SCREEN COMPONENTS
// ============================================================================

import React from 'react';
import { LazyScreen } from '@/components/utility';
import MainLayout from '@/components/layout/MainLayout';
import {
  ScreenConfig,
  TabScreenConfig,
  AuthScreenConfig,
} from '../config/navigationConfig';

// ============================================================================
// FACTORY FUNCTIONS CHO SCREEN WRAPPERS
// ============================================================================

/**
 * Tạo wrapper component cho main stack screen với MainLayout
 *
 * @param screenName - Tên của screen
 * @param config - Cấu hình screen
 * @returns React component đã được wrap với MainLayout
 *
 * @example
 * const ProductWrapper = createMainStackScreenWrapper('Product', {
 *   title: 'Products',
 *   component: () => import('./ProductScreen'),
 *   showHeader: true
 * });
 */
export const createMainStackScreenWrapper = (
  screenName: string,
  config: ScreenConfig,
): React.FC => {
  const ScreenWrapper: React.FC = () => (
    <MainLayout
      showHeader={config.showHeader ?? true}
      showTabs={config.showTabs ?? false}
      headerProps={{
        title: config.title,
        type: config.headerType ?? 'minimal',
        showBack: config.showBack ?? false,
      }}
    >
      <LazyScreen component={config.component} />
    </MainLayout>
  );

  // Đặt display name để dễ debug trong DevTools
  ScreenWrapper.displayName = `${screenName}Wrapper`;
  return ScreenWrapper;
};

/**
 * Tạo wrapper component cho tab screen với MainLayout
 *
 * @param config - Cấu hình tab screen
 * @returns React component đã được wrap với MainLayout
 *
 * @example
 * const HomeWrapper = createTabScreenWrapper({
 *   name: 'Home',
 *   title: 'Home',
 *   component: () => import('./HomeScreen'),
 *   header: { showSearch: true }
 * });
 */
export const createTabScreenWrapper = (config: TabScreenConfig): React.FC => {
  const header = config.header;

  const TabScreenWrapper: React.FC = () => (
    <MainLayout
      showHeader={true}
      showTabs={false}
      headerProps={{
        title: config.title,
        type: header?.type || 'default',
        subtitle: header?.subtitle,
        showProfile: header?.showProfile,
        showSearch: header?.showSearch,
        showNotification: header?.showNotification,
        notificationCount: header?.notificationCount,
        showMenu: header?.showMenu ?? true,
      }}
    >
      <LazyScreen component={config.component} />
    </MainLayout>
  );

  TabScreenWrapper.displayName = `${config.name}TabWrapper`;
  return TabScreenWrapper;
};

/**
 * Tạo wrapper component cho auth screen với LazyScreen
 *
 * @param config - Cấu hình auth screen
 * @returns React component đã được wrap với LazyScreen hoặc direct component
 *
 * @example
 * const LoginWrapper = createAuthScreenWrapper({
 *   name: 'Login',
 *   title: 'Login',
 *   componentDirect: LoginScreen // Direct import - không lazy
 * });
 *
 * const RegisterWrapper = createAuthScreenWrapper({
 *   name: 'Register',
 *   title: 'Register',
 *   component: () => import('./RegisterScreen') // Lazy import
 * });
 */
export const createAuthScreenWrapper = (config: AuthScreenConfig): React.FC => {
  // Nếu có componentDirect, render trực tiếp không cần LazyScreen
  if (config.componentDirect) {
    const DirectComponent = config.componentDirect;
    const AuthScreenDirectWrapper: React.FC = () => <DirectComponent />;
    AuthScreenDirectWrapper.displayName = `${config.name}AuthDirectWrapper`;
    return AuthScreenDirectWrapper;
  }

  // Nếu chỉ có component (lazy), dùng LazyScreen như cũ
  if (config.component) {
    const AuthScreenWrapper: React.FC = () => (
      <LazyScreen component={config.component!} />
    );
    AuthScreenWrapper.displayName = `${config.name}AuthWrapper`;
    return AuthScreenWrapper;
  }

  // Fallback: throw error nếu không có component nào
  throw new Error(
    `AuthScreen ${config.name} must have either component or componentDirect`,
  );
};

// ============================================================================
// BATCH CREATION FUNCTIONS - TẠO HÀNG LOẠT SCREEN WRAPPERS
// ============================================================================

/**
 * Tạo tất cả main stack screen wrappers từ config
 *
 * @param screenConfigs - Object chứa tất cả screen configs
 * @returns Object chứa tất cả screen wrappers đã được tạo
 *
 * @example
 * const wrappers = createMainStackScreenWrappers({
 *   Product: { title: 'Products', component: ... },
 *   Settings: { title: 'Settings', component: ... }
 * });
 */
export const createMainStackScreenWrappers = (
  screenConfigs: Record<string, ScreenConfig>,
): Record<string, React.FC> => {
  return Object.entries(screenConfigs).reduce((acc, [screenName, config]) => {
    acc[screenName] = createMainStackScreenWrapper(screenName, config);
    return acc;
  }, {} as Record<string, React.FC>);
};

/**
 * Tạo tất cả tab screen wrappers từ config
 *
 * @param tabConfigs - Array chứa tất cả tab configs
 * @returns Object chứa tất cả tab screen wrappers đã được tạo (keyed by tab name)
 *
 * @example
 * const tabWrappers = createTabScreenWrappers([
 *   { name: 'Home', title: 'Home', component: ... },
 *   { name: 'Profile', title: 'Profile', component: ... }
 * ]);
 */
export const createTabScreenWrappers = (
  tabConfigs: TabScreenConfig[],
): Record<string, React.FC> => {
  return tabConfigs.reduce((acc, config) => {
    acc[config.name] = createTabScreenWrapper(config);
    return acc;
  }, {} as Record<string, React.FC>);
};

/**
 * Tạo tất cả auth screen wrappers từ config
 *
 * @param authConfigs - Array chứa tất cả auth configs
 * @returns Object chứa tất cả auth screen wrappers đã được tạo
 *
 * @example
 * const authWrappers = createAuthScreenWrappers([
 *   { name: 'Login', title: 'Login', component: ... },
 *   { name: 'Register', title: 'Register', component: ... }
 * ]);
 */
export const createAuthScreenWrappers = (
  authConfigs: AuthScreenConfig[],
): Record<string, React.FC> => {
  return authConfigs.reduce((acc, config) => {
    acc[config.name] = createAuthScreenWrapper(config);
    return acc;
  }, {} as Record<string, React.FC>);
};
