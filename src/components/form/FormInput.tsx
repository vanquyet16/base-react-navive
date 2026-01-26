/**
 * FORM INPUT COMPONENT
 * ====================
 * Type-safe form input với theme integration.
 * Supports react-hook-form và standalone usage.
 * Uses CustomInput component for consistent styling.
 *
 *
 * @example
 * // With react-hook-form
 * <FormInput
 *   control={control}
 *   name="email"
 *   label="Email"
 *   rules={{ required: 'Email required' }}
 * />
 *
 * @example
 * // Standalone
 * <FormInput
 *   label="Name"
 *   value={name}
 *   onChangeText={setName}
 * />
 */

import React from 'react';
import { View, Text, type TextInputProps } from 'react-native';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { CustomInput, type CustomInputProps } from '@/components/base';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

interface FormInputProps<T extends FieldValues = FieldValues>
  extends Omit<CustomInputProps, 'onChangeText' | 'value' | 'error'> {
  // Override label to be optional (inherited from CustomInput)
  label?: string;
  error?: string;
  required?: boolean;
  // React Hook Form props
  control?: Control<T>;
  name?: Path<T>;
  rules?: RegisterOptions<T>;
  // Regular props
  onChangeText?: (text: string) => void;
  value?: string;
  // UI control props
  disabled?: boolean;
  hidden?: boolean;
  // Icon props (pass through to CustomInput)
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const FormInput = <T extends FieldValues = FieldValues>({
  label,
  error,
  required = false,
  control,
  name,
  rules,
  onChangeText,
  value,
  disabled = false,
  hidden = false,
  leftIcon,
  rightIcon,
  containerStyle,
  ...props
}: FormInputProps<T>) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  // Format label với required indicator
  const formattedLabel = label && required ? `${label} *` : label;

  // Nếu hidden, không render gì cả
  if (hidden) {
    return null;
  }

  // If using with react-hook-form
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, onBlur, value: fieldValue },
          fieldState: { error: fieldError },
        }) => (
          <View style={styles.container}>
            <CustomInput
              {...props}
              label={formattedLabel}
              error={error || fieldError?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              value={fieldValue}
              editable={!disabled}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              containerStyle={containerStyle}
            />
          </View>
        )}
      />
    );
  }

  // Regular usage without react-hook-form
  return (
    <View style={styles.container}>
      <CustomInput
        {...props}
        label={formattedLabel}
        error={error}
        onChangeText={onChangeText}
        value={value}
        editable={!disabled}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        containerStyle={containerStyle}
      />
    </View>
  );
};

/**
 * Minimal styles - most styling is handled by CustomInput
 */
const useStyles = createStyles(theme => ({
  container: {
    marginBottom: theme.spacing[1], // Gap between form fields
  },
}));

export default FormInput;
