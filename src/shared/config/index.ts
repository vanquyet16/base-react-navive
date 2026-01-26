/**
 * CONFIG MODULE EXPORTS
 * =====================
 * Centralized export cho tất cả config modules.
 * Import như: import { ENV, BUILD_INFO } from '@/shared/config';
 */

// App config (existing - keep for backwards compatibility)
// Note: ENV từ app.config sẽ bị override bởi ENV từ env.ts (new)
export {
    API_CONFIG,
    APP_CONFIG,
    STORAGE_CONFIG,
    THEME_CONFIG,
    VALIDATION_CONFIG,
    ERROR_MESSAGES,
    PERFORMANCE_CONFIG,
} from './app.config';

// Environment config (new - override old ENV)
export * from './env';

// Build info (new)
export * from './build-info';