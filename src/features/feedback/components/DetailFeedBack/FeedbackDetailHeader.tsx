import React, { memo, useCallback, useMemo, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { CustomText, AppIcon } from '@/components/base';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { FEEDBACK_ANIMATION_CONSTANTS } from '../../animations/useFeedbackDetailAnimations';
import HeaderAction from '@/components/base/HeaderAction';

interface FeedbackDetailHeaderProps {
  title?: string;
  onShare?: () => void;
  animatedStyle?: AnimatedStyle;
  variant?: 'default' | 'transparent';
}

const FeedbackDetailHeader: React.FC<FeedbackDetailHeaderProps> = memo(
  ({ title, onShare, animatedStyle, variant = 'default' }) => {
    const theme = useTheme();
    const styles = useStyles();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    // Use useRef to prevent double taps on back button
    const lastPressTime = useRef(0);

    const handleGoBack = useCallback(() => {
      const now = Date.now();
      if (now - lastPressTime.current > 500) {
        lastPressTime.current = now;
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }
    }, [navigation]);

    const isTransparent = variant === 'transparent';

    // Optimize value calculations with useMemo
    const iconColor = useMemo(
      () => (isTransparent ? theme.colors.white : theme.colors.primary),
      [isTransparent, theme.colors.white, theme.colors.primary],
    );

    const containerVariantStyle = useMemo(
      () => (isTransparent ? styles.transparentContainer : styles.container),
      [isTransparent, styles.transparentContainer, styles.container],
    );

    // Combine styles in useMemo to maintain referential equality
    const combinedContainerStyle = useMemo(
      () => [
        containerVariantStyle,
        animatedStyle,
        {
          // paddingTop: insets.top, // Handled by HeaderAction
          height: FEEDBACK_ANIMATION_CONSTANTS.HEADER_MIN_HEIGHT + insets.top,
        },
      ],
      [containerVariantStyle, animatedStyle, insets.top],
    );

    return (
      <Animated.View style={combinedContainerStyle}>
        <HeaderAction
          title={title}
          isTransparent={isTransparent}
          onIconRightPress={onShare}
          onIconLeftPress={handleGoBack}
          iconLeft={
            <AppIcon
              name="arrow-left"
              size={moderateScale(20)}
              color={iconColor}
            />
          }
          iconRight={
            <AppIcon
              name="share-2"
              size={moderateScale(20)}
              color={iconColor}
            />
          }
          styleContainer={styles.navBar}
        />
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
      zIndex: 100, // Always on top
      backgroundColor: theme.colors.white,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      justifyContent: 'center',
    },
    transparentContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: 'transparent',
      justifyContent: 'center',
    },
    navBar: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scale(16),
      paddingBottom: moderateVerticalScale(8),
    },
    iconButton: {
      width: scale(30),
      height: scale(30),
      borderRadius: theme.radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: theme.colors.backgroundSecondary,
    },
    transparentButton: {
      backgroundColor: theme.colors.scrim, // Optional: slight scrim for better visibility
    },
    title: {
      flex: 1,
      textAlign: 'center',
      color: theme.colors.text,
      marginHorizontal: scale(16),
    },
  }),
  true,
);

export default FeedbackDetailHeader;
