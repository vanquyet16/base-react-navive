import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '@/shared/constants';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : typeof options.title === 'string'
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Lấy icon từ options
          const IconComponent = options.tabBarIcon;
          const color = isFocused ? COLORS.primary : COLORS.textSecondary;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.7}>
              <Animated.View
                style={[
                  styles.tabContent,
                  {
                    transform: [{scale: isFocused ? 1.1 : 1}],
                  },
                ]}>
                <View style={styles.iconContainer}>
                  {IconComponent &&
                    IconComponent({focused: isFocused, color, size: 24})}
                </View>

                <Text
                  style={[
                    styles.tabLabel,
                    {color},
                    isFocused && styles.activeTabLabel,
                  ]}
                  numberOfLines={1}>
                  {label}
                </Text>
              </Animated.View>

              {/* Active indicator */}
              {isFocused && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
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
  tabsContainer: {
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeTabLabel: {
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: '60%',
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});

export default CustomTabBar;
