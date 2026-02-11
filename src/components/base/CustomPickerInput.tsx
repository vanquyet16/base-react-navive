import React, { memo } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { CustomText } from './CustomText';
import AppIcon from './AppIcon';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

export interface CustomPickerInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onPress?: () => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rightIconName?: string;
  rightIconSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  /** Label transformation (default: uppercase) */
  labelTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
}

/**
 * CustomPickerInput Component
 * ===========================
 * Input dạng touchable để kích hoạt picker (DatePicker, Modal Picker...).
 * Theme consistent với CustomInput và CustomDropdown.
 */
export const CustomPickerInput = memo<CustomPickerInputProps>(
  ({
    label,
    placeholder = 'Chọn...',
    value,
    onPress,
    error,
    disabled = false,
    required = false,
    rightIconName = 'calendar',
    rightIconSize = 18,
    containerStyle,
    labelTransform = 'uppercase',
  }) => {
    const theme = useTheme();
    const styles = useStyles(theme);

    const formattedLabel = label
      ? required
        ? `${label} *`
        : label
      : undefined;

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {/* Label */}
        {formattedLabel && (
          <CustomText
            variant="caption"
            style={[styles.label, { textTransform: labelTransform }]}
          >
            {formattedLabel}
          </CustomText>
        )}

        {/* Input Trigger */}
        <TouchableOpacity
          style={[
            styles.container,
            error && styles.containerError,
            disabled && styles.containerDisabled,
          ]}
          onPress={onPress}
          activeOpacity={0.7}
          disabled={disabled}
        >
          <CustomText
            style={[
              styles.text,
              !value && styles.placeholder,
              disabled && styles.textDisabled,
            ]}
          >
            {value || placeholder}
          </CustomText>
          <AppIcon
            name={rightIconName}
            size={moderateScale(rightIconSize)}
            color={
              disabled
                ? theme.colors.textSecondary
                : error
                ? theme.colors.error
                : theme.colors.textSecondary
            }
          />
        </TouchableOpacity>

        {/* Error Message */}
        {error && (
          <CustomText variant="caption" style={styles.errorText}>
            {error}
          </CustomText>
        )}
      </View>
    );
  },
);

const useStyles = (theme: any) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: moderateVerticalScale(12),
      width: '100%',
    },
    label: {
      fontSize: theme.typography.fontSizes.xs,
      fontWeight: theme.typography.fontWeights.bold,
      textTransform: 'uppercase',
      color: theme.colors.textSecondary,
      marginBottom: moderateVerticalScale(8),
      marginLeft: scale(4),
    },
    container: {
      minHeight: moderateVerticalScale(40),
      backgroundColor: theme.colors.inputBackground,
      borderWidth: 1.5,
      borderColor: theme.colors.inputBorder,
      borderRadius: theme.radius.md,
      paddingHorizontal: scale(12),
      paddingVertical: theme.spacing[2], // Match CustomInput (was 2.5)
      // Match CustomInput shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    containerError: {
      borderColor: theme.colors.error,
      borderWidth: 1, // Ensure border width consistency
    },
    containerDisabled: {
      opacity: 0.5,
      backgroundColor: theme.colors.backgroundSecondary,
    },
    text: {
      flex: 1,
      color: theme.colors.text,
      fontSize: theme.typography.fontSizes.xs,
      fontWeight: theme.typography.fontWeights.medium,
    },
    placeholder: {
      color: theme.colors.textTertiary,
    },
    textDisabled: {
      color: theme.colors.textSecondary,
    },
    errorText: {
      color: theme.colors.error,
      marginTop: moderateVerticalScale(4),
      marginLeft: scale(4),
      fontSize: theme.typography.fontSizes.xs,
    },
  });
