/**
 * APP TEXT COMPONENT
 * ==================
 * Base text component với theme & responsive size integration.
 * Provides consistent typography across app (Phone + iPad).
 */

import React, { useMemo, memo } from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

/**
 * Text variant types
 */
export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h7'
  | 'h8'
  | 'h9'
  | 'h10'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label';

/**
 * Text color variants
 */
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'error'
  | 'success'
  | 'white';

export type FontWeight =
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold';

export const fontWeights: Record<FontWeight, TextStyle['fontWeight']> = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

/**
 * CustomText Props
 */
export interface CustomTextProps extends TextProps {
  /** Text variant */
  variant?: TextVariant;
  /** Text color variant */
  color?: TextColor;
  /** Font weight override */
  weight?: FontWeight;
  /** Text align */
  align?: TextStyle['textAlign'];
  /** Children text */
  children: React.ReactNode;
  /** Text transform */
  transform?: TextStyle['textTransform'];
}

/**
 * CustomText Component
 *
 * @optimized React.memo, useMemo
 */
const CustomTextBase: React.FC<CustomTextProps> = ({
  variant = 'body',
  color = 'primary',
  weight,
  align,
  style,
  children,
  transform,
  ...rest
}) => {
  const theme = useTheme();
  const styles = useStyles();

  // Get variant style
  const variantStyle = styles[variant];

  // Memoize color style để avoid recalculation
  const colorStyle = useMemo(() => getColorStyle(theme, color), [theme, color]);

  // Memoize weight override
  const weightStyle = useMemo(
    () => (weight ? { fontWeight: fontWeights[weight] } : undefined),
    [weight],
  );

  // Memoize align override
  const alignStyle = useMemo(
    () => (align ? { textAlign: align } : undefined),
    [align],
  );

  const transformStyle = useMemo(
    () => (transform ? { textTransform: transform } : undefined),
    [transform],
  );

  // Memoize combined text styles
  const textStyles = useMemo(
    () => [
      variantStyle,
      colorStyle,
      weightStyle,
      alignStyle,
      transformStyle,
      style,
    ],
    [variantStyle, colorStyle, weightStyle, alignStyle, transformStyle, style],
  );

  return (
    <Text style={textStyles} {...rest}>
      {children}
    </Text>
  );
};

/**
 * Memoized export để prevent unnecessary re-renders
 */
export const CustomText = memo(CustomTextBase);
export default CustomText;

/**
 * Get color style helper
 */
const getColorStyle = (theme: any, color: TextColor): TextStyle => {
  switch (color) {
    case 'primary':
      return { color: theme.colors.text };
    case 'secondary':
      return { color: theme.colors.textSecondary };
    case 'tertiary':
      return { color: theme.colors.textTertiary };
    case 'inverse':
      return { color: theme.colors.textInverse };
    case 'error':
      return { color: theme.colors.error };
    case 'success':
      return { color: theme.colors.success };
    case 'white':
      return { color: theme.colors.white };
    default:
      return { color: theme.colors.text };
  }
};

/**
 * Styles với variants — Tích hợp tự động responsive size
 */
const useStyles = createStyles((theme, rs) => ({
  // Headings
  h1: {
    fontSize: rs.fontSize(36),
    lineHeight: rs.lineHeight(36, 1.25),
    fontWeight: fontWeights.bold,
    color: theme.colors.text,
  },
  h2: {
    fontSize: rs.fontSize(30),
    lineHeight: rs.lineHeight(30, 1.25),
    fontWeight: fontWeights.bold,
    color: theme.colors.text,
  },
  h3: {
    fontSize: rs.fontSize(24),
    lineHeight: rs.lineHeight(24, 1.35),
    fontWeight: fontWeights.semibold,
    color: theme.colors.text,
  },
  h4: {
    fontSize: rs.fontSize(20),
    lineHeight: rs.lineHeight(20, 1.35),
    fontWeight: fontWeights.semibold,
    color: theme.colors.text,
  },
  h5: {
    fontSize: rs.fontSize(18),
    lineHeight: rs.lineHeight(18, 1.35),
    fontWeight: fontWeights.semibold,
    color: theme.colors.text,
  },
  h6: {
    fontSize: rs.fontSize(16),
    lineHeight: rs.lineHeight(16, 1.35),
    fontWeight: fontWeights.semibold,
    color: theme.colors.text,
  },
  h7: {
    fontSize: rs.fontSize(14),
    lineHeight: rs.lineHeight(14, 1.35),
    fontWeight: fontWeights.semibold,
    color: theme.colors.text,
  },
  h8: {
    fontSize: rs.fontSize(12),
    lineHeight: rs.lineHeight(12, 1.35),
    fontWeight: fontWeights.semibold,
    color: theme.colors.text,
  },
  h9: {
    fontSize: rs.fontSize(10),
    lineHeight: rs.lineHeight(10, 1.35),
    fontWeight: fontWeights.bold,
    color: theme.colors.text,
  },
  h10: {
    fontSize: rs.fontSize(8),
    lineHeight: rs.lineHeight(8, 1.35),
    fontWeight: fontWeights.bold,
    color: theme.colors.text,
  },

  // Body text
  body: {
    fontSize: rs.fontSize(16),
    lineHeight: rs.lineHeight(16, 1.35),
    fontWeight: fontWeights.normal,
    color: theme.colors.text,
  },
  bodySmall: {
    fontSize: rs.fontSize(14),
    lineHeight: rs.lineHeight(14, 1.35),
    fontWeight: fontWeights.normal,
    color: theme.colors.text,
  },

  // Caption
  caption: {
    fontSize: rs.fontSize(12),
    lineHeight: rs.lineHeight(12, 1.35),
    fontWeight: fontWeights.normal,
    color: theme.colors.textSecondary,
  },

  // Label
  label: {
    fontSize: rs.fontSize(14),
    lineHeight: rs.lineHeight(14, 1.35),
    fontWeight: fontWeights.medium,
    color: theme.colors.text,
  },
}));
