// ============================================================================
// BASE HOOKS
// ============================================================================

export { useBaseQuery } from './useBaseQuery';
export { useBaseMutation } from './useBaseMutation';
export { useBaseForm } from './useBaseForm';

// ============================================================================
// AUTH HOOKS
// ============================================================================

export {
    useGetCurrentUser,
    useGetUserProfile,
    useLogin,
    useRegister,
    useLogout,
    useChangePassword,
    useUpdateProfile,
    useRefreshToken,
    useForgotPassword,
    useResetPassword,
    useVerifyEmail,
    authKeys,
} from './queries/useAuth';

// ============================================================================
// PRODUCT HOOKS
// ============================================================================

export {
    useProducts,
    useProduct,
    useProductCategories,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
    useUploadProductImage,
    useSearchProducts,
    productKeys,
} from './queries/useProducts';

// ============================================================================
// TYPES
// ============================================================================

// Export types nếu cần thiết trong tương lai
// export type { UseBaseQueryProps } from './useBaseQuery';
// export type { UseBaseMutationProps } from './useBaseMutation';
// export type { UseBaseFormProps, UseBaseFormReturn } from './useBaseForm'; 