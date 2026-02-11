import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import {
  InfoBox,
  SectionHeader,
  SpacerLg,
  CustomFlashList,
} from '@/components';
import { WingBlank } from '@ant-design/react-native';
import { createStyles } from '@/shared/theme/create-styles';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

interface EmergencyContact {
  id: string;
  title: string;
  subTitle: string;
  phoneNumber: string;
  icon: string;
  color: string;
  iconColor: string;
  rightColor: string;
}

const EMERGENCY_DATA: EmergencyContact[] = [
  {
    id: '1',
    title: 'Công an phường',
    subTitle: 'Trình báo & bảo mật',
    phoneNumber: '02033.879.063',
    icon: 'shield',
    color: '#F3F4F6', // Light Gray/Blueish
    iconColor: '#111827', // Dark
    rightColor: '#111827', // Dark Blue/Black
  },
  {
    id: '2',
    title: 'Cứu hỏa & Cứu nạn',
    subTitle: 'Báo cháy khẩn cấp',
    phoneNumber: '114',
    icon: 'fire', // Or truck if available
    color: '#FEF2F2', // Light Red
    iconColor: '#EF4444', // Red
    rightColor: '#F43F5E', // Red/Pink
  },
  {
    id: '3',
    title: 'Cấp cứu y tế',
    subTitle: 'Bệnh viện & Xe cấp cứu',
    phoneNumber: '115',
    icon: 'plus', // Or medical icon
    color: '#ECFDF5', // Light Green
    iconColor: '#10B981', // Green
    rightColor: '#10B981', // Green
  },
  {
    id: '4',
    title: 'Tổng đài Điện lực',
    subTitle: 'Sự cố lưới điện',
    phoneNumber: '1900.1006',
    icon: 'tool',
    color: '#EFF6FF', // Light Blue
    iconColor: '#3B82F6', // Blue
    rightColor: '#3B82F6', // Blue
  },
];

const EmergencyScreen = () => {
  const theme = useTheme();
  const styles = useStyles();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleCall = useCallback((phoneNumber: string) => {
    // Implement call logic here
    console.log('Call:', phoneNumber);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: EmergencyContact }) => (
      <InfoBox
        type="contact"
        title={item.title}
        subTitle={item.subTitle}
        phoneNumber={item.phoneNumber}
        icon={item.icon}
        iconBackgroundColor={item.color}
        iconColor={item.iconColor}
        rightIcon="phone-call"
        rightColor={item.rightColor}
        onRightPress={() => handleCall(item.phoneNumber)}
      />
    ),
    [handleCall],
  );

  const keyExtractor = useCallback((item: EmergencyContact) => item.id, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Refresh');
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <WingBlank size="md" style={styles.container}>
      <SectionHeader
        title="Cuộc gọi khẩn cấp"
        onAction={() => {}}
        actionLabel="Phàn hồi 24/7"
        actionIcon="record"
        actionIconType="material"
        showVerticalBar={true}
        isUppercase={true}
        fontSize={moderateScale(16)}
        color={theme.colors.textSecondary}
        fontBold={'500'}
        rightActionStyle={{
          styleAction: {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.primary,
          },
          styleLableAction: {
            color: theme.colors.primary,
          },
          styleIconAction: {
            color: theme.colors.primary,
          },
        }}
      />
      <SpacerLg />
      <CustomFlashList
        data={EMERGENCY_DATA}
        renderItem={renderItem}
        estimatedItemSize={moderateScale(100)}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </WingBlank>
  );
};

const useStyles = createStyles(theme => {
  return {
    container: {
      flex: 1,
      paddingVertical: theme.spacing[2],
      paddingBottom: moderateVerticalScale(50),
    },
  };
}, true);

export default EmergencyScreen;
