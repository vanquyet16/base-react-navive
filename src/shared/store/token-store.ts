/**
 * TOKEN STORE
 * ===========
 * Lưu phiên đăng nhập (token + hồ sơ user cache) trong MMKV.
 *
 * Interface bất đồng bộ (`hydrate`, `saveTokens`, `clear`) để có thể thay backend lưu trữ
 * (vd: Keychain khi cần bảo mật cao hơn) mà không phải sửa SessionManager/interceptor.
 * Dữ liệu được giữ trong RAM sau `hydrate()` để interceptor đọc đồng bộ.
 */

import { MMKV } from 'react-native-mmkv';
import { STORAGE_KEYS } from '@/shared/constants/storage-keys';
import type { TokenPair } from '@/shared/types/domain/auth';
import type { User } from '@/shared/types/domain/user';
import { logger } from '@/shared/utils/logger';

/** Sai lệch đồng hồ cho phép khi kiểm tra hết hạn — refresh sớm hơn một chút */
const EXPIRY_SKEW_MS = 30_000;

const SESSION_KEY = '@rn_base:session';

const storage = new MMKV({ id: 'token-storage' });

export interface StoredSession {
  tokens: TokenPair;
  /** Hồ sơ user lần cuối lấy được — hiển thị ngay khi mở app / khi offline */
  user: User | null;
}

const isStoredSession = (value: unknown): value is StoredSession => {
  const candidate = value as StoredSession | null;
  return (
    typeof candidate?.tokens?.accessToken === 'string' &&
    typeof candidate.tokens.refreshToken === 'string'
  );
};

/**
 * Đọc claim `exp` (giây) của JWT. Chỉ dùng để quyết định thời điểm refresh,
 * KHÔNG dùng để xác thực — chữ ký chỉ server kiểm tra được.
 */
export const readJwtExpiry = (token: string): number | null => {
  try {
    const payload = token.split('.')[1];
    if (!payload) {
      return null;
    }
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const { exp } = JSON.parse(atob(padded)) as { exp?: unknown };
    return typeof exp === 'number' ? exp * 1000 : null;
  } catch {
    return null;
  }
};

/** Phiên lưu theo định dạng cũ (từng key riêng lẻ) → chuyển sang định dạng mới một lần */
const readLegacySession = (): StoredSession | null => {
  const accessToken = storage.getString(STORAGE_KEYS.ACCESS_TOKEN);
  const refreshToken = storage.getString(STORAGE_KEYS.REFRESH_TOKEN);
  if (!accessToken || !refreshToken) {
    return null;
  }
  const expiresAt = Number(storage.getString(STORAGE_KEYS.TOKEN_EXPIRES_AT));
  return {
    tokens: { accessToken, refreshToken, expiresAt: Number.isFinite(expiresAt) && expiresAt > 0 ? expiresAt : undefined },
    user: null,
  };
};

const clearLegacyKeys = () => {
  storage.delete(STORAGE_KEYS.ACCESS_TOKEN);
  storage.delete(STORAGE_KEYS.REFRESH_TOKEN);
  storage.delete(STORAGE_KEYS.TOKEN_EXPIRES_AT);
};

class TokenStore {
  private session: StoredSession | null = null;

  /** Nạp phiên vào RAM. Dữ liệu hỏng sẽ bị xoá. */
  public async hydrate(): Promise<StoredSession | null> {
    try {
      const raw = storage.getString(SESSION_KEY);
      if (!raw) {
        const legacy = readLegacySession();
        if (legacy) {
          await this.persist(legacy);
          clearLegacyKeys();
        }
        this.session = legacy;
        return legacy;
      }
      const parsed: unknown = JSON.parse(raw);
      if (!isStoredSession(parsed)) {
        logger.warn('[TokenStore] Dữ liệu phiên không hợp lệ, xoá bỏ');
        await this.clear();
        return null;
      }
      this.session = parsed;
      return parsed;
    } catch (error) {
      logger.error('[TokenStore] Không đọc được phiên đã lưu', error);
      this.session = null;
      return null;
    }
  }

  public getSession(): StoredSession | null {
    return this.session;
  }

  public getAccessToken(): string | null {
    return this.session?.tokens.accessToken ?? null;
  }

  public getRefreshToken(): string | null {
    return this.session?.tokens.refreshToken ?? null;
  }

  public getCachedUser(): User | null {
    return this.session?.user ?? null;
  }

  /**
   * Access token đã (sắp) hết hạn. `expiresAt` của server được ưu tiên,
   * sau đó tới claim `exp`; không xác định được thì coi như còn hạn và để server quyết định (401).
   */
  public isAccessTokenExpired(now: number = Date.now()): boolean {
    const tokens = this.session?.tokens;
    if (!tokens) {
      return true;
    }
    const expiresAt = tokens.expiresAt ?? readJwtExpiry(tokens.accessToken);
    return expiresAt !== null && now >= expiresAt - EXPIRY_SKEW_MS;
  }

  /**
   * Ghi token mới. Refresh token cũ được giữ nếu server không cấp lại (không rotate),
   * `expiresAt` luôn được thay mới — không kế thừa giá trị của token trước.
   */
  public async saveTokens(tokens: TokenPair, user?: User | null): Promise<void> {
    const next: StoredSession = {
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken || this.session?.tokens.refreshToken || '',
        expiresAt: tokens.expiresAt,
      },
      user: user === undefined ? this.session?.user ?? null : user,
    };
    if (!next.tokens.refreshToken) {
      throw new Error('[TokenStore] Thiếu refresh token');
    }
    await this.persist(next);
  }

  public async saveUser(user: User): Promise<void> {
    if (!this.session) {
      return;
    }
    await this.persist({ ...this.session, user });
  }

  public async clear(): Promise<void> {
    this.session = null;
    try {
      storage.delete(SESSION_KEY);
      clearLegacyKeys();
    } catch (error) {
      logger.error('[TokenStore] Không xoá được phiên', error);
    }
  }

  private async persist(next: StoredSession): Promise<void> {
    this.session = next;
    storage.set(SESSION_KEY, JSON.stringify(next));
  }
}

export const tokenStore = new TokenStore();

export { TokenStore };
