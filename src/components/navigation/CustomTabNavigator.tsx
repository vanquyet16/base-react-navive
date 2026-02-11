import React, { useMemo, useCallback, memo } from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { CustomTabs } from '@/components/base/CustomTabs';
import { ViewStyle } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { moderateVerticalScale } from '@/shared/utils/sizeMatters';
import { View } from '@ant-design/react-native';

const Tab = createMaterialTopTabNavigator();

export interface CustomTabNavigatorProps {
  /**
   * Array of screens to render in the tab navigator.
   */
  screens: {
    name: string;
    label: string; // Label displayed in the tab
    component: React.ComponentType<any>;
    initialParams?: object;
  }[];
  /**
   * Initial route name to be displayed.
   */
  initialRouteName?: string;
  /**
   * Optional style for the container.
   */
  style?: ViewStyle;
  /**
   * Tab Visual Style
   * 'pill' | 'underline' | 'chip' | 'solid'
   */
  tabType?: 'pill' | 'underline' | 'chip' | 'solid';
}

/**
 * CustomTabBar Adapter
 * --------------------
 * Adapts React Navigation props to CustomTabs props.
 */
const CustomTabBar = memo(
  ({
    state,
    descriptors,
    navigation,
    tabType,
  }: MaterialTopTabBarProps & {
    tabType?: 'pill' | 'underline' | 'chip' | 'solid';
  }) => {
    const theme = useTheme();

    const tabs = useMemo(
      () =>
        state.routes.map(route => ({
          title: descriptors[route.key].options.title || route.name,
        })),
      [state.routes, descriptors],
    );

    const activeTab = state.index;

    const lastClickTimeRef = React.useRef(0);

    const handleTabClick = useCallback(
      (tab: any, index: number) => {
        const now = Date.now();
        if (now - lastClickTimeRef.current < 300) {
          return;
        }
        lastClickTimeRef.current = now;

        const route = state.routes[index];
        const isFocused = state.index === index;

        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      },
      [state.routes, state.index, navigation],
    );

    const tabStyle = useMemo(
      () => ({
        backgroundColor: theme.colors.background,
        // marginBottom: moderateVerticalScale(12),
        // marginBottom handled by CustomTabs internally
      }),
      [theme.colors.background],
    );

    return (
      // <View style={{ backgroundColor: 'transparent' }}>
      <CustomTabs
        tabs={tabs}
        page={activeTab} // Control tab active state
        onTabClick={handleTabClick} // Handle navigation
        style={tabStyle}
        type={tabType}
      />
      // </View>
    );
  },
);

/**
 * CustomTabNavigator
 * ==================
 * A highly customizable Top Tab Navigator that uses CustomTabs for the tab bar UI.
 * Integrates seamlessly with React Navigation.
 *
 * @example
 * <CustomTabNavigator
 *    screens={[
 *      { name: 'Home', label: 'Trang chủ', component: HomeScreen },
 *      { name: 'Profile', label: 'Cá nhân', component: ProfileScreen },
 *    ]}
 *    tabType="underline"
 * />
 */
export const CustomTabNavigator = memo<CustomTabNavigatorProps>(
  ({ screens, initialRouteName, style, tabType = 'pill' }) => {
    const theme = useTheme();

    const sceneContainerStyle = useMemo(
      () => ({ backgroundColor: 'transparent' }),
      [], // Fixed: removed unused dependency theme.colors.background
    );

    const screenOptions = useMemo(
      () => ({
        swipeEnabled: true,
        lazy: true, // Optimize performance
        tabBarScrollEnabled: true,
      }),
      [],
    );

    const renderTabBar = useCallback(
      (props: MaterialTopTabBarProps) => (
        <CustomTabBar {...props} tabType={tabType} />
      ),
      [tabType],
    );

    return (
      <Tab.Navigator
        initialRouteName={initialRouteName}
        tabBar={renderTabBar}
        sceneContainerStyle={sceneContainerStyle}
        screenOptions={screenOptions}
        style={style}
      >
        {screens.map(screen => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            initialParams={screen.initialParams}
            options={{ title: screen.label }}
          />
        ))}
      </Tab.Navigator>
    );
  },
);
