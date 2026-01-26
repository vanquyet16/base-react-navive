import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { LoginRequest } from '@/shared/types';
import {
  COLORS,
  SCREEN_PADDING,
  VALIDATION,
  ERROR_MESSAGES,
} from '@/shared/constants';
import FormInput from '@/components/form/FormInput';
import { Logo } from '@/components/base';
import { useLogin } from '../hooks';
import { useBaseForm } from '@/shared';

const LoginScreen = ({ navigation }: any) => {
  const loginMutation = useLogin();

  const {
    control,
    handleSubmitWithLoading,
    formState: { errors, isValid },
    isSubmitting,
  } = useBaseForm<LoginRequest>({
    mode: 'onChange',
    defaultValues: {
      userName: '',
      password: '',
    },
    onSubmit: async (data: LoginRequest) => {
      try {
        await loginMutation.mutateAsync(data);
        // Có thể thêm logic xử lý sau khi đăng nhập thành công ở đây
      } catch (error) {
        // Lỗi sẽ được xử lý bởi useBaseForm
        throw error;
      }
    },
    successMessage: 'Đăng nhập thành công!',
    errorMessage: 'Đăng nhập thất bại!',
    resetOnSuccess: false,
  });

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <WingBlank size="lg">
          <View style={styles.header}>
            <Logo />
          </View>

          <View style={styles.form}>
            <FormInput
              name="userName"
              control={control}
              label="Tài khoản"
              placeholder="Nhập tài khoản"
              rules={{
                required: ERROR_MESSAGES.REQUIRED_FIELD,
                pattern: {
                  value: VALIDATION.USER_NAME_REGEX,
                  message: ERROR_MESSAGES.USER_NAME_INVALID,
                },
              }}
              keyboardType="default"
              autoCapitalize="none"
            />

            <WhiteSpace size="lg" />

            <FormInput
              name="password"
              control={control}
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

            <WhiteSpace size="xl" />

            <Button
              type="primary"
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              onPress={handleSubmitWithLoading}
            >
              Đăng nhập
            </Button>

            <WhiteSpace size="lg" />

            <Button type="ghost" onPress={navigateToRegister}>
              Chưa có tài khoản? Đăng ký ngay
            </Button>
          </View>
        </WingBlank>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
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
