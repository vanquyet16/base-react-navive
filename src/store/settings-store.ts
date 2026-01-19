/**
 * SETTINGS STORE (Zustand Slice)
 * ===============================
 * Quản lý app settings: theme, language, preferences.
 * Persist vào storage để maintain across app restarts.
 * 
 * @senior-pattern Settings với persistence
 */

import type { Theme, Language } from '@/types/common';

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
export const createSettingsSlice = (
    set: any,
    get: any,
): SettingsState => ({
    ...defaultSettings,

    /**
     * Set theme (light/dark)
     */
    setTheme: (theme) => {
        set((state: any) => ({
            ...state,
            theme,
        }));
    },

    /**
     * Set language
     */
    setLanguage: (language) => {
        set((state: any) => ({
            ...state,
            language,
        }));
    },

    /**
     * Toggle notifications
     */
    setNotificationsEnabled: (enabled) => {
        set((state: any) => ({
            ...state,
            notificationsEnabled: enabled,
        }));
    },

    /**
     * Reset về default settings
     */
    resetSettings: () => {
        set((state: any) => ({
            ...state,
            ...defaultSettings,
        }));
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
