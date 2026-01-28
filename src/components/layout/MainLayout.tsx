import React, { ReactNode, useMemo, useCallback, memo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { useTheme } from '@/shared/theme/use-theme';
import CustomHeader from './CustomHeader';
import { CustomBottomTabBar } from '@/components/navigation';
import { COLORS } from '@/shared/constants';

/**
 * MainLayout Component - Tối ưu hiệu suất với memo và callback
 *
 * Các tối ưu:
 * - React.memo với hàm so sánh tùy chỉnh để tránh re-render không cần thiết
 * - useMemo cho các tính toán và style objects
 * - useCallback cho các hàm render
 * - Memoize inline styles để tránh tạo object mới mỗi lần render
 * - KeyboardAvoidingView để tự động đẩy nội dung lên khi bàn phím xuất hiện
 */
interface MainLayoutProps {
  children: ReactNode;
  // Thuộc tính Header
  showHeader?: boolean;
  headerProps?: {
    title?: string;
    subtitle?: string;
    showProfile?: boolean;
    showBack?: boolean;
    showSearch?: boolean;
    showNotification?: boolean;
    showMenu?: boolean;
    onBack?: () => void;
    onSearch?: (text: string) => void;
    onNotificationPress?: () => void;
    onMenuPress?: () => void;
    rightComponent?: ReactNode;
    backgroundColor?: string;
    textColor?: string;
    type?: 'default' | 'search' | 'minimal';
    notificationCount?: number;
  };
  // Thuộc tính Bottom tabs
  showTabs?: boolean;
  tabsProps?: Partial<BottomTabBarProps>;
  // Thuộc tính Layout
  backgroundColor?: string;
  // Thuộc tính Scroll
  enableScroll?: boolean;
  // Thuộc tính Keyboard
  enableKeyboardAvoiding?: boolean;
  keyboardVerticalOffset?: number;
  disableSafeArea?: boolean;
}

// Hàm so sánh tùy chỉnh cho React.memo
const areEqual = (prevProps: MainLayoutProps, nextProps: MainLayoutProps) => {
  // So sánh các props cơ bản
  if (
    prevProps.showHeader !== nextProps.showHeader ||
    prevProps.showTabs !== nextProps.showTabs ||
    prevProps.backgroundColor !== nextProps.backgroundColor ||
    prevProps.enableScroll !== nextProps.enableScroll ||
    prevProps.enableKeyboardAvoiding !== nextProps.enableKeyboardAvoiding ||
    prevProps.keyboardVerticalOffset !== nextProps.keyboardVerticalOffset ||
    prevProps.disableSafeArea !== nextProps.disableSafeArea
  ) {
    return false;
  }

  // So sánh headerProps (so sánh nông)
  if (
    JSON.stringify(prevProps.headerProps) !==
    JSON.stringify(nextProps.headerProps)
  ) {
    return false;
  }

  // So sánh tabsProps state (chỉ so sánh state để tránh re-render không cần thiết)
  if (prevProps.tabsProps?.state !== nextProps.tabsProps?.state) {
    return false;
  }

  // So sánh children (so sánh nông)
  if (prevProps.children !== nextProps.children) {
    return false;
  }

  return true;
};

const MainLayout: React.FC<MainLayoutProps> = memo(
  ({
    children,
    showHeader = true,
    headerProps,
    showTabs = true,
    tabsProps,
    backgroundColor,
    enableScroll = true,
    enableKeyboardAvoiding = true,
    keyboardVerticalOffset,
    disableSafeArea = false,
  }) => {
    // Get theme for fallback backgroundColor
    const theme = useTheme();
    const bgColor = backgroundColor ?? theme.colors.background;

    // Fix: Proper type (remove 'as any')
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    /**
     * Open drawer nếu navigation hỗ trợ drawer
     * Defensive programming: Check xem navigation có openDrawer method hay không
     */
    const openDrawer = useCallback(() => {
      // Type guard: Check nếu navigation có openDrawer method
      if (
        'openDrawer' in navigation &&
        typeof navigation.openDrawer === 'function'
      ) {
        navigation.openDrawer();
      } else {
        // Fallback: Log warning hoặc handle alternative action
        console.warn(
          'Drawer navigation not available. Consider adding Drawer Navigator.',
        );
        // TODO: Có thể navigate đến settings screen hoặc show modal menu
      }
    }, [navigation]);

    // Ghi nhớ tính toán hasBottomTabs
    const hasBottomTabs = useMemo(
      () =>
        showTabs &&
        tabsProps?.state &&
        tabsProps?.descriptors &&
        tabsProps?.navigation,
      [
        showTabs,
        tabsProps?.state,
        tabsProps?.descriptors,
        tabsProps?.navigation,
      ],
    );

    // Ghi nhớ tính toán padding
    const contentPaddingBottom = useMemo(
      () => (hasBottomTabs ? 80 : 0),
      [hasBottomTabs],
    );

    // Ghi nhớ style cho container
    const containerStyle = useMemo(
      () => [styles.container, { backgroundColor: bgColor }],
      [bgColor],
    );

    // Ghi nhớ scrollContent style
    const scrollContentStyle = useMemo(
      () => [styles.scrollContent, { paddingBottom: contentPaddingBottom }],
      [contentPaddingBottom],
    );

    // Ghi nhớ nonScrollContent style
    const nonScrollStyle = useMemo(
      () => ({ flex: 1, paddingBottom: contentPaddingBottom }),
      [contentPaddingBottom],
    );

    // Ghi nhớ keyboardVerticalOffset
    const keyboardOffset = useMemo(
      () => keyboardVerticalOffset ?? (Platform.OS === 'ios' ? 0 : 20),
      [keyboardVerticalOffset],
    );

    // Callback cho render nội dung với scroll
    const renderScrollContent = useCallback(
      () => (
        <ScrollView
          contentContainerStyle={scrollContentStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ),
      [scrollContentStyle, children],
    );

    // Callback cho render nội dung không có scroll
    const renderNonScrollContent = useCallback(
      () => <View style={nonScrollStyle}>{children}</View>,
      [nonScrollStyle, children],
    );

    // Callback cho render nội dung
    const renderContent = useCallback(
      () => (enableScroll ? renderScrollContent() : renderNonScrollContent()),
      [enableScroll, renderScrollContent, renderNonScrollContent],
    );

    // Callback cho render layout với keyboard avoiding
    const renderWithKeyboardAvoiding = useCallback(
      () => (
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={keyboardOffset}
        >
          {renderContent()}
        </KeyboardAvoidingView>
      ),
      [keyboardOffset, renderContent],
    );

    // Callback cho render layout thông thường
    const renderNormalLayout = useCallback(
      () => renderContent(),
      [renderContent],
    );

    return (
      <View style={containerStyle}>
        {/* Header */}
        {showHeader && (
          <CustomHeader
            {...headerProps}
            showMenu={headerProps?.showMenu ?? true}
            onMenuPress={openDrawer}
            onBack={headerProps?.onBack ?? navigation.goBack}
          />
        )}

        {/* Nội dung */}
        {!showHeader && !disableSafeArea ? (
          <SafeAreaView style={styles.content} edges={['top']}>
            {enableKeyboardAvoiding
              ? renderWithKeyboardAvoiding()
              : renderNormalLayout()}
          </SafeAreaView>
        ) : (
          <View style={styles.content}>
            {enableKeyboardAvoiding
              ? renderWithKeyboardAvoiding()
              : renderNormalLayout()}
          </View>
        )}

        {/* Bottom Tabs */}
        {hasBottomTabs && (
          <CustomBottomTabBar {...(tabsProps as BottomTabBarProps)} />
        )}
      </View>
    );
  },
  areEqual,
);

// Đặt tên cho component để debug dễ dàng hơn
MainLayout.displayName = 'MainLayout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1, // Thay đổi từ flex: 1 thành flexGrow: 1 để tương thích với paddingBottom
  },
});

export default MainLayout;
