import {
  CustomButton,
  CustomText,
  FormInput,
  SpacerLg,
  LabelDivider,
  SpacerXl,
  Spacer,
  SpacerSm,
} from '@/components';
import {
  SCREEN_PADDING,
  useBaseForm,
  useLogin,
  ERROR_MESSAGES,
  VALIDATION,
} from '@/shared';
import { LoginRequest } from '@/shared/types/domain/auth';
import { createStyles } from '@/shared/theme/create-styles';
import { WingBlank } from '@ant-design/react-native';
import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useAuthNavigation } from '@/shared/hooks/useNavigation'; // ← Custom hook với autocomplete
import Icon from '@ant-design/react-native/lib/icon';

const Main = () => {
  const [showPassword, setShowPassword] = useState(false);
  const styles = useStyles();
  const loginMutation = useLogin();
  // Navigation với autocomplete - giờ gọn hơn và reusable!
  const navigation = useAuthNavigation();

  const {
    control,
    handleSubmitWithLoading,
    formState: { isValid },
    isSubmitting,
  } = useBaseForm<LoginRequest>({
    mode: 'onChange',
    defaultValues: {
      username: '',
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

  // Khi gõ navigation.navigate('...') sẽ có autocomplete: 'Login' | 'Register'
  const navigateToRegister = useCallback(() => {
    navigation.navigate('Register'); // ← Autocomplete works!
  }, [navigation]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleForgotPassword = useCallback(() => {
    // navigation.navigate('ForgotPassword');
  }, [navigation]);

  return (
    <WingBlank size="lg">
      {/* <View style={styles.form}> */}
      <CustomText style={styles.title} variant="h3">
        Đăng nhập
      </CustomText>
      <CustomText style={styles.description} variant="bodySmall">
        Vui lòng nhập thông tin để đăng nhập
      </CustomText>
      <SpacerLg />
      <FormInput
        name="username"
        control={control}
        required
        label="Số định danh cá nhân (CCCD)"
        placeholder="12 chữ số trên thẻ CCCD"
        rules={{
          required: ERROR_MESSAGES.REQUIRED_FIELD,
          pattern: {
            value: VALIDATION.USER_NAME_REGEX,
            message: ERROR_MESSAGES.USER_NAME_INVALID,
          },
        }}
        keyboardType="default"
        autoCapitalize="none"
        leftIcon={<Icon name="idcard" size={18} color="#9ca3af" />}
      />
      <SpacerSm />
      <FormInput
        name="password"
        control={control}
        label="Mật khẩu"
        required
        placeholder="Nhập mật khẩu"
        rules={{
          required: ERROR_MESSAGES.REQUIRED_FIELD,
          minLength: {
            value: VALIDATION.PASSWORD_MIN_LENGTH,
            message: ERROR_MESSAGES.PASSWORD_TOO_SHORT,
          },
        }}
        leftIcon={<Icon name="lock" size={18} color="#9ca3af" />}
        rightIcon={
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? 'eye' : 'eye-invisible'}
              size={18}
              color="#9ca3af"
            />
          </TouchableOpacity>
        }
        secureTextEntry={!showPassword}
      />
      <Spacer size={4} />
      <CustomButton
        title="Đăng nhập"
        onPress={handleSubmitWithLoading}
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
        hidden={false}
      />
    </WingBlank>
  );
};

export default Main;

const useStyles = createStyles(
  theme => ({
    keyboardAvoidingView: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
    },

    title: {
      fontWeight: 'bold',
    },
    description: {
      color: theme.colors.textSecondary,
    },
    forgotPasswordContainer: {
      alignItems: 'flex-end',
      marginTop: theme.spacing[1], // Gap between form fields
    },
    forgotPasswordText: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
  }),
  true,
);
