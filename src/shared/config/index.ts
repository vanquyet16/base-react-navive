/**
 * CONFIG MODULE EXPORTS
 * =====================
 * Centralized export for all configuration modules
 * Usage: import { ENV, API_CONFIG, APP_INFO } from '@/shared/config';
 */

// Environment & API Configuration
export {
    ENV,
    API_CONFIG,
    getApiUrl,
    BASE_URL, // Deprecated
} from './app.config';

// App Metadata
export {
    APP_INFO,
    APP_INFO as APP_CONFIG, // Backward compatibility
} from './app.config';

// Storage Configuration
export {
    STORAGE,
    STORAGE as STORAGE_CONFIG, // Backward compatibility
} from './app.config';

// Type exports
export type { ApiDomain } from './app.config';

// Build info
export * from './build-info';