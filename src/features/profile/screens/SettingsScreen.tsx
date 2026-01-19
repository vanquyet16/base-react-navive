import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';

import { useTheme, useSettingsActions } from '@/store/selectors';
import { COLORS, SCREEN_PADDING } from '@/shared/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen: React.FC = () => {
  const currentTheme = useTheme();
  const { setTheme } = useSettingsActions();
  const [notifications, setNotifications] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [biometric, setBiometric] = useState(true);

  const settingsSections = [
    {
      title: 'Giao diện',
      items: [
        {
          icon: 'palette',
          title: 'Chế độ tối',
          subtitle: 'Bật/tắt chế độ tối',
          type: 'switch',
          value: currentTheme === 'dark',
          onValueChange: (value: boolean) => setTheme(value ? 'dark' : 'light'),
        },
        {
          icon: 'language',
          title: 'Ngôn ngữ',
          subtitle: 'Tiếng Việt',
          type: 'arrow',
          onPress: () => console.log('Language settings'),
        },
      ],
    },
    {
      title: 'Thông báo',
      items: [
        {
          icon: 'notifications',
          title: 'Thông báo đẩy',
          subtitle: 'Nhận thông báo từ ứng dụng',
          type: 'switch',
          value: notifications,
          onValueChange: setNotifications,
        },
        {
          icon: 'email',
          title: 'Thông báo email',
          subtitle: 'Nhận thông báo qua email',
          type: 'arrow',
          onPress: () => console.log('Email notifications'),
        },
      ],
    },
    {
      title: 'Bảo mật',
      items: [
        {
          icon: 'fingerprint',
          title: 'Xác thực sinh trắc học',
          subtitle: 'Sử dụng vân tay/Face ID',
          type: 'switch',
          value: biometric,
          onValueChange: setBiometric,
        },
        {
          icon: 'lock',
          title: 'Đổi mật khẩu',
          subtitle: 'Cập nhật mật khẩu đăng nhập',
          type: 'arrow',
          onPress: () => console.log('Change password'),
        },
      ],
    },
    {
      title: 'Ứng dụng',
      items: [
        {
          icon: 'system-update',
          title: 'Tự động cập nhật',
          subtitle: 'Cập nhật ứng dụng tự động',
          type: 'switch',
          value: autoUpdate,
          onValueChange: setAutoUpdate,
        },
        {
          icon: 'storage',
          title: 'Quản lý lưu trữ',
          subtitle: 'Xóa cache, dữ liệu tạm',
          type: 'arrow',
          onPress: () => console.log('Storage management'),
        },
        {
          icon: 'info',
          title: 'Về ứng dụng',
          subtitle: 'Thông tin phiên bản',
          type: 'arrow',
          onPress: () => console.log('About app'),
        },
      ],
    },
  ];

  const renderSettingItem = (item: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.settingItem}
      onPress={item.onPress}
      disabled={item.type === 'switch'}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Icon name={item.icon} size={24} color={COLORS.primary} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
      </View>

      <View style={styles.settingRight}>
        {item.type === 'switch' ? (
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{
              false: COLORS.border,
              true: COLORS.primary + '40',
            }}
            thumbColor={item.value ? COLORS.primary : COLORS.textSecondary}
          />
        ) : (
          <Icon name='chevron-right' size={24} color={COLORS.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {settingsSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>{section.items.map(renderSettingItem)}</View>
        </View>
      ))}

      {/* Danger Zone */}
      <View style={styles.dangerZone}>
        <Text style={styles.dangerTitle}>Vùng nguy hiểm</Text>
        <TouchableOpacity style={styles.dangerItem}>
          <Icon name='delete-forever' size={24} color={COLORS.error} />
          <Text style={styles.dangerText}>Xóa tài khoản</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: SCREEN_PADDING,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionContent: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLeft: {
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
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  settingSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 12,
  },
  dangerZone: {
    marginTop: 24,
    marginBottom: 40,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.error,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.error + '40',
  },
  dangerText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.error,
    marginLeft: 12,
  },
});

export default SettingsScreen;
