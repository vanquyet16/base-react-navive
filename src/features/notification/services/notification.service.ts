/**
 * NOTIFICATION SERVICE
 * ====================
 * API service cho Notification feature.
 * Giao tiếp với HTTP client — KHÔNG chứa business logic.
 */

import { createHttpClient } from '@/shared/services/http/http-client';
import type { ApiResponse } from '@/shared/types/api';
import type { NotificationListResponse } from '../types/notification.types';

// Notification API endpoints — sẽ chuyển vào API_ENDPOINTS khi thêm vào constants
const NOTIFICATION_ENDPOINTS = {
  LIST: '/notifications',
  MARK_READ: '/notifications',
  MARK_ALL_READ: '/notifications/read-all',
} as const;

class NotificationService {
  private client = createHttpClient('MAIN');

  /**
   * Lấy danh sách thông báo
   */
  async getList(): Promise<NotificationListResponse> {
    const res = await this.client.get<ApiResponse<NotificationListResponse>>(
      NOTIFICATION_ENDPOINTS.LIST,
    );
    return res.data;
  }

  /**
   * Đánh dấu thông báo đã đọc
   */
  async markAsRead(id: string): Promise<void> {
    await this.client.patch(
      `${NOTIFICATION_ENDPOINTS.MARK_READ}/${id}/read`,
    );
  }

  /**
   * Đánh dấu tất cả thông báo đã đọc
   */
  async markAllAsRead(): Promise<void> {
    await this.client.patch(NOTIFICATION_ENDPOINTS.MARK_ALL_READ);
  }
}

export const notificationService = new NotificationService();
export { NotificationService };
