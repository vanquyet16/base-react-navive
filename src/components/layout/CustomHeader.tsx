import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Animated,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, SCREEN_PADDING} from '@/constants';
import Avatar from '@/components/common/Avatar';

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
  backgroundColor = COLORS.primary,
  textColor = '#ffffff',
  type = 'default',
  notificationCount = 0,
}) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchAnimation = new Animated.Value(0);

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
      ]}>
      <View style={styles.searchInputContainer}>
        <Icon name="search" size={20} color={COLORS.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          placeholderTextColor={COLORS.placeholder}
          value={searchText}
          onChangeText={handleSearch}
          autoFocus
        />
        <TouchableOpacity
          onPress={toggleSearch}
          style={styles.searchCloseButton}>
          <Icon name="close" size={20} color={COLORS.textSecondary} />
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
        <Text style={[styles.title, {color: textColor}]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, {color: textColor}]} numberOfLines={1}>
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
            style={styles.iconButton}>
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
      <Text style={[styles.minimalTitle, {color: textColor}]}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={
          backgroundColor === '#ffffff' ? 'dark-content' : 'light-content'
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

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    opacity: 0.8,
    marginTop: 2,
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  profileButton: {
    marginLeft: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 40,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text,
  },
  searchCloseButton: {
    padding: 4,
  },
  minimalContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
  },
  minimalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
});

export default CustomHeader;
