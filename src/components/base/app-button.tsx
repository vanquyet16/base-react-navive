/**
 * APP BUTTON COMPONENT
 * ====================
 * Base button component với theme integration.
 * Supports variants, sizes, loading state.
 *
 * @senior-pattern Flexible button với accessibility
 */

import React from 'react';
import {
  TouchableOpacity,
  type TouchableOpacityProps,
  ActivityIndicator,
  View,
} from 'react-native';
import { AppText } from './app-text';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Button size types
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * AppButton Props
 */
export interface AppButtonProps extends TouchableOpacityProps {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Button text */
  title: string;
  /** Optional icon (left side) */
  leftIcon?: React.ReactNode;
  /** Optional icon (right side) */
  rightIcon?: React.ReactNode;
}

/**
 * AppButton Component
 */
export const AppButton: React.FC<AppButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  title,
  leftIcon,
  rightIcon,
  style,
  ...rest
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  // Compute final disabled state
  const isDisabled = disabled || loading;

  // Get variant and size styles - fix type casting
  const variantKey = `${variant}Container` as const;
  const sizeKey = `${size}Container` as const;
  const variantStyle = (styles as any)[variantKey];
  const sizeStyle = (styles as any)[sizeKey];

  // Text color per variant
  const getTextColor = (): string => {
    if (variant === 'outline' || variant === 'ghost') {
      return theme.colors.primary;
    }
    if (variant === 'danger') {
      return theme.colors.white;
    }
    return theme.colors.white;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        variantStyle,
        sizeStyle,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <AppText variant='label' style={[styles.text, { color: getTextColor() }]}>
            {title}
          </AppText>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

/**
 * Styles
 */
const useStyles = createStyles(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontWeight: theme.typography.fontWeights.semibold,
  },

  iconLeft: {
    marginRight: theme.spacing[2],
  },

  iconRight: {
    marginLeft: theme.spacing[2],
  },

  // Variants
  primaryContainer: {
    backgroundColor: theme.colors.primary,
  },
  secondaryContainer: {
    backgroundColor: theme.colors.secondary,
  },
  outlineContainer: {
    backgroundColor: theme.colors.transparent,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  ghostContainer: {
    backgroundColor: theme.colors.transparent,
  },
  dangerContainer: {
    backgroundColor: theme.colors.error,
  },

  // Sizes
  smContainer: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    minHeight: 36,
  },
  mdContainer: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    minHeight: 44,
  },
  lgContainer: {
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[4],
    minHeight: 52,
  },

  // States
  disabled: {
    opacity: 0.5,
  },

  fullWidth: {
    width: '100%',
  },
}));
