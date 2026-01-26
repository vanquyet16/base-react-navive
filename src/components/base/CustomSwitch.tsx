/**
 * CUSTOM SWITCH (ANTD WRAPPER)
 * =============================
 * Custom wrapper cho Ant Design Switch với theme integration
 */

import React from 'react';
import { Switch, type SwitchProps } from '@ant-design/react-native';
import { useTheme } from '@/shared/theme/use-theme';

interface CustomSwitchProps extends SwitchProps {
  /** Custom label */
  label?: string;
}

/**
 * CustomSwitch - Wrapper cho Ant Design Switch
 *
 * @optimized React.memo
 * @example
 * <CustomSwitch
 *   label="Dark Mode"
 *   checked={isDark}
 *   onChange={setIsDark}
 * />
 */
export const CustomSwitch: React.FC<CustomSwitchProps> = ({
  label,
  ...props
}) => {
  const theme = useTheme();

  // Custom color based on theme
  const color = theme.colors.primary;

  return <Switch color={color} {...props} />;
};

/**
 * Memoized export để prevent unnecessary re-renders
 */
export default React.memo(CustomSwitch);
