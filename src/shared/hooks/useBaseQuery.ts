import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { useEffect } from 'react';
import { logger } from '@/shared/utils/logger';
import { errorHandler } from '@/shared/utils/errorHandler';

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
            errorHandler.handleApiError(query.error, 'useBaseQuery');
        }
    }, [query.error, showErrorToast]);

    // Log thành công nếu cần
    useEffect(() => {
        if (query.data && query.isSuccess && showSuccessToast && !query.isFetching) {
            logger.info('Query thành công', { message: successMessage });
        }
    }, [query.data, query.isSuccess, showSuccessToast, successMessage, query.isFetching]);

    return query;
}; 