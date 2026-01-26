/**
 * CUSTOM CARD (ANTD WRAPPER)
 * ===========================
 * Custom wrapper cho Ant Design Card với theme integration
 */

import React from 'react';
import { Card, type CardProps } from '@ant-design/react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

interface CustomCardProps extends CardProps {
  /** Card elevation (shadow) */
  elevation?: number;
}

/**
 * CustomCard - Wrapper cho Ant Design Card
 * Thêm shadow/elevation và theme colors
 * 
 * @example
 * <CustomCard elevation={2}>
 *   <Text>Card content</Text>
 * </CustomCard>
 */
export const CustomCard: React.FC<CustomCardProps> = ({
  elevation = 2,
  style,
  children,
  ...props
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const elevationStyle = {
    elevation,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: elevation },
    shadowOpacity: 0.1,
    shadowRadius: elevation * 2,
  };

  return (
    <Card
      style={[styles.card, elevationStyle, style]}
      {...props}
    >
      {children}
    </Card>
  );
};

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    borderColor: theme.colors.border,
  },
}));

export default CustomCard;
