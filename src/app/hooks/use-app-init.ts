/**
 * APP INIT HOOK
 * =============
 * App initialization logic: load stored data, restore session, etc.
 * Chạy 1 lần khi app mount.
 * 
 */

import { useEffect, useState, useCallback } from 'react';
import { authService } from '@/features/auth/services/auth.service';
import { tokenStore } from '@/shared/store/token-store';
import { useSessionActions } from '@/shared/store/selectors';

/**
 * App init state
 */
interface AppInitState {
    /** Is initializing */
    isLoading: boolean;
    /** Is initialized */
    isReady: boolean;
    /** Error if init failed */
    error: Error | null;
}

/**
 * useAppInit Hook
 * Initialize app: restore session, setup services
 */
export const useAppInit = (): AppInitState => {
    const [state, setState] = useState<AppInitState>({
        isLoading: true,
        isReady: false,
        error: null,
    });

    const { setSession } = useSessionActions();

    /**
     * Initialize app
     * Memoized để avoid infinite loop
     */
    const initializeApp = useCallback(async () => {
        try {
            // 1. Initialize auth service (setup interceptors)
            authService.initialize();

            // 2. Try to restore session từ stored tokens
            const tokens = await tokenStore.getTokens();

            if (tokens.accessToken && tokens.refreshToken) {
                // Has tokens - try to get current user
                try {
                    const user = await authService.getCurrentUser();

                    // Restore session vào store
                    setSession({
                        isAuthenticated: true,
                        user,
                    });
                } catch (error) {
                    // Token invalid - clear tokens
                    console.warn('[AppInit] Token invalid, clearing:', error);
                    await tokenStore.clearTokens();
                }
            }

            // 3. TODO: Load other app data (configs, cached data, etc.)

            // Mark as ready
            setState({
                isLoading: false,
                isReady: true,
                error: null,
            });
        } catch (error) {
            console.error('[AppInit] Initialization error:', error);
            setState({
                isLoading: false,
                isReady: false,
                error: error as Error,
            });
        }
    }, [setSession]); // Add setSession to dependencies

    useEffect(() => {
        initializeApp();
    }, [initializeApp]); // Proper dependency

    return state;
};
