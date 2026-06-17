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

export type DrawerStackParamList = {
    Main: NavigatorScreenParams<MainStackParamList>;
};

export type DrawerParamList = {
    DrawerStack: NavigatorScreenParams<DrawerStackParamList>;
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
    DetailFeedBackScreen: undefined;
    MainTabsScreen: undefined;
    SearchScreen: undefined;
    ProfileScreen: undefined;
    // Thêm screen mới ở đây khi cần:
    // DetailScreen: { id: string };
    // NotificationScreen: undefined;
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