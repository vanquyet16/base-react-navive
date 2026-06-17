import {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { moderateVerticalScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo } from 'react';

export const FEEDBACK_ANIMATION_CONSTANTS = {
    HEADER_MAX_HEIGHT: moderateVerticalScale(320),
    HEADER_MIN_HEIGHT: moderateVerticalScale(56), // Standard toolbar height
    SCROLL_DISTANCE: 250,
};

// Pointer events constants for optimization
const POINTER_EVENTS_NONE = 'none' as const;
const POINTER_EVENTS_AUTO = 'auto' as const;

export const useFeedbackDetailAnimations = (scrollY: SharedValue<number>) => {
    const insets = useSafeAreaInsets();

    // Memoize minHeight calculation
    const minHeight = FEEDBACK_ANIMATION_CONSTANTS.HEADER_MIN_HEIGHT + insets.top;

    // 1. Container Height Animation
    const containerAnimatedStyle = useAnimatedStyle(() => {
        const height = interpolate(
            scrollY.value,
            [0, FEEDBACK_ANIMATION_CONSTANTS.SCROLL_DISTANCE],
            [FEEDBACK_ANIMATION_CONSTANTS.HEADER_MAX_HEIGHT, minHeight],
            Extrapolation.CLAMP,
        );
        return {
            height,
            zIndex: 100,
        };
    });

    // 2. Full View Opacity (Content that disappears)
    const fullViewOpacityStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, FEEDBACK_ANIMATION_CONSTANTS.SCROLL_DISTANCE * 0.8], // Fade later
            [1, 0],
            Extrapolation.CLAMP,
        );
        const translateY = interpolate(
            scrollY.value,
            [0, FEEDBACK_ANIMATION_CONSTANTS.SCROLL_DISTANCE],
            [0, -20], // Slight upward drift for text
            Extrapolation.CLAMP,
        );
        return {
            opacity,
            transform: [{ translateY }],
            pointerEvents: opacity === 0 ? POINTER_EVENTS_NONE : POINTER_EVENTS_AUTO,
        };
    });

    // 3. Compact View Opacity (Navbar that appears)
    const compactViewOpacityStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [
                FEEDBACK_ANIMATION_CONSTANTS.SCROLL_DISTANCE * 0.5,
                FEEDBACK_ANIMATION_CONSTANTS.SCROLL_DISTANCE,
            ],
            [0, 1],
            Extrapolation.CLAMP,
        );
        return {
            opacity,
            pointerEvents: opacity === 1 ? POINTER_EVENTS_AUTO : POINTER_EVENTS_NONE,
        };
    });

    // 4. Image Background Parallax/Blur effect
    const imageAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [-100, 0, FEEDBACK_ANIMATION_CONSTANTS.SCROLL_DISTANCE],
            [0, 0, -FEEDBACK_ANIMATION_CONSTANTS.SCROLL_DISTANCE * 0.5], // Parallax move up
            Extrapolation.CLAMP,
        );
        const scale = interpolate(
            scrollY.value,
            [-100, 0],
            [1.2, 1], // Zoom on pull down
            Extrapolation.CLAMP,
        );
        return {
            transform: [{ translateY }, { scale }],
        };
    });

    // Memoize return object for stable reference
    return useMemo(
        () => ({
            containerAnimatedStyle,
            fullViewOpacityStyle,
            compactViewOpacityStyle,
            imageAnimatedStyle,
        }),
        [
            containerAnimatedStyle,
            fullViewOpacityStyle,
            compactViewOpacityStyle,
            imageAnimatedStyle,
        ]
    );
};
