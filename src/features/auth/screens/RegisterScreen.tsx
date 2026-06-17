import React, { memo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { useRegister } from '../hooks';
import { SCREEN_PADDING, VALIDATION, ERROR_MESSAGES } from '@/shared/constants';
import FormInput from '@/components/form/FormInput';
import { Logo } from '@/components/base';
import { createStyles } from '@/shared/theme/create-styles';
import { useBaseForm } from '@/shared';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useStyles = createStyles(
  theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      alignItems: 'center',
      paddingTop: 80,
      paddingBottom: 40,
    },
    form: {
      paddingHorizontal: SCREEN_PADDING,
    },
  }),
  true,
);

const RegisterScreen = memo(({ navigation }: any) => {
  const styles = useStyles();
  const registerMutation = useRegister();

  const {
    control,
    handleSubmitWithLoading,
    watch,
    formState: { isValid },
    isSubmitting,
  } = useBaseForm<RegisterFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (data: RegisterFormData) => {
      try {
        await registerMutation.mutateAsync({
          username: data.email, // Use email as username for now
          email: data.email,
          password: data.password,
          passwordConfirmation: data.confirmPassword, // Map confirmPassword to passwordConfirmation
          displayName: data.name, // Map name to displayName
        });
        navigation.navigate('Login');
      } catch (error) {
        // Lỗi sẽ được xử lý tự động bởi useBaseForm
        throw error;
      }
    },
    successMessage: 'Đăng ký tài khoản thành công!',
    errorMessage: 'Đăng ký tài khoản thất bại!',
    resetOnSuccess: true,
  });

  const password = watch('password');

  const navigateToLogin = React.useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WingBlank size="lg">
        <View style={styles.header}>
          <Logo />
        </View>

        <View style={styles.form}>
          <FormInput
            name="name"
            control={control}
            required
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            rules={{
              required: ERROR_MESSAGES.REQUIRED_FIELD,
              minLength: {
                value: 2,
                message: 'Tên phải có ít nhất 2 ký tự',
              },
            }}
          />

          <WhiteSpace size="lg" />

          <FormInput
            name="email"
            control={control}
            required
            label="Email"
            placeholder="Nhập email của bạn"
            rules={{
              required: ERROR_MESSAGES.REQUIRED_FIELD,
              pattern: {
                value: VALIDATION.EMAIL_REGEX,
                message: ERROR_MESSAGES.EMAIL_INVALID,
              },
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <WhiteSpace size="lg" />

          <FormInput
            name="password"
            control={control}
            required
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            rules={{
              required: ERROR_MESSAGES.REQUIRED_FIELD,
              minLength: {
                value: VALIDATION.PASSWORD_MIN_LENGTH,
                message: ERROR_MESSAGES.PASSWORD_TOO_SHORT,
              },
            }}
            secureTextEntry
          />

          <WhiteSpace size="lg" />

          <FormInput
            name="confirmPassword"
            control={control}
            required
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            rules={{
              required: ERROR_MESSAGES.REQUIRED_FIELD,
              validate: value =>
                value === password || 'Mật khẩu xác nhận không khớp',
            }}
            secureTextEntry
          />

          <WhiteSpace size="xl" />

          <Button
            type="primary"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            onPress={handleSubmitWithLoading}
          >
            <Text>Đăng ký</Text>
          </Button>

          <WhiteSpace size="lg" />

          <Button type="ghost" onPress={navigateToLogin}>
            <Text>Đã có tài khoản? Đăng nhập ngay</Text>
          </Button>
        </View>
      </WingBlank>
    </ScrollView>
  );
});

RegisterScreen.displayName = 'RegisterScreen';

export default RegisterScreen;
