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
import { MAX_FONT_SIZE_MULTIPLIER } from '@/shared/hooks/useResponsiveSize';
import {
  fontWeights,
  typography,
  type FontWeight,
  type TypographyVariant,
} from '@/shared/theme/tokens';
import type { Theme } from '@/shared/theme/theme';

/** Biến thể chữ — định nghĩa trong theme.typography */
export type TextVariant = TypographyVariant;

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

export type { FontWeight };
/** Giữ export cũ để không vỡ import hiện có — nguồn gốc: theme.fontWeights */
export { fontWeights };

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
    <Text style={textStyles} maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER} {...rest}>
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
const getColorStyle = (theme: Theme, color: TextColor): TextStyle => {
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
 * Style cho mọi biến thể, sinh từ theme.typography + responsive engine
 */
const useStyles = createStyles(
  (theme, rs) =>
    Object.fromEntries(
      (Object.keys(typography) as TypographyVariant[]).map(variant => {
        const token = typography[variant];
        return [
          variant,
          {
            fontSize: rs.fontSize(token.fontSize),
            lineHeight: rs.lineHeight(token.fontSize, token.lineHeight),
            fontWeight: fontWeights[token.fontWeight],
            color: theme.colors[token.color],
          },
        ];
      }),
    ) as Record<TypographyVariant, TextStyle>,
);
