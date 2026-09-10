/**
 * APP HEADER COMPONENT (SENIOR ARCHITECTURE)
 * ==========================================
 * Header chuẩn kiến trúc: Slot Pattern + Compound Component.
 * Thay thế triệt để mô hình Boolean Prop Proliferation (25 props cũ).
 *
 * @features
 * - Slot Pattern: Chia 3 vùng tự nhiên (Left, Center, Right) cực kỳ linh hoạt
 * - Safe Area Insets: Tự động căn chỉnh paddingTop theo tai thỏ / Dynamic Island
 * - Tối ưu hiệu năng: Memoized, touch target >= 44pt (Apple HIG & Android Material)
 * - Tương thích ảnh nền, màu nền tùy biến và chế độ trong suốt (transparent)
 *
 * @example
 * // 1. Header cơ bản (Back + Title)
 * <AppHeader title="Chi tiết đơn hàng" leftAction="back" />
 *
 * @example
 * // 2. Header với Custom Action bên phải (Slot)
 * <AppHeader
 *   title="Phản ánh"
 *   leftAction="menu"
 *   rightNode={
 *     <AppHeader.Action
 *       icon="search"
 *       onPress={() => navigation.navigate('SearchScreen')}
 *     />
 *   }
 * />
 */

import React, { memo, useCallback } from 'react';
import {
  View,
  Pressable,
  StatusBar,
  ImageBackground,
  type ImageSourcePropType,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { AppIcon, CustomText, type IconType } from '@/components';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { DrawerParamList } from '@/shared/types/navigation.types';

// ============================================================================
// TYPES
// ============================================================================

export type HeaderLeftAction = 'back' | 'menu' | 'none';

// Navigation type có cả goBack() lẫn openDrawer()
type AppHeaderNavigation = DrawerNavigationProp<DrawerParamList> & {
  canGoBack: () => boolean;
  goBack: () => void;
};

export interface AppHeaderProps {
  /** Tiêu đề chính của màn hình */
  title?: string;
  /** Tiêu đề phụ (hiển thị nhỏ dưới tiêu đề chính) */
  subtitle?: string;
  /** Loại nút bên trái ('back', 'menu', 'none' hoặc custom ReactNode) */
  leftAction?: HeaderLeftAction | React.ReactNode;
  /** Callback tùy chỉnh khi bấm nút trái (nếu không truyền sẽ tự động goBack / openDrawer) */
  onLeftPress?: () => void;
  /** Slot linh hoạt cho vùng bên phải: Có thể đặt bất kỳ Button, Icon, Text nào */
  rightNode?: React.ReactNode;
  /** Màu nền header (mặc định lấy theme.colors.primary) */
  backgroundColor?: string;
  /** Màu chữ và icon (mặc định theme.colors.white) */
  textColor?: string;
  /** Chế độ trong suốt (header không màu nền, không viền) */
  transparent?: boolean;
  /** Ảnh nền header tùy chọn */
  backgroundImage?: ImageSourcePropType;
  /** Kiểu dáng tùy biến cho container */
  style?: ViewStyle;
}

export interface HeaderActionProps {
  /** Tên icon (MaterialCommunityIcons / Feather) */
  icon?: string;
  /** Loại icon */
  iconType?: IconType;
  /** Text hiển thị thay cho icon (ví dụ: "Lưu", "Bỏ qua") */
  label?: string;
  /** Số badge thông báo đỏ */
  badgeCount?: number;
  /** Màu icon / label */
  color?: string;
  /** Callback khi nhấn */
  onPress?: () => void;
  /** Style tùy biến */
  style?: ViewStyle;
  /** Style cho label */
  labelStyle?: TextStyle;
  /** Disable action */
  disabled?: boolean;
}

// ============================================================================
// COMPOUND COMPONENT: AppHeader.Action
// ============================================================================

/**
 * Nút hành động chuẩn trên Header với touch target chuẩn (44x44pt)
 */
const HeaderAction: React.FC<HeaderActionProps> = memo(({
  icon,
  iconType = 'material',
  label,
  badgeCount = 0,
  color,
  onPress,
  style,
  labelStyle,
  disabled = false,
}) => {
  const styles = useActionStyles();
  const actionColor = color || styles.theme.colors.white;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={({ pressed }) => [
        styles.actionButton,
        { opacity: pressed ? 0.7 : disabled ? 0.4 : 1 },
        style,
      ]}
    >
      {icon && (
        <AppIcon
          name={icon}
          size={moderateScale(22)}
          color={actionColor}
          type={iconType}
        />
      )}
      {label && (
        <CustomText
          variant="body"
          weight="bold"
          style={[{ color: actionColor }, labelStyle]}
        >
          {label}
        </CustomText>
      )}
      {badgeCount > 0 && (
        <View style={[styles.badge, { backgroundColor: styles.theme.colors.error }]}>
          <CustomText variant="caption" weight="bold" style={styles.badgeText}>
            {badgeCount > 99 ? '99+' : badgeCount}
          </CustomText>
        </View>
      )}
    </Pressable>
  );
});

