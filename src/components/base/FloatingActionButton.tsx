import React, { memo, useMemo } from 'react';
import {  Pressable, ViewStyle } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import AppIcon from './AppIcon';

interface FloatingActionButtonProps {
  /**
   * Icon name from the icon set (default: Feather)
   */
  iconName?: string;
  /**
   * Callback when button is pressed
   */
  onPress: () => void;
  /**
   * Background color of the FAB (default: primary color)
   */
  backgroundColor?: string;
  /**
   * Icon color (default: white)
   */
  iconColor?: string;
  /**
   * Size of the icon (default: 24)
   */
  iconSize?: number;
  /**
   * Custom style for the container
   */
  style?: ViewStyle;
  /**
   * Position: 'bottom-right' | 'bottom-left' | 'bottom-center' (default: 'bottom-right')
   */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  /**
   * visible: boolean (default: true)
   */
  visible?: boolean;
}

const FloatingActionButton = memo<FloatingActionButtonProps>(
  ({
    iconName = 'plus',
    onPress,
    backgroundColor,
    iconColor,
    iconSize = 24,
    style,
    position = 'bottom-right',
    visible = false,
  }) => {
    const theme = useTheme();
    const styles = useStyles();

    // Memoize position style to prevent recalculation
    const positionStyle = useMemo(() => {
      switch (position) {
        case 'bottom-left':
          return styles.positionBottomLeft;
        case 'bottom-center':
          return styles.positionBottomCenter;
        case 'bottom-right':
        default:
          return styles.positionBottomRight;
      }
    }, [position, styles]);

    // Memoize final container style
    const containerStyle = useMemo(
      () => [
        styles.container,
        { backgroundColor: backgroundColor || theme.colors.primary },
        positionStyle,
        style,
      ],
      [styles, backgroundColor, theme.colors.primary, positionStyle, style],
    );

    if (!visible) return null;

    return (
      <Pressable
        style={({ pressed }) => [
          containerStyle,
          { opacity: pressed ? 0.8 : 1 },
        ]}
        onPress={onPress}
      >
        <AppIcon
          name={iconName}
          size={iconSize}
          color={iconColor ?? styles.theme.colors.white}
        />
      </Pressable>
    );
  },
);

const useStyles = createStyles(
  (theme, rs) => ({
    container: {
      position: 'absolute',
      width: rs.scale(45),
      height: rs.scale(45), // Reverting to scale for circle consistency
      borderRadius: rs.scale(15),
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
      zIndex: 999,
    },
    positionBottomRight: {
      bottom: rs.moderateVerticalScale(50), // Vertical spacing
      right: rs.scale(10), // Horizontal spacing
    },
    positionBottomLeft: {
      bottom: rs.moderateVerticalScale(50),
      left: rs.scale(10),
    },
    positionBottomCenter: {
      bottom: rs.moderateVerticalScale(50),
      alignSelf: 'center',
    },
  }),
);

export default FloatingActionButton;
