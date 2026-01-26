/**
 * ROUTE NAMES CONSTANTS
 * =====================
 * Centralized route names cho React Navigation.
 * Tránh typo và dễ refactor khi đổi tên route.
 * 
 */

/**
 * Main stack routes - navigation chính của app
 */
export const ROUTES = {
    // Auth Stack
    AUTH: {
        LOGIN: 'Login',
        REGISTER: 'Register',
        FORGOT_PASSWORD: 'ForgotPassword',
    },

    // Main Stack
    MAIN: {
        HOME: 'Home',
        PROFILE: 'Profile',
        SETTINGS: 'Settings',
    },



    // Feature Stacks
    EXAMPLE: {
        LIST: 'ExampleList',
        DETAIL: 'ExampleDetail',
    },


} as const;

/**
 * Root navigation stack names
 */
export const ROOT_STACKS = {
    AUTH_STACK: 'AuthStack',
    MAIN_STACK: 'MainStack',
    DRAWER: 'Drawer',
    DRAWER_STACK: 'DrawerStack',
} as const;

/**
 * Type helpers cho type-safe navigation
 * Sử dụng với NavigationProp, RouteProp
 */
export type RouteNames = typeof ROUTES;
export type RootStackNames = typeof ROOT_STACKS;

