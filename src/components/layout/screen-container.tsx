import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { useResponsiveSize } from '@/shared/hooks/useResponsiveSize';

/**
 * ScreenContainer Props
 */
export interface ScreenContainerProps {
  children: React.ReactNode;
  /** Enable scrollable content (default: false) */
  scroll?: boolean;
  /** Additional style */
  style?: ViewStyle;
  /** Safe area edges (default: all) */
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  /** Avoid keyboard (default: true) */
  avoidKeyboard?: boolean;
  /** Background color override */
  backgroundColor?: string;
  /** Padding size in pt (default: 16) */
  padding?: number;
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
  padding = 16,
  style,
  ...rest
}) => {
  const theme = useTheme();
  const rs = useResponsiveSize();
  const styles = useStyles();

  // Container style
  const containerStyle: ViewStyle = {
    ...styles.container,
    backgroundColor: backgroundColor || theme.colors.background,
    padding: rs.padding(padding),
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
const useStyles = createStyles(() => ({
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

export default ScreenContainer;
