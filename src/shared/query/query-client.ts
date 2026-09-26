/**
 * QUERY CLIENT
 * ============
 * - Retry chỉ cho lỗi mạng / 5xx, tối đa 3 lần, backoff luỹ thừa. Không retry 4xx.
 * - Mutation KHÔNG retry: POST/PUT không idempotent (đăng nhập, gửi hồ sơ… không được gửi 2 lần).
 * - Refetch khi app quay lại foreground (focusManager nối với AppState ở query-provider).
 */

import { QueryClient } from '@tanstack/react-query';
import { DEFAULT_QUERY_OPTIONS } from '@/shared/constants/query-defaults';
import { createHttpError } from '@/shared/services/http/http-error';

const MAX_QUERY_RETRIES = 3;

export const shouldRetryQuery = (failureCount: number, error: unknown): boolean => {
    const httpError = createHttpError(error);
    if (httpError.isClientError) {
        return false;
    }
    return (httpError.isNetworkError || httpError.isServerError) && failureCount < MAX_QUERY_RETRIES;
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            ...DEFAULT_QUERY_OPTIONS,
            retry: shouldRetryQuery,
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30_000),
        },
        mutations: {
            retry: false,
        },
    },
});
