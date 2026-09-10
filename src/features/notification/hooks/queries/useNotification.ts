/**
 * NOTIFICATION QUERIES
 * ====================
 * React Query hooks cho Notification feature.
 * Pattern: useBaseQuery / useBaseMutation từ shared/hooks.
 */

import { useMemo } from 'react';
import { useBaseQuery, useBaseMutation } from '@/shared/hooks';
import { notificationService } from '../../services/notification.service';

// ============================================================================
// QUERY KEYS
// ============================================================================

export const notificationKeys = {
  all: ['notifications'] as const,
  list: () => [...notificationKeys.all, 'list'] as const,
  unreadCount: () => [...notificationKeys.all, 'unreadCount'] as const,
} as const;

// ============================================================================
// QUERIES
// ============================================================================

/**
 * Lấy danh sách thông báo và unreadCount
 */
export const useGetNotifications = () => {
  const queryKey = useMemo(() => notificationKeys.list(), []);
  return useBaseQuery({
    queryKey,
    queryFn: notificationService.getList.bind(notificationService),
    staleTime: 30_000, // 30 giây
  });
};

/**
 * Lấy số thông báo chưa đọc — dùng cho badge trên Tab Bar
 */
export const useUnreadNotificationCount = (): number => {
  const { data } = useGetNotifications();
  return data?.unreadCount ?? 0;
};

// ============================================================================
// MUTATIONS
// ============================================================================

/**
 * Đánh dấu thông báo đã đọc
 */
export const useMarkNotificationRead = () => {
  return useBaseMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    invalidateQueries: [notificationKeys.list()],
    showErrorToast: true,
    errorMessage: 'Không thể đánh dấu đã đọc',
  });
};

/**
 * Đánh dấu tất cả đã đọc
 */
export const useMarkAllNotificationsRead = () => {
  return useBaseMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    invalidateQueries: [notificationKeys.list()],
    showSuccessToast: true,
    successMessage: 'Đã đánh dấu tất cả là đã đọc',
    showErrorToast: true,
    errorMessage: 'Không thể đánh dấu tất cả đã đọc',
  });
};
