/**
 * CUSTOM HEADER COMPONENT
 * =======================
 * Reusable header component cho app với nhiều variants và features.
 * Optimized cho performance với React.memo, useCallback, useMemo.
 *
 * @features
 * - Multiple types: default, search, minimal, dashboard
 * - Search functionality với animation
 * - Notification badge (Ant Design)
 * - Flexible left/right sections
 * - Dashboard variant with greeting and custom layout
 *
 * @senior-pattern
 * - React.memo để prevent unnecessary re-renders
 * - useCallback cho all event handlers
 * - useMemo cho computed values và inline styles
 * - Stable refs cho animated values
 */

import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Animated,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge } from '@ant-design/react-native';
import { AppIcon, Spacer, SpacerLg } from '@/components';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { SCREEN_PADDING } from '@/shared/constants';
import { layout } from '@/shared/theme/tokens';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import CustomBadge from '../base/CustomBadge';

/**
 * Props interface
 */
export interface CustomHeaderProps {
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
  rightComponent?: React.ReactNode;
  titleIcon?: string;
  backgroundColor?: string;
  textColor?: string;
  type?: 'default' | 'search' | 'minimal' | 'dashboard';
  notificationCount?: number;
  backgroundImage?: ImageSourcePropType;

  // Dashboard specific props
  userName?: string;
  userLocation?: string;
  userAvatar?: string; // URL or local path
  isTransparent?: boolean;
  height?: number;

  // Senior Pattern: Data-driven action instead of JSX
  rightAction?: {
    type: 'text' | 'icon';
    value: string;
    onPress?: () => void;
    color?: string;
  };
}

/**
 * CustomHeader Component
 * Memoized để tránh re-render khi parent re-renders
 */
