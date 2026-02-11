import { createStyles } from '@/shared/theme/create-styles';
import React, { useMemo, useCallback } from 'react';
import { View } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import ListNotification, {
  NotificationSection,
  Notification,
} from '../Lists/ListNotification';
import { ActivityIndicator } from 'react-native';

const TabNotifiAccount = () => {
  const styles = useStyles();

  // Sample data matching design mockup
  const sections: NotificationSection[] = useMemo(
    () => [
      {
        title: 'HÔM NAY',
        data: [
          {
            id: '1',
            title: 'Cảnh báo đăng nhập lạ',
            description:
              'Một thiết bị mới vừa đăng nhập vào tài khoản của bạn tại TP.HCM.',
            time: '2 ph',
            isRead: false,
            iconName: 'shield-alert',
            iconColor: '#DC2626',
            iconBgColor: '#FEE2E2',
          },
          {
            id: '2',
            title: 'Cập nhật hồ sơ thành công',
            description:
              'Thông tin căn cước công dân của bạn đã được hệ thống xác thực.',
            time: '3 giờ',
            isRead: true,
            iconName: 'account-check',
            iconColor: '#3B82F6',
            iconBgColor: '#DBEAFE',
          },
        ],
      },
      {
        title: 'HÔM QUA',
        data: [
          {
            id: '3',
            title: 'Xác thực hai yếu tố (2FA)',
            description:
              'Tính năng bảo mật 2FA đã được kích hoạt thành công cho tài khoản.',
            time: '18:30',
            isRead: true,
            iconName: 'shield-check',
            iconColor: '#16A34A',
            iconBgColor: '#D1FAE5',
          },
          {
            id: '4',
            title: 'Mật khẩu đã được thay đổi',
            description:
              'Nếu bạn không thực hiện thay đổi này, hãy liên hệ hỗ trợ ngay.',
            time: '10:45',
            isRead: true,
            iconName: 'lock-reset',
            iconColor: '#EA580C',
            iconBgColor: '#FED7AA',
          },
        ],
      },
    ],
    [],
  );

  // Handle delete notification
  const handleDeleteNotification = useCallback((notification: Notification) => {
    console.log('Delete notification:', notification.id);
    // TODO: Implement actual delete logic (API call, state update, etc.)
  }, []);

  // Handle mark as read
  const handleMarkAsReadNotification = useCallback(
    (notification: Notification) => {
      console.log('Mark as read:', notification.id);
      // TODO: Implement actual mark as read logic (API call, state update, etc.)
    },
    [],
  );

  return (
    <View style={styles.container}>
      <ListNotification
        sections={sections}
        onDeleteNotification={handleDeleteNotification}
        onMarkAsReadNotification={handleMarkAsReadNotification}
      />
    </View>
  );
};

export default TabNotifiAccount;

const useStyles = createStyles(
  theme => ({
    container: {
      flex: 1,
      paddingBottom: moderateVerticalScale(50),
      backgroundColor: theme.colors.background,
    },
  }),
  true,
);
