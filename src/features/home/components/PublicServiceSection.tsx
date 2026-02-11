import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import {
  CustomFlashList,
  InfoBox,
  SectionHeader,
  SpacerMd,
} from '@/components';
import { createStyles } from '@/shared/theme/create-styles';
import { useTheme } from '@/shared/theme/use-theme';
import { memo, useCallback, useMemo } from 'react';

interface PublicServiceSectionProps {
  onSeeAll?: () => void;
}

const PublicServiceSection = ({ onSeeAll }: PublicServiceSectionProps) => {
  const theme = useTheme();
  const styles = useStyles();

  const data = useMemo(
    () => [
      {
        id: '1',
        title: 'Phản ánh\nhiện trường',
        icon: 'megaphone',
        color: '#FFE8D6',
        iconColor: '#FF9F43',
      },
      {
        id: '2',
        title: 'Thủ tục\nhành chính',
        icon: 'clipboard',
        color: '#E8F2FF',
        iconColor: '#2D9CDB',
      },
      {
        id: '3',
        title: 'Ví hồ sơ\nsố',
        icon: 'folder',
        color: '#F3E5F5',
        iconColor: '#9B51E0',
      },
    ],
    [],
  );

  const handlePress = useCallback(() => {}, []);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <View style={styles.containerServiceItem}>
        <InfoBox
          type="vertical"
          title={item.title}
          icon={item.icon}
          iconBackgroundColor={item.color}
          iconColor={item.iconColor}
          onPress={handlePress}
        />
      </View>
    ),
    [styles.containerServiceItem, handlePress],
  );

  return (
    <View style={styles.section}>
      <SectionHeader title="Dịch vụ công" onSeeAll={onSeeAll} />
      {/* <SpacerMd /> */}
      <CustomFlashList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        estimatedItemSize={120}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const useStyles = createStyles(
  theme => ({
    section: {
      // marginBottom: theme.spacing[4],
    },
    containerServiceItem: {
      marginRight: theme.spacing[2],
      width: scale(120),
    },
    listContent: {
      paddingVertical: 10,
      paddingLeft: 3,
      // paddingRight: 20,
    },
  }),
  true,
);

export default memo(PublicServiceSection);
