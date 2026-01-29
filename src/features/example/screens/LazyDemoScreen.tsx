import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS, SCREEN_PADDING } from '@/shared/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MainStackParamList } from '@/shared/types/navigation.types';

type NavigationProp = StackNavigationProp<MainStackParamList>;

const LazyDemoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loadingStates, setLoadingStates] = useState({
    heavyComponent: false,
    dataComponent: false,
    imageComponent: false,
  });

  // Demo lazy loading component nặng
  const loadHeavyComponent = () => {
    setLoadingStates(prev => ({ ...prev, heavyComponent: true }));

    // Mô phỏng thời gian load component nặng
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, heavyComponent: false }));
      Alert.alert('Thành công', 'Component nặng đã được load!');
    }, 2000);
  };

  // Demo lazy loading data
  const loadDataComponent = () => {
    setLoadingStates(prev => ({ ...prev, dataComponent: true }));

    // Mô phỏng thời gian fetch data
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, dataComponent: false }));
      Alert.alert('Thành công', 'Data đã được load!');
    }, 1500);
  };

  // Demo lazy loading images
  const loadImageComponent = () => {
    setLoadingStates(prev => ({ ...prev, imageComponent: true }));

    // Mô phỏng thời gian load images
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, imageComponent: false }));
      Alert.alert('Thành công', 'Images đã được load!');
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Demo Lazy Loading</Text>
        <Text style={styles.subtitle}>Hiển thị cách lazy loading hoạt động trong React Native</Text>
      </View>

      {/* Demo 1: Lazy Loading Component */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Lazy Loading Component</Text>
        <Text style={styles.description}>
          Load component nặng chỉ khi cần thiết để tối ưu performance
        </Text>

        <TouchableOpacity
          style={[styles.demoButton, loadingStates.heavyComponent && styles.loadingButton]}
          onPress={loadHeavyComponent}
          disabled={loadingStates.heavyComponent}>
          <Icon
            name={loadingStates.heavyComponent ? 'hourglass-empty' : 'code'}
            size={20}
            color='#fff'
          />
          <Text style={styles.buttonText}>
            {loadingStates.heavyComponent ? 'Đang load component...' : 'Load Heavy Component'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Demo 2: Lazy Loading Data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Lazy Loading Data</Text>
        <Text style={styles.description}>Fetch data từ API chỉ khi màn hình được mở</Text>

        <TouchableOpacity
          style={[
            styles.demoButton,
            styles.secondaryButton,
            loadingStates.dataComponent && styles.loadingButton,
          ]}
          onPress={loadDataComponent}
          disabled={loadingStates.dataComponent}>
          <Icon
            name={loadingStates.dataComponent ? 'hourglass-empty' : 'cloud-download'}
            size={20}
            color='#fff'
          />
          <Text style={styles.buttonText}>
            {loadingStates.dataComponent ? 'Đang fetch data...' : 'Load Data từ API'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Demo 3: Lazy Loading Images */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Lazy Loading Images</Text>
        <Text style={styles.description}>Load images với placeholder và progressive loading</Text>

        <TouchableOpacity
          style={[
            styles.demoButton,
            styles.tertiaryButton,
            loadingStates.imageComponent && styles.loadingButton,
          ]}
          onPress={loadImageComponent}
          disabled={loadingStates.imageComponent}>
          <Icon
            name={loadingStates.imageComponent ? 'hourglass-empty' : 'image'}
            size={20}
            color='#fff'
          />
          <Text style={styles.buttonText}>
            {loadingStates.imageComponent ? 'Đang load images...' : 'Load Images'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Demo 4: Navigation với Lazy Loading */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Navigation với Lazy Loading</Text>
        <Text style={styles.description}>Điều hướng đến màn hình được lazy load</Text>

        <TouchableOpacity
          style={[styles.demoButton, styles.successButton]}
          onPress={() => navigation.navigate('ProductScreen')}>
          <Icon name='navigate-next' size={20} color='#fff' />
          <Text style={styles.buttonText}>Đi đến ProductScreen</Text>
        </TouchableOpacity>
      </View>

      {/* Thông tin về Lazy Loading */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Lợi ích của Lazy Loading:</Text>
        <View style={styles.benefitList}>
          <View style={styles.benefitItem}>
            <Icon name='speed' size={16} color={COLORS.primary} />
            <Text style={styles.benefitText}>Tăng tốc độ khởi động ứng dụng</Text>
          </View>
          <View style={styles.benefitItem}>
            <Icon name='memory' size={16} color={COLORS.primary} />
            <Text style={styles.benefitText}>Tiết kiệm bộ nhớ RAM</Text>
          </View>
          <View style={styles.benefitItem}>
            <Icon name='network-check' size={16} color={COLORS.primary} />
            <Text style={styles.benefitText}>Giảm tải network bandwidth</Text>
          </View>
          <View style={styles.benefitItem}>
            <Icon name='battery-charging-full' size={16} color={COLORS.primary} />
            <Text style={styles.benefitText}>Tiết kiệm pin cho thiết bị</Text>
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
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  demoButton: {
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
  tertiaryButton: {
    backgroundColor: COLORS.info,
  },
  successButton: {
    backgroundColor: '#4CAF50',
  },
  loadingButton: {
    backgroundColor: '#9e9e9e',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoSection: {
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
  infoTitle: {
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

export default LazyDemoScreen;
