/**
 * CUSTOM PICKER (ANTD WRAPPER)
 * =============================
 * Custom wrapper cho Ant Design Picker với theme integration
 */

import React from 'react';
import { Picker } from '@ant-design/react-native';
import type { PickerPropsType } from '@ant-design/react-native/lib/picker/PropsType';
import { useTheme } from '@/shared/theme/use-theme';
import { Text } from 'react-native';

interface CustomPickerProps extends Omit<PickerPropsType, 'error'> {
  /** Error message */
  errorMessage?: string;
}

/**
 * CustomPicker - Wrapper cho Ant Design Picker
 * 
 * @example
 * <CustomPicker
 *   data={options}
 *   value={selected}
 *   onChange={setSelected}
 * />
 */
export const CustomPicker: React.FC<CustomPickerProps> = ({
  errorMessage,
  style,
  ...props
}) => {
  const theme = useTheme();

  return (
    <>
      <Picker
        style={style}
        {...props}
      />
      {errorMessage && (
        <Text style={{ color: theme.colors.error, fontSize: 12, marginTop: 4 }}>
          {errorMessage}
        </Text>
      )}
    </>
  );
};

export default CustomPicker;
