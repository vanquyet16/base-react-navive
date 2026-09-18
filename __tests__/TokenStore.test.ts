/**
 * UNIT TESTS - TOKEN STORE
 * =========================
 * Kiểm thử tính đúng đắn của logic lưu trữ, truy xuất và xóa Tokens.
 */

import { tokenStore } from '@/shared/store/token-store';

describe('TokenStore Unit Tests', () => {
  beforeEach(async () => {
    await tokenStore.clearTokens();
  });

  it('Lưu trữ và lấy đúng access token và refresh token', async () => {
    const mockTokens = {
      accessToken: 'test_access_token_123',
      refreshToken: 'test_refresh_token_456',
    };

    await tokenStore.setTokens(mockTokens);

    const tokens = await tokenStore.getTokens();
    expect(tokens.accessToken).toBe(mockTokens.accessToken);
    expect(tokens.refreshToken).toBe(mockTokens.refreshToken);
  });

  it('Xóa tokens hoàn toàn khi gọi clearTokens', async () => {
    await tokenStore.setTokens({
      accessToken: 'access_to_clear',
      refreshToken: 'refresh_to_clear',
    });

    await tokenStore.clearTokens();

    const tokens = await tokenStore.getTokens();
    expect(tokens.accessToken).toBeNull();
    expect(tokens.refreshToken).toBeNull();
  });

  it('Kiểm tra trạng thái hasAccessToken', async () => {
    expect(await tokenStore.hasAccessToken()).toBe(false);

    await tokenStore.setAccessToken('new_access_token');
    expect(await tokenStore.hasAccessToken()).toBe(true);
  });
});
