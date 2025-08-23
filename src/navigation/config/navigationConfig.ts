// ============================================================================
// CẤU HÌNH NAVIGATION - CHUẨN SENIOR
// ============================================================================

import { MainTabParamList, AuthStackParamList } from '@/shared/types';

// ============================================================================
// ĐỊNH NGHĨA TYPES CHO SCREEN CONFIGURATION
// ============================================================================

/**
 * Cấu hình cho main stack screen
 */
export interface ScreenConfig {
    title: string; // Tiêu đề hiển thị trên header
    component: () => Promise<any>; // Component được lazy load
    showHeader?: boolean; // Có hiển thị header không
    showTabs?: boolean; // Có hiển thị bottom tabs không
    headerType?: 'minimal' | 'default' | 'search'; // Loại header
    gestureEnabled?: boolean; // Có cho phép gesture navigation không
    gestureDirection?: 'horizontal' | 'vertical'; // Hướng gesture
    animationEnabled?: boolean; // Có animation khi chuyển screen không
    showBack?: boolean; // Có hiển thị back button không
}

/**
 * Cấu hình cho tab screen
 */
export interface TabScreenConfig {
    name: keyof MainTabParamList; // Tên screen trong tab navigator
    title: string; // Tiêu đề hiển thị
    component: () => Promise<any>; // Component được lazy load
    icon: string; // Icon cho tab
    badge?: number; // Số badge hiển thị trên tab
    header?: {
        type?: 'default' | 'search' | 'minimal';
        subtitle?: string;
        showProfile?: boolean;
        showSearch?: boolean;
        showNotification?: boolean;
        notificationCount?: number;
        showMenu?: boolean;
    };
}

/**
 * Cấu hình cho auth screen
 */
export interface AuthScreenConfig {
    name: keyof AuthStackParamList; // Tên screen trong auth navigator
    title: string; // Tiêu đề hiển thị
    component: () => Promise<any>; // Component được lazy load
}

// ============================================================================
// CẤU HÌNH MAIN STACK SCREENS - CÁC MÀN HÌNH CHÍNH
// ============================================================================

/**
 * Cấu hình tất cả screens trong main stack
 * Được tổ chức theo categories để dễ quản lý
 */
