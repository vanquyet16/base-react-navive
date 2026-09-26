/**
 * NAVIGATION KEYS
 * ===============
 * Nguồn DUY NHẤT cho tên route. Tên phải khớp ParamList trong
 * `@/shared/types/navigation.types` — TypeScript báo lỗi ngay nếu lệch.
 */

export const NAVIGATION_KEYS = {
  /** Root stack: chuyển giữa Auth và Main theo trạng thái phiên */
  ROOT: {
    AUTH_STACK: 'AuthStack',
    DRAWER: 'Drawer',
  },
  /** Màn hình trong Drawer */
  DRAWER: {
    MAIN_STACK: 'MainStack',
  },
  AUTH: {
    LOGIN: 'Login',
    REGISTER: 'Register',
  },
  MAIN_STACK: {
    MAIN_TABS: 'MainTabsScreen',
  },
  TAB: {
    HOME: 'Home',
  },
} as const;

export type NavigationKeys = typeof NAVIGATION_KEYS;
