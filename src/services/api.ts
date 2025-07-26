import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG, ERROR_MESSAGES } from '@/constants';
import { useAuthStore } from '@/stores/authStore';
import { CustomAxiosRequestConfig } from '@/types';
import Toast from 'react-native-toast-message';

// Tạo axios instance
const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor request
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { tokens } = useAuthStore.getState();

        if (tokens?.token) {
            config.headers.Authorization = `Bearer ${tokens.token}`;
        }

        if (__DEV__) {
            console.log(`🚀 [${config.method?.toUpperCase()}] ${config.url}`, {
                params: config.params,
                data: config.data,
            });
        }

        return config;
    },
    (error: AxiosError) => {
        if (__DEV__) {
            console.error('❌ Request Error:', error);
        }
        return Promise.reject(error);
    },
);

// Interceptor response
api.interceptors.response.use(
    (response: AxiosResponse) => {
        if (__DEV__) {
            console.log(`✅ [${response.status}] ${response.config.url}`, response.data);
        }
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (__DEV__) {
            console.error(`❌ [${error.response?.status}] ${error.config?.url}`, error.response?.data);
        }

        // Xử lý lỗi 401 Unauthorized
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            const { tokens, logout, updateTokens } = useAuthStore.getState();

            if (tokens?.refreshToken) {
                try {
                    // Thử làm mới token
                    const refreshResponse = await axios.post(
                        `${API_CONFIG.BASE_URL}/auth/refresh`,
                        { refreshToken: tokens.refreshToken },
                    );

                    const newTokens = refreshResponse.data.tokens;
                    updateTokens(newTokens);

                    // Thử lại request gốc với token mới
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                    } else {
                        originalRequest.headers = { Authorization: `Bearer ${newTokens.accessToken}` };
                    }

                    return api(originalRequest);
                } catch (refreshError) {
                    // Làm mới token thất bại, đăng xuất người dùng
                    logout();
                    Toast.show({
                        type: 'error',
                        text1: 'Phiên đăng nhập hết hạn',
                        text2: 'Vui lòng đăng nhập lại',
                    });
                    return Promise.reject(refreshError);
                }
            } else {
                // Không có refresh token, đăng xuất người dùng
                logout();
                Toast.show({
                    type: 'error',
                    text1: 'Phiên đăng nhập hết hạn',
                    text2: 'Vui lòng đăng nhập lại',
                });
            }
        }

        // Xử lý các lỗi khác
        let errorMessage = ERROR_MESSAGES.SERVER_ERROR;

        if (error.code === 'ECONNABORTED' || (error.message && typeof error.message === 'string' && error.message.includes('timeout'))) {
            errorMessage = 'Timeout - Vui lòng thử lại';
        } else if (error.code === 'ERR_NETWORK') {
            errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
        } else if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
            errorMessage = error.response.data.message as string;
        }

        Toast.show({
            type: 'error',
            text1: 'Lỗi',
            text2: errorMessage,
        });

        return Promise.reject(error);
    },
);

export default api; 