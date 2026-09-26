/**
 * useBaseMutation
 * ===============
 * useMutation + toast thành công/lỗi + invalidate/refetch query sau khi thành công.
 * Toast đi qua CustomToast (antd) — hệ toast duy nhất của app.
 */

import { useMutation, useQueryClient, type QueryKey, type UseMutationOptions } from '@tanstack/react-query';
import CustomToast from '@/shared/utils/CustomToast';
import { createHttpError } from '@/shared/services/http/http-error';

interface UseBaseMutationProps<TData, TError, TVariables>
    extends Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'> {
    mutationFn: (variables: TVariables) => Promise<TData>;
    invalidateQueries?: QueryKey[];
    refetchQueries?: QueryKey[];
    showSuccessToast?: boolean;
    successMessage?: string;
    showErrorToast?: boolean;
    /** Dùng khi lỗi không có message từ server */
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
    onSuccess,
    onError,
    ...options
}: UseBaseMutationProps<TData, TError, TVariables>) => {
    const queryClient = useQueryClient();

    return useMutation<TData, TError, TVariables>({
        ...options,
        mutationFn,
        onSuccess: (data, variables, onMutateResult, context) => {
            invalidateQueries.forEach(queryKey => queryClient.invalidateQueries({ queryKey }));
            refetchQueries.forEach(queryKey => queryClient.refetchQueries({ queryKey }));
            if (showSuccessToast) {
                CustomToast.success(successMessage);
            }
            onSuccessCallback?.(data, variables);
            return onSuccess?.(data, variables, onMutateResult, context);
        },
        onError: (error, variables, onMutateResult, context) => {
            if (showErrorToast) {
                const { message } = createHttpError(error);
                CustomToast.error(message || errorMessage);
            }
            onErrorCallback?.(error, variables);
            return onError?.(error, variables, onMutateResult, context);
        },
    });
};
