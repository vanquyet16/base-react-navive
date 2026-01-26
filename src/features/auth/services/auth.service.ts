import { httpClient } from '@/shared/services/http/http-client';
import { LoginRequest, LoginResponse, User, AuthTokens } from '@/shared/types';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';

// Mock data cho development
// const MOCK_USER: User = {
//     id: '1',
//     userName: 'user@example.com',
//     name: 'Người dùng Demo',
//     avatar: 'https://i.pravatar.cc/150?img=1',
//     role: 'user'
// };

// const MOCK_TOKENS: AuthTokens = {
//     accessToken: 'mock_access_token_12345',
//     refreshToken: 'mock_refresh_token_67890'
// };

export const authService = {
    /**
     * Đăng nhập
     * POST api/Account/Login
     */
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await httpClient.post(API_ENDPOINTS.AUTH.LOGIN, {
            matKhau: credentials.password,
            taiKhoan: credentials.userName
        });

        // Kiểm tra response success
        if (!response.data.success) {
            throw new Error(response.data.error || 'Đăng nhập thất bại');
        }

        return response.data;
        // Giả lập delay API call

        // Mock thành công với bất kỳ email/password nào
        // return {
        //     user: {
        //         ...MOCK_USER,
        //         userName: credentials.userName
        //     },
        //     tokens: MOCK_TOKENS
        // };
    },

    /**
     * Đăng ký tài khoản mới
     * POST /auth/register
     */
    register: async (userData: {
        email: string;
        password: string;
        name: string;
    }): Promise<LoginResponse> => {
        const response = await httpClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);

        // Kiểm tra response success
        if (!response.data.success) {
            throw new Error(response.data.error || 'Đăng ký thất bại');
        }

        return response.data;


        // await new Promise(resolve => setTimeout(resolve, 1000));

        // return {
        //     user: {
        //         ...MOCK_USER,
        //         email: userData.email,
        //         name: userData.name
        //     },
        //     tokens: MOCK_TOKENS
        // };
    },

    /**
     * Làm mới access token
     * POST /auth/refresh
     */
    refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
        const response = await httpClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });
        return response.data.tokens;
    },

    /**
     * Đăng xuất
     * POST /auth/logout
     */
    logout: async (): Promise<void> => {
        // TODO: Call API khi có backend endpoint
        // await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
        await new Promise(resolve => setTimeout(resolve, 500));
    },

    /**
     * Lấy thông tin người dùng hiện tại
     * GET /auth/me
     */
    getCurrentUser: async (): Promise<User> => {
        const response = await httpClient.get(API_ENDPOINTS.AUTH.GET_CURRENT_USER);
        return response.data;
    },

    /**
     * Cập nhật hồ sơ người dùng
     * PUT /auth/profile
     */
    updateProfile: async (userData: Partial<User>): Promise<User> => {
        const response = await httpClient.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, userData);
        return response.data;
    },

    /**
     * Đổi mật khẩu
     * POST /auth/change-password
     */
    changePassword: async (data: {
        currentPassword: string;
        newPassword: string;
    }): Promise<void> => {
        await httpClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
    },

    /**
     * Gửi email quên mật khẩu
     * POST /auth/forgot-password
     */
    forgotPassword: async (email: string): Promise<void> => {
        await httpClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    },

    /**
     * Reset mật khẩu với token từ email
     * POST /auth/reset-password
     */
    resetPassword: async (data: {
        token: string;
        password: string;
    }): Promise<void> => {
        await httpClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
    },
}; 