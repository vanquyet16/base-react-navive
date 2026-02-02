import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRegister } from '@/features/auth/hooks/queries/useAuth';
import { SCREEN_PADDING, VALIDATION, ERROR_MESSAGES } from '@/shared/constants';
import FormInput from '@/components/form/FormInput';
import { Logo } from '@/components/base';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen = ({ navigation }: any) => {
  const registerMutation = useRegister();
  const theme = useTheme();
  const styles = useStyles();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate({
      username: data.email, // Use email as username for now
      email: data.email,
      password: data.password,
      passwordConfirmation: data.confirmPassword, // Map confirmPassword to passwordConfirmation
      displayName: data.name, // Map name to displayName
    });
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WingBlank size="lg">
        <View style={styles.header}>
          <Logo />
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: ERROR_MESSAGES.REQUIRED_FIELD,
              minLength: {
                value: 2,
                message: 'Tên phải có ít nhất 2 ký tự',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Họ và tên"
                placeholder="Nhập họ và tên"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
              />
            )}
          />

          <WhiteSpace size="lg" />

          <Controller
            control={control}
            name="email"
            rules={{
              required: ERROR_MESSAGES.REQUIRED_FIELD,
              pattern: {
                value: VALIDATION.USER_NAME_REGEX,
                message: ERROR_MESSAGES.EMAIL_INVALID,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Email"
                placeholder="Nhập email của bạn"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <WhiteSpace size="lg" />

          <Controller
            control={control}
            name="password"
            rules={{
              required: ERROR_MESSAGES.REQUIRED_FIELD,
              minLength: {
                value: VALIDATION.PASSWORD_MIN_LENGTH,
                message: ERROR_MESSAGES.PASSWORD_TOO_SHORT,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                secureTextEntry
              />
            )}
          />

          <WhiteSpace size="lg" />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: ERROR_MESSAGES.REQUIRED_FIELD,
              validate: value =>
                value === password || 'Mật khẩu xác nhận không khớp',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Xác nhận mật khẩu"
                placeholder="Nhập lại mật khẩu"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
                secureTextEntry
              />
            )}
          />

          <WhiteSpace size="xl" />

          <Button
            type="primary"
            disabled={!isValid || registerMutation.isPending}
            loading={registerMutation.isPending}
            onPress={handleSubmit(onSubmit)}
          >
            Đăng ký
          </Button>

          <WhiteSpace size="lg" />

          <Button type="ghost" onPress={navigateToLogin}>
            Đã có tài khoản? Đăng nhập ngay
          </Button>
        </View>
      </WingBlank>
    </ScrollView>
  );
};

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

export default RegisterScreen;
