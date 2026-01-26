/**
 * QUERY KEYS FACTORY
 * ==================
 * Centralized query keys để ensure consistency và type-safety.
 * Factory pattern để avoid magic strings.
 * 
 * @senior-pattern Query keys factory với hierarchical structure
 */

import type { ID } from '@/shared/types/common';
import type { ListRequest } from '@/shared/types/api';

/**
 * Query Keys Structure
 * Hierarchical: [domain, entity, operation, params]
 * E.g., ['users', 'list', { page: 1 }] hoặc ['users', 'detail', userId]
 */

/**
 * Auth Query Keys
 */
export const authKeys = {
    all: ['auth'] as const,
    me: () => [...authKeys.all, 'me'] as const,
    profile: () => [...authKeys.all, 'profile'] as const,
    tokens: () => [...authKeys.all, 'tokens'] as const,
} as const;

/**
 * User Query Keys
 */
export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (filters?: ListRequest) => [...userKeys.lists(), filters] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: ID) => [...userKeys.details(), id] as const,
    profile: () => [...userKeys.all, 'profile'] as const,
} as const;

/**
 * Example: Product Query Keys
 * Thêm khi có domain mới
 */
export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters?: ListRequest) => [...productKeys.lists(), filters] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: ID) => [...productKeys.details(), id] as const,
    search: (query: string) => [...productKeys.all, 'search', query] as const,
} as const;

/**
 * Query Key Utilities
 */

/**
 * Get domain từ query key
 * E.g., ['users', 'list'] => 'users'
 */
export const getDomainFromKey = (queryKey: readonly any[]): string => {
    return queryKey[0] as string;
};

/**
 * Invalidate all queries trong 1 domain
 * E.g., invalidateDomain('users') invalidate tất cả user queries
 */
export const invalidateDomain = async (
    queryClient: any,
    domain: string,
) => {
    await queryClient.invalidateQueries({
        queryKey: [domain],
    });
};

/**
 * Export all query keys
 */
export const queryKeys = {
    auth: authKeys,
    user: userKeys,
    product: productKeys,
    // Thêm domains khác ở đây
} as const;
