import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Animated,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { SCREEN_PADDING } from '@/shared/constants';
import { Avatar } from '@/components/base';

interface CustomHeaderProps {
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
  textColor?: string;
  type?: 'default' | 'search' | 'minimal';
  notificationCount?: number;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
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

  // Use theme colors as defaults
  const headerBg = backgroundColor ?? theme.colors.primary;
  const headerTextColor = textColor ?? theme.colors.white;

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Fix: Create animation value once with useRef (prevent memory leak)
  const searchAnimation = useRef(new Animated.Value(0)).current;

  // Xử lý hiển thị search
  const toggleSearch = () => {
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
  };

  // Xử lý tìm kiếm
  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch?.(text);
  };

  const renderSearchHeader = () => (
    <Animated.View
      style={[
        styles.searchContainer,
        {
          opacity: searchAnimation,
          transform: [
            {
              translateY: searchAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-10, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.searchInputContainer}>
        <Icon name="search" size={20} color={theme.colors.textSecondary} />
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
          <Icon name="close" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderDefaultHeader = () => (
    <View style={styles.headerContent}>
      {/* Phần trái */}
      <View style={styles.leftSection}>
        {showBack ? (
          <TouchableOpacity onPress={onBack} style={styles.iconButton}>
            <Icon name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>
        ) : showMenu ? (
          <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
            <Icon name="menu" size={24} color={textColor} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Phần giữa */}
      <View style={styles.centerSection}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[styles.subtitle, { color: textColor }]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {/* Phần phải */}
      <View style={styles.rightSection}>
        {showSearch && (
          <TouchableOpacity onPress={toggleSearch} style={styles.iconButton}>
            <Icon name="search" size={24} color={textColor} />
          </TouchableOpacity>
        )}

        {showNotification && (
          <TouchableOpacity
            onPress={onNotificationPress}
            style={styles.iconButton}
          >
            <Icon name="notifications" size={24} color={textColor} />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {rightComponent}

        {/* {showProfile && user && (
          <TouchableOpacity style={styles.profileButton}>
            <Avatar user={user} size={32} />
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );

  const renderMinimalHeader = () => (
    <View style={styles.minimalContainer}>
      {showBack && (
        <TouchableOpacity onPress={onBack} style={styles.iconButton}>
          <Icon name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
      )}
      <Text style={[styles.minimalTitle, { color: textColor }]}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: headerBg }]}>
      <StatusBar
        backgroundColor={headerBg}
        barStyle={
          headerBg === theme.colors.white ? 'dark-content' : 'light-content'
        }
      />

      {searchVisible && renderSearchHeader()}

      {!searchVisible && (
        <>
          {type === 'minimal' && renderMinimalHeader()}
          {type === 'default' && renderDefaultHeader()}
        </>
      )}
    </SafeAreaView>
  );
};

/**
 * Styles với theme integration
 */
const useStyles = createStyles(theme => ({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
  },
  headerContent: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
  },
  leftSection: {
    width: 40,
    justifyContent: 'center',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  profileButton: {
    marginLeft: theme.spacing[2],
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: theme.colors.error,
    borderRadius: theme.radius.full,
    minWidth: 20,
    height: 20,
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
    height: 40,
    elevation: 2,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
  },
  minimalTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    marginLeft: theme.spacing[3],
  },
}));

export default CustomHeader;
