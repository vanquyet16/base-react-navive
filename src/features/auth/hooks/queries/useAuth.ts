/**
 * AUTH HOOKS
 * ==========
 * Hook UI cho xác thực. Mọi thay đổi phiên đều đi qua sessionManager.
 */

import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useBaseMutation } from '@/shared/hooks/useBaseMutation';
import { useBaseQuery } from '@/shared/hooks/useBaseQuery';
import { authKeys } from '@/shared/query/query-keys';
import { useIsAuthenticated } from '@/shared/store/selectors';
import { STALE_TIME } from '@/shared/constants/query-defaults';
import type {
    ChangePasswordRequest,
    ForgotPasswordRequest,
    LoginRequest,
    RegisterRequest,
    ResetPasswordRequest,
} from '@/shared/types/domain/auth';
import type { User } from '@/shared/types/domain/user';
import { authService } from '../../services/auth.service';
import { sessionManager } from '../../session/session-manager';

export { authKeys };

/**
 * Hồ sơ người dùng hiện tại — nguồn sự thật duy nhất cho dữ liệu user.
 * Được seed từ cache Keychain khi khởi động (hiển thị ngay, kể cả offline) rồi đồng bộ với server.
 */
export const useCurrentUser = () => {
    const isAuthenticated = useIsAuthenticated();

    return useBaseQuery<User>({
        queryKey: authKeys.me(),
        queryFn: async () => {
            const user = await authService.getCurrentUser();
            await sessionManager.cacheUser(user);
            return user;
        },
        enabled: isAuthenticated,
        staleTime: STALE_TIME.MEDIUM,
        showErrorToast: false,
    });
};

export const useLogin = () =>
    useBaseMutation({
        mutationFn: (credentials: LoginRequest) => sessionManager.signIn(credentials),
        showSuccessToast: false,
        errorMessage: 'Đăng nhập thất bại',
    });

export const useRegister = () =>
    useBaseMutation({
        mutationFn: async (payload: RegisterRequest) => {
            const response = await authService.register(payload);
            // Backend cấp token ngay sau đăng ký → vào app luôn
            if (response.tokens) {
                await sessionManager.establish(response.tokens, response.user ?? null);
            }
            return response;
        },
        successMessage: 'Đăng ký thành công!',
        errorMessage: 'Đăng ký thất bại',
    });

/** Đăng xuất luôn thành công ở local (kể cả offline); thu hồi server chạy nền */
export const useLogout = () => {
    const logout = useCallback(() => sessionManager.signOut('user'), []);
    return { logout };
};

export const useChangePassword = () =>
    useBaseMutation({
        mutationFn: (data: ChangePasswordRequest) => authService.changePassword(data),
        successMessage: 'Đổi mật khẩu thành công!',
        errorMessage: 'Đổi mật khẩu thất bại',
    });

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useBaseMutation({
        mutationFn: (data: Partial<User>) => authService.updateProfile(data),
        successMessage: 'Cập nhật thông tin thành công!',
        errorMessage: 'Cập nhật thông tin thất bại',
        onSuccessCallback: updatedUser => {
            queryClient.setQueryData(authKeys.me(), updatedUser);
            sessionManager.cacheUser(updatedUser);
        },
    });
};

export const useForgotPassword = () =>
    useBaseMutation({
        mutationFn: (data: ForgotPasswordRequest) => authService.forgotPassword(data),
        successMessage: 'Email khôi phục mật khẩu đã được gửi!',
        errorMessage: 'Lỗi khi gửi email khôi phục mật khẩu',
    });

export const useResetPassword = () =>
    useBaseMutation({
        mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
        successMessage: 'Đặt lại mật khẩu thành công!',
        errorMessage: 'Lỗi khi đặt lại mật khẩu',
    });
