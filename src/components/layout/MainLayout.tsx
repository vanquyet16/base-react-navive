import React, {ReactNode, useMemo, useCallback, memo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import CustomHeader from './CustomHeader';
import CustomTabBar from '@/components/navigation/CustomTabBar';
import {COLORS} from '@/constants';

/**
 * MainLayout Component - Tối ưu hiệu suất với memo và callback
 *
 * Các tối ưu:
 * - React.memo với hàm so sánh tùy chỉnh để tránh re-render không cần thiết
 * - useMemo cho các tính toán và style objects
 * - useCallback cho các hàm render
 * - Memoize inline styles để tránh tạo object mới mỗi lần render
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
}

// Hàm so sánh tùy chỉnh cho React.memo
const areEqual = (prevProps: MainLayoutProps, nextProps: MainLayoutProps) => {
  // So sánh các props cơ bản
  if (
    prevProps.showHeader !== nextProps.showHeader ||
    prevProps.showTabs !== nextProps.showTabs ||
    prevProps.backgroundColor !== nextProps.backgroundColor ||
    prevProps.enableScroll !== nextProps.enableScroll
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
    backgroundColor = COLORS.backgroundSecondary,
    enableScroll = true,
  }) => {
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
      () => [styles.container, {backgroundColor}],
      [backgroundColor],
    );

    // Ghi nhớ scrollContent style
    const scrollContentStyle = useMemo(
      () => [styles.scrollContent, {paddingBottom: contentPaddingBottom}],
      [contentPaddingBottom],
    );

    // Ghi nhớ nonScrollContent style
    const nonScrollStyle = useMemo(
      () => ({paddingBottom: contentPaddingBottom}),
      [contentPaddingBottom],
    );

    // Callback cho render nội dung với scroll
    const renderScrollContent = useCallback(
      () => (
        <ScrollView
          contentContainerStyle={scrollContentStyle}
          showsVerticalScrollIndicator={false}>
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

    return (
      <View style={containerStyle}>
        {/* Header */}
        {showHeader && <CustomHeader {...headerProps} />}

        {/* Nội dung */}
        {showHeader ? (
          <View style={styles.content}>{renderContent()}</View>
        ) : (
          <SafeAreaView style={styles.content} edges={['top']}>
            {renderContent()}
          </SafeAreaView>
        )}

        {/* Bottom Tabs */}
        {hasBottomTabs && (
          <CustomTabBar {...(tabsProps as BottomTabBarProps)} />
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
  scrollContent: {
    flexGrow: 1, // Thay đổi từ flex: 1 thành flexGrow: 1 để tương thích với paddingBottom
  },
});

export default MainLayout;
