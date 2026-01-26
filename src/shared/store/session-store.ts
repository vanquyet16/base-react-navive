/**
 * SESSION STORE (Zustand Slice)
 * ==============================
 * Quản lý auth session state: user, tokens, authentication status.
 * Client-side state cho session management.
 * 
 * @senior-pattern Zustand slice pattern với typed selectors
 */

import type { User } from '@/shared/types/domain/user';
import type { AuthSession } from '@/shared/types/domain/auth';

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
export const createSessionSlice = (
    set: any,
    get: any,
): SessionState => ({
    ...initialState,

    /**
     * Set session data (partial update)
     */
    setSession: (session) => {
        set((state: any) => ({
            ...state,
            ...session,
            isAuthenticated: true,
        }));
    },

    /**
     * Set user data
     */
    setUser: (user) => {
        set((state: any) => ({
            ...state,
            user,
        }));
    },

    /**
     * Clear session (logout)
     */
    clearSession: () => {
        set((state: any) => ({
            ...state,
            ...initialState,
        }));
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
