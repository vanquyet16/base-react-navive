/**
 * AUTH DOMAIN TYPES
 * =================
 * Authentication & authorization domain models.
 * Login, register, token management types.
 * 
 * @senior-pattern Separate auth domain từ user domain
 */

import type { User } from './user';

/**
 * Token pair - access + refresh tokens
 */
export interface TokenPair {
    /** Access token - short-lived (15-30 mins) */
    accessToken: string;
    /** Refresh token - long-lived (7-30 days) */
    refreshToken: string;
    /** Access token expiry timestamp */
    expiresAt?: number;
}

/**
 * Login Request Payload
 */
export interface LoginRequest {
    /** Username hoặc email */
    username: string;
    /** Password */
    password: string;
    /** Remember me flag - để set refresh token expiry lâu hơn */
    rememberMe?: boolean;
}

/**
 * Login Response từ API
 */
export interface LoginResponse {
    /** Token pair */
    tokens: TokenPair;
    /** User info */
    user: User;
}

/**
 * Register Request Payload
 */
export interface RegisterRequest {
    /** Username - unique */
    username: string;
    /** Email - unique */
    email: string;
    /** Password - sẽ được hash ở backend */
    password: string;
    /** Password confirmation */
    passwordConfirmation: string;
    /** Display name */
    displayName: string;
    /** Optional phone */
    phone?: string;
}

/**
 * Register Response
 * Có thể giống LoginResponse hoặc chỉ success message
 */
export interface RegisterResponse {
    /** Success message */
    message: string;
    /** Optional: auto login sau register */
    tokens?: TokenPair;
    user?: User;
}

/**
 * Refresh Token Request
 */
export interface RefreshTokenRequest {
    /** Refresh token */
    refreshToken: string;
}

/**
 * Refresh Token Response
 */
export interface RefreshTokenResponse {
    /** New token pair */
    tokens: TokenPair;
}

/**
 * Forgot Password Request
 */
export interface ForgotPasswordRequest {
    /** Email để gửi reset link */
    email: string;
}

/**
 * Reset Password Request
 */
export interface ResetPasswordRequest {
    /** Reset token từ email */
    token: string;
    /** New password */
    newPassword: string;
    /** Password confirmation */
    passwordConfirmation: string;
}

/**
 * Change Password Request (khi user đã login)
 */
export interface ChangePasswordRequest {
    /** Current password để verify */
    currentPassword: string;
    /** New password */
    newPassword: string;
    /** Password confirmation */
    passwordConfirmation: string;
}

/**
 * Auth Session State
 * Dùng trong Zustand store
 */
export interface AuthSession {
    /** Is user authenticated */
    isAuthenticated: boolean;
    /** Current user - null nếu chưa login */
    user: User | null;
    /** Access token - null nếu chưa login */
    accessToken: string | null;
    /** Refresh token - null nếu chưa login */
    refreshToken: string | null;
    /** Token expiry timestamp */
    expiresAt: number | null;
}
