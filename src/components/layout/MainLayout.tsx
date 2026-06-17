import React, { ReactNode, useMemo, useCallback, memo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageSourcePropType,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { useTheme } from '@/shared/theme/use-theme';
import CustomHeader, { CustomHeaderProps } from './CustomHeader';
import { CustomBottomTabBar } from '@/components/navigation';
import { moderateVerticalScale } from 'react-native-size-matters';
import { createStyles } from '@/shared/theme/create-styles';

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
  headerProps?: CustomHeaderProps;
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
  backgroundImage?: ImageSourcePropType;
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

// Define useStyles before using it in component
const useStyles = createStyles(
  theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      // paddingBottom: moderateVerticalScale(10),
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
  }),
  true,
);

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
    const styles = useStyles();
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
    const contentPaddingBottom = hasBottomTabs ? 80 : 0;

    // Ghi nhớ style cho container
    const containerStyle = useMemo(() => [styles.container], [styles.container]);

    // Ghi nhớ scrollContent style
    const scrollContentStyle = useMemo(
      () => [styles.scrollContent, { paddingBottom: contentPaddingBottom }],
      [styles.scrollContent, contentPaddingBottom],
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

    // Tính toán nội dung layout dựa trên enableScroll
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

    // Tính toán layout với keyboard avoiding
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
      // <ImageBackground
      //   style={containerStyle}
      //   source={require('@/assets/images/bgrdemo2.png')}
      // >
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

      // </ImageBackground>
    );
  },
  areEqual,
);

// Đặt tên cho component để debug dễ dàng hơn
MainLayout.displayName = 'MainLayout';

export default MainLayout;
