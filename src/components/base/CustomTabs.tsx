import React, { useCallback } from 'react';
import { Tabs, TabsProps } from '@ant-design/react-native';
import { colors } from '@/shared/theme/tokens';
import { createStyles } from '@/shared/theme/create-styles';
import {
  moderateScale,
  moderateVerticalScale,
} from '@/shared/utils/sizeMatters';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface TabBarPropsType {
  activeTab: number;
  tabs: any[];
  goToTab: (index: number) => void;
  [key: string]: any;
}

/**
 * CustomTabs Component
 * Wraps @ant-design/react-native Tabs with project-specific styling and theme support.
 * Implements a "Pill" style tab bar with Green active state (success color).
 *
 * @param props - Standard Ant Design Tabs props
 */
export const CustomTabs = React.memo<TabsProps>(props => {
  const styles = useStyles();

  const renderTabBar = useCallback(
    (tabProps: TabBarPropsType) => {
      return (
        <View style={styles.container}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {tabProps.tabs.map((tab: any, i: number) => {
              const isActive = tabProps.activeTab === i;
              return (
                <TouchableOpacity
                  key={tab.title || i}
                  activeOpacity={0.8}
                  onPress={() => tabProps.goToTab(i)}
                  style={[
                    styles.tabItem,
                    isActive ? styles.activeTab : styles.inactiveTab,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      isActive ? styles.activeText : styles.inactiveText,
                    ]}
                  >
                    {tab.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      );
    },
    [styles],
  );

  // Destructure to avoid passing legacy style props if they were passed
  const { tabBarUnderlineStyle, tabBarTextStyle, ...restProps } = props;

  return <Tabs renderTabBar={renderTabBar} {...restProps} />;
});

CustomTabs.displayName = 'CustomTabs';

const useStyles = createStyles(
  theme => ({
    container: {
      marginBottom: moderateVerticalScale(12),
    } as ViewStyle,
    scrollViewContent: {
      paddingHorizontal: moderateScale(16),
      gap: moderateScale(8),
    } as ViewStyle,
    tabItem: {
      paddingHorizontal: moderateScale(16),
      paddingVertical: moderateVerticalScale(8),
      borderRadius: moderateScale(20), // Pill shape
    } as ViewStyle,
    tabText: {
      fontSize: theme.typography.fontSizes.sm,
    } as TextStyle,
    activeTab: {
      backgroundColor: theme.colors.success, // Green active state
      borderWidth: 0,
      borderColor: 'transparent',
    } as ViewStyle,
    inactiveTab: {
      backgroundColor: theme.colors.white, // White for better contrast
      borderWidth: 1,
      borderColor: theme.isDark ? theme.colors.border : colors.gray[200],
    } as ViewStyle,
    activeText: {
      color: theme.colors.white,
      fontWeight: '600',
    } as TextStyle,
    inactiveText: {
      color: theme.colors.textSecondary,
      fontWeight: '500',
    } as TextStyle,
  }),
  true,
);
