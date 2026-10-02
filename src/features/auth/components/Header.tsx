import React, { memo } from 'react';
import { ImageBackground, View } from 'react-native';
import { CustomText } from '@/components/base/CustomText';
import { Logo } from '@/components/base/Logo';
import { SpacerLg } from '@/components/base/Spacer';
import { createStyles } from '@/shared/theme/create-styles';

/**
 * Header Component
 * Hiển thị Logo ở đầu màn hình auth
 */
const Header = memo(() => {
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

const useStyles = createStyles(
  (theme, rs) => ({
    header: {
      alignItems: 'center',

      // Vertical spacing → verticalScale
      paddingTop: rs.verticalScale(60),
      paddingBottom: rs.verticalScale(50),

      backgroundColor: theme.colors.primary,
      // Radius → moderateScale (KHÔNG scale mạnh)
      // borderBottomLeftRadius: rs.moderateScale(50),
      // borderBottomRightRadius: rs.moderateScale(50),
    },
    headerImage: {
      // borderBottomLeftRadius: rs.moderateScale(50),
      // borderBottomRightRadius: rs.moderateScale(50),
    },
    logoContainer: {
      backgroundColor: theme.colors.white,
      padding: rs.moderateScale(10),
      borderRadius: rs.moderateScale(40),
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: rs.moderateScale(4),
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
);
