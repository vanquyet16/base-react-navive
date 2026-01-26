/**
 * SCREEN CONTAINER COMPONENT
 * ==========================
 * Consistent screen wrapper với safe area và theming.
 * Base container cho tất cả screens.
 *
 */

import React from 'react';
import {
  View,
  ScrollView,
  type ViewProps,
  type ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

/**
 * ScreenContainer Props
 */
export interface ScreenContainerProps extends ViewProps {
  /** Children content */
  children: React.ReactNode;
  /** Enable scroll (default: false) */
  scroll?: boolean;
  /** Safe area edges (default: all) */
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  /** Avoid keyboard (default: true) */
  avoidKeyboard?: boolean;
  /** Background color override */
  backgroundColor?: string;
  /** Padding size (spacing scale) */
  padding?: keyof typeof import('@/shared/theme/tokens').spacing;
}

/**
 * ScreenContainer Component
 */
export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scroll = false,
  edges = ['top', 'bottom', 'left', 'right'],
  avoidKeyboard = true,
  backgroundColor,
  padding = 4,
  style,
  ...rest
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  // Container style
  const containerStyle: ViewStyle = {
    ...styles.container,
    backgroundColor: backgroundColor || theme.colors.background,
    padding: theme.spacing[padding],
  };

  // Content component
  const ContentComponent = scroll ? ScrollView : View;

  // Keyboard avoiding view wrapper
  const KeyboardWrapper = avoidKeyboard ? KeyboardAvoidingView : View;

  return (
    <SafeAreaView
      style={[styles.safeArea, containerStyle, style]}
      edges={edges}
      {...rest}
    >
      <KeyboardWrapper
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ContentComponent
          style={styles.content}
          contentContainerStyle={scroll ? styles.scrollContent : undefined}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ContentComponent>
      </KeyboardWrapper>
    </SafeAreaView>
  );
};

/**
 * Styles
 */
const useStyles = createStyles(theme => ({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  flex: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },
}));
