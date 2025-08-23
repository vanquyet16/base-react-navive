## 📁 Cấu trúc thư mục

```
src/navigation/
├── config/
│   ├── navigationConfig.ts    # Cấu hình tất cả screens và navigation keys
│   └── index.ts              # Export config
├── factories/
│   ├── screenFactory.ts      # Factory pattern để tạo screen components
│   └── index.ts              # Export factories
├── RootNavigator.tsx         # Navigator gốc (Auth/Drawer)
├── DrawerNavigator.tsx       # Drawer navigation
├── MainStack.tsx            # Stack navigation chính
├── MainTabs.tsx             # Tab navigation
├── AuthStack.tsx            # Auth navigation
├── index.ts                 # Export chính
└── README.md               # Tài liệu này
```

## 🏗️ Kiến trúc Navigation

### 1. **RootNavigator** (Cấp cao nhất)

- Quản lý trạng thái authentication
- Chuyển đổi giữa Auth và Drawer navigation
- Sử dụng `NAVIGATION_KEYS.ROOT` cho tên screens

### 2. **DrawerNavigator** (Menu bên)

- Chứa MainStack
- Custom drawer content
- Sử dụng `NAVIGATION_KEYS.MAIN_STACK.MAIN_TABS`

### 3. **MainStack** (Stack navigation)

- Chứa MainTabs và các screens demo
- Sử dụng config từ `MAIN_STACK_SCREENS`
- Factory pattern để tạo screen wrappers

### 4. **MainTabs** (Bottom tabs)

- 4 tabs chính: Home, Profile, Settings, ResponsiveDemo
- Sử dụng `NAVIGATION_KEYS.TAB` cho tên screens
- Custom tab bar

### 5. **AuthStack** (Authentication)

- Login và Register screens
- Sử dụng `NAVIGATION_KEYS.AUTH` cho tên screens

## 🔧 Configuration Pattern

### Screen Configuration

```typescript
export interface ScreenConfig {
  title: string;
  component: () => Promise<any>;
  showHeader?: boolean;
  showTabs?: boolean;
  headerType?: 'minimal' | 'default' | 'full';
  gestureEnabled?: boolean;
  gestureDirection?: 'horizontal' | 'vertical';
  animationEnabled?: boolean;
}
```

### Navigation Keys

```typescript
export const NAVIGATION_KEYS = {
  ROOT: {
    DRAWER: 'Drawer',
    AUTH: 'Auth',
  },
  MAIN_STACK: {
    MAIN_TABS: 'MainTabs',
    // ... các screens khác
  },
  TAB: {
    HOME: 'Home',
    PROFILE: 'Profile',
    SETTINGS: 'Settings',
    RESPONSIVE_DEMO: 'ResponsiveDemo',
  },
  AUTH: {
    LOGIN: 'Login',
    REGISTER: 'Register',
  },
} as const;
```

## 🏭 Factory Pattern

### Screen Factory Functions

- `createMainStackScreenWrapper()` - Tạo wrapper cho main stack screens
- `createTabScreenWrapper()` - Tạo wrapper cho tab screens
- `createAuthScreenWrapper()` - Tạo wrapper cho auth screens
- `createHomeScreenWrapper()` - Tạo wrapper đặc biệt cho Home screen

### Batch Creation

- `createMainStackScreenWrappers()` - Tạo tất cả main stack wrappers
- `createTabScreenWrappers()` - Tạo tất cả tab wrappers
- `createAuthScreenWrappers()` - Tạo tất cả auth wrappers

## 📱 Screen Categories

### Main Stack Screens

1. **Product Management**
   - `ProductManagement` - Quản lý sản phẩm

2. **Lazy Loading Demos**
   - `LazyLoadingDemo` - Demo Lazy Loading
   - `LazyLoadingTest` - Bài Test Lazy Loading
   - `ApiLazyLoadingDemo` - API Lazy Loading Demo

3. **Cache Management**
   - `CacheManagementDemo` - Cache Demo

4. **PDF Features**
   - `PdfViewerDemo` - PDF Viewer Demo
   - `PdfFileManager` - Quản lý File PDF
   - `PdfAdvancedDemo` - PDF Advanced Demo

5. **Responsive & Performance**
   - `ResponsiveDemo` - Responsive Demo
   - `PerformanceMonitorDemo` - Performance Monitor Demo

### Tab Screens

- `Home` - Trang chủ (với search, notification)
- `Profile` - Hồ sơ
- `Settings` - Cài đặt
- `ResponsiveDemo` - Responsive Demo

### Auth Screens

- `Login` - Đăng nhập
- `Register` - Đăng ký

## 🚀 Lợi ích của kiến trúc mới

### 1. **Separation of Concerns**

- Config tách biệt khỏi components
- Factory pattern tách biệt logic tạo components
- Mỗi navigator có trách nhiệm rõ ràng

### 2. **Maintainability**

- Dễ dàng thêm/sửa/xóa screens
- Config tập trung tại một nơi
- Type safety với TypeScript

### 3. **Scalability**

- Dễ dàng mở rộng thêm screens
- Factory pattern cho phép tái sử dụng logic
- Navigation keys constants tránh hardcode

### 4. **Performance**

- Lazy loading cho tất cả screens
- Factory pattern tối ưu memory usage
- Config được tạo một lần duy nhất

### 5. **Developer Experience**

- Code dễ đọc và hiểu
- IntelliSense support tốt
- Debugging dễ dàng với display names

## 🔄 Cách thêm Screen mới

### 1. Thêm vào config

```typescript
// Trong navigationConfig.ts
export const MAIN_STACK_SCREENS: Record<string, ScreenConfig> = {
  NewScreen: {
    title: 'Màn hình mới',
    component: () => import('@/screens/NewScreen'),
    showHeader: true,
    showTabs: false,
    headerType: 'minimal',
  },
  // ...
};
```

### 2. Thêm navigation key

```typescript
export const NAVIGATION_KEYS = {
  MAIN_STACK: {
    // ...
    NEW_SCREEN: 'NewScreen',
  },
  // ...
};
```

### 3. Screen sẽ tự động được tạo trong MainStack

## 🎯 Best Practices

1. **Luôn sử dụng NAVIGATION_KEYS** thay vì hardcode strings
2. **Sử dụng factory functions** để tạo screen wrappers
3. **Tách biệt config** khỏi component logic
4. **Sử dụng TypeScript** cho type safety
5. **Thêm display names** cho debugging
6. **Sử dụng lazy loading** cho tất cả screens
7. **Tổ chức screens theo categories** trong config

## 🔍 Debugging

### Navigation Keys

```typescript
import { NAVIGATION_KEYS } from '@/navigation/config';
console.log('Navigation keys:', NAVIGATION_KEYS);
```

### Screen Configs

```typescript
import { getScreenConfig } from '@/navigation/config';
const config = getScreenConfig('ProductManagement');
console.log('Screen config:', config);
```

### Factory Functions

```typescript
import { createMainStackScreenWrapper } from '@/navigation/factories';
const wrapper = createMainStackScreenWrapper('NewScreen', config);
console.log('Wrapper display name:', wrapper.displayName);
```
