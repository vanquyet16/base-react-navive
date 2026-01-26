/**
 * AUTH SERVICE
 * ============
 * Authentication service: login, register, logout, refresh token.
 * Integrates với HTTP client và token store.
 * 
 * @senior-pattern Service layer với single responsibility
 */

import { httpClient } from '../http/http-client';
import { tokenStore } from './token-store';
import { setupTokenHandlers } from '../http/axios-interceptors';
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    ForgotPasswordRequest,
    ChangePasswordRequest,
} from '@/types/domain/auth';
import type { ApiResponse } from '@/types/api';

/**
 * API Endpoints
 */
const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    CHANGE_PASSWORD: '/auth/change-password',
    ME: '/auth/me',
} as const;

/**
 * Auth Service class
 */
class AuthService {
    /**
     * Initialize auth service
     * Setup interceptors với token handlers
     */
    public initialize(): void {
        setupTokenHandlers({
            getAccessToken: () => tokenStore.getAccessToken(),
            getRefreshToken: () => tokenStore.getRefreshToken(),
            refreshToken: () => this.refreshTokenInternal(),
            onTokenRefreshFailed: () => this.handleRefreshFailed(),
        });
    }

    /**
     * Login
     * @param request - Login credentials
     * @returns User + tokens
     */
    public async login(request: LoginRequest): Promise<LoginResponse> {
        // Call API với skipAuth vì chưa có token
        const response = await httpClient.post<ApiResponse<LoginResponse>>(
            AUTH_ENDPOINTS.LOGIN,
            request,
            { skipAuth: true },
        );

        // Validate response
        if (!response.data) {
            throw new Error('Invalid login response');
        }

        const { tokens, user } = response.data;

        // Store tokens
        await tokenStore.setTokens(tokens);

        return { tokens, user };
    }

    /**
     * Register
     * @param request - Registration data
     * @returns Success response
     */
    public async register(
        request: RegisterRequest,
    ): Promise<RegisterResponse> {
        const response = await httpClient.post<ApiResponse<RegisterResponse>>(
            AUTH_ENDPOINTS.REGISTER,
            request,
            { skipAuth: true },
        );

        // Auto login sau register nếu backend return tokens
        if (response.data.tokens) {
            await tokenStore.setTokens(response.data.tokens);
        }

        return response.data;
    }

    /**
     * Logout
     * Clear tokens và gọi API logout nếu cần
     */
    public async logout(): Promise<void> {
        try {
            // Call API logout (best effort - không care nếu fail)
            await httpClient.post(AUTH_ENDPOINTS.LOGOUT);
        } catch (error) {
            console.warn('[AuthService] Logout API error (ignored):', error);
        } finally {
            // Always clear local tokens
            await tokenStore.clearTokens();
        }
    }

    /**
     * Refresh token (internal - called by interceptor)
     */
    private async refreshTokenInternal(): Promise<string> {
        const refreshToken = await tokenStore.getRefreshToken();

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const request: RefreshTokenRequest = { refreshToken };

        const response = await httpClient.post<ApiResponse<RefreshTokenResponse>>(
            AUTH_ENDPOINTS.REFRESH,
            request,
            {
                skipAuth: true,
                skipRefresh: true, // Prevent infinite loop
            },
        );

        const { tokens } = response.data;

        // Update stored tokens
        await tokenStore.setTokens(tokens);

        return tokens.accessToken;
    }

    /**
     * Handle refresh token failed
     * Logout user khi refresh token expired/invalid
     */
    private async handleRefreshFailed(): Promise<void> {
        console.warn('[AuthService] Refresh token failed - logging out');
        await this.logout();
        // TODO: Navigate to login screen (cần inject navigation service)
    }

    /**
     * Forgot password
     * @param request - Email để gửi reset link
     */
    public async forgotPassword(
        request: ForgotPasswordRequest,
    ): Promise<void> {
        await httpClient.post(
            AUTH_ENDPOINTS.FORGOT_PASSWORD,
            request,
            { skipAuth: true },
        );
    }

    /**
     * Change password (khi đã login)
     * @param request - Current + new password
     */
    public async changePassword(
        request: ChangePasswordRequest,
    ): Promise<void> {
        await httpClient.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, request);
    }

    /**
     * Get current user từ API
     * Dùng để refresh user data
     */
    public async getCurrentUser() {
        const response = await httpClient.get<ApiResponse<any>>(
            AUTH_ENDPOINTS.ME,
        );
        return response.data;
    }

    /**
     * Check if user is authenticated
     */
    public async isAuthenticated(): Promise<boolean> {
        return tokenStore.hasAccessToken();
    }
}

/**
 * Singleton auth service instance
 */
export const authService = new AuthService();

/**
 * Export class nếu cần testing
 */
export { AuthService };
