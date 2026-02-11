import React, { useMemo, useState, useCallback, memo } from 'react';
import { View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CustomText } from '@/components/base';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface CustomDropdownProps {
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  search?: boolean;
  searchPlaceholder?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  style?: ViewStyle;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  /** Label transformation (default: uppercase) */
  labelTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
}

export const CustomDropdown: React.FC<CustomDropdownProps> = memo(
  ({
    label,
    placeholder = 'Chọn...',
    error,
    required = false,
    disabled = false,
    search = false,
    searchPlaceholder = 'Tìm kiếm...',
    options,
    value,
    onChange,
    style,
    onLoadMore,
    isLoadingMore = false,
    labelTransform = 'uppercase',
  }) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    const [isFocused, setIsFocused] = useState(false);

    // Format label với required indicator
    const formattedLabel = useMemo(
      () => (label ? (required ? `${label} *` : label) : undefined),
      [label, required],
    );

    const containerStyle = useMemo(
      () => [
        styles.dropdown,
        isFocused && styles.dropdownFocused,
        error && styles.dropdownError,
        disabled && styles.dropdownDisabled,
      ],
      [styles, isFocused, error, disabled],
    );

    // Handlers
    const handleChange = useCallback(
      (item: any) => {
        if (onChange) onChange(item.value);
        setIsFocused(false);
      },
      [onChange],
    );

    const handleFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    return (
      <View style={[styles.container, style]}>
        {formattedLabel && (
          <CustomText
            variant="caption"
            style={[styles.label, { textTransform: labelTransform }]}
          >
            {formattedLabel}
          </CustomText>
        )}
        <Dropdown
          style={containerStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={styles.itemTextStyle}
          containerStyle={styles.dropdownContainer}
          data={options}
          search={search}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          value={value}
          disable={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          flatListProps={{
            onEndReached: onLoadMore,
            onEndReachedThreshold: 0.5,
            ListFooterComponent: isLoadingMore ? (
              <View style={styles.loadingFooter}>
                <CustomText
                  variant="caption"
                  style={{ color: theme.colors.textTertiary }}
                >
                  Đang tải...
                </CustomText>
              </View>
            ) : null,
          }}
        />
        {error && (
          <CustomText variant="caption" style={styles.errorText}>
            {error}
          </CustomText>
        )}
      </View>
    );
  },
);

const useStyles = createStyles(theme => ({
  container: {
    // marginBottom: moderateVerticalScale(12),
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
  dropdown: {
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
    justifyContent: 'center',
  },
  dropdownFocused: {
    borderColor: theme.colors.primary,
    backgroundColor: '#FFFFFF',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  dropdownError: {
    borderColor: theme.colors.error,
    borderWidth: moderateScale(1),
  },
  dropdownDisabled: {
    backgroundColor: theme.colors.backgroundSecondary,
    opacity: 0.5,
  },
  dropdownContainer: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    ...theme.shadows.md,
    paddingVertical: moderateVerticalScale(4),
  },
  placeholderStyle: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.textTertiary,
  },
  selectedTextStyle: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeights.medium,
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: theme.colors.textSecondary,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: theme.colors.text,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
  },
  itemTextStyle: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xs,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: moderateVerticalScale(4),
    marginLeft: scale(4),
    fontSize: theme.typography.fontSizes.xs,
  },
  loadingFooter: {
    padding: moderateVerticalScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
