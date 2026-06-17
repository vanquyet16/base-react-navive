import { StyleSheet, View } from 'react-native';
import React from 'react';
import { createStyles } from '@/shared/theme/create-styles';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { WingBlank } from '@ant-design/react-native';
import ContentFeedback from '../ContentFeedback';

const TabFeedbackCommunity = () => {
  const styles = useStyles();

  return (
    <WingBlank size="md" style={styles.container}>
      <ContentFeedback visibleFAB={false} />
    </WingBlank>
  );
};

export default TabFeedbackCommunity;

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
