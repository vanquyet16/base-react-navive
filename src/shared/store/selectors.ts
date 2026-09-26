/**
 * STORE SELECTORS
 * ===============
 * Centralized selectors cho performance optimization.
 * Memoized selectors để avoid unnecessary re-renders.
 * 
 */

import { useShallow } from 'zustand/react/shallow';
import { useAppStore } from './app-store';
import { sessionSelectors } from './session-store';
import { settingsSelectors } from './settings-store';
import type { ThemeMode, Language } from '@/shared/types/common';

/**
 * Session Selectors
 */
export const useSessionStatus = () => useAppStore(sessionSelectors.status);

export const useIsAuthenticated = () => useAppStore(sessionSelectors.isAuthenticated);

/**
 * Settings Selectors
 */
export const useThemeMode = (): ThemeMode =>
    useAppStore(settingsSelectors.theme);

export const useLanguage = (): Language =>
    useAppStore(settingsSelectors.language);

export const useNotificationsEnabled = () =>
    useAppStore(settingsSelectors.notificationsEnabled);


/**
 * Actions Selectors
 * CRITICAL FIX: Use useShallow to prevent infinite loop
 * Without shallow equality, object is recreated every render → infinite loop
 */
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
 * Export all
 */
export * from './app-store';
export * from './session-store';
export * from './settings-store';
