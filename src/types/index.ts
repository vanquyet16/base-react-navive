import { AxiosRequestConfig } from 'axios';

// Auth types
export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: string;
}

export interface AuthTokens {
    token: string;
    refreshToken: string;
}

export interface LoginRequest {
    userName: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
}

// Navigation types
export type RootStackParamList = {
    Auth: undefined;
    MainStack: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type MainStackParamList = {
    MainTabs: undefined;
    ProductScreen: undefined;
    LazyDemoScreen: undefined;
    LazyTestScreen: undefined;
    ApiLazyDemoScreen: undefined;
    CacheDemoScreen: undefined;
    // Có thể thêm các màn hình khác ở đây
    // DetailScreen: { id: string };
    // SearchScreen: { query?: string };
    // NotificationScreen: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Profile: undefined;
    Settings: undefined;
};

// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    errors?: string[];
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Extended Axios types (for future use)
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

// Form types
export interface FormField {
    label: string;
    name: string;
    type: 'text' | 'email' | 'password' | 'select' | 'textarea';
    placeholder?: string;
    required?: boolean;
    validation?: {
        pattern?: RegExp;
        minLength?: number;
        maxLength?: number;
        custom?: (value: any) => boolean | string;
    };
}

// Product types (for example usage)
export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
    category?: string;
    inStock?: boolean;
}

export interface CreateProductRequest {
    name: string;
    description?: string;
    price: number;
    category?: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
    id: string;
} 