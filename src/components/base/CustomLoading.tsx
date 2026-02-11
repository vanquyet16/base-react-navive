/**
 * CUSTOM LOADING COMPONENT
 * ========================
 * Centralized loading spinner component.
 * Allows for consistent loading states across the app.
 */

import React, { memo } from 'react';
import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

interface CustomLoadingProps {
  /** Show full screen overlay */
  fullScreen?: boolean;
  /** Custom color */
  color?: string;
  /** Size of the spinner */
  size?: 'small' | 'large';
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * CustomLoading Component
 *
 * @example
 * <CustomLoading />
 * <CustomLoading fullScreen />
 */
export const CustomLoading: React.FC<CustomLoadingProps> = ({
  fullScreen = false,
  color,
  size = 'small',
  style,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  const spinnerColor = color || theme.colors.primary;

  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, style]}>
        <ActivityIndicator size="large" color={spinnerColor} />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={spinnerColor} />
    </View>
  );
};

export default memo(CustomLoading);

const useStyles = createStyles(
  theme => ({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing[2],
    },
    fullScreen: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      zIndex: 9999,
    },
  }),
  true,
);
