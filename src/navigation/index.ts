/**
 * NAVIGATION EXPORTS
 * ==================
 * Centralized export cho tất cả navigation modules
 *
 * Architecture:
 * - navigators/: Dedicated navigator components (AuthStack, MainStack, MainDrawer)
 * - config/: Route constants (NAVIGATION_KEYS)
 * - MainTabs: Bottom tabs navigation component
 */

// Navigator components
export * from './navigators';

// Main Tabs component
export { default as MainTabs } from './MainTabs';

// Route constants & config
export * from './config';