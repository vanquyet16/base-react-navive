import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import { AuthTokens } from '@/shared/types';


// Tạo instance lưu trữ MMKV
const storage = new MMKV();

// Bộ điều hợp lưu trữ MMKV tùy chỉnh cho Zustand
const mmkvStorage = {
    getItem: (name: string) => {
        const value = storage.getString(name);
        return value ? JSON.parse(value) : null;
    },
    setItem: (name: string, value: string) => {
        storage.set(name, value);
    },
    removeItem: (name: string) => {
        storage.delete(name);
    },
};

interface AuthState {
    // user: User | null;
    tokens: AuthTokens | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthActions {
    login: (tokens: AuthTokens) => void;
    logout: () => void;
    // updateUser: (user: Partial<User>) => void;
    updateTokens: (tokens: AuthTokens) => void;
    setLoading: (loading: boolean) => void;
    clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            // State
            tokens: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            // Actions
            login: (tokens: AuthTokens) => {
                set({
                    // user,
                    tokens,
                    isAuthenticated: true,
                    isLoading: false,
                });
            },

            logout: () => {
                set({
                    tokens: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            },

            // updateUser: (userData: Partial<User>) => {
            //     const { user } = get();
            //     if (user) {
            //         set({
            //             user: { ...user, ...userData },
            //         });
            //     }
            // },

            updateTokens: (tokens: AuthTokens) => {
                set({ tokens });
            },

            setLoading: (isLoading: boolean) => {
                set({ isLoading });
            },

            clearAuth: () => {
                set({
                    tokens: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            },
        }),
        {
            name: 'auth-store',
            storage: createJSONStorage(() => mmkvStorage),
            partialize: (state) => ({
                tokens: state.tokens,
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
);

// Selectors
// export const useUser = () => useAuthStore(state => state.user);
export const useTokens = () => useAuthStore(state => state.tokens);
export const useIsAuthenticated = () => useAuthStore(state => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore(state => state.isLoading);