import React, { memo, useMemo, useCallback } from 'react';
import { View } from 'react-native';
import { InfoBox, SectionHeader, SpacerMd } from '@/components';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { moderateVerticalScale } from 'react-native-size-matters';

interface TrackingSectionProps {
  onSeeAll?: () => void;
}

const TrackingSection = ({ onSeeAll }: TrackingSectionProps) => {
  const theme = useTheme();
  const styles = useStyles();

  const data = useMemo(
    () => [
      {
        id: '1',
        title: 'Mất nắp hố ga tại đường Lê Lợi, Quận Hà Đông',
        code: 'PA-2026-001',
        time: '10:30 - 24/05/2024',
        status: 'ĐANG XỬ LÝ',
        statusColor: '#FFF5E5',
        statusTextColor: '#FF9F43',
      },
      {
        id: '2',
        title: 'Góp ý thái độ phục vụ tại phường Yên Nghĩa',
        code: 'GY-2026-042',
        time: '08:15 - 22/05/2024',
        status: 'ĐÃ TRẢ LỜI',
        statusColor: '#E8F5E9',
        statusTextColor: '#27AE60',
      },
    ],
    [],
  );

  const handlePress = useCallback(() => {}, []);

  return (
    <View style={styles.section}>
      <SectionHeader
        showVerticalBar={true}
        title="Theo dõi phản ánh"
        onSeeAll={onSeeAll}
      />
      <SpacerMd />
      <View>
        {data.map((item, index, arr) => (
          <InfoBox
            key={item.id}
            type="status"
            title={item.title}
            subTitle={`Mã: ${item.code}`}
            date={item.time}
            status={item.status}
            statusColor={item.statusColor}
            statusTextColor={item.statusTextColor}
            onPress={handlePress}
            style={{ marginBottom: moderateVerticalScale(10) }}
          />
        ))}
      </View>
    </View>
  );
};

const useStyles = createStyles(
  theme => ({
    section: {
      marginBottom: theme.spacing[5],
    },
  }),
  true,
);

export default memo(TrackingSection);
