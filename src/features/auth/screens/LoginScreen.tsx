import React, { useCallback, useState, memo } from 'react';
import { FaceIdIcon } from '@/assets/icons';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Button, Icon, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { LoginRequest } from '@/shared/types/navigation.types';
import { SCREEN_PADDING, ERROR_MESSAGES, VALIDATION } from '@/shared/constants';
import FormInput from '@/components/form/FormInput';
import {
  CustomButton,
  LabelDivider,
  LoginOther,
  Logo,
  Spacer,
  SpacerLg,
  SpacerSm,
} from '@/components/base';
import { useLogin } from '../hooks';
import { moderateScale, moderateVerticalScale, useBaseForm } from '@/shared';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import Header from '../components/Header';
import { spacing } from '@/shared/theme/tokens';
import Main from '../components/Main';
import Footer from '../components/Footer';

const LoginScreen = memo(() => {
  const styles = useStyles();

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'ios'
          ? moderateVerticalScale(-20)
          : moderateVerticalScale(20)
      }
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.overscrollBackground} />
        <Header />
        <View style={styles.content}>
          <Main />
          <LabelDivider text="Hoặc đăng nhập bằng" />
          <Footer />
        </View>
      </ScrollView>
      <Spacer size={5} />
    </KeyboardAvoidingView>
  );
});
export default LoginScreen;

/**
 * Styles với theme integration
 */

const useStyles = createStyles(
  theme => ({
    keyboardAvoidingView: {
      flex: 1,
      backgroundColor: theme.colors.background, // #f5f7fa từ theme
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    overscrollBackground: {
      position: 'absolute',
      top: -1000,
      left: 0,
      right: 0,
      height: 1000,
      backgroundColor: theme.colors.primary,
    },
    scrollContent: {
      flexGrow: 1,
    },

    content: {
      flex: 1,
      backgroundColor: theme.colors.white,
      marginTop: moderateScale(-30), // Overlap header
      borderTopLeftRadius: moderateScale(30),
      borderTopRightRadius: moderateScale(30),
      paddingTop: moderateScale(20),
    },
  }),
  true,
);
