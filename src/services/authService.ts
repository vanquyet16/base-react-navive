import api from './api';
import { LoginRequest, LoginResponse, User, AuthTokens } from '@/types';

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
    // Đăng nhập - Mock API cho development
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        console.log("🚀 ~ credentials:", credentials)

        const response = await api.post('api/Account/Login', {
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

    // Đăng ký
    register: async (userData: {
        email: string;
        password: string;
        name: string;
    }): Promise<LoginResponse> => {
        const response = await api.post('/auth/register', userData);

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

    // Làm mới token
    refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
        const response = await api.post('/auth/refresh', { refreshToken });
        return response.data.tokens;
    },

    // Đăng xuất
    logout: async (): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 500));
    },

    // Lấy thông tin người dùng hiện tại
    getCurrentUser: async (): Promise<User> => {

        const response = await api.get('/auth/me');
        return response.data;
        // await new Promise(resolve => setTimeout(resolve, 500));
        // return MOCK_USER;
    },

    // Cập nhật hồ sơ
    updateProfile: async (userData: Partial<User>): Promise<User> => {
        const response = await api.put('/auth/profile', userData);
        return response.data;
    },

    // Đổi mật khẩu
    changePassword: async (data: {
        currentPassword: string;
        newPassword: string;
    }): Promise<void> => {
        await api.post('/auth/change-password', data);
    },

    // Quên mật khẩu
    forgotPassword: async (email: string): Promise<void> => {
        await api.post('/auth/forgot-password', { email });
    },

    // Đặt lại mật khẩu
    resetPassword: async (data: {
        token: string;
        password: string;
    }): Promise<void> => {
        await api.post('/auth/reset-password', data);
    },
}; 