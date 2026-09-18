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
     * Get access token (synchronous MMKV)
     */
    public getAccessToken(): string | null {
        try {
            return storage.getString(STORAGE_KEYS.ACCESS_TOKEN) || null;
        } catch (error) {
            console.error('[TokenStore] Get access token error:', error);
            return null;
        }
    }

    /**
     * Get refresh token (synchronous MMKV)
     */
    public getRefreshToken(): string | null {
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
    public getTokens(): {
        accessToken: string | null;
        refreshToken: string | null;
    } {
        return {
            accessToken: this.getAccessToken(),
            refreshToken: this.getRefreshToken(),
        };
    }

    /**
     * Set access token
     */
    public setAccessToken(token: string): void {
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
    public setRefreshToken(token: string): void {
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
    public setTokens(tokenPair: TokenPair): void {
        try {
            storage.set(STORAGE_KEYS.ACCESS_TOKEN, tokenPair.accessToken);
            storage.set(STORAGE_KEYS.REFRESH_TOKEN, tokenPair.refreshToken);

            // Store expiry nếu có
            if (tokenPair.expiresAt) {
                storage.set(STORAGE_KEYS.TOKEN_EXPIRES_AT, String(tokenPair.expiresAt));
            }
        } catch (error) {
            console.error('[TokenStore] Set tokens error:', error);
            throw error;
        }
    }

    /**
     * Clear access token
     */
    public clearAccessToken(): void {
        try {
            storage.delete(STORAGE_KEYS.ACCESS_TOKEN);
        } catch (error) {
            console.error('[TokenStore] Clear access token error:', error);
        }
    }

    /**
     * Clear refresh token
     */
    public clearRefreshToken(): void {
        try {
            storage.delete(STORAGE_KEYS.REFRESH_TOKEN);
        } catch (error) {
            console.error('[TokenStore] Clear refresh token error:', error);
        }
    }

    /**
     * Clear all tokens
     */
    public clearTokens(): void {
        try {
            storage.delete(STORAGE_KEYS.ACCESS_TOKEN);
            storage.delete(STORAGE_KEYS.REFRESH_TOKEN);
            storage.delete(STORAGE_KEYS.TOKEN_EXPIRES_AT);
        } catch (error) {
            console.error('[TokenStore] Clear tokens error:', error);
        }
    }

    /**
     * Check if has valid access token
     */
    public hasAccessToken(): boolean {
        const token = this.getAccessToken();
        return !!token;
    }

    /**
     * Check if token expired (cần expiresAt được set)
     */
    public isTokenExpired(): boolean {
        try {
            const expiresAtStr = storage.getString(STORAGE_KEYS.TOKEN_EXPIRES_AT);
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
