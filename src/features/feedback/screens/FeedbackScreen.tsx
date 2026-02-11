import {
  CustomTabNavigator,
  FloatingActionButton,
  SectionHeader,
  Spacer,
  SpacerMd,
  SpacerSm,
  SpacerXl,
} from '@/components';
import { createStyles } from '@/shared/theme/create-styles';
import ContentFeedback from '../components/FeedBack/ContentFeedback';
import { FeedbackFilterModal } from '../components/FeedBack/FeedbackFilterModal';
import React, { useState, useCallback } from 'react';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { useTheme } from '@/shared/theme/use-theme';
import TabFeedbackUser from '../components/FeedBack/Tabs/TabFeedbackUser'; // Corrected import
import TabFeedbackCommunity from '../components/FeedBack/Tabs/TabFeedbackCommunity';
import { View } from 'react-native';

const FeedbackScreen = () => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <CustomTabNavigator
        tabType="solid"
        screens={[
          {
            name: 'TabFeedbackCommunity',
            component: TabFeedbackCommunity,
            label: 'Cộng đồng',
          },
          {
            name: 'TabFeedbackUser',
            component: TabFeedbackUser,
            label: 'Cá nhân',
          },
        ]}
      />
    </View>
  );
};

export default FeedbackScreen;

const useStyles = createStyles(theme => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  };
}, true);
