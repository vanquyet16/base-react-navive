/**
 * CUSTOM LIST (ANTD WRAPPER)
 * ===========================
 * Custom wrapper cho Ant Design List với theme integration
 */

import React, { useMemo } from 'react';
import { List, type ListProps } from '@ant-design/react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

interface CustomListProps extends ListProps {
  /** Thêm padding */
  padded?: boolean;
}

/**
 * CustomList - Wrapper cho Ant Design List
 *
 * @optimized React.memo, useMemo
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

  // Memoize combined list styles
  const listStyles = useMemo(
    () => [styles.list, padded && styles.padded, style],
    [styles.list, styles.padded, padded, style],
  );

  return <List style={listStyles} {...props} />;
};

/**
 * Memoized export để prevent unnecessary re-renders
 */
export default React.memo(CustomList);

const useStyles = createStyles(theme => ({
  list: {
    backgroundColor: theme.colors.background,
  },
  padded: {
    padding: theme.spacing[4],
  },
}));
