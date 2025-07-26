import { useBaseQuery } from '@/hooks/useBaseQuery';
import { useBaseMutation } from '@/hooks/useBaseMutation';
import {
    productService,
    Product,
    CreateProductRequest,
    UpdateProductRequest,
    ProductFilters,
} from '@/services/productService';

// Khóa cache queries
export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: string) => [...productKeys.details(), id] as const,
    categories: () => [...productKeys.all, 'categories'] as const,
};

// Lấy danh sách sản phẩm
export const useProducts = (filters: ProductFilters = {}) => {
    return useBaseQuery({
        queryKey: productKeys.list(filters),
        queryFn: () => productService.getProducts(filters),
        showErrorToast: true,
        errorMessage: 'Lỗi khi tải danh sách sản phẩm',
    });
};

// Lấy thông tin sản phẩm đơn lẻ
export const useProduct = (id: string) => {
    return useBaseQuery({
        queryKey: productKeys.detail(id),
        queryFn: () => productService.getProduct(id),
        enabled: !!id,
        showErrorToast: true,
        errorMessage: 'Lỗi khi tải thông tin sản phẩm',
    });
};

// Lấy danh mục sản phẩm
export const useProductCategories = () => {
    return useBaseQuery({
        queryKey: productKeys.categories(),
        queryFn: productService.getCategories,
        staleTime: 10 * 60 * 1000, // 10 phút
        showErrorToast: true,
        errorMessage: 'Lỗi khi tải danh mục sản phẩm',
    });
};

// Mutation tạo sản phẩm
export const useCreateProduct = (filters: ProductFilters = {}) => {
    return useBaseMutation<Product, Error, CreateProductRequest>({
        mutationFn: productService.createProduct,
        // Vô hiệu hóa và tải lại danh sách sản phẩm sau khi tạo thành công
        invalidateQueries: [productKeys.lists()],
        refetchQueries: [productKeys.list(filters)],
        successMessage: 'Tạo sản phẩm thành công!',
        errorMessage: 'Lỗi khi tạo sản phẩm',
    });
};

// Mutation cập nhật sản phẩm
export const useUpdateProduct = (filters: ProductFilters = {}) => {
    return useBaseMutation<Product, Error, UpdateProductRequest>({
        mutationFn: productService.updateProduct,
        // Vô hiệu hóa sản phẩm cụ thể và danh sách sản phẩm
        invalidateQueries: [productKeys.lists()],
        refetchQueries: [productKeys.list(filters)],
        successMessage: 'Cập nhật sản phẩm thành công!',
        errorMessage: 'Lỗi khi cập nhật sản phẩm',
        onSuccessCallback: (_data, _variables) => {
            // Cập nhật cache cho chi tiết sản phẩm
            // queryClient.setQueryData(productKeys.detail(variables.id), data);
        },
    });
};

// Mutation xóa sản phẩm
export const useDeleteProduct = (filters: ProductFilters = {}) => {
    return useBaseMutation<void, Error, string>({
        mutationFn: productService.deleteProduct,
        // Vô hiệu hóa và tải lại danh sách sản phẩm sau khi xóa
        invalidateQueries: [productKeys.lists()],
        refetchQueries: [productKeys.list(filters)],
        successMessage: 'Xóa sản phẩm thành công!',
        errorMessage: 'Lỗi khi xóa sản phẩm',
    });
}; 