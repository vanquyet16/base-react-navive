import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { CustomText } from '@/components/base';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { FEEDBACK_ANIMATION_CONSTANTS } from '../../animations/useFeedbackDetailAnimations';

// ✅ Create Animated FastImage component for better performance
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

interface FeedbackHeaderInfoProps {
  title: string;
  status: string;
  imageUrl?: string;
  containerStyle?: AnimatedStyle; // Proper type from reanimated
  imageStyle?: AnimatedStyle; // Proper type from reanimated
}

const FeedbackHeaderInfo: React.FC<FeedbackHeaderInfoProps> = memo(
  ({ title, status, imageUrl, containerStyle, imageStyle }) => {
    const theme = useTheme();
    const styles = useStyles();
    const insets = useSafeAreaInsets();

    // Memoize image source to avoid recreation on every render
    const bgImage = useMemo(
      () =>
        imageUrl
          ? { uri: imageUrl }
          : {
              uri: 'https://resource.kinhtedothi.vn/2023/06/29/z4472913434466-c9cbc91d48c094ad805b509aed6868fc.jpg',
            },
      [imageUrl],
    );

    // Memoize container styles
    const animatedContainerStyle = useMemo(
      () => [styles.container, containerStyle],
      [styles.container, containerStyle],
    );

    // Memoize image styles
    // Cast to any to bypass type incompatibility between Reanimated and FastImage
    const animatedImageStyle = useMemo(
      () => [styles.imageBackground, imageStyle] as any,
      [styles.imageBackground, imageStyle],
    );

    // Memoize content padding style
    const contentContainerStyle = useMemo(
      () => [
        styles.contentContainer,
        { paddingTop: insets.top + moderateVerticalScale(50) },
      ],
      [styles.contentContainer, insets.top],
    );

    return (
      <Animated.View style={animatedContainerStyle}>
        <AnimatedFastImage
          source={bgImage}
          style={animatedImageStyle}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.overlay} />
          <View style={contentContainerStyle}>
            <View style={styles.statusBadge}>
              <CustomText variant="h10" weight="bold" style={styles.statusText}>
                {status}
              </CustomText>
            </View>

            <CustomText variant="h5" weight="bold" style={styles.titleText}>
              {title}
            </CustomText>
          </View>
        </View>
      </Animated.View>
    );
  },
);

const useStyles = createStyles(
  theme => ({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: FEEDBACK_ANIMATION_CONSTANTS.HEADER_MAX_HEIGHT, // Height is fixed here
      zIndex: 0,
      backgroundColor: theme.colors.background,
      overflow: 'hidden', // Essential for scale effect not to overflow
    },
    imageBackground: {
      width: '100%',
      height: '100%',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },

    iconButton: {
      width: scale(36),
      height: scale(36),
      borderRadius: scale(18),
      backgroundColor: theme.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.sm,
    },
    contentContainer: {
      paddingHorizontal: moderateScale(20),
      paddingBottom: moderateVerticalScale(50), // Increased from 20 to 50
      justifyContent: 'flex-end',
      flex: 1,
    },
    statusBadge: {
      backgroundColor: theme.colors.success,
      paddingHorizontal: scale(10),
      paddingVertical: moderateVerticalScale(4),
      borderRadius: theme.radius.sm,
      alignSelf: 'flex-start',
      marginBottom: moderateVerticalScale(8),
    },
    statusText: {
      color: theme.colors.white,
      textTransform: 'uppercase',
    },
    titleText: {
      color: theme.colors.white,
      textShadowColor: 'rgba(0,0,0,0.5)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 4,
      lineHeight: moderateVerticalScale(28),
      marginBottom: '10%',
    },
  }),
  true,
);

export default FeedbackHeaderInfo;
