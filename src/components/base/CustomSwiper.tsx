import React, { memo } from 'react';
import Swiper from 'react-native-swiper';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

interface CustomSwiperProps {
  children?: React.ReactNode;
  height?: number;
  autoplay?: boolean;
  style?: ViewStyle;
  autoplayTimeout?: number;
}

/**
 * CustomSwiper Component
 * ======================
 * A senior-level wrapper around react-native-swiper.
 * Supports auto-scrolling, responsive sizing, and theme-aware pagination.
 *
 * @example
 * <CustomSwiper height={200}>
 *   <Image ... />
 *   <Image ... />
 * </CustomSwiper>
 */
export const CustomSwiper = memo<CustomSwiperProps>(
  ({
    children,
    height,
    autoplay = true,
    autoplayTimeout = 3,
    style,
  }) => {
    const theme = useTheme();
    const styles = useStyles();
    const resolvedHeight = height ?? styles.rs.moderateVerticalScale(150);

    return (
      <View
        style={[
          styles.container,
          { height: resolvedHeight, backgroundColor: theme.colors.backgroundSecondary },
          style,
        ]}
      >
        <Swiper
          autoplay={autoplay}
          autoplayTimeout={autoplayTimeout}
          dotColor={theme.colors.border}
          activeDotColor={theme.colors.primary}
          paginationStyle={styles.pagination}
          removeClippedSubviews={false} // Crucial for stability
          loop={true}
        >
          {children}
        </Swiper>
      </View>
    );
  },
);

const useStyles = createStyles((_theme, rs) => ({
  container: {
    borderRadius: rs.radius(12),
    overflow: 'hidden',
  },
  pagination: {
    bottom: rs.verticalGap(10),
  },
}));

CustomSwiper.displayName = 'CustomSwiper';
export default CustomSwiper;
