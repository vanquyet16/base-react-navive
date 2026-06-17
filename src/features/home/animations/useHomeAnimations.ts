import {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo } from 'react';

// Constants for animation
export const HOME_ANIMATION_CONSTANTS = {
    HEADER_MAX_HEIGHT: moderateVerticalScale(180),
    HEADER_MIN_HEIGHT: moderateVerticalScale(56), // Without safe area
    HEADER_EXPANSION: moderateVerticalScale(90),
    PROFILE_IMAGE_SIZE: moderateScale(40),
    COMPACT_IMAGE_SIZE: moderateScale(32),
    // Increased from 100 to 200 for smoother transition
    SCROLL_DISTANCE: 300,
    CONTENT_PARALLAX_OFFSET: moderateVerticalScale(180),
};

// Pointer events constants for optimization
const POINTER_EVENTS_NONE = 'none' as const;
const POINTER_EVENTS_AUTO = 'auto' as const;

export const useHomeAnimations = (scrollY?: SharedValue<number>) => {
    const insets = useSafeAreaInsets();

    // Calculate actual min height including safe area
    const minHeight = HOME_ANIMATION_CONSTANTS.HEADER_MIN_HEIGHT + insets.top;

    // 1. Container Height Animation
    const containerAnimatedStyle = useAnimatedStyle(() => {
        if (!scrollY) return {};
        const height = interpolate(
            scrollY.value,
            [0, HOME_ANIMATION_CONSTANTS.SCROLL_DISTANCE],
            [
                HOME_ANIMATION_CONSTANTS.HEADER_MAX_HEIGHT + HOME_ANIMATION_CONSTANTS.HEADER_EXPANSION,
                minHeight
            ],
            Extrapolation.CLAMP,
        );
        return {
            height,
            zIndex: 100,
        };
    });

    // 2. Full View Opacity (Fades out)
    const fullViewOpacityStyle = useAnimatedStyle(() => {
        if (!scrollY) return { opacity: 1 };
        const opacity = interpolate(
            scrollY.value,
            [0, HOME_ANIMATION_CONSTANTS.SCROLL_DISTANCE * 0.6], // Fade out earlier
            [1, 0],
            Extrapolation.CLAMP,
        );
        return {
            opacity,
            pointerEvents: opacity === 0 ? POINTER_EVENTS_NONE : POINTER_EVENTS_AUTO,
        };
    });

    // 3. Compact View Opacity (Fades in)
    const compactViewOpacityStyle = useAnimatedStyle(() => {
        if (!scrollY) return { opacity: 0 };
        const opacity = interpolate(
            scrollY.value,
            [
                HOME_ANIMATION_CONSTANTS.SCROLL_DISTANCE * 0.6,
                HOME_ANIMATION_CONSTANTS.SCROLL_DISTANCE
            ],
            [0, 1],
            Extrapolation.CLAMP,
        );
        return {
            opacity,
            pointerEvents: opacity === 1 ? POINTER_EVENTS_AUTO : POINTER_EVENTS_NONE,
        };
    });

    // 4. Swiper Animation (Moves up and fades out)
    const swiperStyle = useAnimatedStyle(() => {
        if (!scrollY) return {};
        const translateY = interpolate(
            scrollY.value,
            [0, HOME_ANIMATION_CONSTANTS.SCROLL_DISTANCE],
            [0, -100],
            Extrapolation.CLAMP,
        );
        const opacity = interpolate(
            scrollY.value,
            [0, HOME_ANIMATION_CONSTANTS.SCROLL_DISTANCE * 0.5],
            [1, 0],
            Extrapolation.CLAMP,
        );
        return {
            transform: [{ translateY }],
            opacity,
        };
    });

    // 5. Content Parallax Animation
    const contentAnimatedStyle = useAnimatedStyle(() => {
        if (!scrollY) return {};

        // Header collapses faster than scroll. 
        // We use negative margin to reclaim space and translate up to close gaps.
        const translateY = interpolate(
            scrollY.value,
            [0, HOME_ANIMATION_CONSTANTS.SCROLL_DISTANCE],
            [0, -HOME_ANIMATION_CONSTANTS.CONTENT_PARALLAX_OFFSET],
            Extrapolation.CLAMP,
        );

        return {
            transform: [{ translateY }],
            marginBottom: -HOME_ANIMATION_CONSTANTS.CONTENT_PARALLAX_OFFSET,
        };
    });

    // Memoize return object for stable reference
    return useMemo(
        () => ({
            containerAnimatedStyle,
            fullViewOpacityStyle,
            compactViewOpacityStyle,
            swiperStyle,
            contentAnimatedStyle,
        }),
        [
            containerAnimatedStyle,
            fullViewOpacityStyle,
            compactViewOpacityStyle,
            swiperStyle,
            contentAnimatedStyle,
        ]
    );
};
