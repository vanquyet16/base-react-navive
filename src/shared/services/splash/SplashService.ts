/**
 * SPLASH SERVICE
 * ==============
 * Service wrapper cho react-native-bootsplash
 * Quản lý splash screen lifecycle với type-safe interface
 *
 * @senior-pattern Defensive programming và centralized splash management
 */

import RNBootSplash from 'react-native-bootsplash';

/**
 * SplashConfig - Configuration cho splash behavior
 */
export interface SplashConfig {
    /** Fade animation khi hide */
    fade?: boolean;
}

/**
 * Default config
 */
const DEFAULT_CONFIG: Required<SplashConfig> = {
    fade: true,
};

/**
 * SplashService Class
 * Singleton service để control splash screen
 */
class SplashService {
    private config: Required<SplashConfig> = DEFAULT_CONFIG;
    private hidePromise: Promise<void> | null = null;

    /**
     * Set config cho splash behavior
     * @param config - Partial config object
     */
    setConfig(config: SplashConfig): void {
        this.config = { ...this.config, ...config };
    }

    /**
     * Ẩn splash screen với fade animation
     * @returns Promise resolved khi splash đã ẩn
     */
    async hide(): Promise<void> {
        try {
            // Avoid multiple hide calls
            if (this.hidePromise) {
                return this.hidePromise;
            }

            // Create hide promise
            this.hidePromise = RNBootSplash.hide({ fade: this.config.fade });

            await this.hidePromise;

            // Reset promise after complete
            this.hidePromise = null;
        } catch (error) {
            // Defensive: Log error nhưng không throw để không crash app
            console.warn('[SplashService] Failed to hide splash:', error);
            this.hidePromise = null;
        }
    }

    /**
     * Check nếu splash đang hiển thị
     * @returns Promise với boolean status
     */
    async isVisible(): Promise<boolean> {
        try {
            const isVisible = await RNBootSplash.isVisible();
            return isVisible;
        } catch (error) {
            console.warn('[SplashService] Failed to check visibility:', error);
            return false; // Default fallback
        }
    }
}

/**
 * Export singleton instance
 */
export const splashService = new SplashService();
