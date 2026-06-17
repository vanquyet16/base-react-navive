import React, { memo } from 'react';
import { ImageBackground, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { CustomText, Logo, Spacer, SpacerLg } from '@/components';
import { createStyles } from '@/shared/theme/create-styles';

/**
 * Header Component
 * Hiển thị Logo ở đầu màn hình auth
 */
const Header = memo(() => {
  // ✅ Chỉ cần 1 dòng - auto inject theme
  const styles = useStyles();

  return (
    <ImageBackground
      source={require('@/assets/images/imgbgrheader.jpg')}
      style={styles.header}
      imageStyle={styles.headerImage}
    >
      <View style={styles.logoContainer}>
        <Logo size={80} />
      </View>
      <SpacerLg />
      <View style={styles.textContainer}>
        <CustomText style={styles.textTitle} transform="uppercase" variant="h3">
          Cổng công dân số
        </CustomText>
        <CustomText
          style={styles.textSubTitle}
          transform="uppercase"
          variant="caption"
        >
          Hệ thống định danh điện tử
        </CustomText>
      </View>
    </ImageBackground>
  );
});

export default Header;

// ✅ Thêm flag `true` để auto-inject theme
const useStyles = createStyles(
  theme => ({
    header: {
      alignItems: 'center',

      // Vertical spacing → verticalScale
      paddingTop: verticalScale(60),
      paddingBottom: verticalScale(50),

      backgroundColor: theme.colors.primary,
      // Radius → moderateScale (KHÔNG scale mạnh)
      // borderBottomLeftRadius: moderateScale(50),
      // borderBottomRightRadius: moderateScale(50),
    },
    headerImage: {
      // borderBottomLeftRadius: moderateScale(50),
      // borderBottomRightRadius: moderateScale(50),
    },
    logoContainer: {
      backgroundColor: '#fff',
      padding: moderateScale(10),
      borderRadius: moderateScale(40),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(4),
      elevation: 3,
      borderColor: theme.colors.borderColorLogo,
      borderWidth: 3,
    },
    textContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textTitle: {
      color: theme.colors.textInverse,
    },
    textSubTitle: {
      color: theme.colors.textTertiarySecond,
    },
  }),
  true,
); // 👈 Thêm `true` ở đây
