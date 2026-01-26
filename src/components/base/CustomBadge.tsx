/**
 * CUSTOM BADGE COMPONENT
 * =======================
 * Status badge component với variants cho success, warning, error, info.
 * Match UI mockup design với rounded corners và uppercase text.
 *
 * @senior-pattern Small status indicators với semantic colors
 */

import React, { useMemo } from 'react';
import { View, type ViewStyle, type StyleProp } from 'react-native';
import { CustomText } from './CustomText';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { colors } from '@/shared/theme/tokens';

/**
 * Badge variant types
 */
export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'primary';

/**
 * Badge size types
 */
export type BadgeSize = 'sm' | 'md';

/**
 * CustomBadge Props
 */
export interface CustomBadgeProps {
  /** Badge variant for color theming */
  variant: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Text to display */
  text: string;
  /** Optional container style */
  style?: StyleProp<ViewStyle>;
}

/**
 * CustomBadge Component
 *
 * @optimized React.memo, useMemo
 */
export const CustomBadge: React.FC<CustomBadgeProps> = ({
  variant,
  size = 'sm',
  text,
  style,
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  // Get variant styles
  const variantKey = `${variant}Badge` as const;
  const variantStyle = (styles as any)[variantKey];

  // Get size styles
  const sizeKey = `${size}Badge` as const;
  const sizeStyle = (styles as any)[sizeKey];

  // Memoize text color để avoid recalculation
  const textColor = useMemo(
    () => getTextColor(theme, variant),
    [theme, variant],
  );

  // Memoize combined badge styles
  const badgeStyles = useMemo(
    () => [styles.container, variantStyle, sizeStyle, style],
    [styles.container, variantStyle, sizeStyle, style],
  );

  // Memoize text style
  const textStyles = useMemo(
    () => [styles.text, { color: textColor }],
    [styles.text, textColor],
  );

  return (
    <View style={badgeStyles}>
      <CustomText style={textStyles}>{text}</CustomText>
    </View>
  );
};

/**
 * Memoized export để prevent unnecessary re-renders
 */
export default React.memo(CustomBadge);

/**
 * Helper to get text color per variant
 */
const getTextColor = (theme: any, variant: BadgeVariant): string => {
  switch (variant) {
    case 'success':
      return colors.success.dark; // #065f46
    case 'warning':
      return colors.warning.dark; // #c2410c
    case 'error':
      return theme.colors.white; // White text on red bg
    case 'info':
      return colors.info.dark; // #1e40af
    case 'primary':
      return theme.colors.white; // White text on primary bg
    default:
      return theme.colors.text;
  }
};

/**
 * Styles
 */
const useStyles = createStyles(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12, // Rounded-full look
    alignSelf: 'flex-start', // Don't stretch
  },

  text: {
    fontSize: 9,
    fontWeight: theme.typography.fontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Variant styles
  successBadge: {
    backgroundColor: colors.success.light, // #d1fae5 emerald-100
  },
  warningBadge: {
    backgroundColor: colors.warning.light, // #fed7aa orange-200
  },
  errorBadge: {
    backgroundColor: colors.error.main, // #dc2626 red-600
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  infoBadge: {
    backgroundColor: colors.info.light, // #dbeafe blue-100
  },
  primaryBadge: {
    backgroundColor: theme.colors.primary, // #2B4B9B
  },

  // Size styles
  smBadge: {
    paddingHorizontal: 8, // px-2
    paddingVertical: 4, // py-0.5
  },
  mdBadge: {
    paddingHorizontal: 12, // px-3
    paddingVertical: 6, // py-1
    fontSize: 11,
  },
}));