HeaderAction.displayName = 'AppHeader.Action';

// ============================================================================
// MAIN COMPONENT: AppHeader
// ============================================================================

export const AppHeaderComponent: React.FC<AppHeaderProps> = memo(({
  title,
  subtitle,
  leftAction = 'back',
  onLeftPress,
  rightNode,
  backgroundColor,
  textColor,
  transparent = false,
  backgroundImage,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useHeaderStyles();
  // Navigation được typed đúng: hỗ trợ cả goBack() và openDrawer()
  const navigation = useNavigation<AppHeaderNavigation>();

  // Xác định màu nền và màu chữ
  const headerBgColor = transparent || backgroundImage
    ? 'transparent'
    : backgroundColor || theme.colors.primary;
  const contentColor = textColor || theme.colors.white;

  // useCallback để tránh tạo closure mới mỗi lần render khi truyền xuống HeaderAction
  const handleLeftPress = useCallback(() => {
    if (onLeftPress) {
      onLeftPress();
      return;
    }
    if (leftAction === 'back') {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } else if (leftAction === 'menu') {
      if (typeof navigation.openDrawer === 'function') {
        navigation.openDrawer();
      }
    }
  }, [onLeftPress, leftAction, navigation]);

  // Render Left Slot
  const renderLeftSlot = useCallback(() => {
    if (React.isValidElement(leftAction)) {
      return leftAction;
    }
    if (leftAction === 'back') {
      return (
        <HeaderAction
          icon="arrow-left"
          iconType="material"
          color={contentColor}
          onPress={handleLeftPress}
        />
      );
    }
    if (leftAction === 'menu') {
      return (
        <HeaderAction
          icon="menu"
          iconType="material"
          color={contentColor}
          onPress={handleLeftPress}
        />
      );
    }
    return null;
  }, [leftAction, contentColor, handleLeftPress]);

  const content = (
    <View style={styles.contentRow}>
      {/* 1. Left Slot */}
      <View style={styles.leftSlot}>{renderLeftSlot()}</View>

      {/* 2. Center Slot */}
      <View style={styles.centerSlot} pointerEvents="box-none">
        {title && (
          <CustomText
            variant="h5"
            weight="bold"
            numberOfLines={1}
            style={[{ color: contentColor }, styles.titleText]}
          >
            {title}
          </CustomText>
        )}
        {subtitle && (
          <CustomText
            variant="caption"
            numberOfLines={1}
            style={[{ color: contentColor }, styles.subtitleText]}
          >
            {subtitle}
          </CustomText>
        )}
      </View>

      {/* 3. Right Slot */}
      <View style={styles.rightSlot}>{rightNode}</View>
    </View>
  );

  const containerStyle: ViewStyle = {
    paddingTop: insets.top,
    backgroundColor: headerBgColor,
  };

  if (backgroundImage) {
    return (
      <ImageBackground
        source={backgroundImage}
        style={[styles.container, containerStyle, style]}
        resizeMode="cover"
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {content}
      </ImageBackground>
    );
  }

  return (
    <View style={[styles.container, containerStyle, style]}>
      <StatusBar
        barStyle={headerBgColor === theme.colors.white ? 'dark-content' : 'light-content'}
        backgroundColor={transparent ? 'transparent' : headerBgColor}
        translucent={transparent}
      />
      {content}
    </View>
  );
});

// Gắn Action component theo Compound Pattern
export function AppHeader(props: AppHeaderProps) {
  return <AppHeaderComponent {...props} />;
}
AppHeader.Action = HeaderAction;

// ============================================================================
// STYLES — Dùng createStyles thay vì StyleSheet.create để truy cập theme tokens
// ============================================================================

const useHeaderStyles = createStyles(_theme => ({
  container: {
    width: '100%',
    zIndex: 10,
  } as ViewStyle,
  contentRow: {
    height: moderateVerticalScale(52),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(12),
  } as ViewStyle,
  leftSlot: {
    minWidth: moderateScale(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  } as ViewStyle,
  centerSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
  } as ViewStyle,
  rightSlot: {
    minWidth: moderateScale(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: moderateScale(8),
  } as ViewStyle,
  titleText: {
    textAlign: 'center',
  } as TextStyle,
  subtitleText: {
    textAlign: 'center',
    marginTop: moderateVerticalScale(2),
    opacity: 0.85,
  } as TextStyle,
}));

const useActionStyles = createStyles(theme => ({
  actionButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  } as ViewStyle,
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  } as ViewStyle,
  badgeText: {
    // Dùng theme.colors.white thay vì hardcode '#ffffff'
    color: theme.colors.white,
    fontSize: moderateScale(10),
    lineHeight: moderateScale(12),
  } as TextStyle,
}));

export default AppHeader;
