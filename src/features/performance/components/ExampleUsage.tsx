import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import CustomHeader from '@/components/layout/CustomHeader';
import CustomBottomBar, {BottomBarTab} from '@/components/navigation/CustomBottomBar';
import {COLORS} from '@/shared/constants';

const ExampleUsage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Cấu hình tabs cho BottomBar
  const bottomTabs = [
    BottomBarTab.Home,
    {...BottomBarTab.Search, badge: 3},
    {...BottomBarTab.Favorites, badge: 12},
    BottomBarTab.Profile,
  ];

  // Xử lý sự kiện
  const handleSearch = (text: string) => {
    console.log('Tìm kiếm:', text);
  };

  const handleNotificationPress = () => {
    Alert.alert('Thông báo', 'Bạn có 5 thông báo mới!');
  };

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Đã mở menu');
  };

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    Alert.alert('Tab', `Đã chuyển sang tab: ${tabKey}`);
  };

  return (
    <View style={styles.container}>
      {/* Header với nhiều tính năng */}
      <CustomHeader
        title="Ứng dụng của tôi"
        subtitle="Chào mừng bạn đến với ứng dụng"
        showSearch={true}
        showNotification={true}
        showProfile={true}
        showMenu={true}
        notificationCount={5}
        onSearch={handleSearch}
        onNotificationPress={handleNotificationPress}
        onMenuPress={handleMenuPress}
        backgroundColor={COLORS.primary}
      />

      {/* Nội dung chính */}
      <View style={styles.content}>
        {/* Nội dung của từng tab sẽ được render ở đây */}
      </View>

      {/* Custom Bottom Bar */}
      <CustomBottomBar
        tabs={bottomTabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
        showLabels={true}
        animationType="slide"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExampleUsage;
