/**
 * BOOTSTRAP (COMPOSITION ROOT)
 * ============================
 * Nơi DUY NHẤT nối các tầng với nhau, theo thứ tự tường minh:
 *   1. Nối tầng HTTP với SessionManager (token, refresh, hết phiên)
 *   2. Khôi phục phiên đã lưu
 *
 * Env đã được validate khi import `@/shared/config/env` — cấu hình sai sẽ dừng app ngay.
 */

import { configureHttpAuth } from '@/shared/services/http/axios-interceptors';
import { tokenStore } from '@/shared/store/token-store';
import { sessionManager } from '@/features/auth/session/session-manager';
import { ENV } from '@/shared/config/env';
import { logger } from '@/shared/utils/logger';

export const bootstrap = async (): Promise<void> => {
    configureHttpAuth({
        getAccessToken: () => tokenStore.getAccessToken(),
        isAccessTokenExpired: () => tokenStore.isAccessTokenExpired(),
        refreshAccessToken: sessionManager.refreshAccessToken,
        onSessionExpired: sessionManager.handleSessionExpired,
    });

    await sessionManager.restore();

    logger.info(`[Bootstrap] Sẵn sàng · env=${ENV.APP_ENV}`);
};
