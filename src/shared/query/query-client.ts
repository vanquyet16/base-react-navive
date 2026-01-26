/**
 * QUERY CLIENT CONFIGURATION
 * ===========================
 * TanStack Query client với optimized defaults.
 * Error handling, retry logic, caching strategy.
 * 
 * @senior-pattern Centralized query configuration
 */

import { QueryClient } from '@tanstack/react-query';
import {
    DEFAULT_QUERY_OPTIONS,
    DEFAULT_MUTATION_OPTIONS,
} from '@/shared/constants/query-defaults';
import { createHttpError, AppHttpError } from '@/shared/services/http/http-error';

/**
 * Create Query Client với custom configuration
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            ...DEFAULT_QUERY_OPTIONS,

            /**
             * Retry logic: Chỉ retry khi network errors
             * Không retry 4xx errors vì đó là client errors
             */
            retry: (failureCount, error) => {
                // Convert to HttpError nếu chưa
                const httpError =
                    error instanceof AppHttpError ? error : createHttpError(error);

                // Không retry auth errors
                if (httpError.isAuthError) {
                    return false;
                }

                // Không retry client errors (4xx)
                if (httpError.isClientError) {
                    return false;
                }

                // Retry network errors và server errors (max 3 lần)
                return failureCount < 3;
            },

            /**
             * Retry delay: Exponential backoff
             */
            retryDelay: (attemptIndex) => {
                return Math.min(1000 * 2 ** attemptIndex, 30000);
            },
        },

        mutations: {
            ...DEFAULT_MUTATION_OPTIONS,

            /**
             * Mutation error handling
             * Log errors trong DEV mode
             */
            onError: (error) => {
                if (__DEV__) {
                    console.error('[Mutation Error]', error);
                }
            },
        },
    },
});

/**
 * Note: TanStack Query v5 removed global onError callbacks.
 * Use onError trong individual queries/mutations thay vì global.
 * Hoặc sử dụng QueryCache/MutationCache callbacks nếu cần global error handling.
 */

/**
 * Utility: Invalidate all queries
 * Dùng khi logout hoặc clear cache
 */
export const invalidateAllQueries = async () => {
    await queryClient.invalidateQueries();
};

/**
 * Utility: Clear all queries
 * Stronger than invalidate - remove từ cache
 */
export const clearAllQueries = () => {
    queryClient.clear();
};

/**
 * Utility: Prefetch query
 * Dùng để pre-load data trước khi navigate
 */
export const prefetchQuery = async <TData = any>(
    queryKey: any[],
    queryFn: () => Promise<TData>,
) => {
    await queryClient.prefetchQuery({
        queryKey,
        queryFn,
    });
};
