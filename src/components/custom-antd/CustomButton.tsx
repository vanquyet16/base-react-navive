/**
 * CUSTOM BUTTON (ANTD WRAPPER)
 * =============================
 * Custom wrapper cho Ant Design Button với theme integration
 * Thêm các custom styles và behaviors
 */

import React from 'react';
import { Button, type ButtonProps } from '@ant-design/react-native';
import { StyleSheet } from 'react-native';
import { useTheme } from '@/theme/use-theme';

interface CustomButtonProps extends ButtonProps {
  /** Thêm custom variant nếu cần */
  variant?: 'primary' | 'secondary' | 'ghost' | 'warning';
}

/**
 * CustomButton - Wrapper cho Ant Design Button
 * 
 * @example
 * <CustomButton type="primary" onPress={handlePress}>
 *   Click me
 * </CustomButton>
 */
export const CustomButton: React.FC<CustomButtonProps> = ({
  variant,
  style,
  ...props
}) => {
  const theme = useTheme();

  // Custom styles based on theme
  const customStyle = variant === 'warning' 
    ? { backgroundColor: theme.colors.warning }
    : undefined;

  return (
    <Button
      style={customStyle || style}
      {...props}
    />
  );
};

export default CustomButton;
