import {
  MainTabParamList,
  AuthStackParamList,
  MainStackParamList,
} from '@/shared/types/navigation.types';
import LoginScreen from '@/features/auth/screens/LoginScreen';
import { RegisterScreen } from '@/features/auth';
import { HomeScreen } from '@/features/home';
import { CustomHeaderProps } from '@/components/layout/CustomHeader';
import EmergencyScreen from '@/features/emergency/screens/EmergencyScreen';
import { FeedbackScreen } from '@/features/feedback';
import AppScreen from '@/features/app/screens/AppScreen';

// ============================================================================
// ĐỊNH NGHĨA TYPES CHO SCREEN CONFIGURATION
// ============================================================================

/**
 * Cấu hình cho main stack screen
 */
export interface ScreenConfig {
  title: string; // Tiêu đề hiển thị trên header
  component?: () => Promise<any>; // Component được lazy load
  componentDirect?: React.ComponentType<any>; // Component import trực tiếp
  showHeader?: boolean; // Có hiển thị header không
  showTabs?: boolean; // Có hiển thị bottom tabs không
  headerType?: 'minimal' | 'default' | 'search'; // Loại header
  header?: Partial<CustomHeaderProps>; // Custom header props (background image, etc.)
  gestureEnabled?: boolean; // Có cho phép gesture navigation không
  gestureDirection?: 'horizontal' | 'vertical'; // Hướng gesture
  animationEnabled?: boolean; // Có animation khi chuyển screen không
  showBack?: boolean; // Có hiển thị back button không
  disableSafeArea?: boolean; // Tắt SafeAreaView
  disableScroll?: boolean; // Tắt scroll
}

/**
 * Cấu hình cho tab screen
 */
export interface TabScreenConfig {
  name: keyof MainTabParamList; // Tên screen trong tab navigator
  title: string; // Tiêu đề hiển thị
  component?: () => Promise<any>; // Component được lazy load
  componentDirect?: React.ComponentType<any>; // Component import trực tiếp (không lazy)
  icon: string; // Icon cho tab
  iconType?: 'ant' | 'feather' | 'material' | 'ionic'; // Loại icon (default: 'feather')
  badge?: number; // Số badge hiển thị trên tab
  header?: Partial<CustomHeaderProps>;
  showHeader?: boolean; // Cho phép ẩn header (default: true)
  disableSafeArea?: boolean; // Tắt SafeAreaView khi ẩn header (immersive mode)
  disableScroll?: boolean; // Tắt scroll (default: false -> enableScroll: true)
}

/**
 * Cấu hình cho auth screen
 */
export interface AuthScreenConfig {
  name: keyof AuthStackParamList; // Tên screen trong auth navigator
  title: string; // Tiêu đề hiển thị
  component?: () => Promise<any>; // Component được lazy load
  componentDirect?: React.ComponentType<any>; // Component import trực tiếp (không lazy)
}

// ============================================================================
// CẤU HÌNH MAIN STACK SCREENS - CÁC MÀN HÌNH CHÍNH
// ============================================================================

/**
 * Cấu hình tất cả screens trong main stack
 * Được tổ chức theo categories để dễ quản lý
 *
 * QUAN TRỌNG: Mọi screen được thêm vào đây BẮT BUỘC phải có type definition
 * tương ứng trong MainStackParamList (src/shared/types/index.ts)
 * Nếu thiếu, TypeScript sẽ báo lỗi ngay lập tức.
 */
export const MAIN_STACK_SCREENS = {
  //new
  CreateFeedbackScreen: {
    title: 'Tạo phản ánh',
    component: () => import('@/features/feedback/screens/CreateFeedBackScreen'),
    showHeader: true,
    showTabs: false,
    headerType: 'minimal',
    showBack: true,
    header: {
      backgroundImage: require('@/assets/images/imgbgrheader.jpg'),
    },
  },
  DetailFeedBackScreen: {
    title: 'Chi tiết phản ánh',
    component: () => import('@/features/feedback/screens/DetailFeedBackScreen'),
    showHeader: false, // We use a custom header in the screen
    showTabs: false,
    disableScroll: true,
    disableSafeArea: true,
    header: {
      backgroundImage: require('@/assets/images/imgbgrheader.jpg'),
    },
  },
  SearchScreen: {
    title: 'Tìm kiếm',
    component: () => import('@/features/search/screens/SearchScreen'),
    showHeader: true,
    showTabs: false,
    headerType: 'default',
    showBack: true,
    disableScroll: true,
    header: {
      backgroundImage: require('@/assets/images/imgbgrheader.jpg'),
    },
  },
  ProfileScreen: {
    title: 'Thông tin cá nhân',
    component: () => import('@/features/profile/screens/ProfileScreen'),
    showHeader: false,
    showTabs: false,
    headerType: 'default',
    showBack: true,
    disableScroll: true,
    disableSafeArea: true,
    header: {},
  },
} satisfies Record<
  Exclude<keyof MainStackParamList, 'MainTabsScreen'>,
  ScreenConfig
>;

// ============================================================================
// CẤU HÌNH TAB SCREENS - CÁC MÀN HÌNH TRONG BOTTOM TABS
// ============================================================================

/**
 * Cấu hình tất cả screens trong bottom tabs
 */
