/**
 * FORM INPUT COMPONENT
 * ====================
 * Type-safe form input với theme integration.
 * Supports react-hook-form và standalone usage.
 *
 * @senior-pattern Dual-mode form input với proper validation
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
import { View, Text, TextInput, TextInputProps } from 'react-native';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

interface FormInputProps<T extends FieldValues = FieldValues>
  extends Omit<TextInputProps, 'onChangeText' | 'value'> {
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
}

const FormInput = <T extends FieldValues = FieldValues>({
  label,
  error,
  required = false,
  style,
  control,
  name,
  rules,
  onChangeText,
  value,
  ...props
}: FormInputProps<T>) => {
  const theme = useTheme();
  const styles = useStyles(theme);

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
            {label && (
              <Text style={styles.label}>
                {label}
                {required && <Text style={styles.required}> *</Text>}
              </Text>
            )}

            <TextInput
              {...props}
              onChangeText={onChange}
              onBlur={onBlur}
              value={fieldValue}
              placeholderTextColor={theme.colors.textTertiary}
              style={[
                styles.input,
                error || fieldError ? styles.inputError : null,
                style,
              ]}
            />

            {(error || fieldError?.message) && (
              <Text style={styles.error}>{error || fieldError?.message}</Text>
            )}
          </View>
        )}
      />
    );
  }

  // Regular usage without react-hook-form
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <TextInput
        {...props}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={theme.colors.textTertiary}
        style={[styles.input, error ? styles.inputError : null, style]}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

/**
 * Styles với theme integration
 */
const useStyles = createStyles(theme => ({
  container: {
    marginBottom: theme.spacing[2],
  },
  label: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing[2],
  },
  required: {
    color: theme.colors.error,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing[3],
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  error: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.error,
    marginTop: theme.spacing[1],
  },
}));

export default FormInput;
