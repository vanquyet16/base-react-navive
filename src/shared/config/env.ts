/**
 * ENVIRONMENT CONFIGURATION
 * =========================
 * Type-safe environment variables.
 * Validate và provide defaults để tránh runtime errors.
 * 
 * @senior-pattern Environment validation với defaults
 */

/**
 * Environment type
 */
export type Environment = 'development' | 'staging' | 'production' | 'test';

/**
 * Get current environment
 */
export const getEnvironment = (): Environment => {
    if (__DEV__) {
        return 'development';
    }
    // Có thể check thêm từ build configs
    return 'production';
};

/**
 * Environment variables interface
 * Tất cả env vars phải được define ở đây
 */
interface EnvironmentVariables {
    /** Current environment */
    ENVIRONMENT: Environment;
    /** Is development mode */
    IS_DEV: boolean;
    /** Is production mode */
    IS_PROD: boolean;
    /** API base URL */
    API_BASE_URL: string;
    /** API timeout */
    API_TIMEOUT: number;
    /** Enable debug logging */
    ENABLE_DEBUG: boolean;
    /** Enable error reporting (Sentry, etc.) */
    ENABLE_ERROR_REPORTING: boolean;
}

/**
 * Get environment variable với type-safe và defaults
 * Trade-off: Hardcode defaults để app không crash khi missing env vars
 */
const createEnvConfig = (): EnvironmentVariables => {
    const environment = getEnvironment();
    const isDev = environment === 'development';
    const isProd = environment === 'production';

    return {
        // Environment
        ENVIRONMENT: environment,
        IS_DEV: isDev,
        IS_PROD: isProd,

        // API Configuration
        // TODO: Replace với real API URLs khi deploy
        API_BASE_URL: isDev
            ? 'http://localhost:3000/api' // Local dev server
            : 'https://api.production.com', // Production API

        API_TIMEOUT: 10000, // 10 seconds

        // Feature Flags
        ENABLE_DEBUG: isDev,
        ENABLE_ERROR_REPORTING: isProd,
    };
};

/**
 * Exported environment config
 * Sử dụng như: ENV.API_BASE_URL
 */
export const ENV = createEnvConfig();

/**
 * Type-safe environment check helpers
 */
export const isDevelopment = (): boolean => ENV.IS_DEV;
export const isProduction = (): boolean => ENV.IS_PROD;
export const shouldEnableDebug = (): boolean => ENV.ENABLE_DEBUG;
