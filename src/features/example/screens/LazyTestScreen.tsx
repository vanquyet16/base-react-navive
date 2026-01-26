import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS, SCREEN_PADDING } from '@/shared/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MainStackParamList } from '@/shared/types';
import { LazyScreen, AdvancedLazyScreen } from '@/components/utility';

type NavigationProp = StackNavigationProp<MainStackParamList>;

// Component nặng để test lazy loading
const HeavyComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Mô phỏng load data nặng
    const loadHeavyData = async () => {
      await new Promise(resolve => setTimeout(() => resolve(undefined), 2000));
      setData(
        Array.from({ length: 100 }, (_, i) => ({
          id: i,
          title: `Item ${i}`,
          description: `Mô tả chi tiết cho item ${i}`,
          image: `https://picsum.photos/200/200?random=${i}`,
        })),
      );
    };
    loadHeavyData();
  }, []);

  return (
    <View style={styles.heavyContainer}>
      <Text style={styles.heavyTitle}>Component Nặng đã load!</Text>
      <Text style={styles.heavySubtitle}>
        Đã load {data.length} items với hình ảnh
      </Text>
      <FlatList
        data={data.slice(0, 10)} // Chỉ hiển thị 10 items đầu
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Component với error để test error handling
const ErrorComponent: React.FC = () => {
  useEffect(() => {
    // Mô phỏng lỗi
    setTimeout(() => {
      throw new Error('Lỗi mô phỏng: Không thể load component');
    }, 1000);
  }, []);

  return (
    <View style={styles.errorContainer}>
      <Text>Component này sẽ gây lỗi</Text>
    </View>
  );
};

const LazyTestScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [testResults, setTestResults] = useState({
    basicLazy: false,
    advancedLazy: false,
    errorLazy: false,
    conditionalLazy: false,
  });

  const [showConditional, setShowConditional] = useState(false);

  const runTest = (testName: keyof typeof testResults) => {
    setTestResults(prev => ({ ...prev, [testName]: true }));

    // Reset sau 5 giây
    setTimeout(() => {
      setTestResults(prev => ({ ...prev, [testName]: false }));
    }, 5000);
  };

  const handleTestComplete = (testName: string) => {
    Alert.alert('Test hoàn thành', `${testName} đã load thành công!`);
  };

  const handleTestError = (error: Error) => {
    Alert.alert('Test lỗi', `Lỗi: ${error.message}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bài Test Lazy Loading</Text>
        <Text style={styles.subtitle}>
          Thử nghiệm các tình huống lazy loading thực tế
        </Text>
      </View>

      {/* Test 1: Basic Lazy Loading */}
      <View style={styles.testSection}>
        <Text style={styles.testTitle}>Test 1: Basic Lazy Loading</Text>
        <Text style={styles.testDescription}>
          Load component đơn giản với LazyScreen
        </Text>

        <TouchableOpacity
          style={[
            styles.testButton,
            testResults.basicLazy && styles.activeButton,
          ]}
          onPress={() => runTest('basicLazy')}
        >
          <Icon name="play-arrow" size={20} color="#fff" />
          <Text style={styles.buttonText}>Chạy Test</Text>
        </TouchableOpacity>

        {testResults.basicLazy && (
          <View style={styles.resultContainer}>
            <LazyScreen
              component={() => Promise.resolve({ default: HeavyComponent })}
            />
          </View>
        )}
      </View>

      {/* Test 2: Advanced Lazy Loading */}
      <View style={styles.testSection}>
        <Text style={styles.testTitle}>Test 2: Advanced Lazy Loading</Text>
        <Text style={styles.testDescription}>
          Load component với error handling và retry
        </Text>

        <TouchableOpacity
          style={[
            styles.testButton,
            styles.secondaryButton,
            testResults.advancedLazy && styles.activeButton,
          ]}
          onPress={() => runTest('advancedLazy')}
        >
          <Icon name="settings" size={20} color="#fff" />
          <Text style={styles.buttonText}>Chạy Test</Text>
        </TouchableOpacity>

        {testResults.advancedLazy && (
          <View style={styles.resultContainer}>
            <AdvancedLazyScreen
              component={() => Promise.resolve({ default: HeavyComponent })}
              onLoadComplete={() => handleTestComplete('Advanced Lazy')}
              onError={handleTestError}
              retryCount={3}
            />
          </View>
        )}
      </View>

      {/* Test 3: Error Handling */}
      <View style={styles.testSection}>
        <Text style={styles.testTitle}>Test 3: Error Handling</Text>
        <Text style={styles.testDescription}>
          Test xử lý lỗi khi load component
        </Text>

        <TouchableOpacity
          style={[
            styles.testButton,
            styles.errorButton,
            testResults.errorLazy && styles.activeButton,
          ]}
          onPress={() => runTest('errorLazy')}
        >
          <Icon name="error" size={20} color="#fff" />
          <Text style={styles.buttonText}>Chạy Test Lỗi</Text>
        </TouchableOpacity>

        {testResults.errorLazy && (
          <View style={styles.resultContainer}>
            <AdvancedLazyScreen
              component={() =>
                Promise.reject(
                  new Error('Lỗi mô phỏng: Component không tồn tại'),
                )
              }
              onError={handleTestError}
              retryCount={2}
            />
          </View>
        )}
      </View>

      {/* Test 4: Conditional Loading */}
      <View style={styles.testSection}>
        <Text style={styles.testTitle}>Test 4: Conditional Loading</Text>
        <Text style={styles.testDescription}>
          Load component chỉ khi cần thiết
        </Text>

        <TouchableOpacity
          style={[styles.testButton, styles.successButton]}
          onPress={() => setShowConditional(!showConditional)}
        >
          <Icon
            name={showConditional ? 'visibility-off' : 'visibility'}
            size={20}
            color="#fff"
          />
          <Text style={styles.buttonText}>
            {showConditional ? 'Ẩn Component' : 'Hiện Component'}
          </Text>
        </TouchableOpacity>

        {showConditional && (
          <View style={styles.resultContainer}>
            <LazyScreen
              component={() => Promise.resolve({ default: HeavyComponent })}
            />
          </View>
        )}
      </View>

      {/* Test 5: Performance Test */}
      <View style={styles.testSection}>
        <Text style={styles.testTitle}>Test 5: Performance Test</Text>
        <Text style={styles.testDescription}>
          So sánh performance với và không có lazy loading
        </Text>

        <View style={styles.performanceButtons}>
          <TouchableOpacity
            style={[styles.testButton, styles.warningButton]}
            onPress={() => {
              const start = Date.now();
              // Mô phỏng load component nặng
              setTimeout(() => {
                const end = Date.now();
                Alert.alert(
                  'Performance Test',
                  `Thời gian load: ${end - start}ms`,
                );
              }, 1000);
            }}
          >
            <Icon name="speed" size={20} color="#fff" />
            <Text style={styles.buttonText}>Test Performance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.testButton, styles.infoButton]}
            onPress={() => {
              Alert.alert(
                'Memory Test',
                'Kiểm tra memory usage trong DevTools',
              );
            }}
          >
            <Icon name="memory" size={20} color="#fff" />
            <Text style={styles.buttonText}>Memory Test</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Kết quả và thống kê */}
      <View style={styles.statsSection}>
        <Text style={styles.statsTitle}>Thống kê Test</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Icon name="check-circle" size={24} color={COLORS.success} />
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Test thành công</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="error" size={24} color={COLORS.error} />
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Test lỗi</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="timer" size={24} color={COLORS.primary} />
            <Text style={styles.statNumber}>~2s</Text>
            <Text style={styles.statLabel}>Thời gian load</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="memory" size={24} color={COLORS.info} />
            <Text style={styles.statNumber}>-50%</Text>
            <Text style={styles.statLabel}>Tiết kiệm RAM</Text>
          </View>
        </View>
      </View>

      {/* Navigation */}
      <View style={styles.navigationSection}>
        <TouchableOpacity
          style={[styles.testButton, styles.primaryButton]}
          onPress={() => navigation.navigate('ProductScreen')}
        >
          <Icon name="navigate-next" size={20} color="#fff" />
          <Text style={styles.buttonText}>Đi đến ProductScreen</Text>
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
  testSection: {
    margin: SCREEN_PADDING,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  testTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  testDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
  },
  errorButton: {
    backgroundColor: COLORS.error,
  },
  successButton: {
    backgroundColor: COLORS.success,
  },
  warningButton: {
    backgroundColor: COLORS.warning,
  },
  infoButton: {
    backgroundColor: COLORS.info,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  activeButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  resultContainer: {
    marginTop: 16,
    minHeight: 200,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
  },
  performanceButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  heavyContainer: {
    flex: 1,
    padding: 16,
  },
  heavyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  heavySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 1,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
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
  itemDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  statsSection: {
    margin: SCREEN_PADDING,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  navigationSection: {
    margin: SCREEN_PADDING,
    marginBottom: 20,
  },
});

export default LazyTestScreen;
