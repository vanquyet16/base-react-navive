/**
 * USER DOMAIN TYPES
 * =================
 * User-related domain models.
 * Represent business entities, không phải API DTOs.
 * 
 */

import type { ID, ISODateString, Nullable } from '../common';

/**
 * User role type
 * Extend khi có thêm roles
 */
export type UserRole = 'admin' | 'user' | 'guest';

/**
 * User status
 */
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'deleted';

/**
 * User entity - core domain model
 */
export interface User {
    /** User ID */
    id: ID;
    /** Username - unique */
    username: string;
    /** Email - unique */
    email: string;
    /** Display name */
    displayName: string;
    /** User role */
    role: UserRole;
    /** Account status */
    status: UserStatus;
    /** Avatar URL */
    avatar: Nullable<string>;
    /** Phone number */
    phone: Nullable<string>;
    /** Created timestamp */
    createdAt: ISODateString;
    /** Last updated timestamp */
    updatedAt: ISODateString;
    /** Last login timestamp */
    lastLoginAt: Nullable<ISODateString>;
}

/**
 * User profile - extended user info
 * Có thể có thêm fields không cần thiết cho core User
 */
export interface UserProfile extends User {
    /** Bio/description */
    bio: Nullable<string>;
    /** Date of birth */
    dateOfBirth: Nullable<ISODateString>;
    /** Gender */
    gender: Nullable<'male' | 'female' | 'other'>;
    /** Address */
    address: Nullable<string>;
    /** Social links */
    socialLinks: Nullable<{
        facebook?: string;
        twitter?: string;
        instagram?: string;
    }>;
}

/**
 * Update User Request - chỉ fields có thể update
 */
export interface UpdateUserRequest {
    displayName?: string;
    avatar?: string;
    phone?: string;
    bio?: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
    address?: string;
}

/**
 * User preferences/settings
 */
export interface UserPreferences {
    /** Notification settings */
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    /** Privacy settings */
    privacy: {
        profileVisible: boolean;
        showEmail: boolean;
        showPhone: boolean;
    };
    /** App preferences */
    app: {
        theme: 'light' | 'dark' | 'auto';
        language: 'vi' | 'en';
    };
}
