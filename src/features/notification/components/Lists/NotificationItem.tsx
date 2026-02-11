import { memo, useCallback, useMemo } from 'react';
import { Notification } from './ListNotification';
import { createStyles } from '@/shared/theme/create-styles';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { AppIcon, CustomText, SwipeableItem } from '@/components';
import { View } from 'react-native';

interface NotificationItemProps {
  item: Notification;
  onPress: (notification: Notification) => void;
  onDelete?: (notification: Notification) => void;
  onMarkAsRead?: (notification: Notification) => void;
}

const NotificationItem = memo<NotificationItemProps>(
  ({ item, onPress, onDelete, onMarkAsRead }) => {
    const styles = useStyles();

    const handlePress = useCallback(() => {
      onPress(item);
    }, [item, onPress]);

    const handleDelete = useCallback(() => {
      onDelete?.(item);
    }, [item, onDelete]);

    const handleMarkAsRead = useCallback(() => {
      onMarkAsRead?.(item);
    }, [item, onMarkAsRead]);

    const iconContainerStyle = useMemo(
      () => [styles.iconContainer, { backgroundColor: item.iconBgColor }],
      [styles.iconContainer, item.iconBgColor],
    );

    // Conditional background for unread items
    const itemContainerStyle = useMemo(
      () => [styles.notificationItem, !item.isRead && styles.unreadItem],
      [styles.notificationItem, styles.unreadItem, item.isRead],
    );

    // Left action: Mark as read (swipe right)
    const leftAction = useMemo(
      () =>
        onMarkAsRead && !item.isRead
          ? {
              onPress: handleMarkAsRead,
              text: 'Đã đọc',
              icon: 'check',
              backgroundColor: '#4CAF50', // Green
            }
          : undefined,
      [onMarkAsRead, item.isRead, handleMarkAsRead],
    );

    // Right action: Archive + Delete (swipe left)
    const rightAction = useMemo(() => {
      const actions = [];

      // Action 1: Archive (Orange)
      actions.push({
        onPress: () => console.log('Archive item:', item.id), // Demo handler
        text: 'Lưu trữ',
        icon: 'archive',
        backgroundColor: '#F97316', // Orange
      });

      // Action 2: Delete (Red)
      if (onDelete) {
        actions.push({
          onPress: handleDelete,
          text: 'Xóa',
          icon: 'trash',
          backgroundColor: '#EF4444', // Red
        });
      }

      return actions.length > 0 ? actions : undefined;
    }, [onDelete, handleDelete, item.id]);

    return (
      <SwipeableItem
        leftAction={leftAction}
        rightAction={rightAction}
        onPress={handlePress}
      >
        <View style={itemContainerStyle}>
          {/* Red vertical indicator for unread */}
          {!item.isRead && <View style={styles.unreadIndicator} />}

          {/* Icon */}
          <View style={iconContainerStyle}>
            <AppIcon
              name={item.iconName}
              size={moderateScale(24)}
              color={item.iconColor}
            />
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <View style={styles.titleRow}>
              <CustomText
                variant="h7"
                style={styles.notificationTitle}
                numberOfLines={1}
              >
                {item.title}
              </CustomText>
              {!item.isRead && <View style={styles.unreadDot} />}
            </View>

            <CustomText
              variant="bodySmall"
              style={styles.notificationDescription}
              numberOfLines={2}
            >
              {item.description}
            </CustomText>
          </View>

          {/* Time */}
          <CustomText variant="caption" style={styles.timeText}>
            {item.time}
          </CustomText>
        </View>
      </SwipeableItem>
    );
  },
);

export default NotificationItem;

NotificationItem.displayName = 'NotificationItem';

const useStyles = createStyles(
  theme => ({
    // Notification Item
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: moderateVerticalScale(12),
      paddingLeft: scale(16),
      paddingRight: scale(16),
      gap: scale(12),
      position: 'relative',
      backgroundColor: theme.colors.white,
      borderBottomWidth: 0.5,
      borderColor: theme.colors.backgroundSecondary,
    },

    // Unread item background
    unreadItem: {
      backgroundColor: theme.colors.backgroundSecondary,
    },

    // Red vertical indicator for unread
    unreadIndicator: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: scale(4),
      backgroundColor: theme.colors.error,
    },

    // Icon
    iconContainer: {
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: moderateScale(24),
      justifyContent: 'center',
      alignItems: 'center',
    },

    // Content
    contentContainer: {
      flex: 1,
      gap: moderateVerticalScale(4),
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(8),
    },
    notificationTitle: {
      flex: 1,
      fontWeight: '600',
      color: theme.colors.text,
    },
    notificationDescription: {
      color: theme.colors.textSecondary,
      lineHeight: moderateVerticalScale(20),
    },

    // Unread indicator
    unreadDot: {
      width: moderateScale(8),
      height: moderateScale(8),
      borderRadius: moderateScale(4),
      backgroundColor: theme.colors.info,
    },

    // Time
    timeText: {
      color: theme.colors.textTertiary,
      marginTop: moderateVerticalScale(2),
    },
  }),
  true,
);
