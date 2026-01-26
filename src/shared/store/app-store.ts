/**
 * APP STORE (Root Store)
 * ======================
 * Root Zustand store combining all slices.
 * Module pattern để organize state theo domains.
 * 
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import { createSessionSlice, type SessionState } from './session-store';
import { createSettingsSlice, type SettingsState } from './settings-store';

/**
 * MMKV storage instance cho Zustand persistence
 */
const storage = new MMKV({
    id: 'app-storage',
});

/**
 * MMKV adapter cho Zustand persist middleware
 * Trade-off: MMKV nhanh hơn AsyncStorage
 */
const mmkvStorage = {
    getItem: (name: string) => {
        const value = storage.getString(name);
        return value ?? null;
    },
    setItem: (name: string, value: string) => {
        storage.set(name, value);
    },
    removeItem: (name: string) => {
        storage.delete(name);
    },
};

/**
 * Combined App Store State
 * Compose all slices vào một store
 */
export type AppStoreState = SessionState & SettingsState;

/**
 * Create root store với persistence
 */
export const useAppStore = create<AppStoreState>()(
    persist(
        (set, get) => ({
            // Session slice
            ...createSessionSlice(set, get),

            // Settings slice
            ...createSettingsSlice(set, get),
        }),
        {
            name: 'app-store', // Storage key
            storage: createJSONStorage(() => mmkvStorage),

            // Partition: chỉ persist settings, không persist session
            // Trade-off: Session sensitive nên không persist, load từ tokenStore
            partialize: (state) => ({
                // Persist settings
                theme: state.theme,
                language: state.language,
                notificationsEnabled: state.notificationsEnabled,

                // Không persist session (sẽ restore từ tokenStore)
                // isAuthenticated: state.isAuthenticated,
                // user: state.user,
                // tokens: ...
            }),
        },
    ),
);

/**
 * Dev-only: Reset entire store (để testing)
 */
export const resetAppStore = () => {
    useAppStore.getState().clearSession();
    useAppStore.getState().resetSettings();
};
