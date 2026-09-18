import React, { memo } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { createStyles } from '@/shared/theme/create-styles';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import { LabelDivider, Spacer } from '@/components/base';

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
