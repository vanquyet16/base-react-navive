import { useMemo, useCallback } from 'react';
import { useBaseQuery } from '@/shared/hooks/useBaseQuery';
import { useBaseMutation } from '@/shared/hooks/useBaseMutation';
import {
    productService,
    Product,
    CreateProductRequest,
    UpdateProductRequest,
    ProductFilters,
} from '@/features/example/services/product.service';

// ============================================================================
// QUERY KEYS
// ============================================================================

export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: string) => [...productKeys.details(), id] as const,
    categories: () => [...productKeys.all, 'categories'] as const,
} as const;

// ============================================================================
// QUERIES
// ============================================================================

/**
 * Lấy danh sách sản phẩm
 */
export const useProducts = (filters: ProductFilters = {}) => {
    // Memoize query key để tránh re-render không cần thiết
    const queryKey = useMemo(() => productKeys.list(filters), [filters]);

    return useBaseQuery({
        queryKey,
        queryFn: () => productService.getProducts(filters),
        showErrorToast: true,
        errorMessage: 'Lỗi khi tải danh sách sản phẩm',
        // Thêm stale time để tối ưu performance
        staleTime: 2 * 60 * 1000, // 2 phút
    });
};

/**
 * Lấy thông tin sản phẩm đơn lẻ
 */
export const useProduct = (id: string) => {
    // Memoize query key
    const queryKey = useMemo(() => productKeys.detail(id), [id]);

    return useBaseQuery({
        queryKey,
        queryFn: () => productService.getProduct(id),
        enabled: !!id,
        showErrorToast: true,
        errorMessage: 'Lỗi khi tải thông tin sản phẩm',
        // Cache lâu hơn cho product detail
        staleTime: 10 * 60 * 1000, // 10 phút
    });
};

/**
 * Lấy danh mục sản phẩm
 */
export const useProductCategories = () => {
    const queryKey = useMemo(() => productKeys.categories(), []);

    return useBaseQuery({
        queryKey,
        queryFn: productService.getCategories,
        staleTime: 30 * 60 * 1000, // 30 phút - categories ít thay đổi
        showErrorToast: true,
        errorMessage: 'Lỗi khi tải danh mục sản phẩm',
    });
};

// ============================================================================
// MUTATIONS
// ============================================================================

/**
 * Tạo sản phẩm mới
 */
export const useCreateProduct = (filters: ProductFilters = {}) => {
    // Memoize invalidate và refetch queries
    const invalidateQueries = useMemo(() => [productKeys.lists()], []);
    const refetchQueries = useMemo(() => [productKeys.list(filters)], [filters]);

    return useBaseMutation<Product, Error, CreateProductRequest>({
        mutationFn: productService.createProduct,
        invalidateQueries,
        refetchQueries,
        showSuccessToast: true,
        successMessage: 'Tạo sản phẩm thành công!',
        showErrorToast: true,
        errorMessage: 'Lỗi khi tạo sản phẩm',
    });
};

/**
 * Cập nhật sản phẩm
 */
export const useUpdateProduct = (filters: ProductFilters = {}) => {
    // Memoize invalidate và refetch queries
    const invalidateQueries = useMemo(() => [productKeys.lists()], []);
    const refetchQueries = useMemo(() => [productKeys.list(filters)], [filters]);

    return useBaseMutation<Product, Error, UpdateProductRequest>({
        mutationFn: productService.updateProduct,
        invalidateQueries,
        refetchQueries,
        showSuccessToast: true,
        successMessage: 'Cập nhật sản phẩm thành công!',
        showErrorToast: true,
        errorMessage: 'Lỗi khi cập nhật sản phẩm',
        onSuccessCallback: (data, variables) => {
            // Cập nhật cache cho chi tiết sản phẩm
            // queryClient.setQueryData(productKeys.detail(variables.id), data);
        },
    });
};

/**
 * Xóa sản phẩm
 */
export const useDeleteProduct = (filters: ProductFilters = {}) => {
    // Memoize invalidate và refetch queries
    const invalidateQueries = useMemo(() => [productKeys.lists()], []);
    const refetchQueries = useMemo(() => [productKeys.list(filters)], [filters]);

    return useBaseMutation<void, Error, string>({
        mutationFn: productService.deleteProduct,
        invalidateQueries,
        refetchQueries,
        showSuccessToast: true,
        successMessage: 'Xóa sản phẩm thành công!',
        showErrorToast: true,
        errorMessage: 'Lỗi khi xóa sản phẩm',
    });
};

/**
 * Upload ảnh sản phẩm
 */
export const useUploadProductImage = () => {
    return useBaseMutation<{ url: string }, Error, FormData>({
        mutationFn: (formData: FormData) => {
            // Giả lập upload function nếu chưa có trong service
            return Promise.resolve({ url: 'https://example.com/image.jpg' });
        },
        showSuccessToast: false, // Không hiển thị toast cho upload
        showErrorToast: true,
        errorMessage: 'Lỗi khi upload ảnh',
    });
};

/**
 * Tìm kiếm sản phẩm
 */
export const useSearchProducts = (searchTerm: string, filters: ProductFilters = {}) => {
    const queryKey = useMemo(
        () => [...productKeys.list(filters), 'search', searchTerm],
        [filters, searchTerm]
    );

    return useBaseQuery({
        queryKey,
        queryFn: () => {
            // Giả lập search function nếu chưa có trong service
            return productService.getProducts({ ...filters, search: searchTerm });
        },
        enabled: !!searchTerm && searchTerm.length >= 2, // Chỉ search khi có ít nhất 2 ký tự
        showErrorToast: true,
        errorMessage: 'Lỗi khi tìm kiếm sản phẩm',
        staleTime: 1 * 60 * 1000, // 1 phút cho search results
    });
}; 