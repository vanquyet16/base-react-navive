// ============================================================================
// GENERIC NAVIGATOR FACTORY - SENIOR LEVEL PATTERN
// ============================================================================

import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import { ScreenConfig, AuthScreenConfig } from '../config/navigationConfig';
import {
  createMainStackScreenWrapper,
  createAuthScreenWrapper,
} from './screenFactory';
import { logger } from '@/shared/utils/logger';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Type cho additional screen (không từ config, như MainTabs)
 */
export interface AdditionalScreen<ParamList extends Record<string, any>> {
  name: keyof ParamList;
  component: React.ComponentType<any>;
  options?: StackNavigationOptions;
}

/**
 * Type union cho screen config - có thể là ScreenConfig hoặc AuthScreenConfig
 */
type AnyScreenConfig = ScreenConfig | AuthScreenConfig;

/**
 * Type guard để check xem config có phải AuthScreenConfig không
 */
function isAuthScreenConfig(
  config: AnyScreenConfig,
): config is AuthScreenConfig {
  // AuthScreenConfig không có showHeader, showTabs properties
  return !('showHeader' in config) && !('showTabs' in config);
}

// ============================================================================
// LOGGER INSTANCE
// ============================================================================

const navLogger = logger;

// ============================================================================
// SCREEN OPTIONS FACTORY
// ============================================================================

/**
 * Tạo screen options từ screen config
 *
 * @param config - Screen configuration
 * @returns Stack navigation options
 *
 * @example
 * const options = createScreenOptions({
 *   gestureEnabled: true,
 *   animationEnabled: true
 * });
 */
const createScreenOptions = (config: ScreenConfig): StackNavigationOptions => {
  const options: StackNavigationOptions = {
    headerShown: false, // Luôn ẩn header vì đã có MainLayout
  };

  // Gesture settings
  if (config.gestureEnabled !== undefined) {
    options.gestureEnabled = config.gestureEnabled;
  }

  // Gesture direction
  if (config.gestureDirection) {
    options.gestureDirection = config.gestureDirection;
  }

  // Apply default transition presets for smooth animations
  // Note: animationEnabled property is used in config but not directly in StackNavigationOptions
  // Instead, we conditionally apply transition presets
  if (config.animationEnabled !== false) {
    options.transitionSpec = TransitionPresets.SlideFromRightIOS.transitionSpec;
    options.cardStyleInterpolator =
      TransitionPresets.SlideFromRightIOS.cardStyleInterpolator;
  }

  return options;
};

// ============================================================================
// GENERIC NAVIGATOR FACTORY
// ============================================================================

/**
 * Generic factory function để tạo Stack Navigator component
 *
 * Pattern này cho phép:
 * - 100% type-safe với TypeScript generics
 * - Reusable cho bất kỳ stack navigator nào (Auth, Main, Future stacks)
 * - Centralized logic, DRY principle
 * - Dễ maintain và extend
 *
 * @template ParamList - Type của param list cho navigator
 * @param screenConfigs - Array các screen configs (từ navigationConfig)
 * @param initialRouteName - Tên screen khởi đầu
 * @param additionalScreens - Optional array các screens không từ config (như MainTabs)
 * @param isAuthStack - Flag để biết đây có phải auth stack không
 * @returns React component là configured Stack Navigator
 *
 * @example
 * // Tạo Auth Stack Navigator
 * const AuthStackNavigator = createStackNavigatorComponent<AuthStackParamList>(
 *   AUTH_SCREENS,
 *   'Login',
 *   [],
 *   true
 * );
 *
 * @example
 * // Tạo Main Stack Navigator với MainTabs
 * const MainStackNavigator = createStackNavigatorComponent<MainStackParamList>(
 *   MAIN_STACK_SCREENS,
 *   'MainTabs',
 *   [{ name: 'MainTabs', component: MainTabs }],
 *   false
 * );
 */
export const createStackNavigatorComponent = <
  ParamList extends Record<string, any>,
