import React, { memo, useMemo } from 'react';
import { View, Pressable, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { CustomButton, ButtonVariant } from './CustomButton';
import { CustomText } from './CustomText';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

export type ModalActionType =
  | 'vertical' // Button trên, Text/Button dưới (như ảnh)
  | 'horizontal-center'
  | 'horizontal-end'
  | 'horizontal-start';

interface ModalActionsProps {
  type?: ModalActionType;
  primaryLabel: string;
  onPrimaryPress: () => void;
  primaryVariant?: ButtonVariant;

  secondaryLabel?: string;
  onSecondaryPress?: () => void;
  secondaryVariant?: ButtonVariant;

  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
}

/**
 * ModalActions Component
 * ======================
 * Component quản lý layout các nút hành động trong Footer của Modal.
 * Hỗ trợ các kiểu layout:
 * - vertical: Stack dọc (Top: Primary, Bottom: Secondary)
 * - horizontal-*: 2 nút ngang (Center/Left/Right)
 */
export const ModalActions = memo<ModalActionsProps>(
  ({
    type = 'vertical',
    primaryLabel,
    onPrimaryPress,
    primaryVariant = 'primary',
    secondaryLabel,
    onSecondaryPress,
    secondaryVariant = 'ghost',
    style,
    fullWidth = true, // Default true cho vertical style
  }) => {
    const theme = useTheme();
    const styles = useStyles();

    // Render Layouts
    const content = useMemo(() => {
      switch (type) {
        case 'vertical':
          return (
            <View style={styles.verticalContainer}>
              <CustomButton
                title={primaryLabel}
                onPress={onPrimaryPress}
                variant={primaryVariant}
                style={[styles.button, fullWidth && styles.fullWidth]}
              />
              {secondaryLabel && (
                <Pressable
                  onPress={onSecondaryPress}
                  style={({ pressed }) => [
                    styles.verticalSecondaryBtn,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  {secondaryVariant === 'ghost' ||
                  secondaryVariant === 'text' ? (
                    <CustomText
                      variant="bodySmall"
                      weight="medium"
                      style={styles.secondaryText}
                    >
                      {secondaryLabel}
                    </CustomText>
                  ) : (
                    <CustomButton
                      title={secondaryLabel}
                      onPress={onSecondaryPress}
                      variant={secondaryVariant}
                      style={[styles.button, fullWidth && styles.fullWidth]}
                    />
                  )}
                </Pressable>
              )}
            </View>
          );

        case 'horizontal-center':
        case 'horizontal-end':
        case 'horizontal-start':
          const justifyMap = {
            'horizontal-center': 'center',
            'horizontal-end': 'flex-end',
            'horizontal-start': 'flex-start',
          } as const;

          return (
            <View
              style={[
                styles.horizontalContainer,
                { justifyContent: justifyMap[type] },
              ]}
            >
              {secondaryLabel && (
                <CustomButton
                  title={secondaryLabel}
                  onPress={onSecondaryPress}
                  variant={secondaryVariant}
                  style={[styles.smallButton, { marginRight: scale(12) }]}
                />
              )}
              <CustomButton
                title={primaryLabel}
                onPress={onPrimaryPress}
                variant={primaryVariant}
                style={styles.smallButton}
              />
            </View>
          );

        default:
          return null;
      }
    }, [
      type,
      primaryLabel,
      onPrimaryPress,
      primaryVariant,
      secondaryLabel,
      onSecondaryPress,
      secondaryVariant,
      styles,
      fullWidth,
    ]);

    return <View style={[styles.container, style]}>{content}</View>;
  },
);

const useStyles = createStyles(
  theme => ({
    container: {
      width: '100%',
      paddingHorizontal: scale(16),
    },
    verticalContainer: {
      alignItems: 'center',
      width: '100%',
    },
    horizontalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    button: {
      minHeight: moderateVerticalScale(44),
    },
    smallButton: {
      minWidth: scale(100),
    },
    fullWidth: {
      width: '100%',
    },
    verticalSecondaryBtn: {
      marginTop: moderateVerticalScale(12),
      padding: moderateScale(8),
    },
    secondaryText: {
      color: theme.colors.textSecondary,
      // fontSize và fontWeight đã được set bởi variant="bodySmall" + weight="medium"
    },
  }),
  true,
);

export default ModalActions;
