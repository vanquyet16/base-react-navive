import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  RefreshControl,
  Image,
} from 'react-native';
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '@/shared/hooks/queries/useProducts';
import {
  Product,
  CreateProductRequest,
  ProductFilters,
} from '@/services/productService';
import {useBaseForm} from '@/shared/hooks';
import FormInput from '@/components/form/FormInput';

// Component hiển thị item product
const ProductItem: React.FC<{
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}> = ({product, onEdit, onDelete}) => {
  return (
    <View style={styles.productItem}>
      {/* Hình ảnh sản phẩm */}
      {product.imageUrl && (
        <Image source={{uri: product.imageUrl}} style={styles.productImage} />
      )}

      {/* Thông tin sản phẩm */}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.productCategory}>Danh mục: {product.category}</Text>
        <Text style={styles.productPrice}>
          Giá: {product.price.toLocaleString('vi-VN')} VNĐ
        </Text>
        <Text style={styles.productStock}>Tồn kho: {product.stock}</Text>
      </View>

      {/* Nút chức năng */}
      <View style={styles.productActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => onEdit(product)}>
          <Text style={styles.actionButtonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(product.id)}>
          <Text style={styles.actionButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Component form sử dụng useBaseForm với đầy đủ tính năng react-hook-form
const ProductForm: React.FC<{
  visible: boolean;
  product?: Product;
  onClose: () => void;
  filters: ProductFilters;
}> = ({visible, product, onClose, filters}) => {
  // Sử dụng mutations từ useProducts
  const createMutation = useCreateProduct(filters);
  const updateMutation = useUpdateProduct(filters);

  // 🎯 Sử dụng useBaseForm với tất cả tính năng của react-hook-form:
  // - setValue: set giá trị cho field
  // - watch: theo dõi giá trị realtime
  // - reset: reset form về defaultValues
  // - handleSubmitWithLoading: xử lý submit với loading state
  const {
    control,
    handleSubmitWithLoading,
    formState: {isValid},
    isSubmitting,
    setValue,
    reset,
  } = useBaseForm<CreateProductRequest>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      imageUrl: '',
    },

    onSubmit: async (data: CreateProductRequest) => {
      try {
        if (product) {
          // Cập nhật sản phẩm
          await updateMutation.mutateAsync({id: product.id, ...data});
        } else {
          // Tạo sản phẩm mới
          await createMutation.mutateAsync(data);
        }
        onClose();
      } catch (error) {
        // Lỗi sẽ được xử lý bởi useBaseForm
        throw error;
      }
    },
    successMessage: product
      ? 'Cập nhật sản phẩm thành công!'
      : 'Thêm sản phẩm thành công!',
    errorMessage: product
      ? 'Cập nhật sản phẩm thất bại!'
      : 'Thêm sản phẩm thất bại!',
    resetOnSuccess: true,
  });

  // Effect để set dữ liệu khi edit hoặc reset khi thêm mới
  React.useEffect(() => {
    if (visible && product) {
      // Set từng field khi edit - sử dụng setValue của react-hook-form
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('category', product.category);
      setValue('stock', product.stock);
      setValue('imageUrl', product.imageUrl || '');
    } else if (visible && !product) {
      // Reset về defaultValues khi thêm mới
      reset();
    }
  }, [visible, product, setValue, reset]);

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {product ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </Text>

          {/* ✏️ Tất cả inputs sử dụng setValue và watchedValues từ react-hook-form */}

          {/* Input tên sản phẩm */}
          <FormInput
            control={control}
            name="name"
            label="Tên sản phẩm"
            placeholder="Nhập tên sản phẩm"
            required
            rules={{
              required: 'Tên sản phẩm là bắt buộc',
            }}
          />

          {/* Input mô tả */}
          <FormInput
            control={control}
            name="description"
            label="Mô tả sản phẩm"
            placeholder="Nhập mô tả sản phẩm"
            required
            multiline
            numberOfLines={3}
            style={styles.textArea}
            rules={{
              required: 'Mô tả sản phẩm là bắt buộc',
            }}
          />

          {/* Input giá */}
          <FormInput
            control={control}
            name="price"
            label="Giá (VNĐ)"
            placeholder="Nhập giá sản phẩm"
            required
            keyboardType="numeric"
            rules={{
              required: 'Giá sản phẩm là bắt buộc',
              min: {
                value: 1,
                message: 'Giá sản phẩm phải lớn hơn 0',
              },
            }}
          />

          {/* Input danh mục */}
          <FormInput
            control={control}
            name="category"
            label="Danh mục"
            placeholder="Nhập danh mục sản phẩm"
            required
            rules={{
              required: 'Danh mục là bắt buộc',
            }}
          />

          {/* Input tồn kho */}
          <FormInput
            control={control}
            name="stock"
            label="Số lượng tồn kho"
            placeholder="Nhập số lượng tồn kho"
            required
            keyboardType="numeric"
            rules={{
              required: 'Số lượng tồn kho là bắt buộc',
              min: {
                value: 0,
                message: 'Số lượng tồn kho không được âm',
              },
            }}
          />

          {/* Input URL hình ảnh */}
          <FormInput
            control={control}
            name="imageUrl"
            label="URL hình ảnh"
            placeholder="Nhập URL hình ảnh (tùy chọn)"
          />

          {/* Nút hành động */}
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.submitButton,
                (!isValid || isSubmitting || isLoading) &&
                  styles.disabledButton,
              ]}
              onPress={handleSubmitWithLoading}
              disabled={!isValid || isSubmitting || isLoading}>
              <Text style={styles.modalButtonText}>
                {isSubmitting || isLoading
                  ? 'Đang xử lý...'
                  : product
                  ? 'Cập nhật'
                  : 'Thêm mới'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Component chính
const ProductScreen: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [filters, _setFilters] = useState<ProductFilters>({page: 1, limit: 10});

  // Sử dụng hooks từ useProducts.ts
  const {data: productsData, isLoading, refetch} = useProducts(filters);
  const deleteMutation = useDeleteProduct(filters);

  // Xử lý sửa sản phẩm
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Xử lý xóa sản phẩm
  const handleDeleteProduct = (id: string) => {
    Alert.alert('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa sản phẩm này?', [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(id),
      },
    ]);
  };

  // Xử lý thêm sản phẩm mới
  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setShowForm(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Quản lý sản phẩm</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.addButtonText}>+ Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* Info hiển thị số lượng */}
      {productsData && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Hiển thị {productsData.products.length} / {productsData.total} sản
            phẩm
          </Text>
        </View>
      )}

      {/* Danh sách sản phẩm */}
      <FlatList
        data={productsData?.products || []}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ProductItem
            product={item}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Form thêm/sửa */}
      <ProductForm
        visible={showForm}
        product={editingProduct}
        onClose={() => setShowForm(false)}
        filters={filters}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 12,
    backgroundColor: '#e8f5e8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoText: {
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  productItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  productInfo: {
    marginBottom: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  productStock: {
    fontSize: 14,
    color: '#888',
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#9e9e9e',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default ProductScreen;
