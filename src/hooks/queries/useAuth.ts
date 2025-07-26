import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import { LoginRequest } from '@/types';
import Toast from 'react-native-toast-message';
import { useBaseMutation } from '@/hooks/useBaseMutation';

// Query keys
export const authKeys = {
    all: ['auth'] as const,
    me: () => [...authKeys.all, 'me'] as const,
};

// Get current user
export const useGetCurrentUser = () => {
    const { isAuthenticated } = useAuthStore();

    return useQuery({
        queryKey: authKeys.me(),
        queryFn: authService.getCurrentUser,
        enabled: isAuthenticated,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Login mutation
export const useLogin = () => {
    const { login, setLoading } = useAuthStore();

    return useBaseMutation({
        mutationFn: (credentials: LoginRequest) => {
            console.log("🚀 ~ useLogin ~ credentials:", credentials)
            return authService.login(credentials);
        },
        showSuccessToast: true, // Không hiển thị toast success mặc định
        showErrorToast: true,
        onSuccessCallback: (data) => {
            login({
                token: data.token,
                refreshToken: data.refreshToken
            });
        },
        onMutate: () => {
            setLoading(true);
        },
        onSettled: () => {
            setLoading(false);
        },
    });
};

// Register mutation
export const useRegister = () => {
    const { login, setLoading } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData: { email: string; password: string; name: string }) =>
            authService.register(userData),
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: (data) => {
            login(data);
            // queryClient.setQueryData(authKeys.me(), data.user);
            // Toast.show({
            //     type: 'success',
            //     text1: 'Đăng ký thành công',
            //     text2: `Chào mừng ${data.user.name}!`,
            // });
        },
        onError: (error: any) => {
            Toast.show({
                type: 'error',
                text1: 'Đăng ký thất bại',
                text2: error.message || error.response?.data?.message || 'Vui lòng thử lại',
            });
        },
        onSettled: () => {
            setLoading(false);
        },
    });
};

// Logout mutation
export const useLogout = () => {
    const { logout, setLoading } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authService.logout,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: () => {
            logout();
            queryClient.clear();
            Toast.show({
                type: 'success',
                text1: 'Đăng xuất thành công',
            });
        },
        onError: () => {
            // Even if logout fails on server, clear local state
            logout();
            queryClient.clear();
        },
        onSettled: () => {
            setLoading(false);
        },
    });
};

// Update profile mutation
// export const useUpdateProfile = () => {
//     // const { updateUser } = useAuthStore();
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: authService.updateProfile,
//         onSuccess: (updatedUser) => {
//             updateUser(updatedUser);
//             queryClient.setQueryData(authKeys.me(), updatedUser);
//             Toast.show({
//                 type: 'success',
//                 text1: 'Cập nhật thành công',
//             });
//         },
//         onError: (error: any) => {
//             Toast.show({
//                 type: 'error',
//                 text1: 'Cập nhật thất bại',
//                 text2: error.response?.data?.message || 'Vui lòng thử lại',
//             });
//         },
//     });
// };

// Change password mutation
export const useChangePassword = () => {
    return useMutation({
        mutationFn: authService.changePassword,
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Đổi mật khẩu thành công',
            });
        },
        onError: (error: any) => {
            Toast.show({
                type: 'error',
                text1: 'Đổi mật khẩu thất bại',
                text2: error.response?.data?.message || 'Vui lòng thử lại',
            });
        },
    });
}; 