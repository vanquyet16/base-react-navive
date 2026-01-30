import { CustomText, Logo, Spacer, SpacerLg } from '@/components';
import { createStyles } from '@/shared/theme/create-styles';
import { memo } from 'react';
import { ImageBackground, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

/**
 * Header Component
 * Hiển thị Logo ở đầu màn hình auth
 */
const Header = () => {
  // ✅ Chỉ cần 1 dòng - auto inject theme
  const styles = useStyles();

  return (
    <ImageBackground
      source={require('@/assets/images/auth/header.png')}
      style={styles.header}
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
};

export default memo(Header);

// ✅ Thêm flag `true` để auto-inject theme
const useStyles = createStyles(
  theme => ({
    header: {
      alignItems: 'center',

      // Vertical spacing → verticalScale
      paddingTop: verticalScale(50),
      paddingBottom: verticalScale(30),

      backgroundColor: theme.colors.primary,
      // Radius → moderateScale (KHÔNG scale mạnh)
      borderBottomLeftRadius: moderateScale(50),
      borderBottomRightRadius: moderateScale(50),
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
      color: theme.colors.textTertiarySeccon,
    },
  }),
  true,
); // 👈 Thêm `true` ở đây
