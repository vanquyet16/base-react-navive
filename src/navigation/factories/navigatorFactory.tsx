// ============================================================================
// GENERIC NAVIGATOR FACTORY
// ============================================================================

import React from 'react';
import {
  StackNavigationOptions,
  StackNavigationEventMap,
} from '@react-navigation/stack';
import {
  DrawerNavigationOptions,
  DrawerNavigationEventMap,
} from '@react-navigation/drawer';
import type { ParamListBase } from '@react-navigation/native';
import { ScreenConfig, AuthScreenConfig } from '../config/navigationConfig';
import {
  createMainStackScreenWrapper,
  createAuthScreenWrapper,
} from './screenFactory';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Typed Navigator interface từ React Navigation
 */
interface TypedNavigator<
  ParamList extends ParamListBase,
  ScreenOptions extends object = any,
  EventMap extends object = any,
> {
  Navigator: React.ComponentType<any>;
  Screen: React.ComponentType<any>;
}

/**
 * Additional screen không có trong config (như MainTabs)
 */
export interface AdditionalScreen<ParamList extends ParamListBase> {
  name: keyof ParamList;
  component: React.ComponentType<any>;
  options?: StackNavigationOptions;
}

/**
 * Navigator config options
 */
export interface NavigatorOptions<
  ParamList extends ParamListBase,
  ScreenOptions extends object = StackNavigationOptions,
> {
  initialRouteName: keyof ParamList;
  screenOptions?: ScreenOptions;
}

// ============================================================================
// GENERIC NAVIGATOR FACTORY FUNCTIONS
// ============================================================================

/**
 * Tạo Stack Navigator Component cho Main Stack (với MainLayout wrapper)
 *
 * @template ParamList - Type của navigation param list
 * @param Navigator - Stack Navigator instance đã được typed
 * @param screenConfigs - Object chứa config của các screens
 * @param options - Navigator options (initialRouteName, screenOptions)
 * @param additionalScreens - Optional screens thêm vào (như MainTabs)
 * @returns Configured Stack Navigator component
 *
 * @example
 * const MainStack = createStackNavigator<MainStackParamList>();
 * const MainStackNavigator = createMainStackNavigatorComponent(
 *   MainStack,
 *   MAIN_STACK_SCREENS,
 *   { initialRouteName: 'MainTabs' },
 *   [{ name: 'MainTabs', component: MainTabs }]
 * );
 */
export const createMainStackNavigatorComponent = <
  ParamList extends ParamListBase,
>(
  Navigator: TypedNavigator<ParamList>,
  screenConfigs: Record<string, ScreenConfig>,
  options: NavigatorOptions<ParamList, StackNavigationOptions>,
  additionalScreens?: AdditionalScreen<ParamList>[],
): React.FC => {
  /**
   * Navigator Component
   * Render tất cả screens từ config và additional screens
   */
  const NavigatorComponent: React.FC = () => {
    // Tạo screen wrappers từ configs
    const configuredScreens = React.useMemo(() => {
      return Object.entries(screenConfigs).map(([screenName, config]) => {
        const ScreenWrapper = createMainStackScreenWrapper(screenName, config);
        return (
          <Navigator.Screen
            key={screenName}
            name={screenName as keyof ParamList}
            component={ScreenWrapper}
            options={{ headerShown: false }}
          />
        );
      });
    }, []);

    // Render additional screens (như MainTabs)
    const additionalScreenComponents = React.useMemo(() => {
      if (!additionalScreens) return null;
      return additionalScreens.map(screen => (
        <Navigator.Screen
          key={screen.name as string}
          name={screen.name}
          component={screen.component}
          options={screen.options ?? { headerShown: false }}
        />
      ));
    }, []);

    return (
      <Navigator.Navigator
        initialRouteName={options.initialRouteName}
        screenOptions={options.screenOptions ?? { headerShown: false }}
      >
        {/* Render additional screens trước (như MainTabs) */}
        {additionalScreenComponents}

        {/* Render configured screens */}
        {configuredScreens}
      </Navigator.Navigator>
    );
  };

  NavigatorComponent.displayName = 'MainStackNavigator';
  return NavigatorComponent;
};

