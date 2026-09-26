/**
 * useBaseQuery
 * ============
 * useQuery + toast lỗi (tối đa một lần cho mỗi lần lỗi mới).
 * Retry/staleTime kế thừa cấu hình chung của queryClient — chỉ override khi thật sự cần.
 */

import { useEffect, useRef } from 'react';
import { useQuery, type QueryKey, type UseQueryOptions } from '@tanstack/react-query';
import { errorHandler } from '@/shared/utils/errorHandler';

interface UseBaseQueryProps<TData> extends Omit<UseQueryOptions<TData, Error>, 'queryKey' | 'queryFn'> {
    queryKey: QueryKey;
    queryFn: () => Promise<TData>;
    showErrorToast?: boolean;
}

export const useBaseQuery = <TData>({ showErrorToast = true, ...options }: UseBaseQueryProps<TData>) => {
    const query = useQuery(options);
    const lastErrorShownAt = useRef(0);

    useEffect(() => {
        if (query.error && showErrorToast && query.errorUpdatedAt > lastErrorShownAt.current) {
            lastErrorShownAt.current = query.errorUpdatedAt;
            errorHandler.handleApiError(query.error, 'useBaseQuery');
        }
    }, [query.error, query.errorUpdatedAt, showErrorToast]);

    return query;
};
