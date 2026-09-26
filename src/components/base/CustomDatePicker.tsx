import React, { memo, useCallback, useMemo, useState, useEffect } from 'react';
import { View, Modal, Pressable } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { CustomText } from './CustomText';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

// Cấu hình tiếng Việt cho Calendar
LocaleConfig.locales.vi = {
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

// Format date to YYYY-MM-DD for Calendar component
const formatDateString = (date: Date | null | undefined): string => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
    const styles = useStyles();

    const [tempSelectedDate, setTempSelectedDate] = useState<string>(() =>
      formatDateString(selectedDate),
    );

    // Update temp date when selectedDate prop changes
    useEffect(() => {
      setTempSelectedDate(formatDateString(selectedDate));
    }, [selectedDate]);

    // Calendar theme configuration
    const calendarTheme = useMemo(
      () => ({
        backgroundColor: theme.colors.surface,
        calendarBackground: theme.colors.surface,
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
        textDayFontSize: styles.rs.fontSize(13),
        textMonthFontSize: styles.rs.fontSize(15),
        textDayHeaderFontSize: styles.rs.fontSize(11),
      }),
      [theme, styles.rs],
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
    }, [selectedDate, onClose]);

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
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.cancelButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
                onPress={handleCancel}
              >
                <CustomText
                  variant="bodySmall"
                  weight="medium"
                  style={styles.cancelButtonText}
                >
                  Hủy
                </CustomText>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.confirmButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
                onPress={handleConfirm}
              >
                <CustomText
                  variant="bodySmall"
                  weight="semibold"
                  style={styles.confirmButtonText}
                >
                  Xác nhận
                </CustomText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  },
);

const useStyles = createStyles((theme, rs) => ({
        overlay: {
          flex: 1,
          backgroundColor: theme.colors.backdrop,
          justifyContent: 'center',
          alignItems: 'center',
          padding: rs.scale(20),
        },
        container: {
          backgroundColor: theme.colors.surface,
          borderRadius: rs.moderateScale(16),
          width: '100%',
          maxWidth: rs.scale(400),
          overflow: 'hidden',
          ...theme.shadows.lg,
        },
        header: {
          padding: rs.moderateScale(16),
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
          gap: rs.scale(8),
          padding: rs.moderateScale(12),
          borderTopWidth: 1,
          borderTopColor: theme.colors.backgroundSecondary,
        },
        button: {
          paddingHorizontal: rs.scale(16),
          paddingVertical: rs.moderateVerticalScale(8),
          borderRadius: rs.moderateScale(8),
          minWidth: rs.scale(70),
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
}));

export default CustomDatePicker;
