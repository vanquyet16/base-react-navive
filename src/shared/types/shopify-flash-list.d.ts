declare module '@shopify/flash-list' {
    import { Component, ReactNode } from 'react';
    import { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';

    export interface ContentStyle {
        paddingTop?: number;
        paddingBottom?: number;
        paddingLeft?: number;
        paddingRight?: number;
        backgroundColor?: string;
    }

    export interface FlashListProps<T> extends ScrollViewProps {
        data: T[] | null | undefined;
        renderItem: (info: { item: T; index: number; target: string; extraData?: any }) => React.ReactElement | null;
        estimatedItemSize: number;
        overrideItemLayout?: (layout: { span?: number; size?: number }, item: T, index: number, maxColumns: number, extraData?: any) => void;
        keyExtractor?: (item: T, index: number) => string;
        extraData?: any;
        ListEmptyComponent?: React.ReactElement | React.ComponentType<any> | null;
        ListFooterComponent?: React.ReactElement | React.ComponentType<any> | null;
        ListHeaderComponent?: React.ReactElement | React.ComponentType<any> | null;
        numColumns?: number;
        inverted?: boolean;
        horizontal?: boolean;
        onEndReached?: () => void;
        onEndReachedThreshold?: number;
        onRefresh?: () => void;
        refreshing?: boolean;
        viewabilityConfig?: any;
        onViewableItemsChanged?: any;
        // ... add more as needed
    }

    export class FlashList<T> extends Component<FlashListProps<T>> { }
}
