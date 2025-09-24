import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '@/config/app.config';
import { CustomAxiosRequestConfig } from '@/shared/types';
import { logger, logApiRequest, logApiResponse } from '@/shared/utils/logger';
import { errorHandler, handleApiError } from '@/shared/utils/errorHandler';
import { authStore } from '@/features/auth';

// Tạo axios instance
const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor request
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { tokens } = authStore.getState();

        if (tokens?.token) {
            config.headers.Authorization = `Bearer ${tokens.token}`;
        }

        // Log API request
        logApiRequest(config.method?.toUpperCase() || 'UNKNOWN', config.url || '', {
            params: config.params,
            data: config.data,
        });

        return config;
    },
    (error: AxiosError) => {
        logger.error('Request Error', error);
        return Promise.reject(error);
    },
);

// Interceptor response
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Log API response
        logApiResponse(response.status, response.config.url || '', response.data);
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        // Log error response
        logger.error(`API Error [${error.response?.status}] ${error.config?.url}`, error.response?.data);

        // Xử lý lỗi 401 Unauthorized
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            const { tokens, logout, updateTokens } = authStore.getState();

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

                    return apiClient(originalRequest);
                } catch (refreshError) {
                    // Làm mới token thất bại, đăng xuất người dùng
                    logout();
                    errorHandler.handleApiError(refreshError, 'Token Refresh');
                    return Promise.reject(refreshError);
                }
            } else {
                // Không có refresh token, đăng xuất người dùng
                logout();
                errorHandler.handleApiError(error, 'No Refresh Token');
            }
        }

        // Xử lý các lỗi khác bằng error handler
        errorHandler.handleApiError(error, 'API Response');

        return Promise.reject(error);
    },
);

export default apiClient; 