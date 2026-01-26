/**
 * MUTATION HELPERS
 * ================
 * Helper utilities cho mutations: optimistic updates, error handling.
 * Reusable patterns để DRY mutations code.
 * 
 */

import type { UseMutationOptions } from '@tanstack/react-query';
import { queryClient } from './query-client';

/**
 * Create optimistic update helper
 * Pattern: Tự động rollback nếu mutation fail
 * 
 * @param queryKey - Query key để update
 * @param updateFn - Function để update cache data
 * @returns Mutation callbacks (onMutate, onError, onSettled)
 */
export const createOptimisticUpdate = <TData, TVariables>(
    queryKey: any[],
    updateFn: (oldData: TData | undefined, variables: TVariables) => TData,
) => {
    return {
        /**
         * onMutate: Update cache optimistically
         */
        onMutate: async (variables: TVariables) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey });

            // Snapshot previous value
            const previousData = queryClient.getQueryData<TData>(queryKey);

            // Optimistically update cache
            queryClient.setQueryData<TData>(queryKey, (old) =>
                updateFn(old, variables),
            );

            // Return context với previous data để rollback
            return { previousData };
        },

        /**
         * onError: Rollback on error
         */
        onError: (
            error: any,
            variables: TVariables,
            context?: { previousData?: TData },
        ) => {
            if (context?.previousData) {
                queryClient.setQueryData(queryKey, context.previousData);
            }
        },

        /**
         * onSettled: Refetch after mutation
         */
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    };
};

/**
 * Create mutation với invalidation
 * Simple pattern: chỉ invalidate queries sau mutation success
 * 
 * @param queryKeys - Query keys để invalidate
 * @returns Mutation callbacks
 */
export const createInvalidationCallbacks = (queryKeys: any[][]) => {
    return {
        onSuccess: async () => {
            // Invalidate tất cả query keys
            await Promise.all(
                queryKeys.map((key) =>
                    queryClient.invalidateQueries({ queryKey: key }),
                ),
            );
        },
    };
};

/**
 * Type helper cho mutation options
 */
export type MutationOptions<
    TData = any,
    TError = Error,
    TVariables = any,
    TContext = any,
> = UseMutationOptions<TData, TError, TVariables, TContext>;

/**
 * Example: Create và delete item mutations
 */
// export const useCreateItem = () => {
//   return useMutation({
//     mutationFn: (data) => api.createItem(data),
//     ...createInvalidationCallbacks([itemKeys.all]),
//   });
// };
