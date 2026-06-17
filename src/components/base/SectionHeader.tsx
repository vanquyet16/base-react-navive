import React, { memo, useMemo } from 'react';
import {
  View,
  Pressable,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import { CustomText } from './CustomText';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import AppIcon from './AppIcon';

export interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
  seeAllText?: string;
  style?: StyleProp<ViewStyle>;

  /**
   * Show vertical red bar indicator
   */
  showVerticalBar?: boolean;

  /**
   * Custom Action Button (e.g. Filter)
   */
  actionLabel?: string;
  actionIcon?: string;
  actionIconType?: import('./AppIcon').IconType;
  onAction?: () => void;

  /**
   * Custom font size for title
   */
  fontSize?: number;

  /**
   * Transform text to uppercase
   */
  isUppercase?: boolean;

  /**
   * Color of title
   */
  color?: string;

  /**
   * Font weight bold or specific weight
   */
  fontBold?: boolean | TextStyle['fontWeight'];

  /**
   * Text transform
   */
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';

  /**
   * Style action button
   */
  styleAction?: StyleProp<ViewStyle>;

  /**
   * Style label action button
   */
  rightActionStyle?: {
    styleAction?: StyleProp<ViewStyle>;
    styleLableAction?: StyleProp<TextStyle>;
    styleIconAction?: {
      style?: StyleProp<ViewStyle>;
      color?: string;
    };
  };
}

/**
 * SectionHeader Component
 * =======================
 * Header cho các section với thanh dọc trang trí bên trái.
 * Hỗ trợ nút Action bên phải (như Lọc) hoặc text "Xem tất cả".
 */
const SectionHeader: React.FC<SectionHeaderProps> = memo(
  ({
    title,
    onSeeAll,
    seeAllText = 'Tất cả',
    style,
    showVerticalBar = true,
    actionLabel,
    actionIcon,
    actionIconType,
    onAction,
    fontSize,
    isUppercase = false,
    color,
    fontBold = true,
    transform,
    styleAction,
    rightActionStyle,
  }) => {
    const theme = useTheme();
    const styles = useStyles();

    const rightAction = useMemo(() => {
      // Priority 1: Custom Action Button (Filter style)
      if (actionLabel || actionIcon) {
        return (
          <Pressable
            onPress={onAction}
            style={({ pressed }) => [
              styles.actionButton,
              rightActionStyle?.styleAction,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            {actionIcon && (
              <AppIcon
                name={actionIcon}
                type={actionIconType}
                size={14}
                color={
                  rightActionStyle?.styleIconAction?.color ||
                  theme.colors.textSecondary
                }
                style={[
                  rightActionStyle?.styleIconAction?.style,
                  { marginRight: actionLabel ? scale(4) : 0 },
                ]}
              />
            )}
            {actionLabel && (
              <CustomText
                variant="h8"
                style={[styles.actionText, rightActionStyle?.styleLableAction]}
              >
                {actionLabel}
              </CustomText>
            )}
          </Pressable>
        );
      }

      // Priority 2: "See All" text link
      if (onSeeAll) {
        return (
          <Pressable
            onPress={onSeeAll}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          >
            <CustomText variant="h8" style={styles.seeAllText}>
              {seeAllText}
            </CustomText>
          </Pressable>
        );
      }

      return null;
    }, [
      actionLabel,
      actionIcon,
      actionIconType,
      onAction,
      onSeeAll,
      seeAllText,
      styles.actionButton,
      styles.actionText,
      styles.seeAllText,
      theme.colors.textSecondary,
      rightActionStyle,
    ]);

    const titleStyle = useMemo(() => {
      const baseStyle: any = [styles.title];
      if (fontSize) baseStyle.push({ fontSize: moderateScale(fontSize) });
      if (color) baseStyle.push({ color: color });
      if (transform) baseStyle.push({ textTransform: transform });
      else if (isUppercase) baseStyle.push({ textTransform: 'uppercase' });

      // Apply explicit font weight if fontBold is not boolean (e.g. "500", "600")
      if (typeof fontBold !== 'boolean' && fontBold) {
        baseStyle.push({ fontWeight: fontBold });
      }

      return baseStyle;
    }, [fontSize, color, transform, isUppercase, fontBold, styles.title]);

    // Determine weight prop for CustomText (only if boolean)
    const textWeight =
      typeof fontBold === 'boolean'
        ? fontBold
          ? 'bold'
          : 'normal'
        : undefined;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.leftContainer}>
          {showVerticalBar && <View style={styles.verticalBar} />}
          <CustomText variant="h7" weight={textWeight} style={titleStyle}>
            {title}
          </CustomText>
        </View>

        {rightAction}
      </View>
    );
  },
);

const useStyles = createStyles(
  theme => ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    verticalBar: {
      width: moderateScale(3),
      height: moderateVerticalScale(14),
      backgroundColor: theme.colors.primary,
      borderRadius: moderateScale(2),
      marginRight: theme.spacing[2],
    },
    title: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: '600',
    },
    seeAllText: {
      color: theme.colors.primary,
      fontWeight: '500',
    },
    // Custom Action Button Styles
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      paddingHorizontal: scale(12),
      paddingVertical: moderateVerticalScale(6),
      borderRadius: moderateScale(8),
      borderWidth: 1,
      borderColor: theme.colors.border,
      // Optional shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    actionText: {
      color: theme.colors.textSecondary,
      fontWeight: '600',
    },
  }),
  true,
);

export default SectionHeader;
