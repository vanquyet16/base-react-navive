/**
 * CUSTOM LIST (ANTD WRAPPER)
 * ===========================
 * Custom wrapper cho Ant Design List với theme integration
 */

import React from 'react';
import { List, type ListProps } from '@ant-design/react-native';
import { useTheme } from '@/theme/use-theme';
import { createStyles } from '@/theme/create-styles';

interface CustomListProps extends ListProps {
  /** Thêm padding */
  padded?: boolean;
}

/**
 * CustomList - Wrapper cho Ant Design List
 * 
 * @example
 * <CustomList padded>
 *   <List.Item>Item 1</List.Item>
 *   <List.Item>Item 2</List.Item>
 * </CustomList>
 */
export const CustomList: React.FC<CustomListProps> = ({
  padded = false,
  style,
  ...props
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <List
      style={[styles.list, padded && styles.padded, style]}
      {...props}
    />
  );
};

const useStyles = createStyles(theme => ({
  list: {
    backgroundColor: theme.colors.background,
  },
  padded: {
    padding: theme.spacing[4],
  },
}));

export default CustomList;
