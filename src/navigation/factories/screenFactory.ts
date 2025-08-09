// ============================================================================
// FACTORY PATTERN CHO SCREEN COMPONENTS
// ============================================================================

import React from 'react';
import { LazyScreen } from '@/shared/components';
import MainLayout from '@/components/layout/MainLayout';
import { ScreenConfig, TabScreenConfig, AuthScreenConfig } from '../config/navigationConfig';

// ============================================================================
// FACTORY FUNCTIONS CHO SCREEN WRAPPERS
// ============================================================================

/**
 * Tạo wrapper component cho main stack screen với MainLayout
 * @param screenName - Tên của screen
 * @param config - Cấu hình screen
 * @returns React component đã được wrap với MainLayout
 */
export const createMainStackScreenWrapper = (screenName: string, config: ScreenConfig) => {
    const ScreenWrapper: React.FC = () => {
        return React.createElement(MainLayout, {
            showHeader: config.showHeader ?? true,
            showTabs: config.showTabs ?? false,

            headerProps: {
                title: config.title,
                type: config.headerType ?? 'minimal',
                showBack: config.showBack ?? false,
            },
            children: React.createElement(LazyScreen, { component: config.component })
        });
    };

    // Đặt display name để dễ debug
    ScreenWrapper.displayName = `${screenName}Wrapper`;
    return ScreenWrapper;
};

/**
 * Tạo wrapper component cho tab screen với MainLayout
 * @param config - Cấu hình tab screen
 * @returns React component đã được wrap với MainLayout
 */
export const createTabScreenWrapper = (config: TabScreenConfig) => {
    const TabScreenWrapper: React.FC = () => {
        return React.createElement(MainLayout, {
            showHeader: true,
            showTabs: false, // Tabs được quản lý bởi Tab.Navigator
            headerProps: {
                title: config.title,
                type: 'minimal',
                showMenu: true,
            },
            children: React.createElement(LazyScreen, { component: config.component })
        });
    };

    TabScreenWrapper.displayName = `${config.name}TabWrapper`;
    return TabScreenWrapper;
};

/**
 * Tạo wrapper component cho auth screen với LazyScreen
 * @param config - Cấu hình auth screen
 * @returns React component đã được wrap với LazyScreen
 */
export const createAuthScreenWrapper = (config: AuthScreenConfig) => {
    const AuthScreenWrapper: React.FC = () => {
        return React.createElement(LazyScreen, { component: config.component });
    };

    AuthScreenWrapper.displayName = `${config.name}AuthWrapper`;
    return AuthScreenWrapper;
};

// ============================================================================
// BATCH CREATION FUNCTIONS - TẠO HÀNG LOẠT SCREEN WRAPPERS
// ============================================================================

/**
 * Tạo tất cả main stack screen wrappers từ config
 * @param screenConfigs - Object chứa tất cả screen configs
 * @returns Object chứa tất cả screen wrappers đã được tạo
 */
export const createMainStackScreenWrappers = (
    screenConfigs: Record<string, ScreenConfig>
): Record<string, React.FC> => {
    return Object.entries(screenConfigs).reduce((acc, [screenName, config]) => {
        acc[screenName] = createMainStackScreenWrapper(screenName, config);
        return acc;
    }, {} as Record<string, React.FC>);
};

/**
 * Tạo tất cả tab screen wrappers từ config
 * @param tabConfigs - Array chứa tất cả tab configs
 * @returns Object chứa tất cả tab screen wrappers đã được tạo
 */
export const createTabScreenWrappers = (
    tabConfigs: TabScreenConfig[]
): Record<string, React.FC> => {
    return tabConfigs.reduce((acc, config) => {
        acc[config.name] = createTabScreenWrapper(config);
        return acc;
    }, {} as Record<string, React.FC>);
};

/**
 * Tạo tất cả auth screen wrappers từ config
 * @param authConfigs - Array chứa tất cả auth configs
 * @returns Object chứa tất cả auth screen wrappers đã được tạo
 */
export const createAuthScreenWrappers = (
    authConfigs: AuthScreenConfig[]
): Record<string, React.FC> => {
    return authConfigs.reduce((acc, config) => {
        acc[config.name] = createAuthScreenWrapper(config);
        return acc;
    }, {} as Record<string, React.FC>);
};

// ============================================================================
// SPECIALIZED WRAPPERS - CÁC WRAPPER ĐẶC BIỆT CHO TỪNG SCREEN
// ============================================================================

/**
 * Tạo HomeScreen wrapper với các tính năng đặc biệt
 * Bao gồm search, notification và các tính năng khác
 * @returns React component cho HomeScreen
 */
export const createHomeScreenWrapper = () => {
    const HomeScreenWrapper: React.FC = () => {
        // Xử lý tìm kiếm
        const handleSearch = (text: string) => {
            console.log('Tìm kiếm:', text);
        };

        // Xử lý thông báo
        const handleNotificationPress = () => {
            console.log('Thông báo được nhấn');
        };

        return React.createElement(MainLayout, {
            showHeader: true,
            showTabs: false,
            headerProps: {
                title: 'Trang chủ',
                subtitle: 'Chào mừng trở lại!',
                showProfile: true,
                showSearch: true,
                showNotification: true,
                showMenu: true,
                onSearch: handleSearch,
                onNotificationPress: handleNotificationPress,
                notificationCount: 3,
            },
            children: React.createElement(LazyScreen, {
                component: () => import('@/screens/main/HomeScreen')
            })
        });
    };

    HomeScreenWrapper.displayName = 'HomeScreenWrapper';
    return HomeScreenWrapper;
};

/**
 * Tạo ProfileScreen wrapper với header đặc biệt
 * @returns React component cho ProfileScreen
 */
export const createProfileScreenWrapper = () => {
    const ProfileScreenWrapper: React.FC = () => {
        return React.createElement(MainLayout, {
            showHeader: true,
            showTabs: false,
            headerProps: {
                title: 'Hồ sơ',
                type: 'minimal',
                showMenu: true,
            },
            children: React.createElement(LazyScreen, {
                component: () => import('@/screens/main/ProfileScreen')
            })
        });
    };

    ProfileScreenWrapper.displayName = 'ProfileScreenWrapper';
    return ProfileScreenWrapper;
};

/**
 * Tạo SettingsScreen wrapper với header đặc biệt
 * @returns React component cho SettingsScreen
 */
export const createSettingsScreenWrapper = () => {
    const SettingsScreenWrapper: React.FC = () => {
        return React.createElement(MainLayout, {
            showHeader: true,
            showTabs: false,
            headerProps: {
                title: 'Cài đặt',
                type: 'minimal',
                showMenu: true,
            },
            children: React.createElement(LazyScreen, {
                component: () => import('@/screens/main/SettingsScreen')
            })
        });
    };

    SettingsScreenWrapper.displayName = 'SettingsScreenWrapper';
    return SettingsScreenWrapper;
};
