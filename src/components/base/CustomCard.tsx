/**
 * CUSTOM CARD (ANTD WRAPPER)
 * ===========================
 * Custom wrapper cho Ant Design Card với theme integration
 */

import React, { useMemo } from 'react';
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
 * @optimized React.memo, useMemo
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

  // Memoize elevation style để avoid tạo object mới mỗi render
  const elevationStyle = useMemo(
    () => ({
      elevation,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: elevation },
      shadowOpacity: 0.1,
      shadowRadius: elevation * 2,
    }),
    [elevation, theme.colors.black],
  );

  return (
    <Card style={[styles.card, elevationStyle, style]} {...props}>
      {children}
    </Card>
  );
};

/**
 * Memoized export để prevent unnecessary re-renders
 */
export default React.memo(CustomCard);

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor: theme.colors.backgroundTertiary, // White cards
    borderRadius: 20, // Increased from theme.radius.md (8px) to 20px
    borderColor: theme.colors.border, // #f3f4f6
    borderWidth: 1,
  },
}));
