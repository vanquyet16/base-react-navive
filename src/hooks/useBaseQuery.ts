import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

interface UseBaseQueryProps<TData, TError = Error>
    extends Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> {
    queryKey: QueryKey;
    queryFn: () => Promise<TData>;
    showErrorToast?: boolean;
    errorMessage?: string;
    showSuccessToast?: boolean;
    successMessage?: string;
}

export const useBaseQuery = <TData, TError = Error>({
    queryKey,
    queryFn,
    showErrorToast = true,
    errorMessage = 'Lỗi khi tải dữ liệu',
    showSuccessToast = false,
    successMessage = 'Tải dữ liệu thành công',
    ...options
}: UseBaseQueryProps<TData, TError>) => {
    const query = useQuery({
        queryKey,
        queryFn,
        retry: (failureCount, error: any) => {
            // Không retry với các lỗi 401, 403, 404
            if (error?.response?.status === 401 ||
                error?.response?.status === 403 ||
                error?.response?.status === 404) {
                return false;
            }
            return failureCount < 2;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
        ...options,
    });

    // Hiển thị toast lỗi
    useEffect(() => {
        if (query.error && showErrorToast) {
            const message = (query.error as any)?.response?.data?.message ||
                (query.error as any)?.message ||
                errorMessage;

            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: message,
            });
        }
    }, [query.error, showErrorToast, errorMessage]);

    // Hiển thị toast thành công
    useEffect(() => {
        if (query.data && query.isSuccess && showSuccessToast && !query.isFetching) {
            Toast.show({
                type: 'success',
                text1: successMessage,
            });
        }
    }, [query.data, query.isSuccess, showSuccessToast, successMessage, query.isFetching]);

    return query;
}; 