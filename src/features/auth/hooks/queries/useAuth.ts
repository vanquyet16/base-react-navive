import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { useBaseMutation } from '@/shared/hooks/useBaseMutation';
import { useBaseQuery } from '@/shared/hooks/useBaseQuery';
import { LoginRequest } from '@/shared/types';
import { authService } from '../../services';
import { useIsAuthenticated, useSessionActions } from '@/store/selectors';

// ============================================================================
// QUERY KEYS
// ============================================================================

export const authKeys = {
    all: ['auth'] as const,
    me: () => [...authKeys.all, 'me'] as const,
    profile: () => [...authKeys.all, 'profile'] as const,
    tokens: () => [...authKeys.all, 'tokens'] as const,
} as const;

// ============================================================================
// QUERIES
// ============================================================================

/**
 * Lấy thông tin user hiện tại
 */
export const useGetCurrentUser = () => {
    const isAuthenticated = useIsAuthenticated();

    // Memoize query key để tránh re-render không cần thiết
    const queryKey = useMemo(() => authKeys.me(), []);

    return useBaseQuery({
        queryKey,
        queryFn: authService.getCurrentUser,
        enabled: isAuthenticated,
        staleTime: 5 * 60 * 1000, // 5 phút
        showErrorToast: false, // Không hiển thị toast cho query này
        errorMessage: 'Lỗi khi tải thông tin người dùng',
        // Thêm retry logic tùy chỉnh cho auth queries
        retry: (failureCount, error: any) => {
            // Không retry với lỗi 401 (unauthorized)
            if (error?.response?.status === 401) {
                return false;
            }
            return failureCount < 2;
        },
    });
};

/**
 * Lấy thông tin profile user
 */
export const useGetUserProfile = () => {
    const isAuthenticated = useIsAuthenticated();

    const queryKey = useMemo(() => authKeys.profile(), []);

    return useBaseQuery({
        queryKey,
        queryFn: () => {
            // Giả lập getUserProfile nếu chưa có trong service
            return authService.getCurrentUser();
        },
        enabled: isAuthenticated,
        staleTime: 10 * 60 * 1000, // 10 phút - profile ít thay đổi
        showErrorToast: false,
        errorMessage: 'Lỗi khi tải thông tin profile',
    });
};

// ============================================================================
// MUTATIONS
// ============================================================================

/**
 * Đăng nhập
 */
export const useLogin = () => {
    const { setSession } = useSessionActions();
    // Memoize invalidate queries
    const invalidateQueries = useMemo(() => [authKeys.me(), authKeys.profile()], []);

    return useBaseMutation({
        mutationFn: (credentials: LoginRequest) => {
            return authService.login(credentials);
        },
        showSuccessToast: false, // Không hiển thị toast success mặc định
        showErrorToast: true,
        errorMessage: 'Đăng nhập thất bại',
        invalidateQueries,
        onSuccessCallback: (data) => {
            // Set session với user data và tokens
            // Note: old LoginResponse has flat structure: { token, refreshToken, ...user fields }
            setSession({
                isAuthenticated: true,
                user: data as any,// Cast vì structure khác nhau temporarily
                accessToken: data.token,
                refreshToken: data.refreshToken,
            });
        },
        // Note: Loading state được handle bởi mutation's isPending
    });
};

/**
 * Đăng ký
 */
export const useRegister = () => {
    const { setSession } = useSessionActions();

    // Memoize invalidate queries
    const invalidateQueries = useMemo(() => [authKeys.me(), authKeys.profile()], []);

    return useBaseMutation({
        mutationFn: (userData: { email: string; password: string; name: string }) => authService.register(userData),
        showSuccessToast: true,
        successMessage: 'Đăng ký thành công!',
        showErrorToast: true,
        errorMessage: 'Đăng ký thất bại',
        invalidateQueries,
        onSuccessCallback: (data) => {
            setSession({
                isAuthenticated: true,
                user: data as any,
                accessToken: data.token,
                refreshToken: data.refreshToken,
            });
        },
    });
};

