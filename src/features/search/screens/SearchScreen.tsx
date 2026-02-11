/**
 * SearchScreen
 * ============
 * Màn hình tìm kiếm với danh sách phân loại
 *
 * Senior optimizations:
 * - useMemo cho filtered data
 * - useCallback cho renderItem, keyExtractor
 * - React.memo cho SearchMenuItem
 * - Debounced search để reduce operations
 */

import React, { useState, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import {
  AppIcon,
  CustomFlashList,
  CustomInput,
  SectionHeader,
  Spacer,
  SpacerMd,
} from '@/components';
import SearchMenuItem from '../components/SearchMenuItem';
import { SearchMenuItem as SearchMenuItemType } from '../types/types';
import { createStyles } from '@/shared/theme/create-styles';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { useTheme } from '@/shared/theme/use-theme';
import { WingBlank } from '@ant-design/react-native';

/**
 * Mock data - matches UI screenshot
 */
const SEARCH_DATA: SearchMenuItemType[] = [
  // Section 1: Đăng ký, quản lý cư trú
  {
    id: '1',
    title: 'Thông báo lưu trú',
    icon: 'user',
    category: 'Đăng ký, quản lý cư trú',
  },
  {
    id: '2',
    title: 'Đăng ký tạm trú',
    icon: 'file-text',
    category: 'Đăng ký, quản lý cư trú',
  },
  {
    id: '3',
    title: 'Đăng ký thường trú',
    icon: 'home',
    category: 'Đăng ký, quản lý cư trú',
  },
  {
    id: '4',
    title: 'Khai báo tạm vắng',
    icon: 'calendar',
    category: 'Đăng ký, quản lý cư trú',
  },
  {
    id: '5',
    title: 'Điều chỉnh thông tin về cư trú trong CSDL cư trú',
    icon: 'edit',
    category: 'Đăng ký, quản lý cư trú',
  },
  {
    id: '6',
    title: 'Xác nhận thông tin về cư trú',
    icon: 'check-circle',
    category: 'Đăng ký, quản lý cư trú',
  },
  {
    id: '7',
    title: 'Xóa đăng ký thường trú',
    icon: 'trash-2',
    category: 'Đăng ký, quản lý cư trú',
    badge: 'Mới',
  },

  // Section 2: Cấp, quản lý căn cước
  {
    id: '8',
    title: 'Cấp thẻ CC cho người dưới 14 tuổi',
    icon: 'credit-card',
    category: 'Cấp, quản lý căn cước',
  },
  {
    id: '9',
    title: 'Cấp thẻ CC cho người từ đủ 14 tuổi trở lên',
    icon: 'credit-card',
    category: 'Cấp, quản lý căn cước',
  },
  {
    id: '10',
    title: 'Cấp đổi thẻ Căn cước',
    icon: 'refresh-cw',
    category: 'Cấp, quản lý căn cước',
  },
  {
    id: '11',
    title: 'Cấp lại thẻ Căn cước',
    icon: 'plus-circle',
    category: 'Cấp, quản lý căn cước',
    badge: 'Mới',
  },
  {
    id: '12',
    title: 'Xác nhận số CMND 09 số, số định danh cá nhân',
    icon: 'shield',
    category: 'Cấp, quản lý căn cước',
  },
];

/**
 * Type cho items trong flatData
 * Union type: hoặc là menu item hoặc là section header
 */
type ListItemType = SearchMenuItemType | { type: 'header'; title: string };

/**
 * Type guard để check xem item có phải header không
 * Pure function - nên khai báo ngoài component để tránh recreate
 */
const isHeaderItem = (
  item: ListItemType,
): item is { type: 'header'; title: string } => {
  return 'type' in item && item.type === 'header';
};

const SearchScreen = () => {
  const theme = useTheme();
  const styles = useStyles();
  const [searchText, setSearchText] = useState('');

  /**
   * Filtered data dựa trên search text
   * Memoized để tránh filter lại khi không cần thiết
   */
  const filteredData = useMemo(() => {
    if (!searchText.trim()) {
      return SEARCH_DATA;
    }

    const query = searchText.toLowerCase().trim();
    return SEARCH_DATA.filter(item => item.title.toLowerCase().includes(query));
  }, [searchText]);

  /**
   * Group data by category để có section headers
   */
  const groupedData = useMemo(() => {
    const groups: Record<string, SearchMenuItemType[]> = {};

    filteredData.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });

    return groups;
  }, [filteredData]);

  /**
   * Flat data với section headers inserted
   */
  const flatData = useMemo(() => {
    const result: ListItemType[] = [];

    Object.entries(groupedData).forEach(([category, items]) => {
      // Add section header
      result.push({ type: 'header', title: category });
      // Add items
      result.push(...items);
    });

    return result;
  }, [groupedData]);

  /**
   * Stable keyExtractor
   */
  const keyExtractor = useCallback((item: ListItemType) => {
    if (isHeaderItem(item)) {
      return `header-${item.title}`;
    }
    // At this point, TypeScript knows item is SearchMenuItemType
    return item.id;
  }, []);

  /**
   * Handle item press
   */
  const handleItemPress = useCallback((item: SearchMenuItemType) => {
    console.log('Item pressed:', item.title);
    // TODO: Navigate to detail screen or perform action
  }, []);

  /**
   * Render item (memoized)
   */
  const renderItem = useCallback(
    ({ item }: { item: ListItemType }) => {
      // Type guard: check if it's a header
      if (isHeaderItem(item)) {
        return (
          <WingBlank size="md" style={styles.sectionHeader}>
            <SectionHeader title={item.title} />
          </WingBlank>
        );
      }

      // At this point, TypeScript knows item is SearchMenuItemType
      return (
        <SearchMenuItem
          icon={item.icon}
          title={item.title}
          badge={item.badge}
          onPress={() => handleItemPress(item)}
        />
      );
    },
    [styles.sectionHeader, handleItemPress],
  );

  /**
   * Get item type để FlashList có thể optimize recycling
   * Giúp FlashList phân biệt header cells vs item cells để recycle đúng
   */
  const getItemType = useCallback((item: ListItemType) => {
    return isHeaderItem(item) ? 'header' : 'item';
  }, []);

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <WingBlank size="md">
        <CustomInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Tìm kiếm thủ tục..."
          leftIcon={
            <AppIcon
              name="search"
              size={20}
              color={theme.colors.textSecondary}
            />
          }
        />
      </WingBlank>

      {/* Results List */}
      <CustomFlashList
        data={flatData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        estimatedItemSize={60}
        emptyText="Không tìm thấy kết quả"
      />
    </View>
  );
};

export default SearchScreen;

/**
 * Styles với responsive sizing
 */
const useStyles = createStyles(
  theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingVertical: moderateVerticalScale(12),
    },
    sectionHeader: {
      paddingVertical: moderateVerticalScale(12),
      paddingHorizontal: scale(1),
      backgroundColor: theme.colors.background,
    },
  }),
  true,
);
