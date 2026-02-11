import React, { memo, useMemo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { CustomText } from './CustomText';
import AppIcon from './AppIcon';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: string;
  disabled?: boolean;
}

/**
 * FilterChip Component
 * ====================
 * Chip component dùng cho filter/selection.
 * Hỗ trợ icon, selected state, và disabled state.
 *
 * @example
 * <FilterChip
 *   label="Tất cả"
 *   selected={selectedStatus === 'all'}
 *   onPress={() => setSelectedStatus('all')}
 * />
 *
 * @example
 * // With icon
 * <FilterChip
 *   label="Giao thông"
 *   icon="car"
 *   selected={category === 'traffic'}
 *   onPress={() => setCategory('traffic')}
 * />
 */
export const FilterChip = memo<FilterChipProps>(
  ({ label, selected, onPress, icon, disabled = false }) => {
    const theme = useTheme();
    const styles = useStyles(theme);

    const containerStyle = useMemo(
      () => [
        styles.chip,
        selected && styles.chipSelected,
        disabled && styles.chipDisabled,
      ],
      [styles, selected, disabled],
    );

    const textStyle = useMemo(
      () => [
        styles.chipText,
        selected && styles.chipTextSelected,
        disabled && styles.chipTextDisabled,
      ],
      [styles, selected, disabled],
    );

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        activeOpacity={0.7}
        disabled={disabled}
      >
        {icon && (
          <AppIcon
            name={icon}
            size={moderateScale(14)}
            color={
              disabled
                ? theme.colors.textSecondary
                : selected
                ? theme.colors.white
                : theme.colors.textSecondary
            }
            style={{ marginRight: scale(6) }}
          />
        )}
        <CustomText variant="caption" style={textStyle}>
          {label}
        </CustomText>
      </TouchableOpacity>
    );
  },
);

/**
 * Styles
 */
const useStyles = createStyles(theme => ({
  chip: {
    paddingHorizontal: scale(12),
    paddingVertical: moderateVerticalScale(8),
    borderRadius: moderateScale(8),
    backgroundColor: theme.colors.backgroundSecondary,
    marginRight: scale(8),
    marginBottom: moderateVerticalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
  },
  chipDisabled: {
    opacity: 0.5,
  },
  chipText: {
    color: theme.colors.textSecondary,
  },
  chipTextSelected: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  chipTextDisabled: {
    color: theme.colors.textSecondary,
  },
}));

export default FilterChip;
