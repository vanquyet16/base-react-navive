/**
 * CUSTOM BADGE COMPONENT
 * =======================
 * Status badge component với support cho wrapper (notification badge) hoặc standalone status.
 *
 * @features
 * - Wrapper mode: Wrap icon/content và hiện badge góc trên phải
 * - Standalone mode: Hiện badge status (như tags)
 * - Variants: success, warning, error, info, primary
 */

import React, { useMemo } from 'react';
import { View, type ViewStyle, type StyleProp, TextStyle } from 'react-native';
import { CustomText } from './CustomText';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { colors } from '@/shared/theme/tokens';
import { scale } from 'react-native-size-matters';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'primary';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface CustomBadgeProps {
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Text display (standalone mode) */
  text?: string;
  /** Number display (notification mode) */
  badgeCount?: number;
  /** Show 0 count */
  showZero?: boolean;
  /** Container style */
  style?: StyleProp<ViewStyle>;
  /** Children (Icon, etc.) */
  children?: React.ReactNode;
}

export const CustomBadge: React.FC<CustomBadgeProps> = ({
  variant = 'error',
  size = 'sm',
  text,
  badgeCount,
  showZero = false,
  style,
  children,
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  // Determind content
  const content = useMemo(() => {
    if (text) return text;
    if (typeof badgeCount === 'number') {
      if (badgeCount > 99) return '99+';
      return badgeCount.toString();
    }
    return '';
  }, [text, badgeCount]);

  // Visibility check
  const isVisible = useMemo(() => {
    if (text) return true;
    if (typeof badgeCount === 'number') {
      return badgeCount > 0 || showZero;
    }
    return false;
  }, [text, badgeCount, showZero]);

  // Get variant styles
  const variantKey = `${variant}Badge` as const;
  const variantStyle = (styles as any)[variantKey];

  // Get text color
  const textColor = useMemo(
    () => getTextColor(theme, variant),
    [theme, variant],
  );

  // Wrapper Mode (Notification Badge)
  if (children) {
    return (
      <View style={styles.wrapper}>
        {children}
        {isVisible && (
          <View style={[styles.badgeAbsolute, variantStyle, style]}>
            <CustomText style={[styles.badgeText, { color: textColor }]}>
              {content}
            </CustomText>
          </View>
        )}
      </View>
    );
  }

  // Standalone Mode (Tags/Status)
  if (!isVisible) return null;

  return (
    <View style={[styles.container, variantStyle, style]}>
      <CustomText style={[styles.text, { color: textColor }]}>
        {content}
      </CustomText>
    </View>
  );
};

export default React.memo(CustomBadge);

const getTextColor = (theme: any, variant: BadgeVariant): string => {
  switch (variant) {
    case 'success':
      return colors.success.dark;
    case 'warning':
      return colors.warning.dark;
    case 'error':
      return theme.colors.white;
    case 'info':
      return colors.info.dark;
    case 'primary':
      return theme.colors.white;
    default:
      return theme.colors.text;
  }
};

const useStyles = createStyles(theme => ({
  // Standalone styles
  container: {
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1] / 2,
    borderRadius: theme.radius.full,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.bold,
    textTransform: 'uppercase',
  },

  // Wrapper styles
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeAbsolute: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: scale(14),
    height: scale(14),
    borderRadius: scale(7),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.white,
    zIndex: 10,
    paddingHorizontal: 2,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    lineHeight: 10,
    textAlign: 'center',
  },

  // Variants
  successBadge: { backgroundColor: colors.success.light },
  warningBadge: { backgroundColor: colors.warning.light },
  errorBadge: { backgroundColor: colors.error.main },
  infoBadge: { backgroundColor: colors.info.light },
  primaryBadge: { backgroundColor: theme.colors.primary },
}));
