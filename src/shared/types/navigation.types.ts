/**
 * NAVIGATION TYPES
 * ================
 * ParamList mô tả ĐÚNG cây navigator thực tế:
 *
 *   Root (native-stack)
 *   ├── AuthStack (native-stack) ── Login, Register          ← khi chưa đăng nhập
 *   └── Drawer (drawer)                                       ← khi đã đăng nhập
 *       └── MainStack (native-stack)
 *           └── MainTabsScreen (bottom-tabs) ── Home
 *
 * Navigator con được khai báo bằng `NavigatorScreenParams` để TypeScript kiểm tra được
 * điều hướng lồng nhau, vd: navigate('Drawer', { screen: 'MainStack', params: { screen: 'MainTabsScreen' } }).
 *
 * Tên route phải khớp NAVIGATION_KEYS (`@/navigation/config/navigationConfig`).
 */

import type { NavigatorScreenParams, CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { DrawerScreenProps } from '@react-navigation/drawer';

// ============================================================================
// PARAM LISTS
// ============================================================================

export type MainTabParamList = {
    Home: undefined;
};

export type MainStackParamList = {
    MainTabsScreen: NavigatorScreenParams<MainTabParamList> | undefined;
};

export type DrawerParamList = {
    MainStack: NavigatorScreenParams<MainStackParamList> | undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type RootStackParamList = {
    AuthStack: NavigatorScreenParams<AuthStackParamList> | undefined;
    Drawer: NavigatorScreenParams<DrawerParamList> | undefined;
};

// ============================================================================
// SCREEN PROPS — dùng trong màn hình để có `navigation`/`route` đúng kiểu
// ============================================================================

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    T
>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;

export type DrawerScreenPropsOf<T extends keyof DrawerParamList> = CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;

export type MainStackScreenProps<T extends keyof MainStackParamList> = CompositeScreenProps<
    NativeStackScreenProps<MainStackParamList, T>,
    DrawerScreenPropsOf<keyof DrawerParamList>
>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    MainStackScreenProps<keyof MainStackParamList>
>;

// ============================================================================
// GLOBAL — useNavigation() không generic sẽ hiểu cây route gốc
// ============================================================================

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
