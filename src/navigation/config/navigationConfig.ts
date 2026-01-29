
import { MainTabParamList, AuthStackParamList, MainStackParamList } from '@/shared/types/navigation.types';
import LoginScreen from '@/features/auth/screens/LoginScreen';
import React from 'react';
import { RegisterScreen } from '@/features/auth';
import { HomeScreen } from '@/features/home';
import { ProfileScreen, SettingsScreen } from '@/features/profile';
import { ResponsiveDemoScreen } from '@/features/example';

// ============================================================================
// ĐỊNH NGHĨA TYPES CHO SCREEN CONFIGURATION
// ============================================================================

/**
 * Utility type để validate rằng tất cả screens trong config
 * đều phải có type definition tương ứng trong MainStackParamList
 */
type ValidateScreenKeys<T extends Record<string, ScreenConfig>> = {
    [K in keyof T]: K extends keyof MainStackParamList ? T[K] : never;
};

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
}

/**
 * Cấu hình cho tab screen
 */
import { CustomHeaderProps } from '@/components/layout/CustomHeader';



export interface TabScreenConfig {
    name: keyof MainTabParamList; // Tên screen trong tab navigator
    title: string; // Tiêu đề hiển thị
    component?: () => Promise<any>; // Component được lazy load
    componentDirect?: React.ComponentType<any>; // Component import trực tiếp (không lazy)
    icon: string; // Icon cho tab
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
        showBack: true,
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

} satisfies Record<keyof MainStackParamList, ScreenConfig>;

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
        name: 'Contacts',
        title: 'Danh bạ',
        // TODO: Replace with actual Contacts screen or reuse Profile for demo
        componentDirect: ProfileScreen,
        icon: 'book', // AntDesign: book for contacts/directory
        header: {
            type: 'default',
            showMenu: true,
            showSearch: true,
            showNotification: true,
        },
    },
    {
        name: 'Notifications',
        title: 'Thông báo',
        // TODO: Replace with actual Notifications screen or reusable Settings for demo
        componentDirect: SettingsScreen,
        icon: 'bell', // AntDesign: bell
        badge: 5,
        header: {
            type: 'minimal',
            showMenu: true,
        },
    },
    {
        name: 'Apps',
        title: 'Ứng dụng',
        // TODO: Replace with Apps menu screen
        componentDirect: ResponsiveDemoScreen,
        icon: 'appstore', // AntDesign: appstore
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
    // Root Navigator - Navigator gốc
    ROOT: {
        DRAWER: 'Drawer', // Drawer navigation
        AUTH: 'Auth', // Auth navigation
    } as const,

    // Main Stack - Stack navigation chính
    // Sử dụng keyof MainStackParamList để đảm bảo type-safe
    MAIN_STACK: Object.keys(MAIN_STACK_SCREENS).reduce((acc, key) => {
        acc[key] = key;
        return acc;
    }, {} as Record<string, string>) as { [K in keyof MainStackParamList]: K },

    // Drawer Stack - các route hiển thị trong Drawer menu
    // Lưu ý: DrawerStack routes là "shortcut" để mở MainStackNavigator với initialParams tương ứng
    DRAWER_STACK: {
        MAIN_TABS: 'MainTabs',
        PRODUCT: 'ProductScreen',
        LAZY_DEMO: 'LazyDemoScreen',
        API_DEMO: 'ApiLazyDemoScreen',
        CACHE_DEMO: 'CacheDemoScreen',
        PDF_DEMO: 'PdfDemoScreen',
        PERFORMANCE_DEMO: 'PerformanceDemoScreen',
        RESPONSIVE_DEMO: 'ResponsiveDemoScreen',
    } as const,

    // Tab Navigator - Bottom tabs
    TAB: {
        HOME: 'Home', // Trang chủ
        CONTACTS: 'Contacts', // Danh bạ
        NOTIFICATIONS: 'Notifications', // Thông báo
        APPS: 'Apps', // Ứng dụng
    } as const,

    // Auth Stack - Xác thực
    AUTH: {
        LOGIN: 'Login', // Đăng nhập
        REGISTER: 'Register', // Đăng ký
    } as const,
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
    return MAIN_STACK_SCREENS[screenName as keyof typeof MAIN_STACK_SCREENS];
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
