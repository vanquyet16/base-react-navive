# Hướng dẫn sử dụng Custom Components

## CustomHeader

Component header tùy chỉnh với nhiều tính năng như tìm kiếm, thông báo, menu và profile.

### Props

```typescript
interface CustomHeaderProps {
  title?: string; // Tiêu đề header
  subtitle?: string; // Phụ đề (hiển thị dưới title)
  showProfile?: boolean; // Hiển thị avatar profile
  showBack?: boolean; // Hiển thị nút back
  showSearch?: boolean; // Hiển thị nút search
  showNotification?: boolean; // Hiển thị nút thông báo
  showMenu?: boolean; // Hiển thị nút menu
  onBack?: () => void; // Callback khi nhấn nút back
  onSearch?: (text: string) => void; // Callback khi tìm kiếm
  onNotificationPress?: () => void; // Callback khi nhấn thông báo
  onMenuPress?: () => void; // Callback khi nhấn menu
  rightComponent?: React.ReactNode; // Component tùy chỉnh bên phải
  backgroundColor?: string; // Màu nền header
  textColor?: string; // Màu chữ
  type?: 'default' | 'search' | 'minimal'; // Kiểu hiển thị
  notificationCount?: number; // Số lượng thông báo
}
```

### Cách sử dụng

```tsx
import {CustomHeader} from '@/components';

// Header cơ bản
<CustomHeader
  title="Trang chủ"
  showProfile={true}
/>

// Header với tìm kiếm và thông báo
<CustomHeader
  title="Ứng dụng của tôi"
  subtitle="Chào mừng bạn"
  showSearch={true}
  showNotification={true}
  notificationCount={5}
  onSearch={(text) => console.log('Tìm kiếm:', text)}
  onNotificationPress={() => console.log('Mở thông báo')}
/>

// Header minimal
<CustomHeader
  title="Chi tiết"
  showBack={true}
  onBack={() => navigation.goBack()}
  type="minimal"
/>
```

## CustomBottomBar

Component bottom navigation tùy chỉnh với animation và hiệu ứng đẹp.

### Props

```typescript
interface CustomBottomBarProps {
  tabs: TabItem[]; // Danh sách tabs
  activeTab: string; // Tab đang active
  onTabPress: (tabKey: string) => void; // Callback khi nhấn tab
  backgroundColor?: string; // Màu nền
  activeColor?: string; // Màu khi active
  inactiveColor?: string; // Màu khi không active
  showLabels?: boolean; // Hiển thị label
  animationType?: 'slide' | 'scale' | 'fade'; // Kiểu animation
  style?: any; // Style tùy chỉnh
}

interface TabItem {
  key: string; // Key duy nhất của tab
  icon: string; // Tên icon (Material Icons)
  label: string; // Label hiển thị
  badge?: number; // Số badge (thông báo)
  disabled?: boolean; // Vô hiệu hóa tab
}
```

### Cách sử dụng

```tsx
import {CustomBottomBar, BottomBarTab} from '@/components';

// Sử dụng với BottomBarTab có sẵn
const tabs = [
  BottomBarTab.Home,
  {...BottomBarTab.Search, badge: 3},
  BottomBarTab.Favorites,
  BottomBarTab.Profile,
];

<CustomBottomBar
  tabs={tabs}
  activeTab="home"
  onTabPress={tabKey => setActiveTab(tabKey)}
  showLabels={true}
  animationType="slide"
/>;

// Tạo tabs tùy chỉnh
const customTabs = [
  {
    key: 'dashboard',
    icon: 'dashboard',
    label: 'Bảng điều khiển',
  },
  {
    key: 'orders',
    icon: 'receipt',
    label: 'Đơn hàng',
    badge: 12,
  },
  {
    key: 'customers',
    icon: 'people',
    label: 'Khách hàng',
  },
];
```

### BottomBarTab có sẵn

```typescript
BottomBarTab.Home; // Trang chủ
BottomBarTab.Search; // Tìm kiếm
BottomBarTab.Favorites; // Yêu thích
BottomBarTab.Profile; // Hồ sơ
BottomBarTab.Settings; // Cài đặt
BottomBarTab.Cart; // Giỏ hàng
BottomBarTab.Notifications; // Thông báo
BottomBarTab.Messages; // Tin nhắn
```

## Ví dụ hoàn chỉnh

Xem file `ExampleUsage.tsx` để biết cách kết hợp và sử dụng cả hai component trong một ứng dụng hoàn chỉnh.

## Tính năng nổi bật

### CustomHeader

- 🔍 Tìm kiếm với animation mượt mà
- 🔔 Thông báo với badge số lượng
- 👤 Profile avatar
- 🎨 Tùy chỉnh màu sắc và style
- 📱 3 kiểu hiển thị: default, search, minimal

### CustomBottomBar

- 🎬 Animation slide indicator
- 📊 Scale animation khi nhấn
- 🔵 Badge thông báo cho từng tab
- 🎨 Tùy chỉnh màu sắc
- 🚫 Vô hiệu hóa tab
- 📱 Responsive design

## Lưu ý

- Cả hai component đều tương thích với React Navigation
- Sử dụng Material Icons từ react-native-vector-icons
- Tương thích với cả iOS và Android
- Hỗ trợ TypeScript đầy đủ