export const MAIN_STACK_SCREENS: Record<string, ScreenConfig> = {
    // ============================================================================
    // QUẢN LÝ SẢN PHẨM
    // ============================================================================
    ProductManagement: {
        title: 'Quản lý sản phẩm',
        component: () => import('@/features/example/screens/ProductScreen'),
        showHeader: true,
        showTabs: false,
        headerType: 'minimal',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        showBack: false,
    },

    // Tương thích ngược với tên screen cũ
    ProductScreen: {
        title: 'Quản lý sản phẩm',
        component: () => import('@/features/example/screens/ProductScreen'),
        showHeader: true,
        showTabs: false,
        headerType: 'minimal',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        showBack: false,
    },

    // ============================================================================
    // DEMO LAZY LOADING
    // ============================================================================
    LazyDemoScreen: {
        title: 'Demo Lazy Loading',
        component: () => import('@/features/example/screens/LazyDemoScreen'),
        showHeader: true,
        showTabs: false,
        headerType: 'minimal',
        showBack: false,
    },

    LazyTestScreen: {
        title: 'Bài Test Lazy Loading',
        component: () => import('@/features/example/screens/LazyTestScreen'),
        showHeader: true,
        showTabs: false,
        headerType: 'minimal',
        showBack: false,
    },


    ApiLazyDemoScreen: {
        title: 'API Lazy Loading Demo',
        component: () => import('@/features/example/screens/ApiLazyDemoScreen'),
        showHeader: true,
        showTabs: false,
        headerType: 'minimal',
        showBack: false,
    },

    // ============================================================================
    // QUẢN LÝ CACHE
    // ============================================================================
    CacheDemoScreen: {
        title: 'Cache Demo',
        component: () => import('@/features/example/screens/CacheDemoScreen'),
        showHeader: true,
        showTabs: false,
        headerType: 'minimal',
    },

    // ============================================================================
    // TÍNH NĂNG PDF
    // ============================================================================
    PdfDemoScreen: {
        title: 'PDF Viewer Demo',
        component: () => import('@/features/example/screens/PdfDemoScreen'),
        showHeader: true,
        showTabs: false,
        headerType: 'minimal',
    },
    PdfFileManagerScreen: {
        title: 'Quản lý File PDF',
        component: () => import('@/features/example/screens/PdfFileManagerScreen'),
        showHeader: true,
        showTabs: false,
        headerType: 'minimal',
    },
    PdfAdvancedDemoScreen: {
        title: 'PDF Advanced Demo',
        component: () => import('@/features/example/screens/PdfAdvancedDemoScreen'),
        showHeader: true,
        showTabs: false,
        headerType: 'minimal',
    },

    // ============================================================================
    // RESPONSIVE & PERFORMANCE
    // ============================================================================
    ResponsiveDemoScreen: {
        title: 'Responsive Demo',
        component: () => import('@/features/example/screens/ResponsiveDemoScreen'),
        showHeader: true,
        showTabs: false,
        headerType: 'minimal',
    },
    PerformanceDemoScreen: {
        title: 'Performance Monitor Demo',
        component: () => import('@/features/performance/screens/PerformanceDemoScreen'),
        showHeader: true,
        showTabs: false,
        headerType: 'minimal',
    },
    // B2
    DemoNewScreen: {
        title: 'Demo New Screen',
        component: () => import('@/features/example/screens/NewDemoScreen'),
        showHeader: true,
        showTabs: false,
        headerType: 'minimal',
    },
};

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
        component: () => import('@/features/home/screens/HomeScreen'),
        icon: 'home',
        header: {
            subtitle: 'Chào mừng trở lại!',
            showProfile: true,
            showSearch: true,
            showNotification: true,
            notificationCount: 3,
            type: 'default',
            showMenu: true,
        },
    },
    {
        name: 'Profile',
        title: 'Hồ sơ',
        component: () => import('@/features/profile/screens/ProfileScreen'),
        icon: 'person',
        header: {
            type: 'minimal',
            showMenu: true,
        },
    },
    {
        name: 'Settings',
        title: 'Cài đặt',
        component: () => import('@/features/profile/screens/SettingsScreen'),
        icon: 'settings',
        header: {
            type: 'minimal',
            showMenu: true,
        },
    },
    {
        name: 'ResponsiveDemo',
        title: 'Responsive',
        component: () => import('@/features/example/screens/ResponsiveDemoScreen'),
        icon: 'aspect-ratio',
        header: {
            type: 'minimal',
            showMenu: true,
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
        component: () => import('@/features/auth/screens/LoginScreen'),
    },
    {
        name: 'Register',
        title: 'Đăng ký',
        component: () => import('@/features/auth/screens/RegisterScreen'),
    },
];

// ============================================================================
// NAVIGATION KEYS - CÁC HẰNG SỐ CHO TÊN SCREEN
// ============================================================================

/**
 * Các hằng số cho tên screen để tránh hardcode
 * Được tổ chức theo từng navigator
 */
export const NAVIGATION_KEYS = {
    // Root Navigator - Navigator gốc
    ROOT: {
        DRAWER: 'Drawer', // Drawer navigation
        AUTH: 'Auth', // Auth navigation
    },

    // Main Stack - Stack navigation chính
    MAIN_STACK: {
        MAIN_TABS: 'MainTabs', // Main tabs screen
        // Tự động tạo keys cho tất cả main stack screens
        ...Object.keys(MAIN_STACK_SCREENS).reduce((acc, key) => {
            acc[key] = key;
            return acc;
        }, {} as Record<string, string>),
    },

    // Tab Navigator - Bottom tabs
    TAB: {
        HOME: 'Home', // Trang chủ
        PROFILE: 'Profile', // Hồ sơ
        SETTINGS: 'Settings', // Cài đặt
        RESPONSIVE_DEMO: 'ResponsiveDemo', // Responsive demo
    },

    // Auth Stack - Xác thực
    AUTH: {
        LOGIN: 'Login', // Đăng nhập
        REGISTER: 'Register', // Đăng ký
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
export const getScreenConfig = (screenName: string): ScreenConfig | undefined => {
    return MAIN_STACK_SCREENS[screenName];
};

/**
 * Lấy tab config theo tên
 * @param tabName - Tên tab cần tìm
 * @returns TabScreenConfig hoặc undefined nếu không tìm thấy
 */
export const getTabConfig = (tabName: keyof MainTabParamList): TabScreenConfig | undefined => {
    return TAB_SCREENS.find(tab => tab.name === tabName);
};

/**
 * Lấy auth screen config theo tên
 * @param screenName - Tên auth screen cần tìm
 * @returns AuthScreenConfig hoặc undefined nếu không tìm thấy
 */
export const getAuthScreenConfig = (screenName: keyof AuthStackParamList): AuthScreenConfig | undefined => {
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
