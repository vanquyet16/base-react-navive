/**
 * CUSTOM HEADER COMPONENT
 * =======================
 * Reusable header component cho app với nhiều variants và features.
 * Optimized cho performance với React.memo, useCallback, useMemo.
 *
 * @features
 * - Multiple types: default, search, minimal
 * - Search functionality với animation
 * - Notification badge
 * - Flexible left/right sections
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
  SafeAreaView,
  ImageSourcePropType,
} from 'react-native';
import Icon from '@ant-design/react-native/lib/icon';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { SCREEN_PADDING } from '@/shared/constants';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

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
  backgroundColor?: string;
  backgroundImage?: ImageSourcePropType;
  textColor?: string;
  type?: 'default' | 'search' | 'minimal';
  notificationCount?: number;
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
  }) => {
    const theme = useTheme();
    const styles = useStyles(theme);

    // State
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    // Stable animation value ref (prevent recreation on every render)
    const searchAnimation = useRef(new Animated.Value(0)).current;

    // Memoized computed values
    const headerBg = useMemo(
      () => backgroundColor ?? theme.colors.primary,
      [backgroundColor, theme.colors.primary],
    );

    const headerTextColor = useMemo(
      () => textColor ?? theme.colors.white,
      [textColor, theme.colors.white],
    );

    const barStyle = useMemo(
      () =>
        headerBg === theme.colors.white ? 'dark-content' : 'light-content',
      [headerBg, theme.colors.white],
    );

    const notificationBadgeText = useMemo(
      () => (notificationCount > 99 ? '99+' : notificationCount.toString()),
      [notificationCount],
    );

    // Memoized container style (tránh tạo object mới mỗi render)
    const containerStyle = useMemo(
      () => [styles.container, { backgroundColor: headerBg }],
      [styles.container, headerBg],
    );

    /**
     * Toggle search visibility với animation
     * useCallback đảm bảo function reference stable
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
     * useCallback với dependencies chính xác
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
     * Extracted và memoized
     */
    const renderSearchHeader = useCallback(
      () => (
        <Animated.View style={[styles.searchContainer, searchAnimatedStyle]}>
          <View style={styles.searchInputContainer}>
            <Icon
              name={'search'}
              size={20}
              color={theme.colors.textSecondary}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm..."
              placeholderTextColor={theme.colors.textTertiary}
              value={searchText}
              onChangeText={handleSearch}
              autoFocus
            />
            <TouchableOpacity
              onPress={toggleSearch}
              style={styles.searchCloseButton}
            >
              <Icon
                name={'close'}
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      ),
      [
        styles.searchContainer,
        styles.searchInputContainer,
        styles.searchInput,
        styles.searchCloseButton,
        searchAnimatedStyle,
        theme.colors.textSecondary,
        theme.colors.textTertiary,
        searchText,
        handleSearch,
        toggleSearch,
      ],
    );

    /**
     * Render Default Header
     * Extracted và memoized (chỉ re-render khi dependencies thay đổi)
     */
    const renderDefaultHeader = useCallback(
      () => (
        <View style={styles.headerContent}>
          {/* Phần trái */}
          <View style={styles.leftSection}>
            {showBack ? (
              <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Icon name={'arrow-left'} size={20} color={headerTextColor} />
              </TouchableOpacity>
            ) : showMenu ? (
              <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
                <Icon name={'menu'} size={24} color={headerTextColor} />
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
                <Icon name={'search'} size={24} color={headerTextColor} />
              </TouchableOpacity>
            )}

            {showNotification && (
              <TouchableOpacity
                onPress={onNotificationPress}
                style={styles.iconButton}
              >
                <Icon name={'bell'} size={24} color={headerTextColor} />
                {notificationCount > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>
                      {notificationBadgeText}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )}

            {rightComponent}
          </View>
        </View>
      ),
      [
        styles.headerContent,
        styles.leftSection,
        styles.iconButton,
        styles.centerSection,
        styles.rightSection,
        styles.notificationBadge,
        styles.notificationText,
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
      ],
    );

    /**
     * Render Minimal Header
     * Extracted và memoized
     */
    const renderMinimalHeader = useCallback(
      () => (
        <View style={styles.minimalContainer}>
          {showBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Icon name={'arrow-left'} size={20} color={headerTextColor} />
            </TouchableOpacity>
          )}
          <Text style={minimalTitleStyle}>{title}</Text>
        </View>
      ),
      [
        styles.minimalContainer,
        styles.iconButton,
        showBack,
        onBack,
        headerTextColor,
        minimalTitleStyle,
        title,
      ],
    );

    return (
      <SafeAreaView style={containerStyle}>
        <StatusBar backgroundColor={headerBg} barStyle={barStyle} />

        {searchVisible && renderSearchHeader()}

        {!searchVisible && (
          <>
            {type === 'minimal' && renderMinimalHeader()}
            {type === 'default' && renderDefaultHeader()}
          </>
        )}
      </SafeAreaView>
    );
  },
);

// Display name for debugging
CustomHeader.displayName = 'CustomHeader';

/**
 * Styles với theme integration
 * useStyles hook tạo stable styles object
 */
const useStyles = createStyles(theme => ({
  container: {
    // StatusBar height đã là px thực tế -> không scale
    paddingTop: StatusBar.currentHeight ?? 0,
  },

  headerContent: {
    height: moderateVerticalScale(56),
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
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
  },

  subtitle: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.normal,
    opacity: 0.8,
    marginTop: theme.spacing[1],
  },

  iconButton: {
    padding: theme.spacing[2],
    marginHorizontal: theme.spacing[1],
    borderRadius: theme.radius.full,
  },
  backButton: {
    padding: moderateScale(8),
    marginHorizontal: scale(4),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: moderateScale(20),
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileButton: {
    marginLeft: theme.spacing[2],
  },

  notificationBadge: {
    position: 'absolute',
    top: moderateVerticalScale(2),
    right: scale(2),
    backgroundColor: theme.colors.error,
    borderRadius: theme.radius.full,
    minWidth: scale(20),
    height: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[1],
  },

  notificationText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.semibold,
  },

  searchContainer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: theme.spacing[2],
  },

  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.spacing[4],
    height: scale(40),

    // Shadow nhẹ để giảm GPU cost
    elevation: 1,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: moderateVerticalScale(1) },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(2),
  },

  searchInput: {
    flex: 1,
    marginLeft: theme.spacing[2],
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text,
  },

  searchCloseButton: {
    padding: theme.spacing[1],
  },

  minimalContainer: {
    height: moderateVerticalScale(56),
    flexDirection: 'row',
    alignItems: 'center',
  },

  minimalTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    marginLeft: theme.spacing[3],
  },
}));

export default CustomHeader;
