/**
 * USAGE EXAMPLES - MULTI-DOMAIN HTTP CLIENT
 * ==========================================
 * Ví dụ về cách sử dụng multiple domain HTTP clients
 */

import { createHttpClient, httpClient } from '@/shared/services/http/http-client';

// ============================================================================
// CÁCH 1: Sử dụng httpClient mặc định (MAIN domain)
// ============================================================================

/**
 * Client mặc định sẽ gọi tới MAIN domain
 */
const fetchDashboardData = async () => {
    const data = await httpClient.get('/dashboard');
    return data;
};

// ============================================================================
// CÁCH 2: Tạo dedicated client cho Auth API
// ============================================================================

/**
 * Tạo client riêng cho Auth domain
 * Auth API có thể nằm ở domain khác với API chính
 */
const authClient = createHttpClient('AUTH');

const login = async (credentials: { username: string; password: string }) => {
    const response = await authClient.post('/auth/login', credentials);
    return response;
};

const refreshToken = async (refreshToken: string) => {
    const response = await authClient.post('/auth/refresh', { refreshToken });
    return response;
};

const logout = async () => {
    const response = await authClient.post('/auth/logout');
    return response;
};

// ============================================================================
// CÁCH 3: Tạo dedicated client cho Manager API
// ============================================================================

/**
 * Tạo client riêng cho Manager domain
 * Manager API có thể có infrastructure riêng, scale riêng
 */
const managerClient = createHttpClient('MANAGER');

const fetchUsers = async () => {
    const users = await managerClient.get('/users');
    return users;
};

const createUser = async (userData: any) => {
    const user = await managerClient.post('/users', userData);
    return user;
};

const updateUser = async (userId: string, userData: any) => {
    const user = await managerClient.put(`/users/${userId}`, userData);
    return user;
};

const deleteUser = async (userId: string) => {
    await managerClient.delete(`/users/${userId}`);
};

// ============================================================================
// CÁCH 4: Sử dụng trong Service Class
// ============================================================================

/**
 * Auth Service sử dụng dedicated Auth client
 */
class AuthService {
    private client = createHttpClient('AUTH');

    async login(credentials: { username: string; password: string }) {
        return this.client.post('/auth/login', credentials);
    }

    async register(userData: any) {
        return this.client.post('/auth/register', userData);
    }

    async logout() {
        return this.client.post('/auth/logout');
    }
}

/**
 * Manager Service sử dụng dedicated Manager client
 */
class ManagerService {
    private client = createHttpClient('MANAGER');

    async getUsers() {
        return this.client.get('/users');
    }

    async getReports() {
        return this.client.get('/reports');
    }

    async getAnalytics() {
        return this.client.get('/analytics');
    }
}

// ============================================================================
// CÁCH 5: Lazy initialization trong module
// ============================================================================

/**
 * Chỉ tạo client khi cần (lazy init)
 */
let _authClient: ReturnType<typeof createHttpClient> | null = null;

const getAuthClient = () => {
    if (!_authClient) {
        _authClient = createHttpClient('AUTH');
    }
    return _authClient;
};

// Sử dụng
const loginWithLazyClient = async (credentials: any) => {
    const client = getAuthClient();
    return client.post('/auth/login', credentials);
};

// ============================================================================
// BEST PRACTICES
// ============================================================================

/**
 * ✅ DO: Tạo dedicated client cho mỗi domain cụ thể
 * - Dễ maintain, clear separation of concerns
 * - Mỗi domain có thể có config riêng trong tương lai
 */
const authServiceClient = createHttpClient('AUTH');
const managerServiceClient = createHttpClient('MANAGER');

/**
 * ❌ DON'T: Tạo client mới trong mỗi function call
 * - Tốn performance, mất mất interceptors state
 */
const badExample = async () => {
    // Bad: Tạo client mới mỗi lần
    const client = createHttpClient('AUTH');
    return client.get('/data');
};

/**
 * ✅ DO: Reuse client instance
 * - Better performance
 * - Shared interceptors state
 */
const goodClient = createHttpClient('AUTH');
const goodExample = async () => {
    // Good: Reuse client
    return goodClient.get('/data');
};

// ============================================================================
// Export các service clients (recommended pattern)
// ============================================================================

export const authApiClient = createHttpClient('AUTH');
export const managerApiClient = createHttpClient('MANAGER');
export const mainApiClient = httpClient; // hoặc createHttpClient('MAIN')
