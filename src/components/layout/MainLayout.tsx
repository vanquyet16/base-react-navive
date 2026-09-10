import React, { ReactNode,  useMemo, memo } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, AppHeaderProps } from './AppHeader';
import CustomBottomTabBar from '@/components/navigation/CustomBottomTabBar';
import { createStyles } from '@/shared/theme/create-styles';
import { BOTTOM_TAB_HEIGHT } from '@/shared/constants/ui';

export interface MainLayoutConfig {
  showHeader?: boolean;
  showTabs?: boolean;
  enableScroll?: boolean;
  enableKeyboardAvoiding?: boolean;
  disableSafeArea?: boolean;
}

export interface MainLayoutProps extends Partial<MainLayoutConfig> {
  children: ReactNode;
  config?: MainLayoutConfig;
  headerProps?: AppHeaderProps;
  /** Slot tùy biến cho header: cho phép truyền trực tiếp AppHeader hoặc component bất kỳ */
  headerNode?: ReactNode;
  tabsProps?: Partial<BottomTabBarProps>;
  backgroundColor?: string;
  keyboardVerticalOffset?: number;
}

interface MainLayoutInternalProps {
  children: ReactNode;
  config: Required<MainLayoutConfig>;
  headerProps?: AppHeaderProps;
  headerNode?: ReactNode;
  tabsProps?: Partial<BottomTabBarProps>;
  backgroundColor?: string;
  keyboardVerticalOffset?: number;
}

const useStyles = createStyles(
  theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
  }),
  true,
);

const MainLayoutView: React.FC<MainLayoutInternalProps> = memo(
  ({
    children,
    config,
    headerProps,
    headerNode,
    tabsProps,
    keyboardVerticalOffset,
  }) => {
    const styles = useStyles();

    const {
      showHeader,
      showTabs,
      enableScroll,
      enableKeyboardAvoiding,
      disableSafeArea,
    } = config;

    const hasBottomTabs = useMemo(
      () =>
        Boolean(
          showTabs &&
            tabsProps?.state &&
            tabsProps?.descriptors &&
            tabsProps?.navigation,
        ),
      [
        showTabs,
        tabsProps?.state,
        tabsProps?.descriptors,
        tabsProps?.navigation,
      ],
    );

    // Dùng BOTTOM_TAB_HEIGHT constant thay vì hardcode magic number 80
    const contentPaddingBottom = hasBottomTabs ? BOTTOM_TAB_HEIGHT : 0;

    const scrollContentStyle = useMemo(
      () => [styles.scrollContent, { paddingBottom: contentPaddingBottom }],
      [styles.scrollContent, contentPaddingBottom],
    );

    const nonScrollStyle = useMemo(
      () => ({ flex: 1, paddingBottom: contentPaddingBottom }),
      [contentPaddingBottom],
    );

    const keyboardOffset = useMemo(
      () => keyboardVerticalOffset ?? (Platform.OS === 'ios' ? 0 : 20),
      [keyboardVerticalOffset],
    );

    const layoutContent = enableScroll ? (
      <ScrollView
        contentContainerStyle={scrollContentStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    ) : (
      <View style={nonScrollStyle}>{children}</View>
    );

    const keyboardAvoidingLayout = (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardOffset}
      >
        {layoutContent}
      </KeyboardAvoidingView>
    );

    return (
      <View style={styles.container}>
        {/* Header Slot */}
        {headerNode ? (
          headerNode
        ) : showHeader && headerProps ? (
          <AppHeader {...headerProps} />
        ) : null}

        {/* Nội dung chính */}
        {!showHeader && !headerNode && !disableSafeArea ? (
          <SafeAreaView style={styles.content} edges={['top']}>
            {enableKeyboardAvoiding ? keyboardAvoidingLayout : layoutContent}
          </SafeAreaView>
        ) : (
          <View style={styles.content}>
            {enableKeyboardAvoiding ? keyboardAvoidingLayout : layoutContent}
          </View>
        )}

        {/* Bottom Tabs */}
        {hasBottomTabs && (
          <CustomBottomTabBar {...(tabsProps as BottomTabBarProps)} />
        )}
      </View>
    );
  },
);

MainLayoutView.displayName = 'MainLayoutView';

export const MainLayout: React.FC<MainLayoutProps> = memo(
  ({
    children,
    config,
    headerProps,
    headerNode,
    tabsProps,
    backgroundColor,
    keyboardVerticalOffset,
    ...legacyFlags
  }) => {
    const resolvedConfig: Required<MainLayoutConfig> = {
      showHeader: config?.showHeader ?? legacyFlags.showHeader ?? true,
      showTabs: config?.showTabs ?? legacyFlags.showTabs ?? true,
      enableScroll: config?.enableScroll ?? legacyFlags.enableScroll ?? false,
      enableKeyboardAvoiding:
        config?.enableKeyboardAvoiding ?? legacyFlags.enableKeyboardAvoiding ?? true,
      disableSafeArea:
        config?.disableSafeArea ?? legacyFlags.disableSafeArea ?? false,
    };

    return (
      <MainLayoutView
        config={resolvedConfig}
        headerProps={headerProps}
        headerNode={headerNode}
        tabsProps={tabsProps}
        backgroundColor={backgroundColor}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {children}
      </MainLayoutView>
    );
  },
);

MainLayout.displayName = 'MainLayout';

export default MainLayout;
