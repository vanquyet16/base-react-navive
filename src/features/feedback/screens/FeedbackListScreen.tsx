/**
 * FEEDBACK LIST SCREEN
 * ====================
 * Màn hình danh sách phản ánh của người dùng.
 * Tab "Phản Ánh" hiển thị danh sách này — CreateFeedbackScreen
 * là màn hình riêng trong MainStack (navigate từ FAB/button).
 */

import React, { memo } from 'react';
import { View } from 'react-native';
import { CustomText } from '@/components/base';
import { createStyles } from '@/shared/theme/create-styles';

const FeedbackListScreen = memo(() => {
  const styles = useStyles();
  // TODO: Tích hợp useGetFeedbackList khi có API thực
  // const { data, isLoading } = useGetFeedbackList();

  return (
    <View style={styles.container}>
      {/* TODO: Thay bằng FlashList khi có data thực */}
      <View style={styles.emptyState}>
        <CustomText variant="body" style={styles.emptyText}>
          Chưa có phản ánh nào
        </CustomText>
        <CustomText variant="caption" style={styles.emptySubText}>
          Nhấn nút + để gửi phản ánh mới
        </CustomText>
      </View>
    </View>
  );
});

FeedbackListScreen.displayName = 'FeedbackListScreen';

const useStyles = createStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[6],
  },
  emptyText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing[2],
  },
  emptySubText: {
    color: theme.colors.muted,
    textAlign: 'center',
  },
}));

export default FeedbackListScreen;
