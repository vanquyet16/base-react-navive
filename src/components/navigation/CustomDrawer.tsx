import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { useSessionActions } from '@/shared/store/selectors';
import { NAVIGATION_KEYS } from '@/navigation/config';
import { ROOT_STACKS } from '@/shared/constants/routes';
import type { DrawerStackParamList } from '@/shared/types/navigation.types';

type DrawerMenuItem = {
  label: string;
  icon: string;
  screen: keyof DrawerStackParamList;
};

/**
 * CUSTOM DRAWER COMPONENT
 * =======================
 * Drawer custom với header (user info) và footer (logout).
 * Sử dụng DrawerContentScrollView để đảm bảo scroll behavior chuẩn.
 *
 * @param props - Drawer content props từ React Navigation
 */
const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  const theme = useTheme();
  const { clearSession } = useSessionActions();
  const styles = useStyles();

  const handleLogout = useCallback(() => {
    clearSession();
    // Navigate ve Auth stack (được handle bởi AppNavigator state)
  }, [clearSession]);

  const handleNavigation = useCallback(
    (screenName: keyof DrawerStackParamList) => {
      // Drawer structure: Drawer -> DrawerStack -> (shortcut) -> MainStackNavigator
      props.navigation.navigate(ROOT_STACKS.DRAWER_STACK, {
        screen: screenName,
      });
      props.navigation.closeDrawer();
    },
    [props.navigation],
  );

  const menuItems: DrawerMenuItem[] = [
    {
      label: 'Trang chủ',
      icon: 'home',
      screen: NAVIGATION_KEYS.DRAWER_STACK.MAIN_TABS,
    },
    {
      label: 'Quản lý sản phẩm',
      icon: 'inventory',
      screen: NAVIGATION_KEYS.DRAWER_STACK.PRODUCT,
    },
    {
      label: 'Lazy Loading Demo',
      icon: 'speed',
      screen: NAVIGATION_KEYS.DRAWER_STACK.LAZY_DEMO,
    },
    {
      label: 'API Demo',
      icon: 'api',
      screen: NAVIGATION_KEYS.DRAWER_STACK.API_DEMO,
    },
    {
      label: 'Cache Demo',
      icon: 'cached',
      screen: NAVIGATION_KEYS.DRAWER_STACK.CACHE_DEMO,
    },
    {
      label: 'PDF Demo',
      icon: 'picture-as-pdf',
      screen: NAVIGATION_KEYS.DRAWER_STACK.PDF_DEMO,
    },
    {
      label: 'Performance Demo',
      icon: 'analytics',
      screen: NAVIGATION_KEYS.DRAWER_STACK.PERFORMANCE_DEMO,
    },
    {
      label: 'Responsive Demo',
      icon: 'aspect-ratio',
      screen: NAVIGATION_KEYS.DRAWER_STACK.RESPONSIVE_DEMO,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Icon name="person" size={40} color={theme.colors.primary} />
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
            // eslint-disable-next-line react/no-unstable-nested-components
            icon={({ color, size }) => (
              <Icon name={item.icon} size={size} color={color} />
            )}
            onPress={() => handleNavigation(item.screen)}
            activeTintColor={theme.colors.primary}
            inactiveTintColor={theme.colors.text}
            labelStyle={styles.menuText}
            style={styles.menuItem}
          />
        ))}
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={24} color={theme.colors.error} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(CustomDrawer);

const useStyles = createStyles(
  theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.primary,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.background,
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
      color: theme.colors.background,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      color: theme.colors.background,
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
      borderTopColor: theme.colors.border,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    logoutText: {
      fontSize: 16,
      color: theme.colors.error,
      marginLeft: 15,
      fontWeight: '500',
    },
  }),
  true,
);
