import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { createStyles } from '@/shared/theme/create-styles';
import { moderateVerticalScale } from 'react-native-size-matters';
import {
  InfoBox,
  SectionHeader,
  Spacer,
  SpacerMd,
  SpacerSm,
} from '@/components';
import { useTheme } from '@/shared/theme/use-theme';
import { WingBlank } from '@ant-design/react-native';

// Define the structure for grid items
interface UtilityItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  iconColor: string;
}

interface UtilitySection {
  title: string;
  items: UtilityItem[];
}

const SECTIONS: UtilitySection[] = [
  {
    title: 'Phản ánh, kiến nghị',
    items: [
      {
        id: '1',
        title: 'Phản ánh\nhiện trường',
        icon: 'alert-triangle',
        color: '#E3F2FD', // Light Blue
        iconColor: '#2196F3',
      },
      {
        id: '2',
        title: 'Phản ánh\nthủ tục',
        icon: 'file-text',
        color: '#E0F2F1', // Light Teal
        iconColor: '#009688',
      },
      {
        id: '3',
        title: 'Đăng ký\ntiếp dân',
        icon: 'user-check',
        color: '#FFF8E1', // Light Amber
        iconColor: '#FFC107',
      },
      {
        id: '4',
        title: 'Khảo sát\ný kiến',
        icon: 'clipboard-list', // Check list
        color: '#E0F7FA', // Cyan
        iconColor: '#00BCD4',
      },
      {
        id: '5',
        title: 'Doanh nghiệp\nkiến nghị',
        icon: 'building',
        color: '#F3E5F5', // Light Purple
        iconColor: '#9C27B0',
      },
    ],
  },
  {
    title: 'Dịch vụ công',
    items: [
      {
        id: '6',
        title: 'Dịch vụ\ncông',
        icon: 'landmark',
        color: '#E3F2FD',
        iconColor: '#1976D2',
      },
      {
        id: '7',
        title: 'Đặt lịch\nthực hiện',
        icon: 'calendar',
        color: '#E8F5E9',
        iconColor: '#4CAF50',
      },
      {
        id: '8',
        title: 'Địa điểm\nthực hiện',
        icon: 'map-pin',
        color: '#E1F5FE',
        iconColor: '#03A9F4',
      },
      {
        id: '9',
        title: 'Chỉ số\nphục vụ',
        icon: 'bar-chart-2', // Trending up/Chart
        color: '#E0F2F1',
        iconColor: '#009688',
      },
      {
        id: '10',
        title: 'Chatbot\nhỗ trợ',
        icon: 'message-circle', // Robot/Bot not standard lucide, use message
        color: '#E0F7FA',
        iconColor: '#00ACC1',
      },
      {
        id: '11',
        title: 'Tổng đài\nhỗ trợ',
        icon: 'headphones',
        color: '#F1F8E9',
        iconColor: '#8BC34A',
      },
      {
        id: '12',
        title: 'Hỗ trợ\nkhai thuế',
        icon: 'file-minus', // Tax/Invoice
        color: '#E3F2FD',
        iconColor: '#2196F3',
      },
      {
        id: '13',
        title: 'Ví giấy\ntờ',
        icon: 'wallet', // Wallet/Folder
        color: '#E8F5E9',
        iconColor: '#43A047',
      },
    ],
  },
  {
    title: 'Đảng bộ Thành phố',
    items: [
      {
        id: '14',
        title: 'Trang tin\nĐảng bộ',
        icon: 'globe',
        color: '#FFEBEE', // Light Red
        iconColor: '#F44336',
      },
      {
        id: '15',
        title: 'Sổ tay\nĐảng viên',
        icon: 'book-open',
        color: '#FCE4EC', // Light Pink
        iconColor: '#E91E63',
      },
      {
        id: '16',
        title: 'Cuộc thi\ntìm hiểu',
        icon: 'award', // Trophy
        color: '#FFF3E0', // Light Orange
        iconColor: '#FF9800',
      },
    ],
  },
];

const AppScreen = () => {
  const styles = useStyles();
  const theme = useTheme();

  const handlePress = useCallback(() => {
    // Handle navigation or action here
  }, []);

  return (
    <WingBlank size="md" style={styles.container}>
      {SECTIONS.map((section) => (
        <View key={section.title} style={styles.sectionContainer}>
          <SectionHeader title={section.title} showVerticalBar={false} />
          <SpacerMd />
          <View style={styles.gridContainer}>
            {section.items.map(item => (
              <View key={item.id} style={styles.itemContainer}>
                <InfoBox
                  type="utility"
                  title={item.title}
                  icon={item.icon}
                  iconBackgroundColor={item.color}
                  iconColor={item.iconColor}
                  onPress={handlePress}
                />
              </View>
            ))}
          </View>
        </View>
      ))}
      <SpacerMd />
    </WingBlank>
  );
};

export default AppScreen;

const useStyles = createStyles(theme => {
  return {
    container: {
      flex: 1,
      // backgroundColor: theme.colors.background,
      paddingTop: theme.spacing[4],
      paddingBottom: moderateVerticalScale(50),
    },
    sectionContainer: {
      // marginBottom: theme.spacing[2],
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    itemContainer: {
      width: '25%',
      alignItems: 'center',
      // marginBottom: theme.spacing[4], // Vertical spacing between items
    },
  };
}, true);
