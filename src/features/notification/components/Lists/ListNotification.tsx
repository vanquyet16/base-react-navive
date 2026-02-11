import React, { memo, useCallback, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { CustomFlashList, CustomText, SectionHeader } from '@/components';
import { createStyles } from '@/shared/theme/create-styles';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationItem from './NotificationItem';
import { useTheme } from '@/shared/theme/use-theme';

/**
 * Notification data structure
 */
export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  iconName: string;
  iconColor: string;
  iconBgColor: string;
}

/**
 * Section data structure for grouped notifications
 */
export interface NotificationSection {
  title: string;
  data: Notification[];
}

interface ListNotificationProps {
  sections: NotificationSection[];
  onPressNotification?: (notification: Notification) => void;
  onDeleteNotification?: (notification: Notification) => void;
  onMarkAsReadNotification?: (notification: Notification) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

/**
 * Section header component (memoized)
 */
interface SectionHeaderProps {
  title: string;
}

// const SectionHeader = memo<SectionHeaderProps>(({ title }) => {
//   const styles = useStyles();

//   return (
//     <View style={styles.sectionHeader}>
//       <CustomText variant="caption" style={styles.sectionHeaderText}>
//         {title}
//       </CustomText>
//     </View>
//   );
// });

// SectionHeader.displayName = 'SectionHeader';

/**
 * Main ListNotification component
 */
const ListNotification: React.FC<ListNotificationProps> = ({
  sections,
  onPressNotification,
  onDeleteNotification,
  onMarkAsReadNotification,
  onRefresh,
  refreshing = false,
}) => {
  const styles = useStyles();
  const theme = useTheme();
  // Flatten sections into single list with headers
  const listData = useMemo(() => {
    const flatData: Array<{ type: 'header' | 'item'; data: any }> = [];

    sections.forEach(section => {
      // Add section header
      flatData.push({
        type: 'header',
        data: section.title,
      });

      // Add notification items
      section.data.forEach(notification => {
        flatData.push({
          type: 'item',
          data: notification,
        });
      });
    });

    return flatData;
  }, [sections]);

  // Stable key extractor
  const keyExtractor = useCallback(
    (item: { type: string; data: any }, index: number) => {
      if (item.type === 'header') {
        return `header-${item.data}-${index}`;
      }
      return `item-${item.data.id}`;
    },
    [],
  );

  // Memoized press handler
  const handlePressNotification = useCallback(
    (notification: Notification) => {
      onPressNotification?.(notification);
    },
    [onPressNotification],
  );

  // Memoized delete handler
  const handleDeleteNotification = useCallback(
    (notification: Notification) => {
      onDeleteNotification?.(notification);
    },
    [onDeleteNotification],
  );

  // Memoized mark as read handler
  const handleMarkAsReadNotification = useCallback(
    (notification: Notification) => {
      onMarkAsReadNotification?.(notification);
    },
    [onMarkAsReadNotification],
  );

  // Render item (memoized)
  const renderItem = useCallback(
    ({ item }: { item: { type: string; data: any } }) => {
      if (item.type === 'header') {
        return (
          <SectionHeader
            title={item.data}
            style={styles.sectionHeader}
            color={theme.colors.textSecondary}
            fontBold="700"
            showVerticalBar={false}
            fontSize={12}
          />
        );
      }

      return (
        <NotificationItem
          item={item.data}
          onPress={handlePressNotification}
          onDelete={handleDeleteNotification}
          onMarkAsRead={handleMarkAsReadNotification}
        />
      );
    },
    [
      handlePressNotification,
      handleDeleteNotification,
      handleMarkAsReadNotification,
      styles.sectionHeader,
      theme.colors.textSecondary,
    ],
  );

  // Memoized empty component
  const ListEmptyComponent = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Icon name="bell-outline" size={moderateScale(64)} color="#9CA3AF" />
        <CustomText variant="h6" style={styles.emptyText}>
          Không có thông báo
        </CustomText>
        <CustomText variant="bodySmall" style={styles.emptySubText}>
          Bạn chưa có thông báo nào mới
        </CustomText>
      </View>
    ),
    [styles],
  );

  // Optimize FlashList recycling with explicit item types
  const getItemType = useCallback((item: { type: string; data: any }) => {
    return item.type; // 'header' or 'item'
  }, []);

  return (
    <CustomFlashList
      data={listData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemType={getItemType}
      estimatedItemSize={moderateVerticalScale(120)} // Adjusted to be closer to actual item height
      contentContainerStyle={styles.listContainer}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListEmptyComponent={ListEmptyComponent}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default memo(ListNotification);

const useStyles = createStyles(
  theme => ({
    listContainer: {
      //   paddingHorizontal: scale(16),
      //   paddingVertical: moderateVerticalScale(8),
    },

    // Section Header
    sectionHeader: {
      paddingVertical: theme.spacing[2],
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      alignContent: 'center',
      paddingHorizontal: theme.spacing[1],
    },

    // Notification Item
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: moderateVerticalScale(12),
      paddingLeft: scale(16),
      gap: scale(12),
      position: 'relative',
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

    // Empty state
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: moderateVerticalScale(80),
      gap: moderateVerticalScale(12),
    },
    emptyText: {
      color: theme.colors.textSecondary,
      marginTop: moderateVerticalScale(8),
    },
    emptySubText: {
      color: theme.colors.textTertiary,
    },
  }),
  true,
);
