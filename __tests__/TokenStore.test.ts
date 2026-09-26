import { TokenStore, readJwtExpiry } from '@/shared/store/token-store';

const base64Url = (text: string) =>
  btoa(unescape(encodeURIComponent(text))).replace(/\+/g, '-').replace(/\//g, '_').replace(/[=]+$/, '');

const makeJwt = (payload: Record<string, unknown>) => `header.${base64Url(JSON.stringify(payload))}.signature`;

describe('TokenStore', () => {
  let store: TokenStore;

  beforeEach(async () => {
    store = new TokenStore();
    await store.clear();
  });

  it('lưu phiên và nạp lại được sau khi khởi động lại', async () => {
    await store.saveTokens({ accessToken: 'a1', refreshToken: 'r1', expiresAt: 123 }, null);

    const restarted = new TokenStore();
    const session = await restarted.hydrate();

    expect(session?.tokens).toEqual({ accessToken: 'a1', refreshToken: 'r1', expiresAt: 123 });
    expect(restarted.getAccessToken()).toBe('a1');
  });

  it('không kế thừa expiresAt cũ khi token mới không có expiresAt', async () => {
    await store.saveTokens({ accessToken: 'a1', refreshToken: 'r1', expiresAt: Date.now() - 1000 });
    await store.saveTokens({ accessToken: makeJwt({ exp: Date.now() / 1000 + 3600 }), refreshToken: 'r2' });

    expect(store.getSession()?.tokens.expiresAt).toBeUndefined();
    expect(store.isAccessTokenExpired()).toBe(false);
  });

  it('giữ refresh token cũ khi server không rotate', async () => {
    await store.saveTokens({ accessToken: 'a1', refreshToken: 'r1' });
    await store.saveTokens({ accessToken: 'a2', refreshToken: '' });

    expect(store.getRefreshToken()).toBe('r1');
    expect(store.getAccessToken()).toBe('a2');
  });

  it('coi token là hết hạn trước thời điểm exp một khoảng skew', async () => {
    const now = Date.now();
    await store.saveTokens({ accessToken: 'a', refreshToken: 'r', expiresAt: now + 10_000 });

    expect(store.isAccessTokenExpired(now)).toBe(true);
    expect(store.isAccessTokenExpired(now - 60_000)).toBe(false);
  });

  it('clear() xoá cả bộ nhớ và dữ liệu đã lưu', async () => {
    await store.saveTokens({ accessToken: 'a', refreshToken: 'r' });
    await store.clear();

    expect(store.getAccessToken()).toBeNull();
    await expect(new TokenStore().hydrate()).resolves.toBeNull();
  });
});

describe('readJwtExpiry', () => {
  it('đọc claim exp (giây → ms)', () => {
    expect(readJwtExpiry(makeJwt({ exp: 1000, name: 'Nguyễn Văn A' }))).toBe(1_000_000);
  });

  it('trả null với token không phải JWT', () => {
    expect(readJwtExpiry('opaque-token')).toBeNull();
  });
});
