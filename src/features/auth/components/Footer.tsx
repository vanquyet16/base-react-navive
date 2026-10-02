import React, { memo } from 'react';
import { View } from '@ant-design/react-native';
import { FaceIdIcon } from '@/assets/icons';
import LoginOther from '@/components/base/LoginOther';
import { SpacerSm } from '@/components/base/Spacer';
import Logo from '@/components/base/Logo';
import { createStyles } from '@/shared/theme/create-styles';

const Footer = memo(() => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <LoginOther
        title="VNeID"
        icon={<Logo name="logoVnid" size={65} />}
        biometricType="face"
        biometricIcon={<FaceIdIcon size={28} color={styles.theme.colors.primary} />}
        onBiometricPress={() => {}}
      />
      <SpacerSm />
    </View>
  );
});

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
);
