/**
 * CUSTOM HEADER COMPONENT
 * =======================
 * Reusable header component cho app với nhiều variants và features.
 * Optimized cho performance với React.memo, useCallback, và useMemo.
 *
 * @features
 * - Multiple types: default, minimal, dashboard
 * - Safe Area integration & StatusBar management
 * - Custom actions, badges, and background images
 */

import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  StatusBar,
  ImageBackground,
  ImageSourcePropType,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon } from '@/components';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { layout } from '@/shared/theme/tokens';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import CustomBadge from '../base/CustomBadge';
import { useMainNavigation } from '@/shared/hooks/useNavigation';

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
  userName?: string;
  userLocation?: string;
  userAvatar?: string;
  isTransparent?: boolean;
  height?: number;
  rightAction?: {
    type: 'text' | 'icon';
    value: string;
    onPress?: () => void;
    color?: string;
  };
}

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
    titleIcon,
    backgroundColor,
    textColor,
    type = 'default',
    notificationCount = 0,
    backgroundImage,
    userName = 'Người dùng',
    userLocation = 'Hà Nội',
    userAvatar,
    isTransparent = false,
    height,
    rightAction,
  }) => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const styles = useStyles();
    const navigation = useMainNavigation();

    // Compute Header Background Color
    const headerBg = useMemo(() => {
      if (isTransparent || backgroundImage) return 'transparent';
      return backgroundColor ?? theme.colors.primary;
    }, [backgroundColor, theme.colors.primary, backgroundImage, isTransparent]);

    // Compute Text Color
    const headerTextColor = useMemo(
      () => textColor ?? theme.colors.white,
      [textColor, theme.colors.white],
    );

    // Compute Status Bar Style
    const barStyle = useMemo(
      () =>
        backgroundImage || type === 'dashboard'
          ? 'light-content'
          : headerBg === theme.colors.white && !isTransparent
          ? 'dark-content'
          : 'light-content',
      [headerBg, theme.colors.white, backgroundImage, type, isTransparent],
    );

    // Custom Height Style
    const containerHeightStyle = useMemo(() => {
      if (height) {
        return {
          height: moderateVerticalScale(height),
          minHeight: undefined,
        };
      }
      return {};
    }, [height]);

    // Container Style with Padding Top from Safe Area Insets
    const containerStyle = useMemo(() => {
      const baseStyle: any[] = [
        styles.container,
        {
          backgroundColor: headerBg,
          paddingTop: insets.top,
        },
      ];

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
          paddingBottom: theme.spacing[4],
        });
      }

      return baseStyle;
    }, [styles.container, headerBg, insets.top, type, theme, isTransparent]);

    // Navigation Handlers
    const handleBack = useCallback(() => {
      if (onBack) {
        onBack();
      } else {
        navigation.goBack();
      }
    }, [onBack, navigation]);

    const handleSearchPress = useCallback(() => {
      navigation.navigate('SearchScreen');
    }, [navigation]);

    // Render rightAction helper
    const renderRightAction = useCallback(() => {
      if (!rightAction) return null;
      return (
        <Pressable
          onPress={rightAction.onPress}
          style={({ pressed }) => [
            type === 'minimal' ? { padding: scale(4) } : styles.iconButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          {rightAction.type === 'text' ? (
            <Text style={[styles.actionText, rightAction.color ? { color: rightAction.color } : null]}>
              {rightAction.value}
            </Text>
          ) : (
            <AppIcon
              name={rightAction.value}
              size={24}
              color={rightAction.color || headerTextColor}
            />
          )}
        </Pressable>
      );
    }, [rightAction, styles.iconButton, styles.actionText, type, headerTextColor]);

    // Render default style header
    const renderDefaultHeader = useCallback(
      () => (
        <View style={[styles.headerContent, containerHeightStyle]}>
          {/* Left Section (Back/Menu button) */}
          <View style={styles.leftSection}>
            {showBack ? (
              <Pressable
                style={({ pressed }) => [
                  styles.backButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
                onPress={handleBack}
              >
                <AppIcon
                  name="arrow-left"
                  size={moderateScale(20)}
                  color={headerTextColor}
                />
              </Pressable>
            ) : showMenu ? (
              <Pressable
                onPress={onMenuPress}
                style={({ pressed }) => [
                  styles.iconButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <AppIcon name="menu" size={24} color={headerTextColor} />
              </Pressable>
            ) : null}
          </View>

          {/* Center Section (Title / Subtitle) */}
          <View style={styles.centerSection} pointerEvents="box-none">
            <Text style={[styles.title, { color: headerTextColor }]} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: headerTextColor }]} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>

          {/* Right Section (Search / Notification / RightComponent / RightAction) */}
          <View style={styles.rightSection}>
            {showSearch && (
              <Pressable
                onPress={handleSearchPress}
                style={({ pressed }) => [
                  styles.iconButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <AppIcon name="search" size={24} color={headerTextColor} />
              </Pressable>
            )}

            {showNotification && (
              <Pressable
                onPress={onNotificationPress}
                style={({ pressed }) => [
                  styles.iconButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <CustomBadge badgeCount={notificationCount}>
                  <AppIcon name="bell" size={24} color={headerTextColor} />
                </CustomBadge>
              </Pressable>
            )}

            {rightComponent}
            {!rightComponent && renderRightAction()}
          </View>
        </View>
      ),
      [
        styles,
        containerHeightStyle,
        showBack,
        showMenu,
        showSearch,
        showNotification,
        handleBack,
        onMenuPress,
        handleSearchPress,
        onNotificationPress,
        headerTextColor,
        title,
        subtitle,
        notificationCount,
        rightComponent,
        renderRightAction,
      ],
    );

    // Render minimal style header
    const renderMinimalHeader = useCallback(
      () => (
        <View style={[styles.minimalContainer, containerHeightStyle]}>
          <View style={styles.minimalLeftSection}>
            {showBack && (
              <Pressable
                onPress={handleBack}
                style={({ pressed }) => [
                  styles.backButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <AppIcon name="arrow-left" size={20} color={headerTextColor} />
              </Pressable>
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
            <Text
              style={[
                styles.minimalTitle,
                { color: headerTextColor },
                titleIcon ? { marginLeft: 0 } : null,
              ]}
            >
              {title}
            </Text>
          </View>

          <View style={styles.minimalRightSection}>
            {rightComponent}
            {!rightComponent && renderRightAction()}
          </View>
        </View>
      ),
      [
        styles,
        containerHeightStyle,
        showBack,
        handleBack,
        titleIcon,
        headerTextColor,
        title,
        rightComponent,
        renderRightAction,
      ],
    );

    // Render dashboard style header
    const renderDashboardHeader = useCallback(
      () => (
        <View style={[styles.dashboardInnerContent, containerHeightStyle]}>
          <View style={styles.dashboardTopRow}>
            {/* User Profile / Location Brand info */}
            <View style={styles.brandContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>CS</Text>
              </View>
              <View style={{ marginLeft: scale(10) }}>
                <Text style={styles.brandName}>{userName}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AppIcon name="map-pin" size={10} color={theme.colors.white} />
                  <Text style={styles.brandLocation}>{userLocation}</Text>
                </View>
              </View>
            </View>

            {/* Dashboard Right Search Trigger */}
            <View style={styles.dashboardRightActions}>
              <Pressable
                onPress={onNotificationPress}
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <AppIcon name="search" size={24} color={theme.colors.white} />
              </Pressable>
            </View>
          </View>
        </View>
      ),
      [
        styles,
        containerHeightStyle,
        userName,
        userLocation,
        onNotificationPress,
        theme.colors.white,
      ],
    );

    const backgroundStyle = useMemo<any>(
      () => ({
        width: '100%',
        overflow: 'hidden',
      }),
      [],
    );

    const headerContent = (
      <View style={containerStyle}>
        <StatusBar
          backgroundColor="transparent"
          barStyle={type === 'dashboard' ? 'light-content' : barStyle}
          translucent={true}
        />
        {type === 'minimal' && renderMinimalHeader()}
        {type === 'default' && renderDefaultHeader()}
        {type === 'dashboard' && renderDashboardHeader()}
      </View>
    );

    if (backgroundImage) {
      return (
        <ImageBackground
          source={backgroundImage}
          style={backgroundStyle}
          resizeMode="cover"
        >
          {headerContent}
        </ImageBackground>
      );
    }

    return headerContent;
  },
);

CustomHeader.displayName = 'CustomHeader';

const useStyles = createStyles(
  theme => ({
    container: {
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
      fontSize: theme.typography.fontSizes.lg,
      fontWeight: theme.typography.fontWeights.semibold,
    },
    subtitle: {
      fontSize: theme.typography.fontSizes.xs,
      fontWeight: theme.typography.fontWeights.normal,
      opacity: 0.8,
      marginTop: moderateVerticalScale(4),
    },
    iconButton: {
      padding: moderateScale(8),
      marginHorizontal: scale(4),
    },
    backButton: {
      width: scale(30),
      height: scale(30),
      borderRadius: theme.radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.scrim,
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
      fontSize: theme.typography.fontSizes.lg,
      fontWeight: theme.typography.fontWeights.semibold,
      marginLeft: scale(12),
    },
    dashboardInnerContent: {
      paddingHorizontal: scale(12),
      minHeight: '15%',
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
      height: scale(40),
      borderRadius: moderateScale(20),
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoText: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      fontSize: theme.typography.fontSizes.sm,
    },
    brandName: {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: 'bold',
      color: theme.colors.white,
      textTransform: 'uppercase',
    },
    brandLocation: {
      fontSize: theme.typography.fontSizes['2xs'],
      color: theme.colors.white,
      marginLeft: scale(4),
      opacity: 0.9,
    },
    dashboardRightActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionText: {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.white,
    },
  }),
  true,
);

export default CustomHeader;
