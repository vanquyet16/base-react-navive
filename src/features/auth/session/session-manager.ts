/**
 * SESSION MANAGER
 * ===============
 * Owner DUY NHẤT của vòng đời phiên đăng nhập. Mọi nơi (UI, interceptor, app lifecycle) đều
 * đi qua đây, nên token (tokenStore — MMKV), trạng thái điều hướng (Zustand) và cache dữ liệu
 * (TanStack Query) luôn đồng bộ.
 *
 *   restore()  → khi khởi động: nạp phiên từ MMKV (tokenStore), không cần mạng
 *   signIn()   → lưu token + user, chuyển sang Main
 *   signOut()  → xoá local TRƯỚC (luôn thành công kể cả offline), thu hồi server sau (best-effort)
 *   refreshAccessToken() / handleSessionExpired() → cung cấp cho interceptor HTTP
 */

import { authService } from '@/features/auth/services/auth.service';
import { tokenStore } from '@/shared/store/token-store';
import { useAppStore } from '@/shared/store/app-store';
import { queryClient } from '@/shared/query/query-client';
import { authKeys } from '@/shared/query/query-keys';
import { logger } from '@/shared/utils/logger';
import CustomToast from '@/shared/utils/CustomToast';
import type { LoginRequest, LoginResponse, TokenPair } from '@/shared/types/domain/auth';
import type { User } from '@/shared/types/domain/user';

export type SignOutReason = 'user' | 'expired';

const SIGN_OUT_MESSAGES: Record<Exclude<SignOutReason, 'user'>, string> = {
    expired: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
};

class SessionManager {
    private signingOut: Promise<void> | null = null;

    private setStatus(status: 'authenticated' | 'guest'): void {
        useAppStore.getState().setSessionStatus(status);
    }

    /**
     * Seed hồ sơ user vào query cache. Đánh dấu stale (`updatedAt: 0`) để màn hình đầu tiên
     * dùng `useCurrentUser` sẽ xác thực lại với server; nếu token bị thu hồi, interceptor sẽ
     * refresh thất bại → handleSessionExpired.
     */
    private seedUser(user: User | null, fresh: boolean): void {
        if (user) {
            queryClient.setQueryData(authKeys.me(), user, { updatedAt: fresh ? Date.now() : 0 });
        }
    }

    public async restore(): Promise<void> {
        const session = await tokenStore.hydrate();
        if (!session) {
            this.setStatus('guest');
            return;
        }
        this.seedUser(session.user, false);
        this.setStatus('authenticated');
    }

    public async signIn(request: LoginRequest): Promise<LoginResponse> {
        const response = await authService.login(request);
        await this.establish(response.tokens, response.user);
        return response;
    }

    /** Dùng khi API khác (vd: đăng ký) trả về token */
    public async establish(tokens: TokenPair, user: User | null): Promise<void> {
        await tokenStore.saveTokens(tokens, user);
        this.seedUser(user, true);
        this.setStatus('authenticated');
    }

    /** Cập nhật hồ sơ user cache offline sau mỗi lần lấy thành công từ server */
    public async cacheUser(user: User): Promise<void> {
        try {
            await tokenStore.saveUser(user);
        } catch (error) {
            logger.warn('[Session] Không cache được hồ sơ user', error);
        }
    }

    /** Idempotent: nhiều nguồn gọi cùng lúc (401 song song, người dùng bấm) chỉ đăng xuất một lần */
    public signOut(reason: SignOutReason = 'user'): Promise<void> {
        if (!this.signingOut) {
            this.signingOut = this.performSignOut(reason).finally(() => {
                this.signingOut = null;
            });
        }
        return this.signingOut;
    }

    private async performSignOut(reason: SignOutReason): Promise<void> {
        const accessToken = tokenStore.getAccessToken();
        const refreshToken = tokenStore.getRefreshToken();

        await tokenStore.clear();
        queryClient.clear();
        this.setStatus('guest');

        if (reason !== 'user') {
            CustomToast.info(SIGN_OUT_MESSAGES[reason], 3);
        }

        // Phiên đã hết hạn thì server không cần (và không chấp nhận) thu hồi
        if (reason !== 'expired' && accessToken && refreshToken) {
            authService.logout({ accessToken, refreshToken }).catch(error => {
                logger.warn('[Session] Thu hồi phiên phía server thất bại (bỏ qua)', error);
            });
        }
    }

    public refreshAccessToken = async (): Promise<string> => {
        const refreshToken = tokenStore.getRefreshToken();
        if (!refreshToken) {
            throw new Error('[Session] Không có refresh token');
        }
        const tokens = await authService.refreshToken(refreshToken);
        await tokenStore.saveTokens(tokens);
        return tokens.accessToken;
    };

    public handleSessionExpired = (): void => {
        if (useAppStore.getState().sessionStatus === 'authenticated') {
            this.signOut('expired');
        }
    };
}

export const sessionManager = new SessionManager();
