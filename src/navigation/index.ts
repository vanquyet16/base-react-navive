/**
 * NAVIGATION
 * - navigators/: cây navigator (Auth, Drawer → MainStack → Tabs)
 * - components/: UI gắn với navigation (CustomDrawer)
 * - config/: tên route (NAVIGATION_KEYS)
 * - linking.ts, navigation-theme.ts, navigation-ref.ts: cấu hình NavigationContainer
 */

export * from './navigators';
export * from './config';
export { navigationRef } from './navigation-ref';
export { linking } from './linking';
export { toNavigationTheme } from './navigation-theme';
