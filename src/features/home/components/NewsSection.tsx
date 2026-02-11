import React, { memo, useMemo, useCallback } from 'react';
import { View } from 'react-native';
import { InfoBox, SectionHeader, SpacerMd } from '@/components';
import { createStyles } from '@/shared/theme/create-styles';
import { useTheme } from '@/shared/theme/use-theme';
import { moderateVerticalScale } from 'react-native-size-matters';
import NewsBox from '@/components/base/NewsBox';
import { IcBND } from '@/assets/icons';

interface NewsSectionProps {
  onSeeAll?: () => void;
}

const NewsSection = ({ onSeeAll }: NewsSectionProps) => {
  const theme = useTheme();
  const styles = useStyles();

  const data = useMemo(
    () => [
      {
        id: '1',
        title:
          'Khánh thành Trung tâm IOC thành phố: Bước tiến mới trong chuyển đổi số',
        image:
          'https://baochinhphu.vn/Uploaded/tranthithom/2022_09_25/20220925081912959.jpg',
        date: '2 giờ trước',
        tag: 'Sự kiện',
      },
      {
        id: '2',
        title:
          'Hội nghị tuyên truyền Luật An toàn giao thông cho học sinh sinh viên',
        image:
          'https://image.bnews.vn/MediaUpload/Org/2023/09/21/tuyen-truyen-atgt-1.jpg',
        date: '2 giờ trước',
        tag: 'Pháp luật',
      },
    ],
    [],
  );

  const handlePress = useCallback(() => {}, []);

  return (
    <View style={styles.section}>
      <SectionHeader
        showVerticalBar={false}
        title="Bản tin báo nhân dân"
        onSeeAll={onSeeAll}
      />
      <SpacerMd />
      <View>
        <NewsBox
          data={data}
          onPressItem={handlePress}
          headerTitle="ĐẠI HỘI ĐẢNG TOÀN QUỐC LẦN THỨ XIV"
          brand={<IcBND />}
          variant="party"
        />
      </View>
    </View>
  );
};

const useStyles = createStyles(
  theme => ({
    section: {
      // Last section, bottom margin might be handled by ScrollView contentContainerStyle
    },
  }),
  true,
);

export default memo(NewsSection);
