/**
 * AUTH API
 * ========
 * Chỉ gọi API xác thực — KHÔNG lưu token, KHÔNG đổi state.
 * Vòng đời phiên (lưu token, đăng xuất, hết hạn) do SessionManager đảm nhiệm.
 */

import { getHttpClient } from '@/shared/services/http/http-client';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';
import type {
    ChangePasswordRequest,
    ForgotPasswordRequest,
    LoginRequest,
    LoginResponse,
    RefreshTokenResponse,
    RegisterRequest,
    RegisterResponse,
    ResetPasswordRequest,
    TokenPair,
} from '@/shared/types/domain/auth';
import type { User } from '@/shared/types/domain/user';
import type { ApiResponse } from '@/shared/types/api';

const client = () => getHttpClient('AUTH');

const unwrap = <T>(response: ApiResponse<T>, label: string): T => {
    if (response?.data === undefined || response.data === null) {
        throw new Error(`[AuthApi] ${label}: response không có data`);
    }
    return response.data;
};

class AuthService {
    public async login(request: LoginRequest): Promise<LoginResponse> {
        const response = await client().post<ApiResponse<LoginResponse>>(API_ENDPOINTS.AUTH.LOGIN, request, {
            skipAuth: true,
        });
        return unwrap(response, 'login');
    }

    public async register(request: RegisterRequest): Promise<RegisterResponse> {
        const response = await client().post<ApiResponse<RegisterResponse>>(API_ENDPOINTS.AUTH.REGISTER, request, {
            skipAuth: true,
        });
        return unwrap(response, 'register');
    }

    public async refreshToken(refreshToken: string): Promise<TokenPair> {
        const response = await client().post<ApiResponse<RefreshTokenResponse>>(
            API_ENDPOINTS.AUTH.REFRESH_TOKEN,
            { refreshToken },
            { skipAuth: true, skipRefresh: true },
        );
        return unwrap(response, 'refreshToken').tokens;
    }

    /**
     * Thu hồi phiên phía server. Token được truyền tường minh vì local state đã bị xoá trước đó;
     * `skipRefresh` để 401 ở đây không kích hoạt refresh → logout lặp vô hạn.
     */
    public async logout(tokens: { accessToken: string; refreshToken: string }): Promise<void> {
        await client().post(
            API_ENDPOINTS.AUTH.LOGOUT,
            { refreshToken: tokens.refreshToken },
            {
                skipAuth: true,
                skipRefresh: true,
                headers: { Authorization: `Bearer ${tokens.accessToken}` },
            },
        );
    }

    public async getCurrentUser(): Promise<User> {
        const response = await client().get<ApiResponse<User>>(API_ENDPOINTS.AUTH.GET_CURRENT_USER);
        return unwrap(response, 'getCurrentUser');
    }

    public async updateProfile(request: Partial<User>): Promise<User> {
        const response = await client().put<ApiResponse<User>>(API_ENDPOINTS.AUTH.UPDATE_PROFILE, request);
        return unwrap(response, 'updateProfile');
    }

    public async forgotPassword(request: ForgotPasswordRequest): Promise<void> {
        await client().post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, request, { skipAuth: true });
    }

    public async resetPassword(request: ResetPasswordRequest): Promise<void> {
        await client().post(API_ENDPOINTS.AUTH.RESET_PASSWORD, request, { skipAuth: true });
    }

    public async changePassword(request: ChangePasswordRequest): Promise<void> {
        await client().post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, request);
    }
}

export const authService = new AuthService();

export { AuthService };
