import React from 'react';
import {View, Text, StyleSheet, TextInput, TextInputProps} from 'react-native';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import {COLORS, BORDER_RADIUS} from '@/constants';

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
  // If using with react-hook-form
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: {onChange, onBlur, value: fieldValue},
          fieldState: {error: fieldError},
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
        style={[styles.input, error ? styles.inputError : null, style]}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  required: {
    color: COLORS.error,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS,
    padding: 10,
    fontSize: 16,
    backgroundColor: COLORS.background,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  error: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
  },
});

export default FormInput;
