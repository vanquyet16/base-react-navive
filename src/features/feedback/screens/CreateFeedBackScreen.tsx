import {
  CustomButton,
  FormDropdown,
  FormInput,
  MediaUploadButton,
  SectionHeader,
} from '@/components';
import { FormDatePicker } from '@/components/form';
import { createStyles } from '@/shared/theme/create-styles';
import { useTheme } from '@/shared/theme/use-theme';
import { View, WingBlank } from '@ant-design/react-native';
import React, { memo, useCallback } from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { FromCreateFeedBack } from '../components/CreateFeedBack/FromCreateFeedBack';

const CreateFedBackScreen = memo(() => {
  const styles = useStyles();
  const theme = useTheme();

  const handlePhotoPress = useCallback(() => {}, []);
  const handleVideoPress = useCallback(() => {}, []);
  const handleFilePress = useCallback(() => {}, []);

  return (
    <WingBlank size="md" style={styles.container}>
      <View style={styles.mediaContainer}>
        <SectionHeader
          showVerticalBar={false}
          title="Hình ảnh và video hiện trường"
          fontSize={moderateScale(14)}
          color={theme.colors.textSecondary}
        />
        <MediaUploadButton
          type="group"
          onPhotoPress={handlePhotoPress}
          onVideoPress={handleVideoPress}
          onFilePress={handleFilePress}
        />
        <FromCreateFeedBack />
      </View>
    </WingBlank>
  );
});

export default CreateFedBackScreen;

const useStyles = createStyles(theme => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingVertical: moderateVerticalScale(10),
    },
    mediaContainer: {
      gap: moderateScale(12),
    },
    mediaRow: {
      justifyContent: 'center',
      flexDirection: 'row',
      gap: scale(12),
    },
  };
}, true);
