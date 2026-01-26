/**
 * APP TEXT COMPONENT
 * ==================
 * Base text component với theme integration.
 * Provides consistent typography across app.
 *
 */

import React, { useMemo } from 'react';
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
  | 'success';

/**
 * CustomText Props
 */
export interface CustomTextProps extends TextProps {
  /** Text variant */
  variant?: TextVariant;
  /** Text color variant */
  color?: TextColor;
  /** Font weight override */
  weight?: keyof typeof import('@/shared/theme/tokens').typography.fontWeights;
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
export const CustomText: React.FC<CustomTextProps> = ({
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
  const styles = useStyles(theme);

  // Get variant style
  const variantStyle = styles[variant];

  // Memoize color style để avoid recalculation
  const colorStyle = useMemo(() => getColorStyle(theme, color), [theme, color]);

  // Memoize weight override
  const weightStyle = useMemo(
    () =>
      weight ? { fontWeight: theme.typography.fontWeights[weight] } : undefined,
    [weight, theme.typography.fontWeights],
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
export default React.memo(CustomText);

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
    default:
      return { color: theme.colors.text };
  }
};

/**
 * Styles với variants
 */
const useStyles = createStyles(theme => ({
  // Headings
  h1: {
    fontSize: theme.typography.fontSizes['4xl'],
    lineHeight:
      theme.typography.fontSizes['4xl'] * theme.typography.lineHeights.tight,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
  },
  h2: {
    fontSize: theme.typography.fontSizes['3xl'],
    lineHeight:
      theme.typography.fontSizes['3xl'] * theme.typography.lineHeights.tight,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
  },
  h3: {
    fontSize: theme.typography.fontSizes['2xl'],
    lineHeight:
      theme.typography.fontSizes['2xl'] * theme.typography.lineHeights.normal,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text,
  },
  h4: {
    fontSize: theme.typography.fontSizes.xl,
    lineHeight:
      theme.typography.fontSizes.xl * theme.typography.lineHeights.normal,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text,
  },

  // Body text
  body: {
    fontSize: theme.typography.fontSizes.base,
    lineHeight:
      theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
    fontWeight: theme.typography.fontWeights.normal,
    color: theme.colors.text,
  },
  bodySmall: {
    fontSize: theme.typography.fontSizes.sm,
    lineHeight:
      theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
    fontWeight: theme.typography.fontWeights.normal,
    color: theme.colors.text,
  },

  // Caption
  caption: {
    fontSize: theme.typography.fontSizes.xs,
    lineHeight:
      theme.typography.fontSizes.xs * theme.typography.lineHeights.normal,
    fontWeight: theme.typography.fontWeights.normal,
    color: theme.colors.textSecondary,
  },

  // Label
  label: {
    fontSize: theme.typography.fontSizes.sm,
    lineHeight:
      theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
    fontWeight: theme.typography.fontWeights.medium,
    color: theme.colors.text,
  },
}));
