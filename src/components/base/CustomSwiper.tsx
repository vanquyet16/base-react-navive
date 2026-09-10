import React, { memo } from 'react';
import Swiper from 'react-native-swiper';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { moderateScale, verticalScale } from '@/shared/utils/sizeMatters';

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
    height = verticalScale(150),
    autoplay = true,
    autoplayTimeout = 3,
    style,
  }) => {
    const theme = useTheme();
    const styles = useStyles();

    return (
      <View
        style={[
          styles.container,
          { height, backgroundColor: theme.colors.backgroundSecondary },
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

const useStyles = createStyles(() => ({
  container: {
    borderRadius: moderateScale(12),
    overflow: 'hidden',
  },
  pagination: {
    bottom: verticalScale(10),
  },
}));

CustomSwiper.displayName = 'CustomSwiper';
export default CustomSwiper;
