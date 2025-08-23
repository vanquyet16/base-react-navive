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
        const header = config.header;
        return React.createElement(MainLayout, {
            showHeader: true,
            showTabs: false,
            headerProps: {
                title: config.title,
                type: header?.type || 'default',
                subtitle: header?.subtitle,
                showProfile: header?.showProfile,
                showSearch: header?.showSearch,
                showNotification: header?.showNotification,
                notificationCount: header?.notificationCount,
                showMenu: header?.showMenu ?? true,
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

// Các specialized wrappers cho Home/Profile/Settings đã được thay thế bằng cấu hình header trong TAB_SCREENS.
