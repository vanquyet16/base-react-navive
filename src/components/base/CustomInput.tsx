/**
 * CUSTOM INPUT COMPONENT
 * ======================
 * Base input component với theme integration và icon support.
 * Wraps React Native TextInput với modern design từ UI mockups.
 *
 */

import React, { useState, useCallback, useMemo, useRef, memo } from 'react';
import {
  View,
  TextInput,
  Pressable,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
  type DimensionValue,
} from 'react-native';
import { CustomText } from './CustomText';
import { useTheme } from '@/shared/theme/use-theme';
import type { Theme } from '@/shared/theme/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import { createStyles } from '@/shared/theme/create-styles';

/**
 * CustomInput Props
 */
export interface CustomInputProps extends TextInputProps {
  /** Optional label trên input */
  label?: string;
  /** Label transformation (default: uppercase) */
  labelTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  /** Icon bên trái */
  leftIcon?: React.ReactNode;
  /** Icon bên phải (e.g., eye icon for password) */
  rightIcon?: React.ReactNode;
  /** Error message */
  error?: string;
  /** Hidden - ẩn input */
  hidden?: boolean;
  /** Container style */
  containerStyle?: StyleProp<ViewStyle>;
  /** Input style override */
  inputStyle?: StyleProp<ViewStyle>;

  borderRadius?: number;
  width?: DimensionValue;
}

/**
 * CustomInput Component
 *
 * @optimized React.memo, useCallback, useMemo
 */
const CustomInputBase: React.FC<CustomInputProps> = ({
  label,
  leftIcon,
  rightIcon,
  error,
  hidden = false,
  containerStyle,
  inputStyle,
  style,
  onFocus,
  onBlur,
  labelTransform = 'uppercase',
  borderRadius,
  width,
  ...textInputProps
}) => {
  const theme = useTheme();
  const styles = useStyles({ borderRadius, width });
  const [isFocused, setIsFocused] = useState(false);

  // Ref để focus TextInput programmatically
  const inputRef = useRef<TextInput>(null);

  // Handler khi tap vào container - focus input ngay
  // Memoized để stable reference
  const handleContainerPress = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Merge internal focus handler với prop onFocus
  // Memoized với dependency onFocus
  const handleFocus = useCallback(
    (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  // Merge internal blur handler với prop onBlur
  // Memoized với dependency onBlur
  const handleBlur = useCallback(
    (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  // Memoize combined input container styles để avoid tạo mới mỗi render
  const inputContainerStyle = useMemo(
    () => [styles.inputContainer, isFocused && styles.inputContainerFocused],
    [styles, isFocused, error],
  );

  // Memoize combined input styles
  const inputStyles = useMemo(
    () => [
      styles.input,
      leftIcon ? styles.inputWithLeftIcon : undefined,
      rightIcon ? styles.inputWithRightIcon : undefined,
      textInputProps.editable === false && styles.inputDisabled,
      inputStyle,
      style,
    ],
    [styles, leftIcon, rightIcon, textInputProps.editable, inputStyle, style],
  );

  if (hidden) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <CustomText
          variant="caption"
          style={[styles.label, { textTransform: labelTransform }]}
        >
          {label}
        </CustomText>
      )}

      {/* Input Container - Pressable để focus ngay khi tap */}
      <Pressable onPress={handleContainerPress} style={inputContainerStyle}>
        {/* Left Icon */}
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        {/* Text Input */}
        <TextInput
          ref={inputRef}
          style={inputStyles}
          placeholderTextColor={theme.colors.textTertiary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...textInputProps}
        />

        {/* Right Icon */}
        {rightIcon && (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </Pressable>

      {/* Error Message */}
      {error && (
        <CustomText variant="caption" style={styles.errorText}>
          {error}
        </CustomText>
      )}
    </View>
  );
};

/**
 * Memoized export để prevent unnecessary re-renders
 */
export const CustomInput = memo(CustomInputBase);
export default CustomInput;

/**
 * Styles
 */
const useStyles = createStyles(
  (theme: Theme, props: { borderRadius?: number; width?: DimensionValue }) => {
    return {
      container: {
        width: props.width || '100%',
      },

      label: {
        fontSize: theme.typography.fontSizes.xs,
        fontWeight: theme.typography.fontWeights.bold,
        textTransform: 'uppercase',
        color: theme.colors.textSecondary, // #6b7280 gray-500
        marginBottom: theme.spacing[2], // 8px
        marginLeft: theme.spacing[1], // 4px
      },

      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.inputBackground,
        borderWidth: 1.5,
        borderColor: theme.colors.inputBorder,
        borderRadius: props.borderRadius ?? theme.radius.md,
        paddingHorizontal: theme.spacing[3],
        paddingVertical: theme.spacing[2], // Reduce vertical padding slightly
        minHeight: moderateVerticalScale(40), // Reduced from 48
        // Add default shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      },

      inputContainerFocused: {
        borderColor: theme.colors.primary,
        backgroundColor: '#FFFFFF',
        // Stronger shadow on focus
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
      },

      inputContainerError: {
        borderColor: theme.colors.error,
        borderWidth: moderateScale(1),
      },

      input: {
        flex: 1,
        fontSize: theme.typography.fontSizes.xs,
        fontWeight: theme.typography.fontWeights.medium,
        color: theme.colors.text,
        padding: 0, // Remove default padding
      },

      inputWithLeftIcon: {
        marginLeft: theme.spacing[2], // 8px spacing from icon
      },

      inputWithRightIcon: {
        marginRight: theme.spacing[2],
      },

      leftIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(20),
        height: scale(20),
      },

      rightIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(20),
        height: scale(20),
      },

      errorText: {
        color: theme.colors.error,
        marginTop: theme.spacing[1],
        marginLeft: theme.spacing[1],
        fontSize: theme.typography.fontSizes.xs,
      },

      inputDisabled: {
        opacity: 0.5,
        backgroundColor: theme.colors.backgroundSecondary,
        marginBottom: theme.spacing[1],
      },
    };
  },
  true,
);
