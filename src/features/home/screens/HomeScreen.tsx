import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { CustomText } from '@/components';
import { createStyles } from '@/shared/theme/create-styles';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

/**
 * HomeScreen - Pure Screen View
 * Trách nhiệm: Chỉ render nội dung UI của Home.
 * Tầng Navigation (MainTabs) phụ trách bọc MainLayout và Header.
 */
const HomeScreen: FC = memo(() => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.welcomeCard}>
        <CustomText variant="h6" weight="bold">
          Xin chào! 👋
        </CustomText>
        <CustomText variant="body" color="secondary" style={styles.subtitle}>
          Chào mừng bạn đến với ứng dụng.
        </CustomText>
      </View>
    </View>
  );
});

HomeScreen.displayName = 'HomeScreen';

export default HomeScreen;

const useStyles = createStyles(
  theme => ({
    container: {
      flex: 1,
      paddingHorizontal: moderateScale(16),
      paddingVertical: moderateVerticalScale(16),
    },
    welcomeCard: {
      backgroundColor: theme.colors.white,
      borderRadius: moderateScale(12),
      padding: moderateScale(16),
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    subtitle: {
      marginTop: moderateVerticalScale(8),
    },
  }),
  true,
);
