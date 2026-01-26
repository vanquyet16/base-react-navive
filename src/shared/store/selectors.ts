/**
 * STORE SELECTORS
 * ===============
 * Centralized selectors cho performance optimization.
 * Memoized selectors để avoid unnecessary re-renders.
 * 
 * @senior-pattern Selector pattern với shallow equality
 */

import { useShallow } from 'zustand/react/shallow';
import { useAppStore } from './app-store';
import { sessionSelectors } from './session-store';
import { settingsSelectors } from './settings-store';
import type { User } from '@/types/domain/user';
import type { Theme, Language } from '@/types/common';

/**
 * Session Selectors
 * Sử dụng: const isAuth = useIsAuthenticated();
 */
export const useIsAuthenticated = () =>
    useAppStore(sessionSelectors.isAuthenticated);

export const useCurrentUser = (): User | null =>
    useAppStore(sessionSelectors.user);

export const useUserId = () =>
    useAppStore(sessionSelectors.userId);

export const useUserRole = () =>
    useAppStore(sessionSelectors.userRole);

export const useAccessToken = () =>
    useAppStore(sessionSelectors.accessToken);

/**
 * Settings Selectors
 */
export const useTheme = (): Theme =>
    useAppStore(settingsSelectors.theme);

export const useLanguage = (): Language =>
    useAppStore(settingsSelectors.language);

export const useNotificationsEnabled = () =>
    useAppStore(settingsSelectors.notificationsEnabled);

export const useIsDarkMode = () =>
    useAppStore(settingsSelectors.isDarkMode);

/**
 * Actions Selectors
 * CRITICAL FIX: Use useShallow to prevent infinite loop
 * Without shallow equality, object is recreated every render → infinite loop
 */
export const useSessionActions = () =>
    useAppStore(
        useShallow((state) => ({
            setSession: state.setSession,
            setUser: state.setUser,
            clearSession: state.clearSession,
        }))
    );

export const useSettingsActions = () =>
    useAppStore(
        useShallow((state) => ({
            setTheme: state.setTheme,
            setLanguage: state.setLanguage,
            setNotificationsEnabled: state.setNotificationsEnabled,
            resetSettings: state.resetSettings,
        }))
    );

/**
 * Combined selectors cho complex logic
 */
export const useAuthUser = () => {
    const isAuthenticated = useIsAuthenticated();
    const user = useCurrentUser();

    return {
        isAuthenticated,
        user,
        isGuest: !isAuthenticated,
    };
};

/**
 * Export all
 */
export * from './app-store';
export * from './session-store';
export * from './settings-store';
