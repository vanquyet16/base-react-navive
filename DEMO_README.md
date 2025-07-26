# Demo Product Management với useProducts Hooks

## Mô tả [[memory:2674288]]

Demo sử dụng **hooks từ `useProducts.ts`** kết hợp với `useBaseQuery` và `useBaseForm` để tạo ứng dụng quản lý sản phẩm với CRUD hoàn chỉnh.

## Cách sử dụng 🚀

1. **Chạy ứng dụng:**

   ```bash
   npx react-native run-ios
   # hoặc
   npx react-native run-android
   ```

2. **Truy cập demo:**
   - Từ màn hình Home → Nhấn **"Demo Quản lý Sản phẩm"**

## Cấu trúc Hook System 🎯

### 1. useBaseQuery - Query cơ bản

```typescript
// Trong useProducts.ts
export const useProducts = (filters: ProductFilters = {}) => {
  return useBaseQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productService.getProducts(filters),
    showErrorToast: true,
    errorMessage: 'Lỗi khi tải danh sách sản phẩm',
  });
};
```

### 2. useBaseMutation - Mutation cơ bản

```typescript
// Trong useProducts.ts
export const useCreateProduct = (filters: ProductFilters = {}) => {
  return useBaseMutation<Product, Error, CreateProductRequest>({
    mutationFn: productService.createProduct,
    invalidateQueries: [productKeys.lists()],
    refetchQueries: [productKeys.list(filters)],
    successMessage: 'Tạo sản phẩm thành công!',
  });
};
```

### 3. useBaseForm - Form handling

```typescript
// Trong ProductScreen.tsx
const {isSubmitting, handleSubmitWithLoading} = useBaseForm({
  onSubmit: async () => {
    if (product) {
      await updateMutation.mutateAsync({...formData, id: product.id});
    } else {
      await createMutation.mutateAsync(formData);
    }
  },
  successMessage: 'Thành công!',
});
```

## Hooks được sử dụng 📦

### Từ `useProducts.ts`:

- ✅ `useProducts(filters)` - Lấy danh sách sản phẩm với filters
- ✅ `useCreateProduct(filters)` - Tạo sản phẩm mới
- ✅ `useUpdateProduct(filters)` - Cập nhật sản phẩm
- ✅ `useDeleteProduct(filters)` - Xóa sản phẩm

### Base Hooks:

- ✅ `useBaseQuery` - Xử lý fetch data
- ✅ `useBaseForm` - Xử lý form submission
- ✅ `useBaseMutation` - Xử lý mutations

## Chức năng Demo ✨

### 1. ➕ Thêm sản phẩm

- Nhấn "Thêm" → Form modal
- Form sử dụng `useBaseForm` + `useCreateProduct`
- Tự động invalidate và refetch danh sách

### 2. ✏️ Sửa sản phẩm

- Nhấn "Sửa" → Form pre-filled
- Sử dụng `useUpdateProduct` mutation
- Auto refresh sau cập nhật

### 3. 🗑️ Xóa sản phẩm

- Confirmation dialog → `useDeleteProduct`
- Toast success → Auto refresh danh sách

### 4. 📋 Hiển thị danh sách

- `useProducts` với pagination
- Pull-to-refresh
- Loading states
- Error handling

## Tính năng kỹ thuật ⚡

### Query Management:

- **Query keys** với productKeys pattern
- **Cache invalidation** tự động sau mutations
- **Refetch strategies** cho fresh data
- **Error & success toast** notifications

### Form Handling:

- **useBaseForm** integration
- **Loading states** cho submit
- **Validation** ở service layer
- **Auto reset** form sau success

### Service Layer:

```typescript
// src/services/productService.ts
export const productService = {
  getProducts: async filters => {
    /* Mock API với delay */
  },
  createProduct: async data => {
    /* Validation + Mock creation */
  },
  updateProduct: async data => {
    /* Update logic */
  },
  deleteProduct: async id => {
    /* Delete logic */
  },
};
```

## Mock Data & API 🗃️

- **3 sản phẩm mẫu**: iPhone, MacBook, AirPods
- **Delay simulation**: 300ms-1000ms cho realistic UX
- **Validation logic**: Name required, Price > 0, Stock >= 0
- **Filter support**: Category, search, price range, pagination

## Code Structure 📁

```
src/
├── hooks/
│   ├── useBaseQuery.ts        # Base query hook
│   ├── useBaseForm.ts         # Base form hook
│   ├── useBaseMutation.ts     # Base mutation hook
│   └── queries/
│       └── useProducts.ts     # Product-specific hooks
├── services/
│   └── productService.ts      # Mock API & types
└── screens/example/
    └── ProductScreen.tsx      # UI Component
```

## Ưu điểm của Pattern này 🎉

### 1. **Separation of Concerns**

- Service layer riêng cho API logic
- Hooks layer cho React Query integration
- Component chỉ lo UI logic

### 2. **Reusability**

- Hook `useProducts` có thể dùng ở nhiều component
- Base hooks có thể extend cho entities khác
- Service methods độc lập, dễ test

### 3. **Type Safety**

- Full TypeScript support
- Interface được share giữa các layer
- Error handling type-safe

### 4. **Automatic Features** [[memory:2704137]]

- Cache management
- Loading states
- Error handling
- Success/Error toasts
- Auto refresh sau mutations

## So sánh với Version Trước 📊

| Aspect              | Version 1 (1 file) | Version 2 (useProducts)        |
| ------------------- | ------------------ | ------------------------------ |
| **Structure**       | All-in-one file    | Layered architecture           |
| **Reusability**     | Low                | High                           |
| **Maintainability** | Medium             | High                           |
| **Type Safety**     | Good               | Excellent                      |
| **Testing**         | Hard               | Easy                           |
| **Features**        | Basic              | Advanced (cache, invalidation) |

## Kết luận 🎯

Demo này cho thấy cách sử dụng **pattern hook system** với:

- **useBaseQuery/useBaseForm** cho foundational logic
- **useProducts.ts** cho domain-specific logic
- **Service layer** cho business logic
- **Component** chỉ lo presentation

Pattern này **scalable** và **maintainable** cho dự án lớn! [[memory:4297547]]
