import React, { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { CustomDatePicker, CustomPickerInput } from '@/components/base';

interface FormDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  error?: string;
  disabled?: boolean;
  /** Label transformation (default: uppercase) */
  labelTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
}

/**
 * FormDatePicker Component
 * ==========================
 * Component input chọn ngày tự động quản lý modal picker.
 * Tích hợp sẵn với React Hook Form.
 * UI được tách biệt trong CustomPickerInput.
 */
export const FormDatePicker: React.FC<FormDatePickerProps> = memo(
  ({
    value,
    onChange,
    placeholder = 'dd/mm/yyyy',
    label,
    minDate,
    maxDate,
    error,
    disabled = false,
    labelTransform = 'uppercase',
  }) => {
    const [pickerVisible, setPickerVisible] = useState(false);

    // Format date for display
    const displayDate = useMemo(() => {
      if (!value) return '';
      return value.toLocaleDateString('vi-VN');
    }, [value]);

    // Handlers
    const handlePress = useCallback(() => {
      if (!disabled) {
        setPickerVisible(true);
      }
    }, [disabled]);

    const handleSelectDate = useCallback(
      (date: Date) => {
        onChange(date);
        setPickerVisible(false);
      },
      [onChange],
    );

    const handleClose = useCallback(() => {
      setPickerVisible(false);
    }, []);

    return (
      <>
        {/* Input UI */}
        <CustomPickerInput
          label={label}
          labelTransform={labelTransform}
          placeholder={placeholder}
          value={displayDate}
          onPress={handlePress}
          error={error}
          disabled={disabled}
          rightIconName="calendar"
        />

        {/* Date Picker Modal */}
        <CustomDatePicker
          visible={pickerVisible}
          onClose={handleClose}
          onSelectDate={handleSelectDate}
          selectedDate={value}
          minDate={minDate}
          maxDate={maxDate}
          title={label || 'Chọn ngày'}
        />
      </>
    );
  },
);

export default FormDatePicker;
