import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS, SCREEN_PADDING } from '@/shared/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MainStackParamList } from '@/shared/types';
import { useBaseQuery } from '@/shared/hooks/useBaseQuery';

type NavigationProp = StackNavigationProp<MainStackParamList>;

// Mock API service
const apiService = {
  getProductById: async (id: string) => {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 1000)); // Mô phỏng delay
    return {
      id,
      name: `Product ${id}`,
      price: Math.floor(Math.random() * 1000000) + 100000,
      description: `Chi tiết sản phẩm ${id}`,
      image: `https://picsum.photos/200/200?random=${id}`,
      category: 'Electronics',
      rating: (Math.random() * 5).toFixed(1),
      stock: Math.floor(Math.random() * 100),
    };
  },
};

const CacheDemoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [apiCallCount, setApiCallCount] = useState(0);

  // Hook với cache theo ID
  const { data, isLoading, isFetching, error } = useBaseQuery({
    queryKey: ['product', selectedProductId],
    queryFn: () => {
      setApiCallCount(prev => prev + 1);
      return apiService.getProductById(selectedProductId!);
    },
    enabled: !!selectedProductId,
    showErrorToast: true,
  });

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleClearCache = () => {
    // Clear cache cho product queries
    // Trong thực tế sẽ dùng queryClient.invalidateQueries(['product'])
    Alert.alert('Cache Cleared', 'Đã xóa cache cho products');
  };

  const productIds = ['123', '456', '789', '101'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cache Demo</Text>
        <Text style={styles.subtitle}>
          Test cache behavior với detail navigation
        </Text>
      </View>

      {/* Cache Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Cache Information:</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Icon name="api" size={16} color={COLORS.primary} />
            <Text style={styles.infoText}>API Calls: {apiCallCount}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon
              name="cached"
              size={16}
              color={isFetching ? COLORS.warning : COLORS.success}
            />
            <Text style={styles.infoText}>
              {isFetching ? 'Fetching...' : 'Cached'}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="timer" size={16} color={COLORS.info} />
            <Text style={styles.infoText}>Cache: 5 phút</Text>
          </View>
        </View>
      </View>

      {/* Product Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chọn Product để test:</Text>
        <View style={styles.productGrid}>
          {productIds.map(id => (
            <TouchableOpacity
              key={id}
              style={[
                styles.productButton,
                selectedProductId === id && styles.selectedProduct,
              ]}
              onPress={() => handleSelectProduct(id)}
            >
              <Icon
                name="inventory"
                size={20}
                color={selectedProductId === id ? '#fff' : COLORS.primary}
              />
              <Text
                style={[
                  styles.productText,
                  selectedProductId === id && styles.selectedProductText,
                ]}
              >
                Product {id}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Product Detail */}
      {selectedProductId && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Product Detail (ID: {selectedProductId})
          </Text>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Icon name="hourglass-empty" size={48} color={COLORS.primary} />
              <Text style={styles.loadingText}>Đang load product...</Text>
              <Text style={styles.loadingSubtext}>
                {apiCallCount === 1
                  ? 'Lần đầu: Gọi API'
                  : 'Lần sau: Load từ cache'}
              </Text>
            </View>
          ) : data ? (
            <View style={styles.productDetail}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tên:</Text>
                <Text style={styles.detailValue}>{data.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Giá:</Text>
                <Text style={styles.detailValue}>
                  {data.price.toLocaleString('vi-VN')} VNĐ
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Danh mục:</Text>
                <Text style={styles.detailValue}>{data.category}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Rating:</Text>
                <Text style={styles.detailValue}>{data.rating}/5</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tồn kho:</Text>
                <Text style={styles.detailValue}>{data.stock}</Text>
              </View>
              <Text style={styles.description}>{data.description}</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Icon name="error" size={48} color={COLORS.error} />
              <Text style={styles.errorText}>Lỗi load product</Text>
            </View>
          ) : null}
        </View>
      )}

      {/* Cache Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cache Actions:</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => {
              if (selectedProductId) {
                handleSelectProduct(selectedProductId); // Re-fetch
              }
            }}
          >
            <Icon name="refresh" size={20} color="#fff" />
            <Text style={styles.buttonText}>Re-fetch</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleClearCache}
          >
            <Icon name="clear" size={20} color="#fff" />
            <Text style={styles.buttonText}>Clear Cache</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsSection}>
        <Text style={styles.instructionsTitle}>Hướng dẫn test:</Text>
        <View style={styles.instructionList}>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>1.</Text>
            <Text style={styles.instructionText}>
              Chọn một Product ID (ví dụ: 123)
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>2.</Text>
            <Text style={styles.instructionText}>
              Quan sát API call count tăng lên
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>3.</Text>
            <Text style={styles.instructionText}>
              Chọn Product ID khác (ví dụ: 456)
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>4.</Text>
            <Text style={styles.instructionText}>
              Quay lại Product ID đầu tiên (123)
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>5.</Text>
            <Text style={styles.instructionText}>
              Quan sát: API call count KHÔNG tăng (load từ cache)
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation */}
      <View style={styles.navigationSection}>
        <TouchableOpacity
          style={[styles.actionButton, styles.successButton]}
          onPress={() => navigation.navigate('ProductScreen')}
        >
          <Icon name="navigate-next" size={20} color="#fff" />
          <Text style={styles.buttonText}>Go to ProductScreen</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: SCREEN_PADDING,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  infoSection: {
    margin: SCREEN_PADDING,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  section: {
    margin: SCREEN_PADDING,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: '#fff',
  },
  selectedProduct: {
    backgroundColor: COLORS.primary,
  },
  productText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 8,
  },
  selectedProductText: {
    color: '#fff',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 12,
  },
  loadingSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  productDetail: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 12,
    lineHeight: 20,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    marginTop: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
  },
  successButton: {
    backgroundColor: COLORS.success,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  instructionsSection: {
    margin: SCREEN_PADDING,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  instructionList: {
    gap: 8,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  instructionNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 8,
    minWidth: 20,
  },
  instructionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  navigationSection: {
    margin: SCREEN_PADDING,
    marginBottom: 20,
  },
});

export default CacheDemoScreen;
