import { sessionManager } from '@/features/auth/session/session-manager';
import { authService } from '@/features/auth/services/auth.service';
import { tokenStore } from '@/shared/store/token-store';
import { useAppStore } from '@/shared/store/app-store';
import { queryClient } from '@/shared/query/query-client';
import { authKeys } from '@/shared/query/query-keys';
import type { User } from '@/shared/types/domain/user';

jest.mock('@/shared/utils/CustomToast', () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn(), info: jest.fn(), loading: jest.fn(), hide: jest.fn() },
}));

const user = { id: 'u1', displayName: 'Cán bộ A', email: 'a@x.vn' } as User;
const tokens = { accessToken: 'a1', refreshToken: 'r1' };

const status = () => useAppStore.getState().sessionStatus;

describe('SessionManager', () => {
  // Query cache giữ timer GC (gcTime) — dọn để Jest thoát sạch
  afterAll(() => queryClient.clear());

  beforeEach(async () => {
    jest.restoreAllMocks();
    await tokenStore.clear();
    queryClient.clear();
    useAppStore.getState().setSessionStatus('unknown');
  });

  it('restore(): không có phiên → guest', async () => {
    await sessionManager.restore();
    expect(status()).toBe('guest');
  });

  it('restore(): có phiên trong Keychain → authenticated + seed user cache (không cần mạng)', async () => {
    await tokenStore.saveTokens(tokens, user);

    await sessionManager.restore();

    expect(status()).toBe('authenticated');
    expect(queryClient.getQueryData(authKeys.me())).toEqual(user);
  });

  it('signIn(): lưu token vào Keychain và chuyển sang authenticated', async () => {
    jest.spyOn(authService, 'login').mockResolvedValue({ tokens, user });

    await sessionManager.signIn({ username: 'a', password: 'b' });

    expect(tokenStore.getAccessToken()).toBe('a1');
    expect(status()).toBe('authenticated');
  });

  it('signOut(): xoá local ngay cả khi server lỗi/offline, thu hồi server với token cũ', async () => {
    await sessionManager.establish(tokens, user);
    const logout = jest.spyOn(authService, 'logout').mockRejectedValue(new Error('offline'));

    await sessionManager.signOut('user');

    expect(status()).toBe('guest');
    expect(tokenStore.getAccessToken()).toBeNull();
    expect(queryClient.getQueryData(authKeys.me())).toBeUndefined();
    expect(logout).toHaveBeenCalledWith(tokens);
  });

  it('signOut() đồng thời nhiều lần chỉ thực hiện một lần', async () => {
    await sessionManager.establish(tokens, user);
    const logout = jest.spyOn(authService, 'logout').mockResolvedValue();

    await Promise.all([sessionManager.signOut(), sessionManager.signOut(), sessionManager.signOut()]);

    expect(logout).toHaveBeenCalledTimes(1);
  });

  it('handleSessionExpired(): đăng xuất local, KHÔNG gọi logout server (token đã vô hiệu)', async () => {
    await sessionManager.establish(tokens, user);
    const logout = jest.spyOn(authService, 'logout').mockResolvedValue();

    sessionManager.handleSessionExpired();
    await new Promise<void>(resolve => setImmediate(resolve));

    expect(status()).toBe('guest');
    expect(logout).not.toHaveBeenCalled();
  });

  it('refreshAccessToken(): lưu cặp token mới', async () => {
    await sessionManager.establish(tokens, user);
    jest.spyOn(authService, 'refreshToken').mockResolvedValue({ accessToken: 'a2', refreshToken: 'r2' });

    await expect(sessionManager.refreshAccessToken()).resolves.toBe('a2');
    expect(tokenStore.getRefreshToken()).toBe('r2');
  });
});
