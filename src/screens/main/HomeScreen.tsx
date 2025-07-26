import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useAuthStore} from '@/stores/authStore';
import {COLORS, SCREEN_PADDING} from '@/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MainLayout} from '@/components';

const HomeScreen: React.FC = () => {
  // const user = useUser();
  const {logout} = useAuthStore();

  const handleLogout = () => {
    logout();
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

          <TouchableOpacity style={styles.actionCard}>
            <Icon name="inventory" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Quản lý</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Icon name="support" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Hỗ trợ</Text>
          </TouchableOpacity>
        </View>
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
    shadowOffset: {width: 0, height: 2},
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
    shadowOffset: {width: 0, height: 2},
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
});

export default HomeScreen;
