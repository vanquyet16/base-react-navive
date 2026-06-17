import { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate } from 'react-native-reanimated';

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
 * A generic hook for creating a "scroll-to-hide" animation using react-native-reanimated.
 *
 * @param config Configuration object for customizing the animation
 * @returns { translateYStyle, onScroll }
 */
export const useScrollFabAnimation = (config: UseScrollFabAnimationConfig = {}) => {
    const { clampRange = 100, hiddenTranslation = 200 } = config;

    const lastScrollY = useSharedValue(0);
    const clampedTranslation = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            const currentY = event.contentOffset.y;
            // Negative scroll values (pull to refresh) clamp to 0
            const clampedY = Math.max(0, currentY);
            const delta = clampedY - lastScrollY.value;
            lastScrollY.value = clampedY;

            // diffClamp logic: accumulate scroll delta and clamp within [0, clampRange]
            clampedTranslation.value = Math.max(
                0,
                Math.min(clampRange, clampedTranslation.value + delta)
            );
        },
    });

    const translateYStyle = useAnimatedStyle(() => {
        const val = interpolate(
            clampedTranslation.value,
            [0, clampRange],
            [0, hiddenTranslation],
            'clamp'
        );
        return {
            transform: [{ translateY: val }],
        };
    });

    return {
        translateYStyle,
        onScroll,
    };
};
