/**
 * CUSTOM INPUT (ANTD WRAPPER)
 * ============================
 * Custom wrapper cho Ant Design InputItem với theme integration
 */

import React from 'react';
import { InputItem } from '@ant-design/react-native';
import type { InputItemPropsType } from '@ant-design/react-native/lib/input-item/PropsType';
import { useTheme } from '@/theme/use-theme';
import { Text } from 'react-native';

interface CustomInputProps extends Omit<InputItemPropsType, 'error'> {
  /** Error message */
  errorMessage?: string;
  /** Label text */
  label?: string;
}

/**
 * CustomInput - Wrapper cho Ant Design InputItem
 *
 * @example
 * <CustomInput
 *   label="Email"
 *   placeholder="Nhập email"
 *   error={errors.email}
 * />
 */
export const CustomInput: React.FC<CustomInputProps> = ({ errorMessage, label, ...props }) => {
  const theme = useTheme();

  return (
    <>
      <InputItem {...props}>{label}</InputItem>
      {errorMessage && (
        <Text style={{ color: theme.colors.error, fontSize: 12, marginTop: 4 }}>
          {errorMessage}
        </Text>
      )}
    </>
  );
};

export default CustomInput;
