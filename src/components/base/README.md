# Hướng dẫn sử dụng UI Components

Tài liệu hướng dẫn chi tiết cách sử dụng các component mới trong dự án.

## 1. CustomTabs

Component Tabs trượt (Sliding Pill) chuẩn Senior UI.

### Basic Usage

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CustomTabs } from '@/components/base';

const MyScreen = () => {
  // Tabs định nghĩa title
  const tabs = [
    { title: 'Phổ biến' },
    { title: 'Mới nhất' },
    { title: 'Đang giảm giá' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <CustomTabs
        tabs={tabs}
        // Có thể thêm props của AntDesign Tabs
      >
        {/* Content Tab 1 */}
        <View>
          <Text>Nội dung Phổ biến</Text>
        </View>

        {/* Content Tab 2 */}
        <View>
          <Text>Nội dung Mới nhất</Text>
        </View>

        {/* Content Tab 3 */}
        <View>
          <Text>Nội dung Giảm giá</Text>
        </View>
      </CustomTabs>
    </View>
  );
};
```

---

## 2. CustomSwiper

Banner trượt tự động (Auto-scroll), dùng cho Home Banner hoặc Intro.

### Basic Usage

```tsx
import React from 'react';
import { Image, View } from 'react-native';
import { CustomSwiper } from '@/components/base';
import { verticalScale } from '@/shared/utils/sizeMatters';

const HomeBanner = () => {
  return (
    <CustomSwiper
      height={verticalScale(180)} // Chiều cao responsive
      autoplay={true} // Tự động chạy
      autoplayTimeout={3} // 3 giây chuyển slide
    >
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: 'https://example.com/banner1.jpg' }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: 'https://example.com/banner2.jpg' }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
    </CustomSwiper>
  );
};
```

---

## 3. CustomFlashList (Với API Phân Trang)

Component List hiệu năng cao, render 1000+ items mượt mà. Dưới đây là ví dụ tích hợp với **TanStack Query (React Query)** để load more (Infinite Scroll).

### Pattern chuẩn: `useInfiniteQuery`

Giả sử bạn có API trả về dạng:

```ts
interface ApiResponse {
  data: Product[];
  nextPage: number | null;
  total: number;
}
```

### Implementation

```tsx
import React, { useCallback } from 'react';
import { CustomFlashList, CustomText } from '@/components/base';
import { useInfiniteQuery } from '@tanstack/react-query';
import { productService } from '@/shared/services/productService'; // Ví dụ service
import { moderateScale } from '@/shared/utils/sizeMatters';
import { View } from 'react-native';

const ProductListScreen = () => {
  // 1. Setup Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: async ({ pageParam = 1 }) => {
      // Gọi API phân trang
      const response = await productService.getProducts({
        page: pageParam,
        limit: 20,
      });
      return response; // Trả về data + thông tin trang sau
    },
    getNextPageParam: lastPage => {
      // Logic xác định trang tiếp theo
      return lastPage.nextPage ?? undefined;
    },
    initialPageParam: 1,
  });

  // 2. Flatten data từ các pages
  const flatData = React.useMemo(
    () => data?.pages.flatMap(page => page.data) || [],
    [data],
  );

  // 3. Render Item
  const renderItem = useCallback(
    ({ item }) => (
      <View
        style={{
          height: moderateScale(80),
          padding: moderateScale(12),
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
      >
        <CustomText>{item.name}</CustomText>
        <CustomText color="primary">{item.price} đ</CustomText>
      </View>
    ),
    [],
  );

  // 4. Handle Load More
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <CustomFlashList
      data={flatData}
      renderItem={renderItem}
      // Quan trọng: Chiều cao ước lượng của 1 item (giúp tính toán scroll bar)
      estimatedItemSize={80}
      // Load More Props
      onLoadMore={handleLoadMore}
      isLoadingMore={isFetchingNextPage}
      // Refresh Props
      onRefresh={refetch}
      refreshing={isRefetching}
      // Empty State
      emptyText="Chưa có sản phẩm nào"
      // Styling
      contentContainerStyle={{ padding: moderateScale(16) }}
    />
  );
};

export default ProductListScreen;
```

### Các Props quan trọng của CustomFlashList

| Prop                 | Type        | Mô tả                                                                             |
| -------------------- | ----------- | --------------------------------------------------------------------------------- |
| `estimatedItemSize`  | `number`    | **BẮT BUỘC**. Chiều cao trung bình (px) của 1 item. Giúp FlashList tối ưu bộ nhớ. |
| `onLoadMore`         | `function`  | Hàm gọi API lấy trang tiếp theo (thường là `fetchNextPage`).                      |
| `isLoadingMore`      | `boolean`   | Trạng thái đang load trang sau (hiện spinner ở dưới đáy).                         |
| `emptyText`          | `string`    | Text hiển thị khi danh sách rỗng (default: "Không có dữ liệu").                   |
| `ListEmptyComponent` | `ReactNode` | Component custom hiển thị khi rỗng (nếu muốn thay thế text mặc định).             |
