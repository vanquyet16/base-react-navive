import React, { memo, useMemo } from 'react';
import {
  TouchableOpacity,
  type TouchableOpacityProps,
  ActivityIndicator,
  View,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { CustomText } from './CustomText';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'text';

/**
 * Button size types
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * CustomButton Props
 */
export interface CustomButtonProps extends TouchableOpacityProps {
  /** Button variant */
  variant?: ButtonVariant;

  /** Button size (ignored when variant="text") */
  size?: ButtonSize;

  /** Loading state */
  loading?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Hidden - hide button */
  hidden?: boolean;

  /** Full width button (ignored when variant="text") */
  fullWidth?: boolean;

  /** Button text */
  title: string;

  /** Optional icon (left side) */
  leftIcon?: React.ReactNode;

  /** Optional icon (right side) */
  rightIcon?: React.ReactNode;

  /**
   * Custom text style
   * Useful for variant="text" (underline, fontSize, fontWeight, etc.)
   */
  textStyle?: StyleProp<TextStyle>;
}

/**
 * CustomButton Component
 */
export const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  hidden = false,
  fullWidth = false,
  title,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  ...rest
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const isDisabled = disabled || loading;
  const isTextVariant = variant === 'text';

  /**
   * Variant & size styles (only for non-text variants)
   */
  const variantStyle = useMemo<StyleProp<ViewStyle>>(() => {
    if (isTextVariant) return null;

    const key = `${variant}Container` as keyof typeof styles;
    return styles[key] as unknown as ViewStyle;
  }, [isTextVariant, variant, styles]);

  const sizeStyle = useMemo<StyleProp<ViewStyle>>(() => {
    if (isTextVariant) return null;

    const key = `${size}Container` as keyof typeof styles;
    return styles[key] as unknown as ViewStyle;
  }, [isTextVariant, size, styles]);

  /**
   * Text color logic
   */
  const textColor = useMemo(() => {
    // Text-only behaves like "link": primary color
    if (isTextVariant) {
      return theme.colors.primary;
    }

    if (variant === 'outline' || variant === 'ghost') {
      return theme.colors.primary;
    }

    if (variant === 'danger') {
      return theme.colors.white;
    }

    return theme.colors.white;
  }, [isTextVariant, variant, theme.colors.primary, theme.colors.white]);

  /**
   * Container styles
   */
  const containerStyles = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.container,

      // Normal button styling
      !isTextVariant && variantStyle,
      !isTextVariant && sizeStyle,
      !isTextVariant && fullWidth && styles.fullWidth,

      // Text-only variant styling
      isTextVariant && styles.textContainer,

      // Disabled state
      isDisabled && styles.disabled,

      // User overrides (margin, align, etc.)
      style,
    ],
    [
      styles.container,
      styles.fullWidth,
      styles.textContainer,
      styles.disabled,
      variantStyle,
      sizeStyle,
      isTextVariant,
      fullWidth,
      isDisabled,
      style,
    ],
  );

  /**
   * Text styles
   * - Default: uppercase + bold
   * - variant="text": remove uppercase + medium weight
   * - allow overriding by `textStyle`
   */
  const finalTextStyle = useMemo<StyleProp<TextStyle>>(
    () => [
      styles.text,
      { color: textColor },
      isTextVariant && styles.textOnly,
      textStyle,
    ],
    [styles.text, styles.textOnly, textColor, isTextVariant, textStyle],
  );

  if (hidden) {
    return null;
  }

  return (
    <TouchableOpacity
      style={containerStyles}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

          <CustomText variant="label" style={finalTextStyle}>
            {title}
          </CustomText>

          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default memo(CustomButton);

/**
 * Styles
 */
const useStyles = createStyles(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontWeight: theme.typography.fontWeights.bold,
    textTransform: 'uppercase',
  },

  /**
   * Text-only variant text defaults
   * (still overridable via `textStyle`)
   */
  textOnly: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeights.medium,
  },

  iconLeft: {
    marginRight: theme.spacing[2],
  },

  iconRight: {
    marginLeft: theme.spacing[2],
  },

  /**
   * Text-only variant container
   * (so you can use `style` to add margin/padding if needed)
   */
  textContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    minHeight: undefined,
    backgroundColor: 'transparent',
  },

  /**
   * Variants
   */
  primaryContainer: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.lg,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.25,
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

  /**
   * Sizes (ignored when variant="text")
   */
  smContainer: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    minHeight: 36,
  },
  mdContainer: {
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[3],
    minHeight: 48,
  },
  lgContainer: {
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[4],
    minHeight: 56,
  },

  /**
   * States
   */
  disabled: {
    opacity: 0.5,
  },

  fullWidth: {
    width: '100%',
  },
}));
