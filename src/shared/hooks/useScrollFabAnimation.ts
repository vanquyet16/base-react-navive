import { useRef, useMemo } from 'react';
import { Animated } from 'react-native';

interface UseScrollFabAnimationConfig {
    /**
     * The total scroll distance used to clamp the hidden state.
     * Default: 100
     */
    clampRange?: number;
    /**
     * The Y translation value when the FAB is fully hidden.
     * Default: 200
     */
    hiddenTranslation?: number;
}

/**
 * useScrollFabAnimation Hook
 * ==========================
 * A generic hook for creating a "scroll-to-hide" animation, typically used for FABs.
 *
 * @param config Configuration object for customizing the animation
 * @returns { scrollY, translateY, onScroll }
 */
export const useScrollFabAnimation = (config: UseScrollFabAnimationConfig = {}) => {
    const { clampRange = 100, hiddenTranslation = 200 } = config;

    const scrollY = useRef(new Animated.Value(0)).current;

    const translateY = useMemo(() => {
        // 1. Clamp negative scroll values (pull-to-refresh) to 0.
        // This prevents the "snap back" animation from triggering the hide effect.
        const clampedScrollY = scrollY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
        });

        // 2. Use diffClamp to track the scroll delta.
        return Animated.diffClamp(clampedScrollY, 0, clampRange).interpolate({
            inputRange: [0, clampRange],
            outputRange: [0, hiddenTranslation],
            extrapolate: 'clamp',
        });
    }, [scrollY, clampRange, hiddenTranslation]);

    const onScroll = useRef(
        Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
        }),
    ).current;

    return {
        scrollY,
        translateY,
        onScroll,
    };
};
