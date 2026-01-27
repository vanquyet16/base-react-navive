/**
 * USE SPLASH SCREEN HOOK
 * ======================
 * Hook để control splash screen lifecycle trong React components
 *
 * @senior-pattern Encapsulate splash logic, memoized callbacks
 *
 * @example
 * ```tsx
 * const MyApp = () => {
 *   const { isReady } = useAppInit();
 *   const { hideSplash } = useSplashScreen();
 *
 *   useEffect(() => {
 *     if (isReady) {
 *       hideSplash();
 *     }
 *   }, [isReady, hideSplash]);
 * };
 * ```
 */

import { useCallback, useEffect, useRef } from 'react';
import { splashService, type SplashConfig } from '@/shared/services/splash';

/**
 * UseSplashScreenOptions - Hook configuration
 */
interface UseSplashScreenOptions {
    /** Auto hide splash khi component mount */
    autoHide?: boolean;
    /** Dependencies để trigger auto hide */
    deps?: unknown[];
}

/**
 * UseSplashScreen Hook
 * @param options - Hook options
 * @returns Control functions
 */
export const useSplashScreen = (options: UseSplashScreenOptions = {}) => {
    const { autoHide = false, deps = [] } = options;

    // Ref để track đã hide chưa (tránh hide nhiều lần)
    const hasHiddenRef = useRef(false);

    /**
     * Hide splash screen
     * Memoized callback
     */
    const hideSplash = useCallback(async () => {
        if (hasHiddenRef.current) {
            return; // Đã hide rồi, skip
        }

        hasHiddenRef.current = true;
        await splashService.hide();
    }, []);

    /**
     * Set splash config
     * Memoized callback
     */
    const setConfig = useCallback((config: SplashConfig) => {
        splashService.setConfig(config);
    }, []);

    /**
     * Auto hide effect
     */
    useEffect(() => {
        if (autoHide) {
            hideSplash();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoHide, ...deps]);

    return {
        hideSplash,
        setConfig,
    };
};
