# HƯỚNG DẪN TẠO MÀN HÌNH MỚI (SENIOR ARCHITECTURE GUIDE)

> Tài liệu chuẩn dành cho Developer: Hướng dẫn chi tiết quy trình 3 bước tạo màn hình mới trong dự án React Native theo mô hình **Declarative Routing (React Navigation v7)** và **Header Slot Pattern**.

---

## 📌 Mục Lục
1. [Tổng Quan Kiến Trúc](#1-tổng-quan-kiến-trúc)
2. [Quy Trình 3 Bước Chuẩn Thêm Màn Hình](#2-quy-trình-3-bước-chuẩn-thêm-màn-hình)
   - [Bước 1: Khai báo Type an toàn](#bước-1-khai-báo-type-an-toàn)
   - [Bước 2: Xây dựng Screen Component](#bước-2-xây-dựng-screen-component)
   - [Bước 3: Đăng ký vào Navigator](#bước-3-đăng-ký-vào-navigator)
3. [Cách Điều Hướng & Truyền Nhận Dữ Liệu (Type-Safe Navigation)](#3-cách-điều-hướng--truyền-nhận-dữ-liệu)
4. [Các Mẫu Thiết Kế Header Thực Tế Với AppHeader](#4-các-mẫu-thiết-kế-header-thực-tế-với-appheader)
5. [Senior Code Review Checklist](#5-senior-code-review-checklist)

---

## 1. Tổng Quan Kiến Trúc

Dự án đã loại bỏ hoàn toàn các tầng Factory gián tiếp (`navigatorFactory`, `screenFactory`) và Header 25 boolean props để chuyển sang chuẩn Senior:

```
src/
├── shared/types/navigation.types.ts  # 👉 Nơi định nghĩa duy nhất về Type của Route
├── features/<tên-feature>/screens/    # 👉 Mã nguồn màn hình (UI, State, Logic)
├── components/layout/
│   ├── AppHeader.tsx                  # 👉 Header chuẩn Slot Pattern (Compound Component)
│   └── MainLayout.tsx                 # 👉 Container bao bọc nội dung và header
└── navigation/
    ├── navigators/
    │   ├── MainStackNavigator.tsx    # 👉 Stack chính của ứng dụng
    │   ├── AuthStackNavigator.tsx    # 👉 Stack xác thực (Login, Register)
    │   └── MainDrawer.tsx            # 👉 Side menu drawer
    └── MainTabs.tsx                  # 👉 Bottom Tab bar
```

---

## 2. Quy Trình 3 Bước Chuẩn Thêm Màn Hình

### Bước 1: Khai báo Type an toàn
Mở file [src/shared/types/navigation.types.ts](file:///Users/quyet/Desktop/Teca/Mobile/base-react-navive/src/shared/types/navigation.types.ts).

Thêm tên màn hình và kiểu dữ liệu tham số (params) vào `MainStackParamList` (nếu là màn hình nằm trong Main Stack):

```typescript
export type MainStackParamList = {
  MainTabsScreen: undefined;
  CreateFeedbackScreen: undefined;
  SearchScreen: undefined;
  ProfileScreen: undefined;

  // 👉 THÊM MÀN HÌNH MỚI CỦA BẠN TẠI ĐÂY:
  // Nếu màn hình KHÔNG nhận param:
  NewsDetailScreen: undefined;

  // Nếu màn hình CÓ nhận param:
  OrderDetailScreen: {
    orderId: string;
    orderCode?: string;
  };
};
```

---

### Bước 2: Xây dựng Screen Component
Tạo file màn hình tại thư mục feature tương ứng, ví dụ:  
`src/features/order/screens/OrderDetailScreen.tsx`.

Áp dụng mẫu chuẩn Senior:
- Bọc bằng `MainLayout` và sử dụng `AppHeader` qua prop `headerNode`.
- Định kiểu chặt chẽ với `NativeStackScreenProps`.
- Sử dụng `React.memo` và `useCallback`.

```tsx
import React, { memo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '@/shared/types/navigation.types';
import { MainLayout, AppHeader } from '@/components/layout';
import { CustomText, AppIcon } from '@/components';
import { useTheme } from '@/shared/theme/use-theme';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

// Type props cho màn hình OrderDetailScreen
type Props = NativeStackScreenProps<MainStackParamList, 'OrderDetailScreen'>;

// Ảnh nền header (tùy chọn)
const HEADER_BG = require('@/assets/images/imgbgrheader.jpg');

export const OrderDetailScreen: React.FC<Props> = memo(({ route, navigation }) => {
  const theme = useTheme();
  
  // 1. Lấy dữ liệu an toàn từ params
  const { orderId, orderCode } = route.params;

  // 2. Các hàm xử lý sự kiện
  const handleShare = useCallback(() => {
    // Xử lý chia sẻ đơn hàng
    console.log('Chia sẻ đơn hàng:', orderId);
  }, [orderId]);

  return (
    <MainLayout
      enableScroll={false} // Mặc định false nếu bên dưới dùng FlashList/FlatList
      headerNode={
        <AppHeader
          title={`Đơn hàng #${orderCode || orderId}`}
          subtitle="Trạng thái: Đang xử lý"
          leftAction="back" // Tự động goBack() khi bấm
          backgroundImage={HEADER_BG}
          rightNode={
            <AppHeader.Action
              icon="share-variant"
              iconType="material"
              color={theme.colors.white}
              onPress={handleShare}
            />
          }
        />
      }
    >
      <View style={styles.content}>
        <CustomText variant="h5" weight="bold">
          Chi tiết đơn hàng {orderId}
        </CustomText>
        <CustomText variant="body" color="textSecondary" style={styles.desc}>
          Nội dung chi tiết của đơn hàng hiển thị tại đây.
        </CustomText>
      </View>
    </MainLayout>
  );
});

OrderDetailScreen.displayName = 'OrderDetailScreen';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateVerticalScale(16),
  },
  desc: {
    marginTop: moderateVerticalScale(8),
  },
});

export default OrderDetailScreen;
```

---

### Bước 3: Đăng ký vào Navigator
Mở file Navigator quản lý luồng màn hình đó:

#### Trường hợp A: Màn hình thuộc Main Flow
Mở [src/navigation/navigators/MainStackNavigator.tsx](file:///Users/quyet/Desktop/Teca/Mobile/base-react-navive/src/navigation/navigators/MainStackNavigator.tsx):

```tsx
import OrderDetailScreen from '@/features/order/screens/OrderDetailScreen';

export const MainStackNavigator: React.FC = () => {
  return (
    <MainStack.Navigator
      initialRouteName="MainTabsScreen"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <MainStack.Screen name="MainTabsScreen" component={MainTabs} />
      <MainStack.Screen name="CreateFeedbackScreen" component={CreateFeedbackScreenWrapper} />
      <MainStack.Screen name="SearchScreen" component={SearchScreenWrapper} />
      <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />

      {/* 👉 ĐĂNG KÝ MÀN HÌNH MỚI CỦA BẠN: */}
      <MainStack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
      />
    </MainStack.Navigator>
  );
};
```

#### Trường hợp B: Màn hình là 1 Tab ở thanh điều hướng dưới đáy
Mở [src/navigation/MainTabs.tsx](file:///Users/quyet/Desktop/Teca/Mobile/base-react-navive/src/navigation/MainTabs.tsx):

1. Khai báo tab name trong `MainTabParamList` ([src/shared/types/navigation.types.ts](file:///Users/quyet/Desktop/Teca/Mobile/base-react-navive/src/shared/types/navigation.types.ts)).
2. Thêm thẻ `<Tab.Screen>`:

```tsx
<Tab.Screen
  name="Orders"
  component={OrdersTabScreen}
  options={{
    tabBarLabel: 'Đơn hàng',
    tabBarIcon: ({ color, size }) => (
      <TabBarIcon name="shopping-bag" type="feather" color={color} size={size} />
    ),
    tabBarBadge: 2, // Hiển thị số badge đỏ trên icon (nếu có)
  }}
/>
```

---

## 3. Cách Điều Hướng & Truyền Nhận Dữ Liệu

### Từ bất kỳ màn hình nào chuyển sang màn hình mới:

```tsx
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '@/shared/types/navigation.types';

// Trong Component của bạn:
const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

// 1. Chuyển màn hình không có params:
navigation.navigate('SearchScreen');

// 2. Chuyển màn hình kèm params (TypeScript sẽ tự kiểm tra đúng kiểu dữ liệu):
navigation.navigate('OrderDetailScreen', {
  orderId: 'DH-12345',
  orderCode: 'ORD-9988',
});

// 3. Quay lại màn hình trước:
navigation.goBack();
```

---

## 4. Các Mẫu Thiết Kế Header Thực Tế Với AppHeader

Component `AppHeader` được thiết kế theo **Slot Pattern**, không dùng boolean flags rườm rà:

### 1. Header cơ bản (Back + Tiêu đề)
```tsx
<AppHeader
  title="Thông tin tài khoản"
  leftAction="back"
/>
```

### 2. Header màn hình chính có Menu Hamburger (Mở Drawer)
```tsx
<AppHeader
  title="Trang chủ"
  leftAction="menu"
/>
```

### 3. Header có nút hành động bên phải (Compound Component `AppHeader.Action`)
```tsx
<AppHeader
  title="Danh sách thông báo"
  leftAction="back"
  rightNode={
    <AppHeader.Action
      icon="check-all"
      iconType="material"
      onPress={() => markAllAsRead()}
    />
  }
/>
```

### 4. Header có nhiều nút bên phải + Badge đỏ thông báo
```tsx
<AppHeader
  title="Khám phá"
  leftAction="menu"
  rightNode={
    <>
      <AppHeader.Action
        icon="magnify"
        iconType="material"
        onPress={() => navigation.navigate('SearchScreen')}
      />
      <AppHeader.Action
        icon="bell-outline"
        iconType="material"
        badgeCount={5}
        onPress={() => navigation.navigate('NotificationScreen')}
      />
    </>
  }
/>
```

### 5. Header có nút Text ("Lưu", "Bỏ qua", "Gửi")
```tsx
<AppHeader
  title="Tạo báo cáo"
  leftAction="back"
  rightNode={
    <AppHeader.Action
      label="Gửi"
      disabled={isSubmitting}
      onPress={handleSubmit}
    />
  }
/>
```

### 6. Header có ảnh nền + Chữ trắng
```tsx
<AppHeader
  title="Dịch vụ công"
  leftAction="back"
  backgroundImage={require('@/assets/images/imgbgrheader.jpg')}
/>
```

---

## 5. Senior Code Review Checklist

Trước khi commit code màn hình mới, kiểm tra các tiêu chí sau:

- [ ] **Type Safety**: Đã định nghĩa params trong `navigation.types.ts` chưa? Không dùng `any` cho route hoặc navigation.
- [ ] **Virtualization Safety**: Nếu màn hình sử dụng `FlashList` hoặc `FlatList`, đã đặt `enableScroll={false}` trên `MainLayout` chưa (để tránh lồng `ScrollView` vào `VirtualizedList`)?
- [ ] **Slot Pattern**: Header sử dụng `AppHeader` với `rightNode` thay vì dùng các props boolean kiểu cũ.
- [ ] **Touch Target**: Các nút bấm trên Header có đạt kích thước tối thiểu 44x44pt (chuẩn Apple HIG & Android Material)?
- [ ] **Kiểm thử lệnh**:
  - `npx tsc --noEmit` -> Exit 0.
  - `npm run lint` -> Exit 0.
  - `npm test` -> Exit 0.
