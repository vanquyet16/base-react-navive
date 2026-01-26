import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { COLORS } from '@/shared/constants';
import { useNavigation } from '@react-navigation/native';
import { useSessionActions } from '@/shared/store/selectors';

interface CustomDrawerProps {
  props: any;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ props }) => {
  const navigation = useNavigation();
  const { clearSession } = useSessionActions();

  const handleLogout = () => {
    clearSession();
    navigation.navigate('Auth' as never);
  };

  const menuItems = [
    {
      label: 'Trang chủ',
      icon: 'home',
      onPress: () => {
        navigation.navigate('MainTabs' as never);
        props.navigation.closeDrawer();
      },
    },
    {
      label: 'Quản lý sản phẩm',
      icon: 'inventory',
      onPress: () => {
        navigation.navigate('ProductScreen' as never);
        props.navigation.closeDrawer();
      },
    },
    {
      label: 'Lazy Loading Demo',
      icon: 'speed',
      onPress: () => {
        navigation.navigate('LazyDemoScreen' as never);
        props.navigation.closeDrawer();
      },
    },
    {
      label: 'API Demo',
      icon: 'api',
      onPress: () => {
        navigation.navigate('ApiLazyDemoScreen' as never);
        props.navigation.closeDrawer();
      },
    },
    {
      label: 'Cache Demo',
      icon: 'cached',
      onPress: () => {
        navigation.navigate('CacheDemoScreen' as never);
        props.navigation.closeDrawer();
      },
    },
    {
      label: 'PDF Demo',
      icon: 'picture-as-pdf',
      onPress: () => {
        navigation.navigate('PdfDemoScreen' as never);
        props.navigation.closeDrawer();
      },
    },
    {
      label: 'Performance Demo',
      icon: 'analytics',
      onPress: () => {
        navigation.navigate('PerformanceDemoScreen' as never);
        props.navigation.closeDrawer();
      },
    },
    {
      label: 'Responsive Demo',
      icon: 'aspect-ratio',
      onPress: () => {
        navigation.navigate('ResponsiveDemoScreen' as never);
        props.navigation.closeDrawer();
      },
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Icon name='person' size={40} color={COLORS.primary} />
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
            icon={({ color, size }) => <Icon name={item.icon} size={size} color={color} />}
            onPress={item.onPress}
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
          <Icon name='logout' size={24} color={COLORS.error} />
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

export default CustomDrawer;
