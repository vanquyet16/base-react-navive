import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { Avatar } from '@/components/base';
import { COLORS, SCREEN_PADDING } from '@/shared/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen: React.FC = () => {
  // const user = useUser();

  const profileMenuItems = [
    {
      icon: 'edit',
      title: 'Chỉnh sửa hồ sơ',
      subtitle: 'Cập nhật thông tin cá nhân',
      onPress: () => console.log('Edit profile'),
    },
    {
      icon: 'security',
      title: 'Bảo mật',
      subtitle: 'Đổi mật khẩu, xác thực 2 lớp',
      onPress: () => console.log('Security'),
    },
    {
      icon: 'notifications',
      title: 'Thông báo',
      subtitle: 'Cài đặt thông báo',
      onPress: () => console.log('Notifications'),
    },
    {
      icon: 'language',
      title: 'Ngôn ngữ',
      subtitle: 'Thay đổi ngôn ngữ ứng dụng',
      onPress: () => console.log('Language'),
    },
    {
      icon: 'help',
      title: 'Trợ giúp',
      subtitle: 'FAQ, hướng dẫn sử dụng',
      onPress: () => console.log('Help'),
    },
  ];

  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {/* User Info Card */}
      <View style={styles.userCard}>
        {/* <Avatar user={user} size={80} /> */}
        {/* <Text style={styles.userName}>{user?.name || 'Người dùng'}</Text> */}
        <Text style={styles.userEmail}>{/* {user?.email || 'email@example.com'} */}</Text>
        {/* <Text style={styles.userRole}>Vai trò: {user?.role || 'User'}</Text> */}
      </View>

      {/* Stats Card */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Bài viết</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Theo dõi</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>89</Text>
          <Text style={styles.statLabel}>Đang theo dõi</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {profileMenuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Icon name={item.icon} size={24} color={COLORS.primary} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <Icon name='chevron-right' size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Version Info */}
      <View style={styles.versionInfo}>
        <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: SCREEN_PADDING,
  },
  userCard: {
    backgroundColor: COLORS.background,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 12,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  userRole: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: COLORS.primary + '20',
    borderRadius: 12,
  },
  statsCard: {
    backgroundColor: COLORS.background,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  menuContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  menuSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  versionInfo: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

export default ProfileScreen;
