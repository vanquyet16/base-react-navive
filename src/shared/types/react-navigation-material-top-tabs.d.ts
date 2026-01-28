declare module '@react-navigation/material-top-tabs' {
    import { ParamListBase, TabNavigationState, TypedNavigator } from '@react-navigation/native';
    import { StyleProp, ViewStyle } from 'react-native';
    import * as React from 'react';

    export type MaterialTopTabNavigationEventMap = {
        tabPress: { data: { isFocused: boolean } | undefined; canPreventDefault: true };
        tabLongPress: { data: undefined };
        swipeStart: { data: undefined };
        swipeEnd: { data: undefined };
    };

    export type MaterialTopTabNavigationOptions = {
        title?: string;
        tabBarLabel?: string;
        tabBarAccessibilityLabel?: string;
        tabBarTestID?: string;
        tabBarIcon?: (props: { focused: boolean; color: string }) => React.ReactNode;
        tabBarBadge?: boolean | number | string | (() => React.ReactNode);
        tabBarIndicatorStyle?: StyleProp<ViewStyle>;
        tabBarIndicatorContainerStyle?: StyleProp<ViewStyle>;
        tabBarLabelStyle?: StyleProp<ViewStyle>;
        tabBarIconStyle?: StyleProp<ViewStyle>;
        tabBarStyle?: StyleProp<ViewStyle>;
        tabBarItemStyle?: StyleProp<ViewStyle>;
        tabBarContentContainerStyle?: StyleProp<ViewStyle>;
        tabBarActiveTintColor?: string;
        tabBarInactiveTintColor?: string;
        tabBarPressColor?: string;
        tabBarPressOpacity?: number;
        tabBarBounces?: boolean;
        tabBarScrollEnabled?: boolean;
        swipeEnabled?: boolean;
        lazy?: boolean;
        lazyPlaceholder?: (props: { route: any }) => React.ReactNode;
        lazyPreloadDistance?: number;
    };

    export type MaterialTopTabBarProps = {
        state: TabNavigationState<ParamListBase>;
        descriptors: any;
        navigation: any;
        position: any;
    };

    export function createMaterialTopTabNavigator<
        ParamList extends ParamListBase = ParamListBase,
        NavigatorID extends string | undefined = undefined,
        TypeBag extends {
            ParamList: ParamList;
            NavigatorID: NavigatorID;
            State: TabNavigationState<ParamList>;
            ScreenOptions: MaterialTopTabNavigationOptions;
            EventMap: MaterialTopTabNavigationEventMap;
            NavigationList: any;
            Navigator: React.ComponentType<any>;
        } = {
            ParamList: ParamList;
            NavigatorID: NavigatorID;
            State: TabNavigationState<ParamList>;
            ScreenOptions: MaterialTopTabNavigationOptions;
            EventMap: MaterialTopTabNavigationEventMap;
            NavigationList: any;
            Navigator: React.ComponentType<any>;
        }
    >(): TypedNavigator<TypeBag['ParamList'], TypeBag['State'], TypeBag['ScreenOptions'], TypeBag['EventMap'], typeof React.Fragment>;
}
