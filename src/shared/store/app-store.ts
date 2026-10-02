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
        (set, get, store) => ({
            // Session slice
            ...createSessionSlice(set, get, store),

            // Settings slice
            ...createSettingsSlice(set, get, store),
        }),
        {
            name: 'app-store', // Storage key
            storage: createJSONStorage(() => mmkvStorage),

            // Chỉ persist settings. Phiên đăng nhập nằm trong tokenStore (MMKV riêng).
            partialize: state => ({
                theme: state.theme,
                language: state.language,
                notificationsEnabled: state.notificationsEnabled,
            }),
        },
    ),
);

/** Reset toàn bộ store (dùng trong test) */
export const resetAppStore = () => {
    useAppStore.getState().setSessionStatus('unknown');
    useAppStore.getState().resetSettings();
};
