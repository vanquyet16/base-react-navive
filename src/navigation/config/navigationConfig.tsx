/**
 * NAVIGATION CONFIG & CONSTANTS
 * =============================
 * Hằng số định tuyến tập trung — tránh hardcode string trong navigators.
 *
 * Nguồn gốc duy nhất (Single Source of Truth):
 * - ROOT: tái sử dụng ROOT_STACKS từ @/shared/constants/routes
 * - AUTH: tái sử dụng ROUTES.AUTH từ @/shared/constants/routes
 * - MAIN_STACK, TAB: khai báo tại đây, đồng bộ với ParamList types
 */

import { ROOT_STACKS, ROUTES } from '@/shared/constants/routes';

// ============================================================================
// NAVIGATION KEYS — HẰNG SỐ ĐỊNH DANH ROUTE TRÁNH HARDCODE STRING
// ============================================================================

export const NAVIGATION_KEYS = {
  /**
   * Root Navigator — tái sử dụng ROOT_STACKS (Single Source of Truth).
   * Tránh mismatch: ROOT.AUTH = 'Auth' ≠ ROOT_STACKS.AUTH_STACK = 'AuthStack'
   */
  ROOT: ROOT_STACKS,

  /** Main Stack Screens — phải khớp với MainStackParamList */
  MAIN_STACK: {
    MAIN_TABS: 'MainTabsScreen',
    CREATE_FEEDBACK: 'CreateFeedbackScreen',
    SEARCH: 'SearchScreen',
    PROFILE: 'ProfileScreen',
  } as const,

  /** Tab Navigator — phải khớp với MainTabParamList */
  TAB: {
    HOME: 'Home',
    FEEDBACK: 'Feedback',
    EMERGENCY: 'Emergency',
    NOTIFICATIONS: 'Notifications',
    APPS: 'Apps',
  } as const,

  /** Auth Stack — tái sử dụng ROUTES.AUTH (Single Source of Truth) */
  AUTH: ROUTES.AUTH,
} as const;

export type NavigationKeys = typeof NAVIGATION_KEYS;
