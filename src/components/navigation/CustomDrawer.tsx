import React, { memo, useCallback } from 'react';
import { View, Pressable } from 'react-native';
import { CustomText } from '@/components/base/CustomText';
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

const menuItems: DrawerMenuItem[] = [
  {
    label: 'Trang chủ',
    icon: 'home',
    screen: NAVIGATION_KEYS.DRAWER_STACK.MAIN,
  },
];

/**
 * CUSTOM DRAWER COMPONENT
 * =======================
 * Drawer custom với header (user info) và footer (logout).
 * Sử dụng DrawerContentScrollView để đảm bảo scroll behavior chuẩn.
 *
 * @param props - Drawer content props từ React Navigation
 */
const CustomDrawer: React.FC<DrawerContentComponentProps> = ({ navigation, ...props }) => {
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
      navigation.navigate(ROOT_STACKS.DRAWER_STACK, {
        screen: screenName,
      });
      navigation.closeDrawer();
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Icon name="person" size={40} color={theme.colors.primary} />
          </View>
          <View style={styles.userDetails}>
            <CustomText variant="h5" weight="bold" style={styles.userName}>
              Người dùng
            </CustomText>
            <CustomText variant="bodySmall" style={styles.userEmail}>
              user@example.com
            </CustomText>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <DrawerContentScrollView {...props} style={styles.menuContainer}>
        {menuItems.map((item) => (
          <DrawerItem
            key={item.screen}
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
        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={handleLogout}
        >
          <Icon name="logout" size={24} color={theme.colors.error} />
          <CustomText variant="body" weight="medium" style={styles.logoutText}>
            Đăng xuất
          </CustomText>
        </Pressable>
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
      color: theme.colors.background,
      marginBottom: 4,
    },
    userEmail: {
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
      color: theme.colors.error,
      marginLeft: 15,
    },
  }),
  true,
);
