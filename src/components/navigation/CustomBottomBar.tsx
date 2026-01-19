import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '@/shared/constants';

interface TabItem {
  key: string;
  icon: string;
  label: string;
  badge?: number;
  disabled?: boolean;
}

interface CustomBottomBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  backgroundColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  showLabels?: boolean;
  animationType?: 'slide' | 'scale' | 'fade';
  style?: any;
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const CustomBottomBar: React.FC<CustomBottomBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
  backgroundColor = COLORS.background,
  activeColor = COLORS.primary,
  inactiveColor = COLORS.textSecondary,
  showLabels = true,
  animationType = 'slide',
  style,
}) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimations = useRef(tabs.map(() => new Animated.Value(1))).current;

  const tabWidth = SCREEN_WIDTH / tabs.length;

  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.key === activeTab);

    // Animation cho slide indicator
    Animated.spring(slideAnimation, {
      toValue: activeIndex * tabWidth,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();

    // Animation cho scale tabs
    scaleAnimations.forEach((anim, index) => {
      Animated.spring(anim, {
        toValue: index === activeIndex ? 1.1 : 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    });
  }, [activeTab, slideAnimation, scaleAnimations, tabWidth, tabs]);

  const handleTabPress = (tabKey: string, index: number) => {
    if (tabs[index].disabled) return;

    // Animation nhấn
    Animated.sequence([
      Animated.spring(scaleAnimations[index], {
        toValue: 0.9,
        useNativeDriver: true,
        tension: 150,
        friction: 4,
      }),
      Animated.spring(scaleAnimations[index], {
        toValue: activeTab === tabKey ? 1.1 : 1,
        useNativeDriver: true,
        tension: 150,
        friction: 4,
      }),
    ]).start();

    onTabPress(tabKey);
  };

  const renderSlideIndicator = () => (
    <Animated.View
      style={[
        styles.slideIndicator,
        {
          backgroundColor: activeColor,
          width: tabWidth * 0.6,
          transform: [
            {
              translateX: slideAnimation.interpolate({
                inputRange: [0, SCREEN_WIDTH],
                outputRange: [tabWidth * 0.2, SCREEN_WIDTH - tabWidth * 0.4],
              }),
            },
          ],
        },
      ]}
    />
  );

  const renderTab = (tab: TabItem, index: number) => {
    const isActive = tab.key === activeTab;
    const color = isActive ? activeColor : inactiveColor;

    return (
      <TouchableOpacity
        key={tab.key}
        style={[styles.tab, {opacity: tab.disabled ? 0.5 : 1}]}
        onPress={() => handleTabPress(tab.key, index)}
        activeOpacity={0.7}>
        <Animated.View
          style={[
            styles.tabContent,
            {
              transform: [{scale: scaleAnimations[index]}],
            },
          ]}>
          <View style={styles.iconContainer}>
            <Icon
              name={tab.icon}
              size={24}
              color={color}
              style={[styles.tabIcon, isActive && styles.activeTabIcon]}
            />
            {tab.badge && tab.badge > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {tab.badge > 99 ? '99+' : tab.badge}
                </Text>
              </View>
            )}
          </View>

          {showLabels && (
            <Text
              style={[
                styles.tabLabel,
                {color},
                isActive && styles.activeTabLabel,
              ]}
              numberOfLines={1}>
              {tab.label}
            </Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}, style]}>
      {animationType === 'slide' && renderSlideIndicator()}
      <View style={styles.tabsContainer}>{tabs.map(renderTab)}</View>
    </SafeAreaView>
  );
};

// Component wrapper cho việc sử dụng dễ dàng hơn
export const BottomBarTab = {
  Home: {
    key: 'home',
    icon: 'home',
    label: 'Trang chủ',
  },
  Profile: {
    key: 'profile',
    icon: 'person',
    label: 'Hồ sơ',
  },
  Settings: {
    key: 'settings',
    icon: 'settings',
    label: 'Cài đặt',
  },
  Search: {
    key: 'search',
    icon: 'search',
    label: 'Tìm kiếm',
  },
  Favorites: {
    key: 'favorites',
    icon: 'favorite',
    label: 'Yêu thích',
  },
  Cart: {
    key: 'cart',
    icon: 'shopping-cart',
    label: 'Giỏ hàng',
  },
  Notifications: {
    key: 'notifications',
    icon: 'notifications',
    label: 'Thông báo',
  },
  Messages: {
    key: 'messages',
    icon: 'message',
    label: 'Tin nhắn',
  },
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  slideIndicator: {
    position: 'absolute',
    top: 0,
    height: 3,
    borderRadius: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 60,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  tabIcon: {
    textAlign: 'center',
  },
  activeTabIcon: {
    // Có thể thêm hiệu ứng cho icon active
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeTabLabel: {
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default CustomBottomBar;
