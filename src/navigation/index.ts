/**
 * NAVIGATION EXPORTS
 * ==================
 * Centralized export cho tất cả navigation-related modules
 * 
 * Architecture:
 * - navigators/: Dedicated navigator components (AuthStack, MainStack)
 * - config/: Screen configurations và route constants
 * - factories/: Factory functions để tạo screen wrappers và navigators
 * - MainTabs: Bottom tabs navigation component
 */

// Navigator components
export * from './navigators';

// Main Tabs component
export { default as MainTabs } from './MainTabs';

// Config và factories
export * from './config';
export * from './factories';