/**
 * USER SERVICE
 * ============
 * User-related operations: get profile, update profile, etc.
 * Example domain service theo pattern chuẩn.
 * 
 * @senior-pattern Domain service với typed request/response
 */

import { httpClient } from '../http/http-client';
import type { User, UserProfile, UpdateUserRequest } from '@/types/domain/user';
import type { ApiResponse, ListRequest, ListResponse } from '@/types/api';

/**
 * API Endpoints
 */
const USER_ENDPOINTS = {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    GET_USER: (userId: string | number) => `/users/${userId}`,
    LIST_USERS: '/users',
} as const;

/**
 * User Service class
 */
class UserService {
    /**
     * Get current user profile
     * @returns UserProfile
     */
    public async getProfile(): Promise<UserProfile> {
        const response = await httpClient.get<ApiResponse<UserProfile>>(
            USER_ENDPOINTS.PROFILE,
        );
        return response.data;
    }

    /**
     * Update current user profile
     * @param data - Update data
     * @returns Updated UserProfile
     */
    public async updateProfile(
        data: UpdateUserRequest,
    ): Promise<UserProfile> {
        const response = await httpClient.put<
            ApiResponse<UserProfile>,
            UpdateUserRequest
        >(USER_ENDPOINTS.UPDATE_PROFILE, data);
        return response.data;
    }

    /**
     * Get user by ID
     * @param userId - User ID
     * @returns User
     */
    public async getUserById(userId: string | number): Promise<User> {
        const response = await httpClient.get<ApiResponse<User>>(
            USER_ENDPOINTS.GET_USER(userId),
        );
        return response.data;
    }

    /**
     * List users với pagination và filters
     * @param request - List request params
     * @returns Paginated users list
     */
    public async listUsers(
        request?: ListRequest,
    ): Promise<ListResponse<User>> {
        const response = await httpClient.get<ListResponse<User>>(
            USER_ENDPOINTS.LIST_USERS,
            {
                params: request,
            },
        );
        return response;
    }

    /**
     * TODO: Thêm các methods khác như:
     * - uploadAvatar(file)
     * - deleteUser(userId)
     * - etc.
     */
}

/**
 * Singleton user service instance
 */
export const userService = new UserService();

/**
 * Export class nếu cần testing
 */
export { UserService };
