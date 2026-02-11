import React, { useMemo, memo } from 'react';
import { ViewStyle } from 'react-native';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { CustomDropdown, DropdownOption } from '@/components/base';

interface FormDropdownProps<T extends FieldValues = FieldValues> {
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  search?: boolean;
  searchPlaceholder?: string;

  // Options
  options: DropdownOption[];

  // React Hook Form props
  control?: Control<T>;
  name?: Path<T>;
  rules?: RegisterOptions<T>;

  // Regular props
  value?: string;
  onChange?: (value: string) => void;
  style?: ViewStyle;

  // Pagination props
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  /** Label transformation (default: uppercase) */
  labelTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
}

const FormDropdownBase = <T extends FieldValues = FieldValues>({
  label,
  placeholder = 'Chọn...',
  error,
  required = false,
  disabled = false,
  search = false,
  searchPlaceholder = 'Tìm kiếm...',
  options,
  control,
  name,
  rules,
  value,
  onChange,
  style,
  onLoadMore,
  isLoadingMore = false,
  labelTransform = 'uppercase',
}: FormDropdownProps<T>) => {
  // Render function helper
  const renderDropdown = (
    fieldValue?: string,
    onFieldChange?: (value: string) => void,
    fieldError?: string,
  ) => (
    <CustomDropdown
      label={label}
      placeholder={placeholder}
      error={error || fieldError}
      required={required}
      disabled={disabled}
      search={search}
      searchPlaceholder={searchPlaceholder}
      options={options}
      value={fieldValue}
      onChange={onFieldChange}
      style={style}
      onLoadMore={onLoadMore}
      isLoadingMore={isLoadingMore}
      labelTransform={labelTransform}
    />
  );

  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange: onFieldChange, value: fieldValue },
          fieldState: { error: fieldError },
        }) => renderDropdown(fieldValue, onFieldChange, fieldError?.message)}
      />
    );
  }

  return renderDropdown(value, onChange);
};

export const FormDropdown = memo(FormDropdownBase) as typeof FormDropdownBase;
export default FormDropdown;
