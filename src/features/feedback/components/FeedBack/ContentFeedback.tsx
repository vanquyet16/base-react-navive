import {
  AppIcon,
  CustomFlashList,
  CustomInput,
  FloatingActionButton,
  SectionHeader,
  FormInput,
  SpacerMd,
  InfoBox,
} from '@/components';
import { useTheme } from '@/shared/store/selectors';
import { createStyles } from '@/shared/theme/create-styles';
import React, { useCallback, useRef, memo, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useScrollFabAnimation } from '@/shared/hooks/useScrollFabAnimation';
import { useMainNavigation } from '@/shared/hooks/useNavigation';
import CustomSearchFilter from '@/components/base/CustomSearchFilter';
import FeedbackFilterModal from './FeedbackFilterModal';

interface ContentFeedbackProps {
  visibleFAB?: boolean;
}

const FEEDBACK_DATA = [
  {
    id: '1',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    title: 'Mất nắp hố ga tại đường Lê Lợi, Quận Hà Đông',
    location: 'Quận Hà Đông, Hà Nội',
    code: 'PA-2026-001',
    time: '10:30 - 24/05/2024',
    status: 'ĐANG XỬ LÝ',
    statusColor: '#FFF5E5',
    statusTextColor: '#FF9F43',
  },
  {
    id: '2',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    title: 'Góp ý thái độ phục vụ tại phường Yên Nghĩa',
    location: 'Phường Yên Nghĩa',
    code: 'GY-2026-042',
    time: '08:15 - 22/05/2024',
    status: 'ĐÃ TRẢ LỜI',
    statusColor: '#E8F5E9',
    statusTextColor: '#27AE60',
  },
  {
    id: '3',
    image: 'https://randomuser.me/api/portraits/men/85.jpg',
    title: 'Rác thải ùn ứ gây ô nhiễm tại KDC Kiến Hưng',
    location: 'Quận Hà Đông',
    code: 'PA-2026-105',
    time: '14:20 - 21/05/2024',
    status: 'MỚI TIẾP NHẬN',
    statusColor: '#E3F2FD',
    statusTextColor: '#2196F3',
  },
  {
    id: '4',
    image: 'https://randomuser.me/api/portraits/men/85.jpg',
    title: 'Rác thải ùn ứ gây ô nhiễm tại KDC Kiến Hưng',
    location: 'Quận Hà Đông',
    code: 'PA-2026-105',
    time: '14:20 - 21/05/2024',
    status: 'MỚI TIẾP NHẬN',
    statusColor: '#E3F2FD',
    statusTextColor: '#2196F3',
  },
  {
    id: '5',
    image: 'https://randomuser.me/api/portraits/men/85.jpg',
    title: 'Rác thải ùn ứ gây ô nhiễm tại KDC Kiến Hưng',
    location: 'Quận Hà Đông',
    code: 'PA-2026-105',
    time: '14:20 - 21/05/2024',
    status: 'MỚI TIẾP NHẬN',
    statusColor: '#E3F2FD',
    statusTextColor: '#2196F3',
  },
];

const ContentFeedback = memo((props: ContentFeedbackProps) => {
  const { visibleFAB = false } = props;
  const theme = useTheme();
  const styles = useStyles();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useMainNavigation();
  const [filterVisible, setFilterVisible] = useState(false);
  // Hook for Scroll Animation
  const { translateY, onScroll } = useScrollFabAnimation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleCreateFeedback = useCallback(() => {
    navigation.navigate('CreateFeedbackScreen');
  }, [navigation]);

  const handleDetailFeedback = useCallback(() => {
    navigation.navigate('DetailFeedBackScreen');
  }, [navigation]);

  const handleOpenFilter = useCallback(() => {
    setFilterVisible(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setFilterVisible(false);
  }, []);

  const handleApplyFilter = useCallback((filter: any) => {
    console.log('Applied filter:', filter);
    // TODO: Pass filter to ContentFeedback or Store
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: (typeof FEEDBACK_DATA)[0] }) => {
      return (
        <InfoBox
          type="status"
          image={item.image}
          title={item.title}
          location={item.location}
          subTitle={`Mã: ${item.code}`}
          date={item.time}
          status={item.status}
          statusColor={item.statusColor}
          statusTextColor={item.statusTextColor}
          onPress={handleDetailFeedback}
          style={{ marginBottom: moderateScale(10) }}
        />
      );
    },
    [handleDetailFeedback], // Fixed: added missing dependency
  );

  const keyExtractor = useCallback((item: { id: string }) => item.id, []);

  return (
    <View style={styles.container}>
      <CustomSearchFilter onFilter={handleOpenFilter} />
      <SpacerMd />
      <CustomFlashList
        data={FEEDBACK_DATA}
        renderItem={renderItem}
        estimatedItemSize={moderateScale(120)}
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: moderateScale(2),
        }}
      />

      {/* Animated FAB Wrapper */}
      <Animated.View
        pointerEvents="box-none"
        style={[
          StyleSheet.absoluteFillObject,
          { zIndex: 999, transform: [{ translateY }] },
        ]}
      >
        <FloatingActionButton
          onPress={handleCreateFeedback}
          iconName="plus"
          visible={visibleFAB}
        />
      </Animated.View>
      <FeedbackFilterModal
        visible={filterVisible}
        onClose={handleCloseFilter}
        onApply={handleApplyFilter}
      />
    </View>
  );
});

export default ContentFeedback;

const useStyles = createStyles(theme => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    inputSearch: {
      borderRadius: 50,
    },
  };
}, true);