>(
  screenConfigs: AnyScreenConfig[],
  initialRouteName: keyof ParamList,
  additionalScreens: AdditionalScreen<ParamList>[] = [],
  isAuthStack: boolean = false,
): React.FC => {
  // Validate inputs - defensive programming
  if (!screenConfigs || screenConfigs.length === 0) {
    navLogger.error(
      'createStackNavigatorComponent: screenConfigs is empty or undefined',
    );
    throw new Error('screenConfigs cannot be empty');
  }

  if (!initialRouteName) {
    navLogger.error(
      'createStackNavigatorComponent: initialRouteName is required',
    );
    throw new Error('initialRouteName is required');
  }

  // Tạo Stack instance với proper typing
  const Stack = createStackNavigator<ParamList>();

  // Tạo screen wrappers từ configs
  const screenWrappers = React.useMemo(() => {
    const wrappers: Record<string, React.FC> = {};

    screenConfigs.forEach(config => {
      // Type assertion: config có thể có name property khi được truyền vào
      const screenName = (config as any).name as string;

      try {
        // Sử dụng appropriate wrapper factory based on stack type
        if (isAuthStack && isAuthScreenConfig(config)) {
          wrappers[screenName] = createAuthScreenWrapper(config);
        } else if (!isAuthStack && !isAuthScreenConfig(config)) {
          wrappers[screenName] = createMainStackScreenWrapper(
            screenName,
            config,
          );
        } else {
          navLogger.warn(
            'createStackNavigatorComponent: Config type mismatch',
            {
              screenName,
              isAuthStack,
              configType: isAuthScreenConfig(config)
                ? 'AuthScreenConfig'
                : 'ScreenConfig',
            },
          );
        }
      } catch (error) {
        navLogger.error(
          'createStackNavigatorComponent: Error creating wrapper',
          {
            screenName,
            error,
          },
        );
      }
    });

    return wrappers;
  }, [screenConfigs, isAuthStack]);

  // Navigator Component
  const NavigatorComponent: React.FC = () => {
    return (
      <Stack.Navigator
        id={isAuthStack ? 'AuthStackNav' : 'MainStackNav'}
        initialRouteName={initialRouteName as Extract<keyof ParamList, string>}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        {/* Render additional screens trước (như MainTabs) */}
        {additionalScreens.map(screen => {
          const screenName = screen.name as string;

          return (
            <Stack.Screen
              key={screenName}
              name={screen.name as Extract<keyof ParamList, string>}
              component={screen.component}
              options={screen.options}
            />
          );
        })}

        {/* Render screens từ config */}
        {screenConfigs.map(config => {
          // Type assertion: config có thể có name property khi được truyền vào
          const screenName = (config as any).name as string;
          const Wrapper = screenWrappers[screenName];

          // Error handling: skip nếu wrapper không tìm thấy
          if (!Wrapper) {
            navLogger.error(
              'createStackNavigatorComponent: Wrapper not found',
              {
                screenName,
                availableWrappers: Object.keys(screenWrappers),
              },
            );
            return null;
          }

          // Tạo screen options (chỉ cho ScreenConfig, không phải AuthScreenConfig)
          const screenOptions = isAuthStack
            ? {}
            : createScreenOptions(config as ScreenConfig);

          return (
            <Stack.Screen
              key={screenName}
              name={(config as any).name as Extract<keyof ParamList, string>}
              component={Wrapper}
              options={screenOptions}
            />
          );
        })}
      </Stack.Navigator>
    );
  };

  // Set display name để dễ debug
  NavigatorComponent.displayName = isAuthStack
    ? 'AuthStackNavigator'
    : 'MainStackNavigator';

  return NavigatorComponent;
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Helper function để convert screen configs object thành array
 * Useful khi configs được define như object thay vì array
 *
 * @param configs - Object chứa screen configs
 * @returns Array of screen configs with names
 *
 * @example
 * const configArray = convertScreenConfigsToArray({
 *   ProductScreen: { title: 'Products', component: ... },
 *   SettingsScreen: { title: 'Settings', component: ... }
 * });
 */
export const convertScreenConfigsToArray = (
  configs: Record<string, ScreenConfig>,
): (ScreenConfig & { name: string })[] => {
  return Object.entries(configs).map(([name, config]) => ({
    ...config,
    name,
  }));
};
