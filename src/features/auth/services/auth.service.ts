/**
 * AUTH SERVICE
 * ============
 * Authentication service: login, register, logout, refresh token.
 * Integrates với HTTP client và token store.
 * 
 * @senior-pattern Service layer với single responsibility
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
    TokenPair,
} from '@/shared/types/domain/auth';
import type { ApiResponse } from '@/shared/types/api';
import type { User } from '@/shared/types/domain/user';

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

        // Store tokens directly to Disk
        await tokenStore.setTokens(tokens);

        return { tokens, user };
    }

    /**
     * Register
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
     */
    public async logout(): Promise<void> {
        try {
            // Call API logout (best effort)
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
     * Handle refresh token failed
     */
    private async handleRefreshFailed(): Promise<void> {
        console.warn('[AuthService] Refresh token failed - logging out');
        await this.logout();
        // Trigger generic "logout" event if utilizing EventBus
    }

    /**
     * Forgot password
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
     * Change password
     */
    public async changePassword(
        request: ChangePasswordRequest,
    ): Promise<void> {
        await httpClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, request);
    }

    /**
     * Get current user
     */
    public async getCurrentUser(): Promise<User> {
        const response = await httpClient.get<ApiResponse<any>>(
            API_ENDPOINTS.AUTH.GET_CURRENT_USER,
        );
        return response.data;
    }

    /**
     * Refresh access token (public)
     */
    public async refreshToken(refreshToken: string): Promise<TokenPair> {
        const response = await httpClient.post<ApiResponse<RefreshTokenResponse>>(
            API_ENDPOINTS.AUTH.REFRESH_TOKEN,
            { refreshToken },
            { skipAuth: true, skipRefresh: true }
        );
        return response.data.tokens;
    }

    /**
     * Update user profile
     */
    public async updateProfile(data: Partial<User>): Promise<User> {
        const response = await httpClient.put<ApiResponse<User>>(
            API_ENDPOINTS.AUTH.UPDATE_PROFILE,
            data
        );
        return response.data;
    }

    /**
     * Reset password
     */
    public async resetPassword(data: { token: string; password: string; passwordConfirmation: string }): Promise<void> {
        await httpClient.post(
            API_ENDPOINTS.AUTH.RESET_PASSWORD,
            data,
            { skipAuth: true }
        );
    }

    /**
     * Verify email
     */
    public async verifyEmail(token: string): Promise<void> {
        await httpClient.post(
            API_ENDPOINTS.AUTH.VERIFY_EMAIL,
            { token },
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

export const authService = new AuthService();
export { AuthService };