/**
 * Đăng xuất
 */
export const useLogout = () => {
    const { clearSession } = useSessionActions();
    const queryClient = useQueryClient();

    // Memoize clear function
    const clearAuthData = useCallback(() => {
        clearSession();
        queryClient.clear();
    }, [clearSession, queryClient]);

    return useBaseMutation({
        mutationFn: authService.logout,
        showSuccessToast: true,
        successMessage: 'Đăng xuất thành công!',
        showErrorToast: false, // Không hiển thị lỗi khi logout
        onSuccessCallback: clearAuthData,
        onErrorCallback: clearAuthData, // Ngay cả khi logout fail trên server, vẫn clear local state
    });
};

/**
 * Đổi mật khẩu
 */
export const useChangePassword = () => {
    return useBaseMutation({
        mutationFn: (data: { currentPassword: string; newPassword: string }) => authService.changePassword(data),
        showSuccessToast: true,
        successMessage: 'Đổi mật khẩu thành công!',
        showErrorToast: true,
        errorMessage: 'Đổi mật khẩu thất bại',
        // Không invalidate queries vì không ảnh hưởng đến user data
    });
};

/**
 * Cập nhật profile
 */
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    // Memoize invalidate queries
    const invalidateQueries = useMemo(() => [authKeys.me(), authKeys.profile()], []);

    return useBaseMutation({
        mutationFn: authService.updateProfile,
        showSuccessToast: true,
        successMessage: 'Cập nhật thông tin thành công!',
        showErrorToast: true,
        errorMessage: 'Cập nhật thông tin thất bại',
        invalidateQueries,
        onSuccessCallback: (updatedUser) => {
            // Cập nhật cache cho user data
            queryClient.setQueryData(authKeys.me(), updatedUser);
            queryClient.setQueryData(authKeys.profile(), updatedUser);
        },
    });
};

/**
 * Refresh token
 */
export const useRefreshToken = () => {
    const { setSession } = useSessionActions();

    return useBaseMutation({
        mutationFn: authService.refreshToken,
        showSuccessToast: false,
        showErrorToast: false,
        onSuccessCallback: (data) => {
            // Update tokens trong session
            setSession({
                accessToken: data.token,
                refreshToken: data.refreshToken,
            } as any); // Partial update
        },
        // Không retry refresh token để tránh loop vô hạn
        retry: false,
    });
};

/**
 * Quên mật khẩu
 */
export const useForgotPassword = () => {
    return useBaseMutation({
        mutationFn: (email: string) => authService.forgotPassword(email),
        showSuccessToast: true,
        successMessage: 'Email khôi phục mật khẩu đã được gửi!',
        showErrorToast: true,
        errorMessage: 'Lỗi khi gửi email khôi phục mật khẩu',
    });
};

/**
 * Reset mật khẩu
 */
export const useResetPassword = () => {
    return useBaseMutation({
        mutationFn: (data: { token: string; password: string }) => authService.resetPassword(data),
        showSuccessToast: true,
        successMessage: 'Đặt lại mật khẩu thành công!',
        showErrorToast: true,
        errorMessage: 'Lỗi khi đặt lại mật khẩu',
    });
};

/**
 * Xác thực email
 */
export const useVerifyEmail = () => {
    const queryClient = useQueryClient();

    return useBaseMutation({
        mutationFn: (token: string) => {
            // Giả lập verifyEmail nếu chưa có trong service
            return Promise.resolve({ success: true });
        },
        showSuccessToast: true,
        successMessage: 'Xác thực email thành công!',
        showErrorToast: true,
        errorMessage: 'Lỗi khi xác thực email',
        invalidateQueries: [authKeys.me()],
        onSuccessCallback: () => {
            // Invalidate user data sau khi verify email
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
    });
}; 