import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { COLORS } from '@/shared/constants';
import { useNavigation } from '@react-navigation/native';
import { useSessionActions } from '@/shared/store/selectors';
import { NAVIGATION_KEYS } from '@/navigation/config';

/**
 * CUSTOM DRAWER COMPONENT
 * =======================
 * Drawer custom với header (user info) và footer (logout).
 * Sử dụng DrawerContentScrollView để đảm bảo scroll behavior chuẩn.
 *
 * @param props - Drawer content props từ React Navigation
 */
const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  const navigation = useNavigation();
  const { clearSession } = useSessionActions();

  const handleLogout = () => {
    clearSession();
    // Navigate ve Auth stack (được handle bởi AppNavigator state)
  };

  const handleNavigation = (screenName: string) => {
    navigation.navigate(screenName as never);
    props.navigation.closeDrawer();
  };

  const menuItems = [
    {
      label: 'Trang chủ',
      icon: 'home',
      screen: NAVIGATION_KEYS.MAIN_STACK.MAIN_TABS,
    },
    {
      label: 'Quản lý sản phẩm',
      icon: 'inventory',
      screen: 'ProductScreen',
    },
    {
      label: 'Lazy Loading Demo',
      icon: 'speed',
      screen: 'LazyDemoScreen',
    },
    {
      label: 'API Demo',
      icon: 'api',
      screen: 'ApiLazyDemoScreen',
    },
    {
      label: 'Cache Demo',
      icon: 'cached',
      screen: 'CacheDemoScreen',
    },
    {
      label: 'PDF Demo',
      icon: 'picture-as-pdf',
      screen: 'PdfDemoScreen',
    },
    {
      label: 'Performance Demo',
      icon: 'analytics',
      screen: 'PerformanceDemoScreen',
    },
    {
      label: 'Responsive Demo',
      icon: 'aspect-ratio',
      screen: 'ResponsiveDemoScreen',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Icon name="person" size={40} color={COLORS.primary} />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Người dùng</Text>
            <Text style={styles.userEmail}>user@example.com</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <DrawerContentScrollView {...props} style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <DrawerItem
            key={index}
            label={item.label}
            icon={({ color, size }) => (
              <Icon name={item.icon} size={size} color={color} />
            )}
            onPress={() => handleNavigation(item.screen)}
            activeTintColor={COLORS.primary}
            inactiveTintColor={COLORS.text}
            labelStyle={styles.menuText}
            style={styles.menuItem}
          />
        ))}
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={24} color={COLORS.error} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.primary,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.background,
    opacity: 0.8,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    marginHorizontal: 10,
    marginVertical: 2,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logoutText: {
    fontSize: 16,
    color: COLORS.error,
    marginLeft: 15,
    fontWeight: '500',
  },
});

export default memo(CustomDrawer);
