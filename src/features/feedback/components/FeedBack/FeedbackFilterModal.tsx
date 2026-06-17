import React, { useMemo, useCallback, memo, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { createStyles } from '@/shared/theme/create-styles';
import {
  CustomText,
  CustomButton,
  SpacerMd,
  FilterChip,
  CustomModal,
  ModalActions,
} from '@/components';
import { FormDatePicker } from '@/components/form';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

interface FeedbackFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filter: FilterState) => void;
}

interface FilterState {
  status: string;
  startDate: Date | null;
  endDate: Date | null;
  category: string;
}

const STATUS_OPTIONS = [
  'Tất cả',
  'Mới tiếp nhận',
  'Đang xử lý',
  'Chờ duyệt',
  'Đã trả lời',
];
const CATEGORY_OPTIONS = [
  { id: 'traffic', label: 'Giao thông', icon: 'car' },
  { id: 'environment', label: 'Môi trường', icon: 'tree' }, // Feather icon names mapped roughly
  { id: 'security', label: 'An ninh', icon: 'shield' },
  { id: 'health', label: 'Y tế', icon: 'heart' },
];

/**
 * FeedbackFilterModal Component
 */
export const FeedbackFilterModal: React.FC<FeedbackFilterModalProps> = memo(
  ({ visible, onClose, onApply }) => {
    const styles = useStyles();

    // Filter State
    const [selectedStatus, setSelectedStatus] = useState<string>('Tất cả');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
      null,
    );
    const [startDate, setStartDate] = useState<Date | null>(
      new Date('2024-01-05'),
    );
    const [endDate, setEndDate] = useState<Date | null>(new Date('2024-05-24'));

    // Handlers
    const handleReset = useCallback(() => {
      setSelectedStatus('Tất cả');
      setSelectedCategory(null);
      setStartDate(null);
      setEndDate(null);
    }, []);

    const handleApply = useCallback(() => {
      onApply({
        status: selectedStatus,
        startDate,
        endDate,
        category: selectedCategory || '',
      });
      onClose();
    }, [
      onApply,
      onClose,
      selectedStatus,
      startDate,
      endDate,
      selectedCategory,
    ]);

    // Memoized handlers for FilterChip selections
    const handleStatusPress = useCallback((status: string) => {
      setSelectedStatus(status);
    }, []);

    const handleCategoryPress = useCallback((categoryId: string) => {
      setSelectedCategory(categoryId);
    }, []);

    // Memoize footer content
    const footerContent = useMemo(
      () => (
        <ModalActions
          type="vertical"
          primaryLabel="Áp dụng bộ lọc"
          onPrimaryPress={handleApply}
          secondaryLabel="Thiết lập lại"
          onSecondaryPress={handleReset}
          secondaryVariant="ghost"
        />
      ),
      [handleApply, handleReset],
    );

    return (
      <CustomModal
        visible={visible}
        onClose={onClose}
        type="popup"
        title="Bộ lọc"
        footer={footerContent}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Status Section */}
          <View style={styles.section}>
            <CustomText variant="caption" weight="bold" style={styles.label}>
              TRẠNG THÁI
            </CustomText>
            <View style={styles.chipRow}>
              {STATUS_OPTIONS.map(status => (
                <FilterChip
                  key={status}
                  label={status}
                  selected={selectedStatus === status}
                  onPress={() => handleStatusPress(status)}
                />
              ))}
            </View>
          </View>

          {/* Date Section */}
          <View style={styles.section}>
            <CustomText variant="caption" weight="bold" style={styles.label}>
              THỜI GIAN
            </CustomText>
            <View style={styles.dateRow}>
              <View style={styles.dateCol}>
                <FormDatePicker
                  value={startDate}
                  onChange={setStartDate}
                  placeholder="dd/mm/yyyy"
                  label="Từ ngày"
                />
              </View>
              <View style={{ width: scale(12) }} />
              <View style={styles.dateCol}>
                <FormDatePicker
                  value={endDate}
                  onChange={setEndDate}
                  placeholder="dd/mm/yyyy"
                  label="Đến ngày"
                />
              </View>
            </View>
          </View>

          {/* Category Section */}
          <View style={styles.section}>
            <CustomText variant="caption" weight="bold" style={styles.label}>
              LĨNH VỰC
            </CustomText>
            <View style={styles.chipRow}>
              {CATEGORY_OPTIONS.map(cat => (
                <FilterChip
                  key={cat.id}
                  label={cat.label}
                  icon={cat.icon}
                  selected={selectedCategory === cat.id}
                  onPress={() => handleCategoryPress(cat.id)}
                />
              ))}
            </View>
          </View>

          <SpacerMd />
        </ScrollView>
      </CustomModal>
    );
  },
);

/**
 * Styles
 */
const useStyles = createStyles(
  theme => ({
    content: {
      paddingHorizontal: moderateScale(16),
    },
    section: {
      marginTop: moderateVerticalScale(16),
    },
    label: {
      color: theme.colors.textSecondary,
      marginBottom: moderateVerticalScale(8),
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dateRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateCol: {
      flex: 1,
    },
  }),
  true,
);

export default FeedbackFilterModal;
