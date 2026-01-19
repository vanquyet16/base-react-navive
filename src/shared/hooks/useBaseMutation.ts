import { useMutation, UseMutationOptions, useQueryClient, QueryKey } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

interface UseBaseMutationProps<TData, TError, TVariables>
    extends Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'> {
    mutationFn: (variables: TVariables) => Promise<TData>;
    invalidateQueries?: QueryKey[];
    refetchQueries?: QueryKey[];
    showSuccessToast?: boolean;
    successMessage?: string;
    showErrorToast?: boolean;
    errorMessage?: string;
    onSuccessCallback?: (data: TData, variables: TVariables) => void;
    onErrorCallback?: (error: TError, variables: TVariables) => void;
}

export const useBaseMutation = <TData, TError = Error, TVariables = void>({
    mutationFn,
    invalidateQueries = [],
    refetchQueries = [],
    showSuccessToast = true,
    successMessage = 'Thao tác thành công!',
    showErrorToast = true,
    errorMessage = 'Có lỗi xảy ra!',
    onSuccessCallback,
    onErrorCallback,
    ...options
}: UseBaseMutationProps<TData, TError, TVariables>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (data, variables, context, mutationContext) => {
            // Vô hiệu hóa cache queries
            invalidateQueries && invalidateQueries.forEach(queryKey => {
                queryClient.invalidateQueries({ queryKey });
            });

            // Tải lại queries
            refetchQueries && refetchQueries.forEach(queryKey => {
                queryClient.refetchQueries({ queryKey });
            });

            // Hiển thị toast thành công
            if (showSuccessToast) {
                Toast.show({
                    type: 'success',
                    text1: successMessage,
                });
            }

            // Callback thành công tùy chỉnh
            if (onSuccessCallback) {
                onSuccessCallback(data, variables);
            }

            // Gọi onSuccess gốc nếu có
            if (options.onSuccess) {
                options.onSuccess(data, variables, context, mutationContext);
            }
        },
        onError: (error, variables, context, mutationContext) => {
            // Hiển thị toast lỗi
            if (showErrorToast) {
                const message = (error as any)?.response?.data?.message ||
                    (error as any)?.message ||
                    errorMessage;

                Toast.show({
                    type: 'error',
                    text1: 'Lỗi',
                    text2: message,
                });
            }

            // Callback lỗi tùy chỉnh
            if (onErrorCallback) {
                onErrorCallback(error, variables);
            }

            // Gọi onError gốc nếu có
            if (options.onError) {
                options.onError(error, variables, context, mutationContext);
            }
        },
        ...options,
    });
}; 