const CustomHeader: React.FC<CustomHeaderProps> = React.memo(
  ({
    title = 'Trang chủ',
    subtitle,
    showProfile = false,
    showBack = false,
    showSearch = false,
    showNotification = false,
    showMenu = false,
    onBack,
    onSearch,
    onNotificationPress,
    onMenuPress,
    rightComponent,
    backgroundColor,
    textColor,
    type = 'default',
    notificationCount = 0,
    backgroundImage,
    userName = 'Người dùng',
    userLocation = 'Hà Nội',
    userAvatar,
    isTransparent = false,
    titleIcon,
    height,
    ...props
  }) => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const styles = useStyles(theme);

    // State
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    // Stable animation value ref (prevent recreation on every render)
    const searchAnimation = useRef(new Animated.Value(0)).current;

    // Memoized computed values
    const headerBg = useMemo(() => {
      if (isTransparent || backgroundImage) return 'transparent';
      return backgroundColor ?? theme.colors.primary;
    }, [backgroundColor, theme.colors.primary, backgroundImage, isTransparent]);

    const headerTextColor = useMemo(
      () =>
        textColor ??
        (isTransparent || backgroundImage
          ? theme.colors.white
          : theme.colors.white),
      [textColor, theme.colors.white, isTransparent, backgroundImage],
    );

    const barStyle = useMemo(
      () =>
        backgroundImage || type === 'dashboard'
          ? 'light-content'
          : headerBg === theme.colors.white && !isTransparent
          ? 'dark-content'
          : 'light-content',
      [headerBg, theme.colors.white, backgroundImage, type, isTransparent],
    );

    const notificationBadgeText = useMemo(
      () => (notificationCount > 99 ? '99+' : notificationCount),
      [notificationCount],
    );

    // Custom Height Logic
    // If height is provided, use it. Otherwise, use type-specific defaults.
    const containerHeightStyle = useMemo(() => {
      if (height) {
        return {
          height: moderateVerticalScale(height),
          minHeight: undefined, // Reset minHeight for dashboard override if needed
        };
      }
      return {};
    }, [height]);

    // Memoized container style (tránh tạo object mới mỗi render)
    const containerStyle = useMemo(() => {
      const baseStyle: any = [
        styles.container,
        {
          backgroundColor: headerBg,
          paddingTop: insets.top,
          // Only apply border radius if NOT transparent and NOT using background image
          ...(!isTransparent &&
            !backgroundImage &&
            {
              // borderBottomLeftRadius: theme.radius['3xl'],
              // borderBottomRightRadius: theme.radius['3xl'],
            }),
        },
      ];

      // If transparent, ensure it overlays or has no background visual
      if (isTransparent) {
        baseStyle.push({
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        });
      }

      if (type === 'dashboard' && !isTransparent) {
        baseStyle.push({
          ...theme.shadows.md,
          paddingBottom: theme.spacing[4], // Moved padding here
        });
      }

      return baseStyle;
    }, [
      styles.container,
      headerBg,
      insets.top,
      type,
      theme,
      isTransparent,
      backgroundImage,
    ]);

    // Current Date for Dashboard (Native JS)
    const currentDate = useMemo(() => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      };
      try {
        const dateStr = date.toLocaleDateString('vi-VN', options);
        // Capitalize first letter (e.g. "thứ hai" -> "Thứ Hai")
        return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
      } catch (error) {
        return 'Hôm nay'; // Fallback logic
      }
    }, []);

    // Greeting logic (Native JS)
    const greeting = useMemo(() => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Chào buổi sáng,';
      if (hour < 18) return 'Chào buổi chiều,';
      return 'Chào buổi tối,';
    }, []);

    /**
     * Toggle search visibility với animation
     */
    const toggleSearch = useCallback(() => {
      if (searchVisible) {
        Animated.timing(searchAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          setSearchVisible(false);
          setSearchText('');
        });
      } else {
        setSearchVisible(true);
        Animated.timing(searchAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    }, [searchVisible, searchAnimation]);

    /**
     * Handle search text change
     */
    const handleSearch = useCallback(
      (text: string) => {
        setSearchText(text);
        onSearch?.(text);
      },
      [onSearch],
    );

    /**
     * Memoized animated styles cho search container
     */
    const searchAnimatedStyle = useMemo(
      () => ({
        opacity: searchAnimation,
        transform: [
          {
            translateY: searchAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-10, 0],
            }),
          },
        ],
      }),
      [searchAnimation],
    );

    /**
     * Memoized title style
     */
    const titleStyle = useMemo(
      () => [styles.title, { color: headerTextColor }],
      [styles.title, headerTextColor],
    );

    const subtitleStyle = useMemo(
      () => [styles.subtitle, { color: headerTextColor }],
      [styles.subtitle, headerTextColor],
    );

    const minimalTitleStyle = useMemo(
      () => [styles.minimalTitle, { color: headerTextColor }],
      [styles.minimalTitle, headerTextColor],
    );

    /**
     * Render Search Header
     */
    // const renderSearchHeader = useCallback(
    //   () => (
    //     <Animated.View
    //       style={[
    //         styles.searchContainer,
    //         searchAnimatedStyle,
    //         containerHeightStyle,
    //       ]}
    //     >
    //       <View style={styles.searchInputContainer}>
    //         <AppIcon
    //           name="search"
    //           size={20}
    //           color={theme.colors.textSecondary}
    //         />
    //         <TextInput
    //           style={styles.searchInput}
    //           placeholder="Tìm kiếm..."
    //           placeholderTextColor={theme.colors.textTertiary}
    //           value={searchText}
    //           onChangeText={handleSearch}
    //           autoFocus
    //         />
    //         <TouchableOpacity
    //           onPress={toggleSearch}
    //           style={styles.searchCloseButton}
    //         >
    //           <AppIcon name="x" size={20} color={theme.colors.textSecondary} />
    //         </TouchableOpacity>
    //       </View>
    //     </Animated.View>
    //   ),
    //   [
    //     styles.searchContainer,
    //     styles.searchInputContainer,
    //     styles.searchInput,
    //     styles.searchCloseButton,
    //     searchAnimatedStyle,
    //     containerHeightStyle,
    //     theme.colors.textSecondary,
    //     theme.colors.textTertiary,
    //     searchText,
    //     handleSearch,
    //     toggleSearch,
    //   ],
    // );

    /**
     * Render Default Header
     */
    const renderDefaultHeader = useCallback(
      () => (
        <View style={[styles.headerContent, containerHeightStyle]}>
          {/* Phần trái */}
          <View style={styles.leftSection}>
            {showBack ? (
              <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <AppIcon
                  name={'arrow-left'}
                  size={20}
                  color={headerTextColor}
                />
              </TouchableOpacity>
            ) : showMenu ? (
              <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
                <AppIcon name={'menu'} size={24} color={headerTextColor} />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Phần giữa */}
          <View style={styles.centerSection} pointerEvents="box-none">
            <Text style={titleStyle} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text style={subtitleStyle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>

          {/* Phần phải */}
          <View style={styles.rightSection}>
            {showSearch && (
              <TouchableOpacity
                onPress={toggleSearch}
                style={styles.iconButton}
              >
                <AppIcon name={'search'} size={24} color={headerTextColor} />
              </TouchableOpacity>
            )}

            {showNotification && (
              <TouchableOpacity
                onPress={onNotificationPress}
                style={styles.iconButton}
              >
                <CustomBadge badgeCount={notificationCount}>
                  <AppIcon name={'bell'} size={24} color={headerTextColor} />
                </CustomBadge>
              </TouchableOpacity>
            )}

            {rightComponent}
            {/* Render rightAction if exists */}
            {!rightComponent && props.rightAction && (
              <TouchableOpacity
                onPress={props.rightAction.onPress}
                style={styles.iconButton}
              >
                {props.rightAction.type === 'text' ? (
                  <Text
                    style={[
                      styles.actionText,
                      props.rightAction.color && {
                        color: props.rightAction.color,
                      },
                    ]}
                  >
                    {props.rightAction.value}
                  </Text>
                ) : (
                  <AppIcon
                    name={props.rightAction.value}
                    size={24}
                    color={props.rightAction.color || headerTextColor}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      ),
      [
        styles.headerContent,
        styles.leftSection,
        styles.iconButton,
        styles.centerSection,
        styles.rightSection,
        containerHeightStyle,
        showBack,
        showMenu,
        showSearch,
        showNotification,
        onBack,
        onMenuPress,
        toggleSearch,
        onNotificationPress,
        headerTextColor,
        titleStyle,
        title,
        subtitle,
        subtitleStyle,
        notificationCount,
        notificationBadgeText,
        rightComponent,
        theme.colors.error,
        props.rightAction,
      ],
    );

    /**
     * Render Minimal Header
     */
    const renderMinimalHeader = useCallback(
      () => (
        <View style={[styles.minimalContainer, containerHeightStyle]}>
          <View style={styles.minimalLeftSection}>
            {showBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <AppIcon name="arrow-left" size={20} color={headerTextColor} />
              </TouchableOpacity>
            )}
            {titleIcon && (
              <View
                style={{
                  marginRight: scale(8),
                  marginLeft: showBack ? 0 : scale(16),
                }}
              >
                <AppIcon name={titleIcon} size={20} color={headerTextColor} />
              </View>
            )}
            <Text style={[minimalTitleStyle, titleIcon && { marginLeft: 0 }]}>
              {title}
            </Text>
          </View>

          <View style={styles.minimalRightSection}>
            {rightComponent}
            {/* Render rightAction if exists (Minimal) */}
            {!rightComponent && props.rightAction && (
              <TouchableOpacity
                onPress={props.rightAction.onPress}
                style={{ padding: scale(4) }}
              >
                {props.rightAction.type === 'text' ? (
                  <Text
                    style={[
                      styles.actionText,
                      props.rightAction.color && {
                        color: props.rightAction.color,
                      },
                    ]}
                  >
                    {props.rightAction.value}
                  </Text>
                ) : (
                  <AppIcon
                    name={props.rightAction.value}
                    size={24}
                    color={props.rightAction.color || headerTextColor}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      ),
      [
        styles.minimalContainer,
        styles.minimalLeftSection,
        styles.minimalRightSection,
        styles.backButton,
        containerHeightStyle,
        showBack,
        onBack,
        headerTextColor,
        minimalTitleStyle,
        title,
        titleIcon,
        rightComponent,
        props.rightAction,
      ],
    );

    /**
     * Render Dashboard Header
     */
    const renderDashboardHeader = useCallback(
      () => (
        <View style={[styles.dashboardInnerContent, containerHeightStyle]}>
          {/* Top Row */}
          <View style={styles.dashboardTopRow}>
            {/* Brand / Location */}
            <View style={styles.brandContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>CS</Text>
              </View>
              <View style={{ marginLeft: scale(10) }}>
                <Text style={styles.brandName}>{userName}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AppIcon
                    name="map-pin"
                    size={10}
                    color={theme.colors.white}
                  />
                  <Text style={styles.brandLocation}>{userLocation}</Text>
                </View>
              </View>
            </View>

            {/* Right Actions */}
            <View style={styles.dashboardRightActions}>
              <TouchableOpacity
                onPress={onNotificationPress}
                // style={styles.iconButton}
              >
                {/* Ant Badge wraps icon */}
                {/* <CustomBadge badgeCount={10} variant="error">
                  <AppIcon name="bell" size={24} color={theme.colors.white} />
                </CustomBadge> */}
                <AppIcon name="search" size={24} color={theme.colors.white} />
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={onMenuPress}
                style={styles.avatarContainer}
              >
                <View style={styles.defaultAvatar}>
                  <AppIcon name="user" size={20} color={theme.colors.primary} />
                </View>
              </TouchableOpacity> */}
            </View>
          </View>

          {/* Greeting */}
          {/* <View style={styles.greetingContainer}>
            <Text style={styles.dateText}>{currentDate}</Text>
            <Text style={styles.greetingTitle}>
              {greeting}
              {'\n'}
              <Text style={styles.userName}>{userName} 👋</Text>
            </Text>
          </View> */}

          {/* Search */}
          {/* <View style={styles.dashboardSearchContainer}>
            <View style={styles.searchInputContainer}>
              <AppIcon
                name="search"
                size={20}
                color={theme.colors.textSecondary}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm công dân số..."
                placeholderTextColor={theme.colors.textTertiary}
                onChangeText={onSearch}
              />
            </View>
          </View> */}
        </View>
      ),
      [
        styles,
        theme,
        userLocation,
        notificationCount,
        currentDate,
        greeting,
        userName,
        onNotificationPress,
        onMenuPress,
        onSearch,
        containerHeightStyle,
      ],
    );

    // Main render content wrapper
    const renderContent = useCallback(
      () => (
        <View style={containerStyle}>
          <StatusBar
            backgroundColor="transparent"
            barStyle={type === 'dashboard' ? 'light-content' : barStyle}
            translucent={true}
          />

          {/* {searchVisible && renderSearchHeader()} */}

          {/* {!searchVisible && ( */}
          {/* <> */}
          {type === 'minimal' && renderMinimalHeader()}
          {type === 'default' && renderDefaultHeader()}
          {type === 'dashboard' && renderDashboardHeader()}
          {/* </>
          )} */}
        </View>
      ),
      [
        containerStyle,
        type,
        barStyle,
        searchVisible,
        // renderSearchHeader,
        renderMinimalHeader,
        renderDefaultHeader,
        renderDashboardHeader,
      ],
    );

    const backgroundStyle = useMemo<any>(
      () => ({
        width: '100%',
        // borderBottomLeftRadius: theme.radius['3xl'],
        // borderBottomRightRadius: theme.radius['3xl'],
        overflow: 'hidden',
      }),
      [theme.radius],
    );

    // Render with background image if provided
    if (backgroundImage) {
      return (
        <ImageBackground
          source={backgroundImage}
          style={backgroundStyle}
          resizeMode="cover"
        >
          {renderContent()}
        </ImageBackground>
      );
    }

    return renderContent();
  },
);

CustomHeader.displayName = 'CustomHeader';

// Styles
const useStyles = createStyles(theme => ({
  container: {
    // Basic container logic handled in style logic
    paddingHorizontal: theme.spacing[2],
  },
  headerContent: {
    height: moderateVerticalScale(layout.headerHeight),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    width: scale(40),
    justifyContent: 'center',
    zIndex: 1,
  },
  centerSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  title: {
    fontSize: moderateScale(18), // Explicit scale for font size
    fontWeight: theme.typography.fontWeights.semibold,
  },
  subtitle: {
    fontSize: moderateScale(12),
    fontWeight: theme.typography.fontWeights.normal,
    opacity: 0.8,
    marginTop: moderateVerticalScale(4),
  },
  iconButton: {
    padding: moderateScale(8), // General padding
    marginHorizontal: scale(4),
  },
  backButton: {
    padding: moderateScale(8),
    marginHorizontal: scale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Tăng opacity lên 0.3 để đậm hơn
    borderRadius: moderateScale(20), // Circular background
    width: scale(35),
    height: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
  },

  // searchContainer: {
  //   paddingHorizontal: scale(16), // SCREEN_PADDING usually is a constant, assuming it needs scaling or is already scaled
  //   paddingVertical: moderateVerticalScale(8),
  // },
  // searchInputContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: theme.colors.white,
  //   borderRadius: moderateScale(100), // Full radius
  //   paddingHorizontal: scale(16),
  //   height: moderateVerticalScale(40),
  //   elevation: 1,
  //   shadowColor: theme.colors.black || '#000',
  //   shadowOffset: { width: 0, height: moderateVerticalScale(1) },
  //   shadowOpacity: 0.08,
  //   shadowRadius: moderateScale(2),
  // },
  // searchInput: {
  //   flex: 1,
  //   marginLeft: scale(8),
  //   fontSize: moderateScale(14),
  //   color: theme.colors.text,
  // },
  searchCloseButton: {
    padding: moderateScale(4),
  },
  minimalContainer: {
    height: moderateVerticalScale(layout.headerHeight),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  minimalLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  minimalRightSection: {
    paddingRight: scale(16),
  },
  minimalTitle: {
    fontSize: moderateScale(18),
    fontWeight: theme.typography.fontWeights.semibold,
    marginLeft: scale(12),
  },

  // Dashboard Styles
  dashboardInnerContent: {
    paddingHorizontal: scale(12),
    minHeight: '15%',
    // Removed bg, radius, shadow from here
  },
  dashboardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(8),
    marginTop: moderateVerticalScale(8),
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: scale(40),
    height: scale(40), // Circle
    borderRadius: moderateScale(20),
    backgroundColor: theme.colors.white, // Inverted: White bg
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: theme.colors.primary, // Inverted: Primary text
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
  brandName: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: theme.colors.white, // White text
    textTransform: 'uppercase',
  },
  brandLocation: {
    fontSize: moderateScale(10),
    color: theme.colors.white, // White text
    marginLeft: scale(4),
    opacity: 0.9,
  },
  dashboardRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingContainer: {
    marginBottom: moderateVerticalScale(16),
  },
  dateText: {
    fontSize: moderateScale(10),
    color: theme.colors.white, // White text
    opacity: 0.9,
    marginBottom: moderateVerticalScale(4),
  },
  greetingTitle: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: theme.colors.white, // White text
    lineHeight: moderateVerticalScale(32),
  },
  userName: {
    color: theme.colors.white, // White text
  },
  dashboardSearchContainer: {
    // inherit styles
  },
  avatarContainer: {
    marginLeft: scale(12),
  },
  defaultAvatar: {
    width: scale(36),
    height: scale(36),
    borderRadius: moderateScale(18),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: moderateScale(14),
    fontWeight: theme.typography.fontWeights.medium,
    color: theme.colors.white, // Default white
  },
}));

export default CustomHeader;
