import React, { memo } from 'react';
import {
  Pressable,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';
import { createStyles } from '@/shared/theme/create-styles';
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
    const styles = useStyles();

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
        <Pressable
          style={({ pressed }) => [
            styles.container,
            error && styles.containerError,
            disabled && styles.containerDisabled,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={onPress}
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
        </Pressable>

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

const useStyles = createStyles((theme, rs) => ({
  wrapper: {
    marginBottom: moderateVerticalScale(12),
    width: '100%',
  },
  label: {
    fontSize: rs.fontSize(12),
    fontWeight: '700',
    textTransform: 'uppercase',
    color: theme.colors.textSecondary,
    marginBottom: moderateVerticalScale(8),
    marginLeft: scale(4),
  },
  container: {
    minHeight: rs.scale(40),
    backgroundColor: theme.colors.inputBackground,
    borderWidth: 1.5,
    borderColor: theme.colors.inputBorder,
    borderRadius: rs.radius(8),
    paddingHorizontal: scale(12),
    paddingVertical: rs.py(8), // Match CustomInput
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
    fontSize: rs.fontSize(12),
    fontWeight: '500',
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
    fontSize: rs.fontSize(12),
  },
}));
