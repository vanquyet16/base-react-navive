/**
 * TOKEN STORE
 * ===========
 * Quản lý tokens trong AsyncStorage (MMKV).
 * Single source of truth cho access/refresh tokens.
 * 
 */

import { MMKV } from 'react-native-mmkv';
import { STORAGE_KEYS } from '@/shared/constants/storage-keys';
import type { TokenPair } from '@/shared/types/domain/auth';

/**
 * MMKV storage instance
 * Trade-off: MMKV nhanh hơn AsyncStorage, synchronous API
 */
const storage = new MMKV({
    id: 'token-storage',
    // Có thể enable encryption nếu cần
    // encryptionKey: 'your-encryption-key',
});

/**
 * Token Store class
 * Quản lý CRUD operations cho tokens
 */
class TokenStore {
    /**
     * Get access token
     */
    public async getAccessToken(): Promise<string | null> {
        try {
            return storage.getString(STORAGE_KEYS.ACCESS_TOKEN) || null;
        } catch (error) {
            console.error('[TokenStore] Get access token error:', error);
            return null;
        }
    }

    /**
     * Get refresh token
     */
    public async getRefreshToken(): Promise<string | null> {
        try {
            return storage.getString(STORAGE_KEYS.REFRESH_TOKEN) || null;
        } catch (error) {
            console.error('[TokenStore] Get refresh token error:', error);
            return null;
        }
    }

    /**
     * Get both tokens
     */
    public async getTokens(): Promise<{
        accessToken: string | null;
        refreshToken: string | null;
    }> {
        const [accessToken, refreshToken] = await Promise.all([
            this.getAccessToken(),
            this.getRefreshToken(),
        ]);
        return { accessToken, refreshToken };
    }

    /**
     * Set access token
     */
    public async setAccessToken(token: string): Promise<void> {
        try {
            storage.set(STORAGE_KEYS.ACCESS_TOKEN, token);
        } catch (error) {
            console.error('[TokenStore] Set access token error:', error);
            throw error;
        }
    }

    /**
     * Set refresh token
     */
    public async setRefreshToken(token: string): Promise<void> {
        try {
            storage.set(STORAGE_KEYS.REFRESH_TOKEN, token);
        } catch (error) {
            console.error('[TokenStore] Set refresh token error:', error);
            throw error;
        }
    }

    /**
     * Set both tokens (atomic operation)
     */
    public async setTokens(tokenPair: TokenPair): Promise<void> {
        try {
            storage.set(STORAGE_KEYS.ACCESS_TOKEN, tokenPair.accessToken);
            storage.set(STORAGE_KEYS.REFRESH_TOKEN, tokenPair.refreshToken);

            // Store expiry nếu có
            if (tokenPair.expiresAt) {
                storage.set('token_expires_at', String(tokenPair.expiresAt));
            }
        } catch (error) {
            console.error('[TokenStore] Set tokens error:', error);
            throw error;
        }
    }

    /**
     * Clear access token
     */
    public async clearAccessToken(): Promise<void> {
        try {
            storage.delete(STORAGE_KEYS.ACCESS_TOKEN);
        } catch (error) {
            console.error('[TokenStore] Clear access token error:', error);
        }
    }

    /**
     * Clear refresh token
     */
    public async clearRefreshToken(): Promise<void> {
        try {
            storage.delete(STORAGE_KEYS.REFRESH_TOKEN);
        } catch (error) {
            console.error('[TokenStore] Clear refresh token error:', error);
        }
    }

    /**
     * Clear all tokens
     */
    public async clearTokens(): Promise<void> {
        try {
            storage.delete(STORAGE_KEYS.ACCESS_TOKEN);
            storage.delete(STORAGE_KEYS.REFRESH_TOKEN);
            storage.delete('token_expires_at');
        } catch (error) {
            console.error('[TokenStore] Clear tokens error:', error);
        }
    }

    /**
     * Check if has valid access token
     */
    public async hasAccessToken(): Promise<boolean> {
        const token = await this.getAccessToken();
        return !!token;
    }

    /**
     * Check if token expired (cần expiresAt được set)
     */
    public async isTokenExpired(): Promise<boolean> {
        try {
            const expiresAtStr = storage.getString('token_expires_at');
            if (!expiresAtStr) {
                return false; // Không có expiry = assume còn valid
            }

            const expiresAt = Number(expiresAtStr);
            const now = Date.now();

            return now >= expiresAt;
        } catch (error) {
            console.error('[TokenStore] Check token expired error:', error);
            return false;
        }
    }
}

/**
 * Singleton token store instance
 */
export const tokenStore = new TokenStore();

/**
 * Export class nếu cần testing
 */
export { TokenStore };
