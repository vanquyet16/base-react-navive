import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, WhiteSpace, WingBlank} from '@ant-design/react-native';
import {useForm, Controller} from 'react-hook-form';
import {useLogin} from '@/hooks/queries/useAuth';
import {LoginRequest} from '@/types';
import {COLORS, SCREEN_PADDING, ERROR_MESSAGES, VALIDATION} from '@/constants';
import FormInput from '@/components/form/FormInput';
import Logo from '@/components/common/Logo';

const LoginScreen = ({navigation}: any) => {
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<LoginRequest>({
    mode: 'onChange',
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
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
            name="userName"
            rules={{
              required: ERROR_MESSAGES.REQUIRED_FIELD,
              pattern: {
                value: VALIDATION.USER_NAME_REGEX,
                message: ERROR_MESSAGES.USER_NAME_INVALID,
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <FormInput
                label="Tài khoản"
                placeholder="Nhập tài khoản"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.userName?.message}
                keyboardType="default"
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
            render={({field: {onChange, onBlur, value}}) => (
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

          <WhiteSpace size="xl" />

          <Button
            type="primary"
            disabled={!isValid || loginMutation.isPending}
            loading={loginMutation.isPending}
            onPress={handleSubmit(onSubmit)}>
            Đăng nhập
          </Button>

          <WhiteSpace size="lg" />

          <Button type="ghost" onPress={navigateToRegister}>
            Chưa có tài khoản? Đăng ký ngay
          </Button>
        </View>
      </WingBlank>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  form: {
    paddingHorizontal: SCREEN_PADDING,
  },
});

export default LoginScreen;
