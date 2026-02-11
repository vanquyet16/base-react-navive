import { StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { createStyles } from '@/shared/theme/create-styles';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { WingBlank } from '@ant-design/react-native';
import { SectionHeader, SpacerMd } from '@/components';
import ContentFeedback from '../ContentFeedback';
import FeedbackFilterModal from '../FeedbackFilterModal';
import { useTheme } from '@/shared/theme/use-theme';

const TabFeedbackUser = () => {
  const styles = useStyles();
  const [filterVisible, setFilterVisible] = useState(false);
  const theme = useTheme();
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

  return (
    <WingBlank size="md" style={styles.container}>
      <ContentFeedback visibleFAB={true} />
      <FeedbackFilterModal
        visible={filterVisible}
        onClose={handleCloseFilter}
        onApply={handleApplyFilter}
      />
    </WingBlank>
  );
};

export default TabFeedbackUser;

const useStyles = createStyles(theme => {
  return {
    container: {
      flex: 1,
      paddingVertical: theme.spacing[2],
      paddingBottom: moderateVerticalScale(50),
      backgroundColor: theme.colors.background,
    },
  };
}, true);
