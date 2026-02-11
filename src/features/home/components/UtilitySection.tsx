import React, { memo, useMemo, useCallback } from 'react';
import { View, Dimensions } from 'react-native';
import {
  CustomFlashList,
  InfoBox,
  SectionHeader,
  Spacer,
  SpacerMd,
} from '@/components';
import { createStyles } from '@/shared/theme/create-styles';
import { useTheme } from '@/shared/theme/use-theme';

const UtilitySection = () => {
  const theme = useTheme();
  const styles = useStyles();

  const data = useMemo(
    () => [
      {
        id: '1',
        title: 'Tiền điện',
        icon: 'zap',
        color: '#F97316',
        iconColor: '#FFFF',
      },
      {
        id: '2',
        title: 'Tiền nước',
        icon: 'droplet',
        color: '#06B6D4',
        iconColor: '#FFFF',
      },
      {
        id: '3',
        title: 'Y tế',
        icon: 'plus-square',
        color: '#2DD4BF',
        iconColor: '#FFFF',
      },
      {
        id: '4',
        title: 'Học phí',
        icon: 'book',
        color: '#6366F1',
        iconColor: '#FFFF',
      },
    ],
    [],
  );

  const handlePress = useCallback(() => {}, []);
  // const renderItem = useCallback(
  //   ({ item }: { item: any }) => (
  //     <View style={styles.containerUtilityItem}>
  //       <InfoBox
  //         type="utility"
  //         title={item.title}
  //         icon={item.icon}
  //         iconBackgroundColor={item.color}
  //         iconColor={item.iconColor}
  //         onPress={handlePress}
  //       />
  //     </View>
  //   ),
  //   [styles.containerUtilityItem, handlePress],
  // );

  return (
    <View style={styles.section}>
      <SectionHeader showVerticalBar={true} title="Tiện ích đời sống" />
      {/* <CustomFlashList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        estimatedItemSize={100}
        contentContainerStyle={styles.listContent}
      /> */}
      <Spacer size={4} />

      <View style={styles.listContent}>
        {data.map(item => (
          <View key={item.id} style={styles.containerUtilityItem}>
            <InfoBox
              type="utility"
              title={item.title}
              icon={item.icon}
              iconBackgroundColor={item.color}
              iconColor={item.iconColor}
              onPress={handlePress}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const useStyles = createStyles(theme => {
  // Calculate width for 4 items for Utilities section
  const paddingApp = theme.spacing[4] * 2;
  const itemWidth = (Dimensions.get('window').width - paddingApp) / 4;

  return {
    section: {
      // marginBottom: theme.spacing[4],
    },
    containerUtilityItem: {
      width: itemWidth,
      alignItems: 'center',
      justifyContent: 'center',
    },
    listContent: {
      flex: 1,
      justifyContent: 'space-between',
      // paddingVertical: 10,
      flexDirection: 'row',
    },
  };
}, true);

export default memo(UtilitySection);