/**
 * Tạo Stack Navigator Component cho Auth Stack (không có MainLayout wrapper)
 *
 * @template ParamList - Type của navigation param list
 * @param Navigator - Stack Navigator instance đã được typed
 * @param screenConfigs - Array chứa config của các auth screens
 * @param options - Navigator options (initialRouteName, screenOptions)
 * @returns Configured Stack Navigator component
 *
 * @example
 * const AuthStack = createStackNavigator<AuthStackParamList>();
 * const AuthStackNavigator = createAuthStackNavigatorComponent(
 *   AuthStack,
 *   AUTH_SCREENS,
 *   { initialRouteName: 'Login' }
 * );
 */
export const createAuthStackNavigatorComponent = <
  ParamList extends ParamListBase,
>(
  Navigator: TypedNavigator<ParamList>,
  screenConfigs: AuthScreenConfig[],
  options: NavigatorOptions<ParamList, StackNavigationOptions>,
): React.FC => {
  /**
   * Auth Navigator Component
   * Render tất cả auth screens từ config
   */
  const AuthNavigatorComponent: React.FC = () => {
    // Tạo screen wrappers từ configs
    const screens = React.useMemo(() => {
      return screenConfigs.map(config => {
        const ScreenWrapper = createAuthScreenWrapper(config);
        return (
          <Navigator.Screen
            key={config.name as string}
            name={config.name}
            component={ScreenWrapper}
            options={{ headerShown: false }}
          />
        );
      });
    }, []);

    return (
      <Navigator.Navigator
        initialRouteName={options.initialRouteName}
        screenOptions={options.screenOptions ?? { headerShown: false }}
      >
        {screens}
      </Navigator.Navigator>
    );
  };

  AuthNavigatorComponent.displayName = 'AuthStackNavigator';
  return AuthNavigatorComponent;
};

/**
 * Tạo Drawer Navigator Component
 *
 * @template ParamList - Type của navigation param list
 * @param Navigator - Drawer Navigator instance đã được typed
 * @param options - Navigator options (drawerContent, screenOptions)
 * @param additionalScreens - Additional screens (thường là Drawers main stack)
 * @returns Configured Drawer Navigator component
 */
export const createDrawerNavigatorComponent = <ParamList extends ParamListBase>(
  Navigator: TypedNavigator<
    ParamList,
    DrawerNavigationOptions,
    DrawerNavigationEventMap
  >,
  options: NavigatorOptions<ParamList, DrawerNavigationOptions> & {
    drawerContent?: (props: any) => React.ReactNode;
  },
  additionalScreens?: AdditionalScreen<ParamList>[],
  screenConfigs?: Record<string, ScreenConfig>,
): React.FC => {
  const DrawerNavigatorComponent: React.FC = () => {
    // Render additional screens (như Drawer Stack)
    const additionalScreenComponents = React.useMemo(() => {
      if (!additionalScreens) return null;
      return additionalScreens.map(screen => (
        <Navigator.Screen
          key={screen.name as string}
          name={screen.name}
          component={screen.component}
          options={screen.options as DrawerNavigationOptions}
        />
      ));
    }, []);

    // Render configured screens (nếu có)
    const configuredScreens = React.useMemo(() => {
      if (!screenConfigs) return null;
      return Object.entries(screenConfigs).map(([screenName, config]) => {
        // Sử dụng createMainStackScreenWrapper vì Drawer screen cũng cần MainLayout
        // Hoặc có thể cần 1 wrapper riêng nếu logic khác biệt
        const ScreenWrapper = createMainStackScreenWrapper(screenName, config);
        return (
          <Navigator.Screen
            key={screenName}
            name={screenName as keyof ParamList}
            component={ScreenWrapper}
            options={{ headerShown: false }}
          />
        );
      });
    }, []);

    return (
      <Navigator.Navigator
        initialRouteName={options.initialRouteName}
        drawerContent={options.drawerContent}
        screenOptions={options.screenOptions as DrawerNavigationOptions}
      >
        {additionalScreenComponents}
        {configuredScreens}
      </Navigator.Navigator>
    );
  };

  DrawerNavigatorComponent.displayName = 'DrawerNavigator';
  return DrawerNavigatorComponent;
};
