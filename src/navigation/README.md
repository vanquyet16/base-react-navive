# Hướng Dẫn Kiến Trúc Navigation (Senior Standard)

Hệ thống điều hướng đã được tái cấu trúc theo mô hình **Declarative Routing** chuẩn của **React Navigation v7**, loại bỏ hoàn toàn tầng **Factory Pattern** và mô hình **God Component Header** (25 boolean flags) gây cồng kềnh, khó debug.

> 📖 **Xem hướng dẫn chi tiết đầy đủ tại**: [NAVIGATION_GUIDE.md](../../NAVIGATION_GUIDE.md)

---

## 📁 Cấu Trúc Thư Mục

```
src/navigation/
├── navigators/
│   ├── AuthStackNavigator.tsx      # Luồng Login, Register
│   ├── MainStackNavigator.tsx      # Luồng Main App (Tabs + Screens)
│   └── MainDrawer.tsx              # Side Drawer Navigator (bọc trực tiếp MainStack)
├── config/
│   └── navigationConfig.ts         # Constants NAVIGATION_KEYS
├── MainTabs.tsx                    # Bottom Tabs chính
└── index.ts
```

---

## 🚀 Cách Thêm Màn Hình Mới (Quy Trình Chuẩn 3 Bước)

### Bước 1: Khai báo Type trong `src/shared/types/navigation.types.ts`

Mọi màn hình đều phải có type an toàn:

```typescript
export type MainStackParamList = {
  MainTabsScreen: undefined;
  CreateFeedbackScreen: undefined;
  SearchScreen: undefined;
  ProfileScreen: undefined;
  // 👉 Thêm màn hình mới tại đây:
  OrderDetailScreen: { orderId: string };
};
```

---

### Bước 2: Tạo Screen Component trong Feature Folder

Sử dụng `ScreenContainer` hoặc `MainLayout` kết hợp với `AppHeader` theo **Slot Pattern**:

```tsx
import React, { memo } from 'react';
import { View } from 'react-native';
import { MainLayout, AppHeader } from '@/components/layout';
import { CustomText } from '@/components';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '@/shared/types/navigation.types';

type Props = NativeStackScreenProps<MainStackParamList, 'OrderDetailScreen'>;

export const OrderDetailScreen: React.FC<Props> = memo(({ route, navigation }) => {
  const { orderId } = route.params;

  return (
    <MainLayout
      headerNode={
        <AppHeader
          title={`Đơn hàng #${orderId}`}
          leftAction="back"
          rightNode={
            <AppHeader.Action
              icon="share-variant"
              iconType="material"
              onPress={() => console.log('Share')}
            />
          }
        />
      }
    >
      <View>
        <CustomText>Chi tiết đơn hàng {orderId}</CustomText>
      </View>
    </MainLayout>
  );
});

OrderDetailScreen.displayName = 'OrderDetailScreen';
export default OrderDetailScreen;
```

---

### Bước 3: Đăng ký Screen vào `MainStackNavigator.tsx`

Khai báo trực tiếp bằng thẻ `<MainStack.Screen>`:

```tsx
// src/navigation/navigators/MainStackNavigator.tsx
<MainStack.Navigator screenOptions={{ headerShown: false }}>
  {/* Các screen khác */}
  <MainStack.Screen
    name="OrderDetailScreen"
    component={OrderDetailScreen}
  />
</MainStack.Navigator>
```

---

## 🎯 Chuẩn Thiết Kế Header (`AppHeader`)

Không dùng `showSearch`, `showNotification`, `showShare` (Boolean Prop Proliferation). Sử dụng **Slot Pattern**:

```tsx
<AppHeader
  title="Tiêu đề màn hình"
  subtitle="Mô tả phụ (tùy chọn)"
  leftAction="back" // 'back' | 'menu' | 'none' hoặc Custom ReactNode
  onLeftPress={() => navigation.goBack()}
  rightNode={
    <>
      <AppHeader.Action
        icon="magnify"
        iconType="material"
        onPress={handleSearch}
      />
      <AppHeader.Action
        icon="bell-outline"
        iconType="material"
        badgeCount={3}
        onPress={handleNotification}
      />
    </>
  }
/>
```
