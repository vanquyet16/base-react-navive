import React, { memo, useCallback, useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { CustomText } from '@/components'; // Assuming index export exists
import { useTheme } from '@/shared/theme/use-theme';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

// Cấu hình tiếng Việt cho Calendar
LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th1',
    'Th2',
    'Th3',
    'Th4',
    'Th5',
    'Th6',
    'Th7',
    'Th8',
    'Th9',
    'Th10',
    'Th11',
    'Th12',
  ],
  dayNames: [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vi';

interface CustomDatePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  selectedDate?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  title?: string;
}

/**
 * CustomDatePicker Component
 * ===========================
 * Date picker sử dụng react-native-calendars với theme tùy chỉnh.
 * Hiển thị trong Modal với giao diện đẹp, dễ sử dụng.
 */
export const CustomDatePicker: React.FC<CustomDatePickerProps> = memo(
  ({
    visible,
    onClose,
    onSelectDate,
    selectedDate,
    minDate,
    maxDate,
    title = 'Chọn ngày',
  }) => {
    const theme = useTheme();
    const styles = useStyles(theme);

    // Debug log
    useEffect(() => {
      console.log('CustomDatePicker render - visible:', visible);
    }, [visible]);

    // Format date to YYYY-MM-DD for Calendar component
    const formatDateString = useCallback(
      (date: Date | null | undefined): string => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
      [],
    );

    const [tempSelectedDate, setTempSelectedDate] = useState<string>(
      formatDateString(selectedDate),
    );

    // Update temp date when selectedDate prop changes
    useEffect(() => {
      setTempSelectedDate(formatDateString(selectedDate));
    }, [selectedDate, formatDateString]);

    // Calendar theme configuration
    const calendarTheme = useMemo(
      () => ({
        backgroundColor: theme.colors.white,
        calendarBackground: theme.colors.white,
        textSectionTitleColor: theme.colors.textSecondary,
        selectedDayBackgroundColor: theme.colors.primary,
        selectedDayTextColor: theme.colors.white,
        todayTextColor: theme.colors.primary,
        dayTextColor: theme.colors.text,
        textDisabledColor: theme.colors.textSecondary,
        dotColor: theme.colors.primary,
        selectedDotColor: theme.colors.white,
        arrowColor: theme.colors.primary,
        monthTextColor: theme.colors.text,
        indicatorColor: theme.colors.primary,
        textDayFontFamily: 'System',
        textMonthFontFamily: 'System',
        textDayHeaderFontFamily: 'System',
        textDayFontWeight: '400' as const,
        textMonthFontWeight: '600' as const,
        textDayHeaderFontWeight: '500' as const,
        textDayFontSize: moderateScale(13),
        textMonthFontSize: moderateScale(15),
        textDayHeaderFontSize: moderateScale(11),
      }),
      [theme],
    );

    // Marked dates configuration
    const markedDates = useMemo(() => {
      if (!tempSelectedDate) return {};
      return {
        [tempSelectedDate]: {
          selected: true,
          selectedColor: theme.colors.primary,
        },
      };
    }, [tempSelectedDate, theme.colors.primary]);

    // Handlers
    const handleDayPress = useCallback((day: any) => {
      setTempSelectedDate(day.dateString);
    }, []);

    const handleConfirm = useCallback(() => {
      if (tempSelectedDate) {
        const [year, month, day] = tempSelectedDate.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        onSelectDate(date);
      }
      onClose();
    }, [tempSelectedDate, onSelectDate, onClose]);

    const handleCancel = useCallback(() => {
      setTempSelectedDate(formatDateString(selectedDate));
      onClose();
    }, [selectedDate, onClose, formatDateString]);

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <CustomText variant="h6" weight="bold">
                {title}
              </CustomText>
            </View>

            {/* Calendar */}
            <Calendar
              current={tempSelectedDate || formatDateString(new Date())}
              onDayPress={handleDayPress}
              markedDates={markedDates}
              minDate={minDate ? formatDateString(minDate) : undefined}
              maxDate={maxDate ? formatDateString(maxDate) : undefined}
              theme={calendarTheme}
              enableSwipeMonths
              style={styles.calendar}
            />

            {/* Footer Actions */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
                activeOpacity={0.7}
              >
                <CustomText
                  variant="bodySmall"
                  weight="medium"
                  style={styles.cancelButtonText}
                >
                  Hủy
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirm}
                activeOpacity={0.7}
              >
                <CustomText
                  variant="bodySmall"
                  weight="semibold"
                  style={styles.confirmButtonText}
                >
                  Xác nhận
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  },
);

const useStyles = (theme: any) =>
  useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: scale(20),
        },
        container: {
          backgroundColor: theme.colors.white,
          borderRadius: moderateScale(16),
          width: '100%',
          maxWidth: scale(400),
          overflow: 'hidden',
          ...theme.shadows.lg,
        },
        header: {
          padding: moderateScale(16),
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.backgroundSecondary,
          alignItems: 'center',
        },
        calendar: {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.backgroundSecondary,
        },
        footer: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: scale(8),
          padding: moderateScale(12),
          borderTopWidth: 1,
          borderTopColor: theme.colors.backgroundSecondary,
        },
        button: {
          paddingHorizontal: scale(16),
          paddingVertical: moderateVerticalScale(8),
          borderRadius: moderateScale(8),
          minWidth: scale(70),
          alignItems: 'center',
          justifyContent: 'center',
        },
        cancelButton: {
          backgroundColor: 'transparent',
        },
        cancelButtonText: {
          color: theme.colors.textSecondary,
          // fontSize và fontWeight được set bởi variant="bodySmall" + weight="medium"
        },
        confirmButton: {
          backgroundColor: theme.colors.primary,
        },
        confirmButtonText: {
          color: theme.colors.white,
          // fontSize và fontWeight được set bởi variant="bodySmall" + weight="semibold"
        },
      }),
    [theme],
  );

export default CustomDatePicker;
