import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS, SCREEN_PADDING } from '@/shared/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MainStackParamList } from '@/shared/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type NavigationProp = StackNavigationProp<MainStackParamList>;

// Mock API service cho demo
const apiService = {
  // Lazy load users
  getUsers: async (page: number = 1, limit: number = 10) => {
    await new Promise<void>(resolve => setTimeout(resolve, 1500)); // Mô phỏng delay
    const users = Array.from({ length: limit }, (_, i) => ({
      id: (page - 1) * limit + i + 1,
      name: `User ${(page - 1) * limit + i + 1}`,
      email: `user${(page - 1) * limit + i + 1}@example.com`,
      avatar: `https://picsum.photos/100/100?random=${
        (page - 1) * limit + i + 1
      }`,
      role: ['admin', 'user', 'moderator'][Math.floor(Math.random() * 3)],
    }));
    return { users, total: 100, page, totalPages: 10 };
  },

  // Lazy load posts
  getPosts: async (page: number = 1, limit: number = 10) => {
    await new Promise<void>(resolve => setTimeout(resolve, 2000)); // Mô phỏng delay
    const posts = Array.from({ length: limit }, (_, i) => ({
      id: (page - 1) * limit + i + 1,
      title: `Post ${(page - 1) * limit + i + 1}`,
      content: `Nội dung chi tiết của post ${(page - 1) * limit + i + 1}`,
      author: `Author ${(page - 1) * limit + i + 1}`,
      image: `https://picsum.photos/300/200?random=${
        (page - 1) * limit + i + 1
      }`,
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
    }));
    return { posts, total: 200, page, totalPages: 20 };
  },

  // Lazy load products
  getProducts: async (page: number = 1, limit: number = 10) => {
    await new Promise<void>(resolve => setTimeout(resolve, 1000)); // Mô phỏng delay
    const products = Array.from({ length: limit }, (_, i) => ({
      id: (page - 1) * limit + i + 1,
      name: `Product ${(page - 1) * limit + i + 1}`,
      price: Math.floor(Math.random() * 1000000) + 100000,
      category: ['Electronics', 'Clothing', 'Books', 'Home'][
        Math.floor(Math.random() * 4)
      ],
      image: `https://picsum.photos/200/200?random=${
        (page - 1) * limit + i + 1
      }`,
      rating: (Math.random() * 5).toFixed(1),
      stock: Math.floor(Math.random() * 100),
    }));
    return { products, total: 150, page, totalPages: 15 };
  },
};

const ApiLazyDemoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<'users' | 'posts' | 'products'>(
    'users',
  );
  const [page, setPage] = useState(1);
  const [isEnabled, setIsEnabled] = useState(false);

  // Lazy loading queries - chỉ fetch khi enabled
  const usersQuery = useQuery({
    queryKey: ['users', page],
    queryFn: () => apiService.getUsers(page, 10),
    enabled: isEnabled && activeTab === 'users',
    staleTime: 5 * 60 * 1000, // 5 phút
  });

  const postsQuery = useQuery({
    queryKey: ['posts', page],
    queryFn: () => apiService.getPosts(page, 10),
    enabled: isEnabled && activeTab === 'posts',
    staleTime: 5 * 60 * 1000,
  });

  const productsQuery = useQuery({
    queryKey: ['products', page],
    queryFn: () => apiService.getProducts(page, 10),
    enabled: isEnabled && activeTab === 'products',
    staleTime: 5 * 60 * 1000,
  });

  // Reset page khi đổi tab
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const currentQuery =
    activeTab === 'users'
      ? usersQuery
      : activeTab === 'posts'
      ? postsQuery
      : productsQuery;

  const handleLoadData = () => {
    setIsEnabled(true);
    Alert.alert('Lazy Loading', 'Bắt đầu fetch data từ API...');
  };

  const handleRefresh = () => {
    currentQuery.refetch();
  };

  const handleNextPage = () => {
    setPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    setPage(prev => Math.max(1, prev - 1));
  };

  const handleClearCache = () => {
    queryClient.clear();
    setIsEnabled(false);
    setPage(1);
    Alert.alert('Cache cleared', 'Đã xóa cache và reset state');
  };

  const renderUserItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemSubtitle}>{item.email}</Text>
        <View style={styles.roleContainer}>
          <Text
            style={[
              styles.roleBadge,
              { backgroundColor: getRoleColor(item.role) },
            ]}
          >
            {item.role}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPostItem = ({ item }: { item: any }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postContentContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postAuthor}>By {item.author}</Text>
        <Text style={styles.postContent} numberOfLines={2}>
          {item.content}
        </Text>
        <View style={styles.postStats}>
          <View style={styles.statItem}>
            <Icon name="thumb-up" size={16} color={COLORS.primary} />
            <Text style={styles.statText}>{item.likes}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="comment" size={16} color={COLORS.primary} />
            <Text style={styles.statText}>{item.comments}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderProductItem = ({ item }: { item: any }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productContent}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>
          {item.price.toLocaleString('vi-VN')} VNĐ
        </Text>
        <View style={styles.productStats}>
          <View style={styles.statItem}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.statText}>{item.rating}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="inventory" size={16} color={COLORS.primary} />
            <Text style={styles.statText}>{item.stock}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return '#f44336';
      case 'moderator':
        return '#ff9800';
      default:
        return '#4caf50';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>API Lazy Loading Demo</Text>
        <Text style={styles.subtitle}>
          Tối ưu performance với lazy loading API calls
        </Text>
      </View>

      {/* Control Panel */}
      <View style={styles.controlPanel}>
        <Text style={styles.sectionTitle}>Điều khiển</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.controlButton, styles.primaryButton]}
            onPress={handleLoadData}
          >
            <Icon name="cloud-download" size={20} color="#fff" />
            <Text style={styles.buttonText}>Load Data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.secondaryButton]}
            onPress={handleClearCache}
          >
            <Icon name="clear" size={20} color="#fff" />
            <Text style={styles.buttonText}>Clear Cache</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.controlButton, styles.successButton]}
            onPress={handleRefresh}
            disabled={currentQuery.isFetching}
          >
            <Icon name="refresh" size={20} color="#fff" />
            <Text style={styles.buttonText}>
              {currentQuery.isFetching ? 'Refreshing...' : 'Refresh'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.infoButton]}
            onPress={() => navigation.navigate('ProductScreen')}
          >
            <Icon name="navigate-next" size={20} color="#fff" />
            <Text style={styles.buttonText}>Go to Products</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'users' && styles.activeTab]}
          onPress={() => setActiveTab('users')}
        >
          <Icon
            name="people"
            size={20}
            color={activeTab === 'users' ? '#fff' : COLORS.text}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'users' && styles.activeTabText,
            ]}
          >
            Users
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
          onPress={() => setActiveTab('posts')}
        >
          <Icon
            name="article"
            size={20}
            color={activeTab === 'posts' ? '#fff' : COLORS.text}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'posts' && styles.activeTabText,
            ]}
          >
            Posts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'products' && styles.activeTab]}
          onPress={() => setActiveTab('products')}
        >
          <Icon
            name="inventory"
            size={20}
            color={activeTab === 'products' ? '#fff' : COLORS.text}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'products' && styles.activeTabText,
            ]}
          >
            Products
          </Text>
        </TouchableOpacity>
      </View>

      {/* Status Info */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Trạng thái:</Text>
        <View style={styles.statusGrid}>
          <View style={styles.statusItem}>
            <Icon
              name="cloud"
              size={16}
              color={isEnabled ? COLORS.success : COLORS.error}
            />
            <Text style={styles.statusText}>
              {isEnabled ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Icon
              name="cached"
              size={16}
              color={currentQuery.isFetching ? COLORS.warning : COLORS.success}
            />
            <Text style={styles.statusText}>
              {currentQuery.isFetching ? 'Fetching...' : 'Idle'}
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Icon name="storage" size={16} color={COLORS.info} />
            <Text style={styles.statusText}>Page {page}</Text>
          </View>
        </View>
      </View>

      {/* Data Display */}
      <View style={styles.dataContainer}>
        {!isEnabled ? (
          <View style={styles.emptyState}>
            <Icon name="cloud-off" size={64} color={COLORS.textSecondary} />
            <Text style={styles.emptyTitle}>Chưa load data</Text>
            <Text style={styles.emptySubtitle}>
              Nhấn "Load Data" để bắt đầu lazy loading
            </Text>
          </View>
        ) : currentQuery.isLoading ? (
          <View style={styles.loadingState}>
            <Icon name="hourglass-empty" size={64} color={COLORS.primary} />
            <Text style={styles.loadingTitle}>Đang load data...</Text>
            <Text style={styles.loadingSubtitle}>
              Fetching {activeTab} từ API (mô phỏng delay)
            </Text>
          </View>
        ) : currentQuery.isError ? (
          <View style={styles.errorState}>
            <Icon name="error" size={64} color={COLORS.error} />
            <Text style={styles.errorTitle}>Lỗi load data</Text>
            <Text style={styles.errorMessage}>
              {currentQuery.error?.message || 'Unknown error'}
            </Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleRefresh}
            >
              <Icon name="refresh" size={20} color="#fff" />
              <Text style={styles.retryText}>Thử lại</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.dataContent}>
            <FlatList
              data={
                activeTab === 'users'
                  ? (currentQuery.data as any)?.users || []
                  : activeTab === 'posts'
                  ? (currentQuery.data as any)?.posts || []
                  : (currentQuery.data as any)?.products || []
              }
              keyExtractor={item => item.id.toString()}
              renderItem={
                activeTab === 'users'
                  ? renderUserItem
                  : activeTab === 'posts'
                  ? renderPostItem
                  : renderProductItem
              }
              refreshControl={
                <RefreshControl
                  refreshing={currentQuery.isFetching}
                  onRefresh={handleRefresh}
                />
              }
              showsVerticalScrollIndicator={false}
              scrollEnabled={false} // Disable scroll for demo
            />

            {/* Pagination */}
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[styles.pageButton, page === 1 && styles.disabledButton]}
                onPress={handlePrevPage}
                disabled={page === 1}
              >
                <Icon
                  name="chevron-left"
                  size={20}
                  color={page === 1 ? '#ccc' : '#fff'}
                />
                <Text
                  style={[styles.pageText, page === 1 && styles.disabledText]}
                >
                  Trước
                </Text>
              </TouchableOpacity>

              <Text style={styles.pageInfo}>
                Trang {page} / {currentQuery.data?.totalPages || 1}
              </Text>

              <TouchableOpacity
                style={styles.pageButton}
                onPress={handleNextPage}
              >
                <Text style={styles.pageText}>Sau</Text>
                <Icon name="chevron-right" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Performance Info */}
      <View style={styles.performanceContainer}>
        <Text style={styles.performanceTitle}>Lợi ích Lazy Loading API:</Text>
        <View style={styles.benefitList}>
          <View style={styles.benefitItem}>
            <Icon name="speed" size={16} color={COLORS.primary} />
            <Text style={styles.benefitText}>Chỉ fetch data khi cần thiết</Text>
          </View>
          <View style={styles.benefitItem}>
            <Icon name="memory" size={16} color={COLORS.primary} />
            <Text style={styles.benefitText}>Cache data để tái sử dụng</Text>
          </View>
          <View style={styles.benefitItem}>
            <Icon name="network-check" size={16} color={COLORS.primary} />
            <Text style={styles.benefitText}>Giảm network requests</Text>
          </View>
          <View style={styles.benefitItem}>
            <Icon
              name="battery-charging-full"
              size={16}
              color={COLORS.primary}
            />
            <Text style={styles.benefitText}>Tiết kiệm pin và bandwidth</Text>
          </View>
        </View>
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
  controlPanel: {
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
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  controlButton: {
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
  infoButton: {
    backgroundColor: COLORS.info,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    margin: SCREEN_PADDING,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
  },
  activeTabText: {
    color: '#fff',
  },
  statusContainer: {
    margin: SCREEN_PADDING,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  dataContainer: {
    margin: SCREEN_PADDING,
    minHeight: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    overflow: 'hidden',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  dataContent: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  itemSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  roleContainer: {
    marginTop: 4,
  },
  roleBadge: {
    fontSize: 12,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  postContentContainer: {
    flex: 1,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  postAuthor: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  postStats: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  productContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productContent: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  productStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  pageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  pageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  disabledText: {
    color: '#ccc',
  },
  pageInfo: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  performanceContainer: {
    margin: SCREEN_PADDING,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  benefitList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
});

export default ApiLazyDemoScreen;
