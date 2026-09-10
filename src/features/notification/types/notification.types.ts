/**
 * NOTIFICATION TYPES
 * ==================
 * Domain types cho Notification feature.
 */

export interface Notification {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  type: NotificationType;
}

export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface NotificationListResponse {
  items: Notification[];
  total: number;
  unreadCount: number;
}
