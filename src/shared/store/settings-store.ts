/**
 * SETTINGS STORE (Zustand Slice)
 * ===============================
 * Quản lý app settings: theme, language, preferences.
 * Persist vào storage để maintain across app restarts.
 * 
 */

import { StateCreator } from 'zustand';
import type { Theme, Language } from '@/shared/types/common';
import type { AppStoreState } from './app-store';

/**
 * Settings Store State
 */
export interface SettingsState {
    // State
    theme: Theme;
    language: Language;
    notificationsEnabled: boolean;

    // Actions
    setTheme: (theme: Theme) => void;
    setLanguage: (language: Language) => void;
    setNotificationsEnabled: (enabled: boolean) => void;
    resetSettings: () => void;
}

/**
 * Default settings
 */
const defaultSettings: Pick<
    SettingsState,
    'theme' | 'language' | 'notificationsEnabled'
> = {
    theme: 'light',
    language: 'vi',
    notificationsEnabled: true,
};

/**
 * Create settings slice
 */
export const createSettingsSlice: StateCreator<
    AppStoreState,
    [],
    [],
    SettingsState
> = (set) => ({
    ...defaultSettings,

    /**
     * Set theme (light/dark)
     */
    setTheme: (theme) => {
        set({ theme });
    },

    /**
     * Set language
     */
    setLanguage: (language) => {
        set({ language });
    },

    /**
     * Toggle notifications
     */
    setNotificationsEnabled: (enabled) => {
        set({ notificationsEnabled: enabled });
    },

    /**
     * Reset về default settings
     */
    resetSettings: () => {
        set(defaultSettings);
    },
});

/**
 * Settings selectors
 */
export const settingsSelectors = {
    theme: (state: SettingsState) => state.theme,
    language: (state: SettingsState) => state.language,
    notificationsEnabled: (state: SettingsState) =>
        state.notificationsEnabled,
    isDarkMode: (state: SettingsState) => state.theme === 'dark',
};