export const TAB_SCREENS: TabScreenConfig[] = [
  {
    name: 'Home',
    title: 'Trang chủ',
    componentDirect: HomeScreen,
    icon: 'home',
    showHeader: false,
    disableSafeArea: true,
    disableScroll: true,
  },
  {
    name: 'Emergency',
    title: 'Khẩn cấp',
    componentDirect: EmergencyScreen,
    disableScroll: true,
    icon: 'phone',
    header: {
      type: 'minimal',
      showMenu: true,
      titleIcon: 'phone',
    },
  },
  {
    name: 'Feedback',
    title: 'Phản Ánh',
    componentDirect: FeedbackScreen,
    icon: 'send',
    disableScroll: true,
    header: {
      type: 'minimal',
      showMenu: true,
      showSearch: true,
      showNotification: false,
      backgroundImage: require('@/assets/images/imgbgrheader.jpg'),
      titleIcon: 'send',
    },
  },
  {
    name: 'Apps',
    title: 'Ứng dụng',
    componentDirect: AppScreen,
    icon: 'grid',
    header: {
      type: 'minimal',
      showMenu: true,
      backgroundImage: require('@/assets/images/imgbgrheader.jpg'),
      titleIcon: 'grid',
    },
  },
  {
    name: 'Notifications',
    title: 'Thông báo',
    component: () =>
      import('@/features/notification/screens/NotificationScreen'),
    icon: 'bell',
    disableScroll: true,
    badge: 5,
    header: {
      type: 'minimal',
      showMenu: true,
      backgroundImage: require('@/assets/images/imgbgrheader.jpg'),
      titleIcon: 'bell',
    },
  },
];

// ============================================================================
// CẤU HÌNH AUTH SCREENS - CÁC MÀN HÌNH XÁC THỰC
// ============================================================================

/**
 * Cấu hình tất cả screens trong auth stack
 */
export const AUTH_SCREENS: AuthScreenConfig[] = [
  {
    name: 'Login',
    title: 'Đăng nhập',
    componentDirect: LoginScreen,
  },
  {
    name: 'Register',
    title: 'Đăng ký',
    componentDirect: RegisterScreen,
  },
];

// ============================================================================
// NAVIGATION KEYS - CÁC HẰNG SỐ CHO TÊN SCREEN
// ============================================================================

/**
 * Các hằng số cho tên screen để tránh hardcode
 * Được tổ chức theo từng navigator
 *
 * QUAN TRỌNG: MAIN_STACK keys được tự động đồng bộ với MainStackParamList
 */
export const NAVIGATION_KEYS = {
  /** Root Navigator */
  ROOT: {
    DRAWER: 'Drawer',
    AUTH: 'Auth',
  },

  /** Main Stack — tự động đồng bộ với MAIN_STACK_SCREENS */
  MAIN_STACK: Object.keys(MAIN_STACK_SCREENS).reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {} as Record<string, string>) as { [K in keyof MainStackParamList]: K },

  /** Drawer Stack */
  DRAWER_STACK: {
    MAIN: 'Main',
  },

  /** Tab Navigator — tự động đồng bộ với TAB_SCREENS */
  TAB: TAB_SCREENS.reduce((acc, tab) => {
    acc[tab.name.toUpperCase()] = tab.name;
    return acc;
  }, {} as Record<string, string>) as { [K in Uppercase<keyof MainTabParamList>]: K extends Uppercase<infer N> ? N extends keyof MainTabParamList ? N : never : never },

  /** Auth Stack */
  AUTH: {
    LOGIN: 'Login',
    REGISTER: 'Register',
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS - CÁC HÀM TIỆN ÍCH
// ============================================================================

/**
 * Lấy screen config theo tên
 * @param screenName - Tên screen cần tìm
 * @returns ScreenConfig hoặc undefined nếu không tìm thấy
 */
export const getScreenConfig = (
  screenName: keyof typeof MAIN_STACK_SCREENS,
): ScreenConfig | undefined => {
  return MAIN_STACK_SCREENS[screenName];
};

/**
 * Lấy tab config theo tên
 * @param tabName - Tên tab cần tìm
 * @returns TabScreenConfig hoặc undefined nếu không tìm thấy
 */
export const getTabConfig = (
  tabName: keyof MainTabParamList,
): TabScreenConfig | undefined => {
  return TAB_SCREENS.find(tab => tab.name === tabName);
};

/**
 * Lấy auth screen config theo tên
 * @param screenName - Tên auth screen cần tìm
 * @returns AuthScreenConfig hoặc undefined nếu không tìm thấy
 */
export const getAuthScreenConfig = (
  screenName: keyof AuthStackParamList,
): AuthScreenConfig | undefined => {
  return AUTH_SCREENS.find(screen => screen.name === screenName);
};

/**
 * Kiểm tra screen có phải là tab screen không
 * @param screenName - Tên screen cần kiểm tra
 * @returns true nếu là tab screen, false nếu không
 */
export const isTabScreen = (screenName: string): boolean => {
  return TAB_SCREENS.some(tab => tab.name === screenName);
};

/**
 * Lấy tất cả screen names từ main stack
 * @returns Array chứa tất cả tên screens
 */
export const getMainStackScreenNames = (): string[] => {
  return Object.keys(MAIN_STACK_SCREENS);
};

/**
 * Lấy tất cả tab names
 * @returns Array chứa tất cả tên tabs
 */
export const getTabNames = (): (keyof MainTabParamList)[] => {
  return TAB_SCREENS.map(tab => tab.name);
};

/**
 * Lấy tất cả auth screen names
 * @returns Array chứa tất cả tên auth screens
 */
export const getAuthScreenNames = (): (keyof AuthStackParamList)[] => {
  return AUTH_SCREENS.map(screen => screen.name);
};
