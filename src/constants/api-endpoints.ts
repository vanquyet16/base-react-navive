/**
 * API ENDPOINTS CONSTANTS
 * =========================
 * Centralized management cho tất cả API endpoints trong application.
 * 
 * @pattern Feature-based organization - Endpoints được nhóm theo features
 * @senior-level Type-safe với 'as const', environment-aware, easy to maintain
 * 
 * Usage:
 * ```typescript
 * import { API_ENDPOINTS } from '@/constants/api-endpoints';
 * 
 * // Static endpoint
 * httpClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
 * 
 * // Dynamic endpoint
 * httpClient.get(API_ENDPOINTS.USER.GET_BY_ID('user-123'));
 * ```
 */

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

/**
 * Authentication và Authorization APIs
 * 
 * Quản lý login, register, token refresh, password management
 */
export const AUTH_ENDPOINTS = {
    /** 
     * Đăng nhập
     * POST api/Account/Login
     * Body: { taiKhoan: string, matKhau: string }
     */
    LOGIN: 'api/Account/Login',

    /** 
     * Đăng ký tài khoản mới
     * POST /auth/register
     * Body: { email: string, password: string, name: string }
     */
    REGISTER: '/auth/register',

    /** 
     * Đăng xuất
     * POST /auth/logout
     */
    LOGOUT: '/auth/logout',

    /** 
     * Refresh access token
     * POST /auth/refresh
     * Body: { refreshToken: string }
     */
    REFRESH_TOKEN: '/auth/refresh',

    /** 
     * Gửi email quên mật khẩu
     * POST /auth/forgot-password
     * Body: { email: string }
     */
    FORGOT_PASSWORD: '/auth/forgot-password',

    /** 
     * Reset mật khẩu với token
     * POST /auth/reset-password
     * Body: { token: string, password: string }
     */
    RESET_PASSWORD: '/auth/reset-password',

    /** 
     * Lấy thông tin user hiện tại
     * GET /auth/me
     */
    GET_CURRENT_USER: '/auth/me',

    /** 
     * Cập nhật profile
     * PUT /auth/profile
     * Body: Partial<User>
     */
    UPDATE_PROFILE: '/auth/profile',

    /** 
     * Đổi mật khẩu
     * POST /auth/change-password
     * Body: { currentPassword: string, newPassword: string }
     */
    CHANGE_PASSWORD: '/auth/change-password',
} as const;

// ============================================
// USER ENDPOINTS
// ============================================

/**
 * User management APIs
 * 
 * CRUD operations cho users
 */
export const USER_ENDPOINTS = {
    /** 
     * Lấy danh sách users
     * GET /users
     * Query params: { page?: number, limit?: number, search?: string }
     */
    GET_ALL: '/users',

    /** 
     * Lấy user theo ID
     * GET /users/:id
     * @param id - User ID
     */
    GET_BY_ID: (id: string) => `/users/${id}`,

    /** 
     * Tạo user mới
     * POST /users
     * Body: CreateUserRequest
     */
    CREATE: '/users',

    /** 
     * Cập nhật user
     * PUT /users/:id
     * @param id - User ID
     */
    UPDATE: (id: string) => `/users/${id}`,

    /** 
     * Xóa user
     * DELETE /users/:id
     * @param id - User ID
     */
    DELETE: (id: string) => `/users/${id}`,
} as const;

// ============================================
// FUTURE: ADD MORE ENDPOINTS HERE
// ============================================

/**
 * Product endpoints
 * Uncomment khi cần implement product features
 */
// export const PRODUCT_ENDPOINTS = {
//     GET_ALL: '/products',
//     GET_BY_ID: (id: string) => `/products/${id}`,
//     CREATE: '/products',
//     UPDATE: (id: string) => `/products/${id}`,
//     DELETE: (id: string) => `/products/${id}`,
// } as const;

// ============================================
// COMBINED API ENDPOINTS
// ============================================

/**
 * Combined API endpoints object
 * 
 * Tất cả endpoints được export dưới namespace này
 * để dễ access và maintain
 */
export const API_ENDPOINTS = {
    /** Authentication endpoints */
    AUTH: AUTH_ENDPOINTS,

    /** User management endpoints */
    USER: USER_ENDPOINTS,

    // Thêm endpoints cho features khác ở đây
    // PRODUCT: PRODUCT_ENDPOINTS,
    // ORDER: ORDER_ENDPOINTS,
} as const;

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Type-safe API endpoints type
 * 
 * Sử dụng để type check khi cần reference endpoints
 */
export type ApiEndpointMap = typeof API_ENDPOINTS;

/**
 * Helper để extract endpoint type
 * 
 * Example:
 * ```typescript
 * type AuthEndpoints = EndpointsOf<'AUTH'>;
 * ```
 */
export type EndpointsOf<K extends keyof ApiEndpointMap> = ApiEndpointMap[K];
