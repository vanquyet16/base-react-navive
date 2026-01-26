import { FaceIdIcon } from '@/assets/icons';
import { CustomButton, LoginOther, SpacerSm } from '@/components';
import CustomText from '@/components/base/CustomText';
import Logo from '@/components/base/Logo';
import { createStyles } from '@/shared/theme/create-styles';
import { View } from '@ant-design/react-native';
import React from 'react';

const Footer = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <LoginOther
        title="VNeID"
        icon={<Logo name="logoVnid" size={65} />}
        biometricType="face"
        biometricIcon={<FaceIdIcon size={28} color="#2B4B9B" />}
        onBiometricPress={() => {}}
      />
      <SpacerSm />
      <View style={styles.registerContainer}>
        <CustomText variant="bodySmall" style={styles.registerText}>
          {' Bạn chưa có tài khoản? '}
        </CustomText>
        <CustomButton title="Đăng ký ngay" variant="text" onPress={() => {}} />
      </View>
      <CustomButton
        title="Quên mật khẩu?"
        variant="text"
        size="sm"
        onPress={() => {}}
        textStyle={styles.forgotPasswordText}
      />
    </View>
  );
};

export default Footer;

const useStyles = createStyles(
  theme => ({
    container: {},
    registerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    registerText: {
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    forgotPasswordText: {
      color: theme.colors.primary,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
  }),
  true,
);
