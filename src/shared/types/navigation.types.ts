/**
 * NAVIGATION TYPES
 * ================
 * Type definitions cho React Navigation.
 * Chỉ chứa ParamList types — KHÔNG chứa domain/API/form types.
 *
 * Domain types → shared/types/domain/
 * API types    → shared/types/api.ts
 * Common types → shared/types/common.ts
 */

import type { NavigatorScreenParams } from '@react-navigation/native';

// ============================================================================
// ROOT NAVIGATION
// ============================================================================

export type RootStackParamList = {
    AuthStack: undefined;
    Drawer: undefined;
};

// ============================================================================
// DRAWER NAVIGATION
// ============================================================================

export type DrawerParamList = {
    MainStack: NavigatorScreenParams<MainStackParamList>;
};

// ============================================================================
// AUTH STACK
// ============================================================================

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

// ============================================================================
// MAIN STACK — Tất cả screens trong main flow
// ============================================================================

export type MainStackParamList = {
    CreateFeedbackScreen: undefined;
    MainTabsScreen: undefined;
    SearchScreen: undefined;
    ProfileScreen: undefined;
};

// ============================================================================
// BOTTOM TABS
// ============================================================================

export type MainTabParamList = {
    Home: undefined;
    Feedback: undefined;
    Emergency: undefined;
    Notifications: undefined;
    Apps: undefined;
};

// ============================================================================
// GLOBAL TYPE DECLARATION (SENIOR STANDARD)
// ============================================================================
// Giúp useNavigation() mặc định tự động gợi ý (autocomplete) toàn bộ màn hình
// mà không cần phải truyền Generic phức tạp ở mỗi component.

export type AppNavigationParamList = MainStackParamList &
    AuthStackParamList &
    MainTabParamList &
    DrawerParamList; // Thêm DrawerParamList để 'MainStack' có trong global autocomplete

declare global {
    namespace ReactNavigation {
        interface RootParamList extends AppNavigationParamList {}
    }
}