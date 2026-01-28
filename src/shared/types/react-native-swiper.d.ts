declare module 'react-native-swiper' {
    import { Component } from 'react';
    import { ViewStyle, StyleProp } from 'react-native';

    interface SwiperProps {
        style?: StyleProp<ViewStyle>;
        showsButtons?: boolean;
        horizontal?: boolean;
        loop?: boolean;
        index?: number;
        showsPagination?: boolean;
        autoplay?: boolean;
        autoplayTimeout?: number;
        autoplayDirection?: boolean;
        onIndexChanged?: (index: number) => void;
        renderPagination?: (index: number, total: number, context: any) => JSX.Element;
        dotColor?: string;
        activeDotColor?: string;
        children?: React.ReactNode;
        paginationStyle?: StyleProp<ViewStyle>;
        width?: number;
        height?: number;
        removeClippedSubviews?: boolean; // Critical prop
        // Add other props as needed
    }

    export default class Swiper extends Component<SwiperProps> { }
}
