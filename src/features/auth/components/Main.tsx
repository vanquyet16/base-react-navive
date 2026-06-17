import React, { useState, useCallback, memo } from 'react';
import { Pressable, View } from 'react-native';
import { WingBlank } from '@ant-design/react-native';
import {
  CustomButton,
  CustomText,
  FormInput,
  SpacerLg,
  LabelDivider,
  SpacerXl,
  Spacer,
  SpacerSm,
  SpacerMd,
} from '@/components';
import {
  SCREEN_PADDING,
  useBaseForm,
  ERROR_MESSAGES,
  VALIDATION,
} from '@/shared';
import { useLogin } from '../hooks';
import { LoginRequest } from '@/shared/types/domain/auth';
import { createStyles } from '@/shared/theme/create-styles';
import { useAuthNavigation } from '@/shared/hooks/useNavigation'; // ← Custom hook với autocomplete
import { AppIcon } from '@/components';
import { useSessionActions } from '@/shared/store/selectors';

const Main = memo(() => {
  const [showPassword, setShowPassword] = useState(false);
  const styles = useStyles();
  const loginMutation = useLogin();
  // Navigation với autocomplete - giờ gọn hơn và reusable!
  const navigation = useAuthNavigation();
  const { setSession } = useSessionActions();

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
        // setSession({
        //   isAuthenticated: true,
        //   user: null,
        // });
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
  }, []);

  return (
    <WingBlank size="lg" style={styles.container}>
      {/* <View style={styles.form}> */}
      <CustomText style={styles.title} variant="h3">
        Đăng nhập
      </CustomText>
      <CustomText style={styles.description} variant="bodySmall">
        Vui lòng nhập thông tin để đăng nhập
      </CustomText>
      <SpacerMd />
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
        leftIcon={<AppIcon name="credit-card" size={18} color="#9ca3af" />}
      />
      <SpacerSm />

      {/* Custom Label Row for Password */}
      <View style={styles.passwordLabelContainer}>
        <CustomText variant="caption" style={styles.label}>
          MẬT KHẨU
        </CustomText>
        <Pressable 
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          onPress={handleForgotPassword}
        >
          <CustomText variant="caption" style={styles.forgotPasswordText}>
            Quên mật khẩu
          </CustomText>
        </Pressable>
      </View>

      <FormInput
        name="password"
        control={control}
        // LABEL handled externally
        required
        placeholder="Nhập mật khẩu của bạn"
        rules={{
          required: ERROR_MESSAGES.REQUIRED_FIELD,
          minLength: {
            value: VALIDATION.PASSWORD_MIN_LENGTH,
            message: ERROR_MESSAGES.PASSWORD_TOO_SHORT,
          },
        }}
        leftIcon={<AppIcon name="lock" size={18} color="#9ca3af" />}
        rightIcon={
          <Pressable 
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            onPress={togglePasswordVisibility}
          >
            <AppIcon
              name={showPassword ? 'eye' : 'eye-off'}
              size={18}
              color="#9ca3af"
            />
          </Pressable>
        }
        secureTextEntry={!showPassword}
      />
      <Spacer size={3} />
      <CustomButton
        title="ĐĂNG NHẬP"
        onPress={handleSubmitWithLoading}
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
        hidden={false}
      />
      <Spacer size={3} />
      <View style={styles.registerContainer}>
        <CustomText variant="bodySmall" style={styles.registerText}>
          {' Bạn chưa có tài khoản? '}
        </CustomText>
        <CustomButton title="Đăng ký ngay" variant="text" onPress={() => {}} />
      </View>
    </WingBlank>
  );
});

export default Main;

const useStyles = createStyles(
  theme => ({
    rdAvoidingView: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      backgroundColor: theme.colors.white,
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
      marginTop: theme.spacing[1],
    },
    forgotPasswordText: {
      color: theme.colors.primary, // Orange/Primary
      fontWeight: 'bold',
    },
    passwordLabelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing[2],
      paddingHorizontal: theme.spacing[1],
    },
    label: {
      fontSize: theme.typography.fontSizes.xs,
      fontWeight: theme.typography.fontWeights.bold,
      color: theme.colors.textSecondary,
    },
    registerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    registerText: {
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  }),
  true,
);
