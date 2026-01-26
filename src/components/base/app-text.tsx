/**
 * APP TEXT COMPONENT
 * ==================
 * Base text component với theme integration.
 * Provides consistent typography across app.
 *
 * @senior-pattern Themed component với variant pattern
 */

import React from 'react';
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
 * AppText Props
 */
export interface AppTextProps extends TextProps {
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
}

/**
 * AppText Component
 */
export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color = 'primary',
  weight,
  align,
  style,
  children,
  ...rest
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  // Get variant style
  const variantStyle = styles[variant];

  // Get color style
  const colorStyle = getColorStyle(theme, color);

  // Weight override
  const weightStyle = weight
    ? { fontWeight: theme.typography.fontWeights[weight] }
    : undefined;

  // Align override
  const alignStyle = align ? { textAlign: align } : undefined;

  return (
    <Text
      style={[variantStyle, colorStyle, weightStyle, alignStyle, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

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
