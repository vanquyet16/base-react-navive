/**
 * DRAWER NAVIGATOR
 * ================
 * Navigator xử lý side menu drawer.
 * Bao bọc MainStackNavigator.
 */

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParamList } from '@/shared/types';
import { MainStackNavigator } from './MainStackNavigator';
import CustomDrawer from '@/components/navigation/CustomDrawer';
import { ROOT_STACKS } from '@/shared/constants/routes';

/**
 * Drawer Navigator instance
 * Typed với DrawerParamList
 */
const Drawer = createDrawerNavigator<DrawerParamList>();

/**
 * Drawer Navigator Component
 *
 * Pattern:
 * - Wrap MainStack làm content chính
 * - Sử dụng CustomDrawerComponent để render menu
 * - Config style drawer tại đây
 */
export const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '80%',
        },
        drawerType: 'front', // Slide over content
        overlayColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <Drawer.Screen
        name={ROOT_STACKS.MAIN_STACK}
        component={MainStackNavigator}
      />
    </Drawer.Navigator>
  );
};
