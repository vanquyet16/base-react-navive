/**
 * SESSION STORE (Zustand Slice)
 * ==============================
 * Quản lý auth session state: user, tokens, authentication status.
 * Client-side state cho session management.
 * 
 */

import { StateCreator } from 'zustand';
import type { User } from '@/shared/types/domain/user';
import type { AuthSession } from '@/shared/types/domain/auth';
import type { AppStoreState } from './app-store';

/**
 * Session Store State
 */
export interface SessionState {
    // State
    isAuthenticated: boolean;
    user: User | null;

    // Actions
    setSession: (session: Partial<AuthSession>) => void;
    setUser: (user: User | null) => void;
    clearSession: () => void;
}

/**
 * Initial state
 */
const initialState: Pick<
    SessionState,
    'isAuthenticated' | 'user'
> = {
    isAuthenticated: false,
    user: null,
};

/**
 * Create session slice
 * Pattern: Slice factory function để compose vào root store
 */
export const createSessionSlice: StateCreator<
    AppStoreState,
    [],
    [],
    SessionState
> = (set) => ({
    ...initialState,

    /**
     * Set session data (partial update)
     */
    setSession: (session) => {
        set({
            ...session,
            isAuthenticated: true,
        });
    },

    /**
     * Set user data
     */
    setUser: (user) => {
        set({ user });
    },

    /**
     * Clear session (logout)
     */
    clearSession: () => {
        set(initialState);
    },
});

/**
 * Selectors cho session store
 * Trade-off: Memoized selectors để avoid unnecessary re-renders
 */
export const sessionSelectors = {
    isAuthenticated: (state: SessionState) => state.isAuthenticated,
    user: (state: SessionState) => state.user,
    userId: (state: SessionState) => state.user?.id ?? null,
    userRole: (state: SessionState) => state.user?.role ?? null,
};
