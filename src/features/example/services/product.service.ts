// Interface cho Product
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

// Interface cho request tạo product
export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl?: string;
}

// Interface cho request cập nhật product
export interface UpdateProductRequest extends Partial<CreateProductRequest> {
    id: string;
}

// Interface cho filters
export interface ProductFilters {
    productId?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    page?: number;
    limit?: number;
}

// Interface cho response danh sách products
export interface ProductListResponse {
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
}

// Mock data
let mockProducts: Product[] = [
    {
        id: '1',
        name: 'iPhone 15 Pro',
        description: 'Điện thoại thông minh cao cấp với chip A17 Pro',
        price: 25000000,
        category: 'Điện thoại',
        stock: 50,
        imageUrl: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'MacBook Pro M3',
        description: 'Laptop chuyên nghiệp với chip Apple M3',
        price: 45000000,
        category: 'Laptop',
        stock: 30,
        imageUrl: 'https://via.placeholder.com/300x300?text=MacBook+Pro',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'AirPods Pro',
        description: 'Tai nghe không dây với khử tiếng ồn chủ động',
        price: 6000000,
        category: 'Tai nghe',
        stock: 100,
        imageUrl: 'https://via.placeholder.com/300x300?text=AirPods+Pro',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// Hàm delay để mô phỏng API call
const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

// Service object
export const productService = {
    // Lấy danh sách sản phẩm với filters
    getProducts: async (filters: ProductFilters = {}): Promise<ProductListResponse> => {
        await delay(800); // Mô phỏng thời gian API call

        let filteredProducts = [...mockProducts];

        // Apply filters
        if (filters.category) {
            filteredProducts = filteredProducts.filter(p =>
                p.category.toLowerCase().includes(filters.category!.toLowerCase())
            );
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filteredProducts = filteredProducts.filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower)
            );
        }

        if (filters.minPrice) {
            filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
        }

        if (filters.maxPrice) {
            filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
        }

        // Pagination
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        return {
            products: paginatedProducts,
            total: filteredProducts.length,
            page,
            totalPages: Math.ceil(filteredProducts.length / limit),
        };
    },

    // Lấy sản phẩm theo ID
    getProduct: async (id: string): Promise<Product> => {
        await delay(500);

        const product = mockProducts.find(p => p.id === id);
        if (!product) {
            throw new Error(`Không tìm thấy sản phẩm với ID: ${id}`);
        }

        return product;
    },

    // Tạo sản phẩm mới
    createProduct: async (data: CreateProductRequest): Promise<Product> => {
        await delay(1000);

        // Validation
        if (!data.name.trim()) {
            throw new Error('Tên sản phẩm không được để trống');
        }
        if (data.price <= 0) {
            throw new Error('Giá sản phẩm phải lớn hơn 0');
        }
        if (data.stock < 0) {
            throw new Error('Số lượng tồn kho không được âm');
        }

        const newProduct: Product = {
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        mockProducts.unshift(newProduct);
        return newProduct;
    },

    // Cập nhật sản phẩm
    updateProduct: async (data: UpdateProductRequest): Promise<Product> => {
        await delay(800);

        const index = mockProducts.findIndex(p => p.id === data.id);
        if (index === -1) {
            throw new Error(`Không tìm thấy sản phẩm với ID: ${data.id}`);
        }

        // Validation
        if (data.name && !data.name.trim()) {
            throw new Error('Tên sản phẩm không được để trống');
        }
        if (data.price && data.price <= 0) {
            throw new Error('Giá sản phẩm phải lớn hơn 0');
        }
        if (data.stock && data.stock < 0) {
            throw new Error('Số lượng tồn kho không được âm');
        }

        const updatedProduct: Product = {
            ...mockProducts[index],
            ...data,
            updatedAt: new Date().toISOString(),
        };

        mockProducts[index] = updatedProduct;
        return updatedProduct;
    },

    // Xóa sản phẩm
    deleteProduct: async (id: string): Promise<void> => {
        await delay(600);

        const index = mockProducts.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error(`Không tìm thấy sản phẩm với ID: ${id}`);
        }

        mockProducts.splice(index, 1);
    },

    // Lấy danh sách categories
    getCategories: async (): Promise<string[]> => {
        await delay(300);

        const categories = [...new Set(mockProducts.map(p => p.category))];
        return categories;
    },
}; 