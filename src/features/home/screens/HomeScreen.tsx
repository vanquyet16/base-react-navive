import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS, SCREEN_PADDING } from '@/shared/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MainLayout } from '@/components';
import {
  SimplePdfDownloader,
  PdfPhoneDownloader,
  PdfIosDownloader,
} from '@/features/performance/components';
import TestDocumentPicker from '@/features/performance/components/TestDocumentPicker';
import { MainStackParamList } from '@/shared/types';
import { useSessionActions } from '@/shared/store/selectors';
import { useMainNavigation } from '@/shared/hooks/useNavigation';

type NavigationProp = StackNavigationProp<MainStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useMainNavigation();
  // const user = useUser();
  const { clearSession } = useSessionActions();

  const handleLogout = () => {
    clearSession();
  };

  const handleNavigateToProduct = () => {
    navigation.navigate('ProductScreen');
  };

  return (
    <View style={styles.content}>
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>
          {/* Xin chào, {user?.name || 'Người dùng'}! 👋 */}
        </Text>
        <Text style={styles.welcomeSubtext}>
          Chúc bạn có một ngày tuyệt vời
        </Text>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Thao tác nhanh</Text>

        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Icon name="dashboard" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Icon name="analytics" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Thống kê</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={handleNavigateToProduct}
          >
            <Icon name="inventory" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Quản lý</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('LazyDemoScreen')}
          >
            <Icon name="speed" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Lazy Demo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('DemoNewScreen')}
          >
            <Icon name="dashboard" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>New demo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('LazyTestScreen')}
          >
            <Icon name="quiz" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Lazy Test</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('ApiLazyDemoScreen')}
          >
            <Icon name="api" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>API Demo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('CacheDemoScreen')}
          >
            <Icon name="cached" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Cache Demo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('PerformanceDemoScreen')}
          >
            <Icon name="speed" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Performance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('PdfDemoScreen')}
          >
            <Icon name="picture-as-pdf" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>PDF Demo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('PdfFileManagerScreen')}
          >
            <Icon name="folder" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Quản lý PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('PdfDownloadGuideScreen')}
          >
            <Icon name="help" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Hướng dẫn</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Icon name="support" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Hỗ trợ</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* PDF Download Section */}
      <View style={styles.pdfDownloadSection}>
        <Text style={styles.sectionTitle}>Tải PDF mẫu</Text>
        <Text style={styles.sectionSubtitle}>
          Tải các PDF mẫu để test tính năng
        </Text>

        <View style={styles.pdfDownloadGrid}>
          <View style={styles.pdfDownloadItem}>
            <Text style={styles.pdfDownloadTitle}>W3C Dummy PDF</Text>
            <SimplePdfDownloader
              url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
              fileName="w3c-dummy.pdf"
              onDownloadComplete={localPath => {
                console.log('PDF downloaded:', localPath);
                Alert.alert('Thành công', 'PDF đã được tải về thiết bị!');
              }}
            />
          </View>

          <View style={styles.pdfDownloadItem}>
            <Text style={styles.pdfDownloadTitle}>Sample Document</Text>
            <SimplePdfDownloader
              url="https://www.africau.edu/images/default/sample.pdf"
              fileName="sample-document.pdf"
              onDownloadComplete={localPath => {
                console.log('PDF downloaded:', localPath);
                Alert.alert('Thành công', 'PDF đã được tải về thiết bị!');
              }}
            />
          </View>
        </View>
      </View>

      {/* Tải PDF về điện thoại */}
      <View style={styles.pdfDownloadSection}>
        <Text style={styles.sectionTitle}>📱 Tải PDF về điện thoại</Text>
        <Text style={styles.sectionSubtitle}>
          Tải PDF về thư mục Downloads/Documents của điện thoại
        </Text>

        <View style={styles.pdfDownloadGrid}>
          <View style={styles.pdfDownloadItem}>
            <Text style={styles.pdfDownloadTitle}>W3C Dummy PDF</Text>
            <PdfPhoneDownloader
              url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
              fileName="w3c-dummy-phone.pdf"
              onDownloadComplete={localPath => {
                console.log('PDF downloaded to phone:', localPath);
                Alert.alert('Thành công', 'PDF đã được tải về điện thoại!');
              }}
            />
          </View>

          <View style={styles.pdfDownloadItem}>
            <Text style={styles.pdfDownloadTitle}>Sample Document</Text>
            <PdfPhoneDownloader
              url="https://www.africau.edu/images/default/sample.pdf"
              fileName="sample-document-phone.pdf"
              onDownloadComplete={localPath => {
                console.log('PDF downloaded to phone:', localPath);
                Alert.alert('Thành công', 'PDF đã được tải về điện thoại!');
              }}
            />
          </View>
        </View>
      </View>

      {/* Tải PDF vào Files app của iOS */}
      <View style={styles.pdfDownloadSection}>
        <Text style={styles.sectionTitle}>📱 Tải PDF vào Files app (iOS)</Text>
        <Text style={styles.sectionSubtitle}>
          Sử dụng DocumentPicker để lưu file vào Files app của iPhone
        </Text>

        <View style={styles.pdfDownloadGrid}>
          <View style={styles.pdfDownloadItem}>
            <Text style={styles.pdfDownloadTitle}>W3C Dummy PDF</Text>
            <PdfIosDownloader
              url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
              fileName="w3c-dummy-ios.pdf"
              onDownloadComplete={localPath => {
                console.log('PDF saved to iOS Files:', localPath);
                Alert.alert('Thành công', 'PDF đã được lưu vào Files app!');
              }}
            />
          </View>

          <View style={styles.pdfDownloadItem}>
            <Text style={styles.pdfDownloadTitle}>Sample Document</Text>
            <PdfIosDownloader
              url="https://www.africau.edu/images/default/sample.pdf"
              fileName="sample-document-ios.pdf"
              onDownloadComplete={localPath => {
                console.log('PDF saved to iOS Files:', localPath);
                Alert.alert('Thành công', 'PDF đã được lưu vào Files app!');
              }}
            />
          </View>
        </View>
      </View>

      {/* Test DocumentPicker */}
      <View style={styles.pdfDownloadSection}>
        <Text style={styles.sectionTitle}>🧪 Test DocumentPicker</Text>
        <Text style={styles.sectionSubtitle}>
          Kiểm tra xem @react-native-documents/picker có hoạt động không
        </Text>

        <TestDocumentPicker />
      </View>

      <View style={styles.recentActivity}>
        <Text style={styles.sectionTitle}>Hoạt động gần đây</Text>

        <View style={styles.activityList}>
          {[1, 2, 3].map(item => (
            <View key={item} style={styles.activityItem}>
              <Icon
                name="notifications"
                size={20}
                color={COLORS.textSecondary}
              />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Hoạt động số {item}</Text>
                <Text style={styles.activityTime}>2 giờ trước</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: SCREEN_PADDING,
  },
  welcomeCard: {
    backgroundColor: COLORS.background,
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  quickActions: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  recentActivity: {
    marginBottom: 24,
  },
  activityList: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  activityContent: {
    marginLeft: 12,
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  activityTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.error,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  pdfDownloadSection: {
    marginBottom: 24,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  pdfDownloadGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pdfDownloadItem: {
    width: '48%',
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pdfDownloadTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default HomeScreen;
