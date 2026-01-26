/**
 * AUTH SERVICE
 * ============
 * Authentication service: login, register, logout, refresh token.
 * Integrates với HTTP client và token store.
 * 
 */

import { httpClient } from '@/shared/services/http/http-client';
import { tokenStore } from '@/shared/store/token-store';
import { setupTokenHandlers } from '@/shared/services/http/axios-interceptors';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    ForgotPasswordRequest,
    ChangePasswordRequest,
    ResetPasswordRequest,
} from '@/shared/types/domain/auth';
import type { User } from '@/shared/types/domain/user';
import type { ApiResponse } from '@/shared/types/api';

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
            API_ENDPOINTS.AUTH.LOGIN,
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
            API_ENDPOINTS.AUTH.REGISTER,
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
            await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
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
            API_ENDPOINTS.AUTH.REFRESH_TOKEN,
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
     * Public refresh token method
     */
    public async refreshToken(): Promise<string> {
        return this.refreshTokenInternal();
    }

    /**
     * Handle refresh token failed
     * Logout user khi refresh token expired/invalid
     */
    private async handleRefreshFailed(): Promise<void> {
        console.warn('[AuthService] Refresh token failed - logging out');
        await this.logout();
    }

    /**
     * Forgot password
     * @param request - Email để gửi reset link
     */
    public async forgotPassword(
        request: ForgotPasswordRequest,
    ): Promise<void> {
        await httpClient.post(
            API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
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
        await httpClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, request);
    }

    /**
     * Get current user từ API
     * Dùng để refresh user data
     */
    public async getCurrentUser() {
        const response = await httpClient.get<ApiResponse<any>>(
            API_ENDPOINTS.AUTH.GET_CURRENT_USER,
        );
        return response.data;
    }

    /**
     * Update profile
     * @param request - Profile data to update
     */
    public async updateProfile(request: Partial<User>): Promise<User> {
        const response = await httpClient.put<ApiResponse<User>>(
            API_ENDPOINTS.AUTH.UPDATE_PROFILE,
            request
        );
        return response.data;
    }

    /**
     * Reset password
     * @param request - Token and new password
     */
    public async resetPassword(request: ResetPasswordRequest): Promise<void> {
        await httpClient.post(
            API_ENDPOINTS.AUTH.RESET_PASSWORD,
            request,
            { skipAuth: true }
        );
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
