# Base React Native

> **Production-ready** React Native application với New Architecture (Fabric + TurboModules), feature-based architecture, và enterprise-grade tooling.

[![React Native](https://img.shields.io/badge/React%20Native-0.83.1-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![New Architecture](https://img.shields.io/badge/New%20Architecture-Enabled-green)](https://reactnative.dev/docs/the-new-architecture/landing-page)

## 📑 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Dependencies](#-key-dependencies)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)

---

## 📖 Introduction

Đây là base project React Native chuẩn senior level, được xây dựng với các best practices hàng đầu như Feature-based architecture, Strict TypeScript, Generic Factory Pattern cho navigation, và New Architecture (Fabric).

## 🌟 Features

- ✅ **React Native 0.83.1** với New Architecture (Fabric + TurboModules)
- ✅ **TypeScript Strict Mode** - Type safety 100%, không dùng `any`
- ✅ **Feature-based Architecture** - Modular, scalable, maintainable
- ✅ **Generic Factory Pattern** - Navigation type-safe, reusable, no `any`
- ✅ **TanStack Query** - Server state management & Caching
- ✅ **Zustand** - Client state management (nhẹ nhàng, hiệu quả)
- ✅ **React Navigation v7** - Routing mới nhất với nested navigation
- ✅ **Ant Design Mobile** - UI Components chuẩn design system
- ✅ **React Hook Form** - Form validation hiệu năng cao
- ✅ **SVG & Vector Icons** - Hỗ trợ tốt graphics
- ✅ **Path Aliases** (`@/components`, `@/features`, etc.)

## 📋 Prerequisites

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt môi trường:

- **Node.js**: >= 20.x
- **Yarn**: Latest version (Recommended)
- **Xcode**: 15+ (cho iOS)
- **Android Studio**: Latest (cho Android)
- **Ruby**: 2.7+ (cho CocoaPods)
- **CocoaPods**: 1.15+

Xem hướng dẫn chi tiết tại [React Native Environment Setup](https://reactnative.dev/docs/environment-setup).

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <repository-url>
cd BaseReactNative
npm install                      # dùng npm (package-lock.json là lockfile duy nhất)
cd ios && pod install && cd ..   # macOS
```

### 2. Chạy app

```bash
npm start                # Metro
npm run android:dev      # Android, flavor dev (server nội bộ)
npm run ios:dev          # iOS, server nội bộ
```

### 3. Xuất APK theo môi trường

```bash
npm run apk:dev          # APK trỏ server dev — gửi tester nội bộ
npm run apk:staging      # APK staging (cấu hình như prod, server staging)
npm run apk:prod         # APK production — tự chặn nếu cấu hình chưa đạt
npm run ios:prod         # iOS bản Release, server prod
npm run archive:ios:prod # iOS archive để phát hành
```

Chi tiết: [docs/API_CONFIG_GUIDE.md](docs/API_CONFIG_GUIDE.md)

## 📁 Project Structure

Cấu trúc dự án theo hướng Feature-based architecture với **Generic Factory Pattern** cho navigation:

```
src/
├── app/                      # App entry, providers & root navigation
│   ├── app-navigator.tsx    # Root navigation (Auth/Drawer switching)
│   ├── app-providers.tsx    # Global providers (Query, Theme, etc.)
│   ├── app-root.tsx         # App entry point
│   └── hooks/               # App-level hooks (useAppInit, etc.)
│
├── assets/                   # Static resources
│   ├── fonts/               # Font files
│   ├── icons/               # SVG icons & icon components
│   └── images/              # Image assets
│
├── components/               # Shared UI components (domain-agnostic)
│   ├── antd/                # Ant Design custom wrappers
│   ├── base/                # Base atomic components
│   │   ├── CustomButton.tsx
│   │   ├── CustomInput.tsx
│   │   ├── CustomText.tsx
│   │   ├── CustomCard.tsx
│   │   ├── CustomBadge.tsx
│   │   ├── Avatar.tsx
│   │   ├── Logo.tsx
│   │   └── ...
│   ├── form/                # Form wrapper components
│   ├── layout/              # Layout components (Screen, Container, etc.)
│   ├── navigation/          # Navigation UI dùng chung (TabBar, TabNavigator) — CustomDrawer nằm ở src/navigation/components
│   └── utility/             # Utility components (ErrorBoundary, LazyScreen, etc.)
│
├── features/                 # Feature modules (domain-driven)
│   ├── auth/                # Authentication feature
│   │   ├── components/      # Auth-specific UI components
│   │   ├── hooks/           # Auth hooks (useLogin, useAuth)
│   │   ├── screens/         # Auth screens (LoginScreen, etc.)
│   │   ├── services/        # Auth API services
│   │   ├── store/           # Auth state (Zustand)
│   │   └── types/           # Auth TypeScript types
│   │
│   ├── home/                # Home feature
│   ├── profile/             # Profile feature
│   ├── performance/         # Performance feature
│   └── example/             # Example/Demo feature
│
├── navigation/               # Navigation configuration & factories
│   ├── config/              # ⚙️ Screen configs & route constants
│   │   └── navigationConfig.ts  # Screen definitions & NAVIGATION_KEYS
│   │
│   ├── factories/           # 🏭 Generic factory functions
│   │   ├── screenFactory.tsx    # Screen wrapper factories (MainLayout + LazyScreen)
│   │   ├── navigatorFactory.tsx # Navigator factories (type-safe, no `any`)
│   │   └── index.ts
│   │
│   ├── navigators/          # 🧭 Dedicated navigator components
│   │   ├── AuthStackNavigator.tsx   # Auth flow navigator
│   │   ├── MainStackNavigator.tsx   # Main app navigator (uses factory)
│   │   ├── DrawerNavigator.tsx      # Drawer UI layer (menu + swipe gesture)
│   │   ├── DrawerStackNavigator.tsx # Drawer content layer (screens trong drawer)
│   │   └── index.ts
│   │
│   ├── MainTabs.tsx         # Bottom tab navigator
│   └── index.ts
│
├── shared/                   # Shared utilities & configurations
│   ├── config/              # App configuration (env, API URLs, etc.)
│   ├── constants/           # App constants (enums, keys, routes)
│   ├── hooks/               # Shared hooks (useDebounce, useNetwork, etc.)
│   ├── query/               # TanStack Query setup & utilities
│   ├── services/            # Shared services (API client, Storage, etc.)
│   ├── store/               # Shared Zustand stores
│   ├── theme/               # Design system (colors, spacing, typography)
│   │   ├── tokens.ts        # Design tokens
│   │   ├── theme.ts         # Theme configuration
│   │   ├── create-styles.ts # StyleSheet helper with theme
│   │   └── use-theme.ts     # useTheme hook
│   ├── types/               # Shared TypeScript types & models
│   └── utils/               # Utility functions
```

### Nguyên tắc tổ chức

- **`shared/`**: Code dùng chung, không phụ thuộc domain cụ thể
- **`components/`**: UI components có thể tái sử dụng, không chứa business logic
- **`features/`**: Module theo domain, chứa đầy đủ components/hooks/services/screens riêng
- **`navigation/`**: Navigation architecture với generic factories (type-safe, no `any`)
  - **`factories/`**: Generic factory functions (tái sử dụng cho nhiều navigator)
  - **`navigators/`**: Navigator components cụ thể (AuthStack, MainStack, DrawerStack, Drawer)
- **`app/`**: Entry point, global setup, root navigation

### Navigation Architecture

Cấu trúc navigation theo **separation of concerns** pattern:

```
Root Navigator (app-navigator.tsx)
├── Auth Stack (AuthStackNavigator)
│   ├── Login
│   └── Register
│
└── Drawer Navigator (DrawerNavigator - UI layer)
    └── Drawer Stack (DrawerStackNavigator - Content layer)
        ├── MainTabs (shortcut route)
        ├── ProductScreen (shortcut route)
        ├── LazyDemoScreen (shortcut route)
        └── ... (các routes khác)
            └── Main Stack Navigator (MainStackNavigator)
                ├── MainTabs (Bottom Tabs)
                │   ├── Home
                │   ├── Profile
                │   ├── Settings
                │   └── ResponsiveDemo
                └── Feature Screens
                    ├── ProductScreen
                    ├── LazyDemoScreen
                    └── ...
```

**Pattern:**
- **DrawerNavigator**: UI layer (drawer menu, swipe gesture, CustomDrawer component)
- **DrawerStackNavigator**: Content layer (Stack chứa các screens trong drawer)
- **MainStackNavigator**: Main app flow (tabs + feature screens)
- **Type-safe**: Tất cả navigation đều type-safe với `ParamList`, không dùng `any`
- **Factory Pattern**: `MainStackNavigator` và `AuthStackNavigator` dùng generic factory từ config

## 🔧 Configuration

### Môi trường

Mỗi flavor Android (`dev` / `staging` / `prod`) nhúng file `.env.<flavor>` tương ứng qua `react-native-config`. Toàn bộ cấu hình được đọc và validate tại `src/shared/config/env.ts`. **Không đặt secret trong `.env`.**

### Path Aliases

```typescript
import { CustomButton } from '@/components/base/CustomButton';
import { useLogin } from '@/features/auth';
import { API_URLS, ENV } from '@/shared/config';
```

### Ranh giới kiến trúc (ESLint ép buộc)

```
app → navigation → features → components → shared
```

- `shared` không import tầng trên; `components` không import `features`/`navigation`/`app`.
- Feature không import chéo feature khác; từ `navigation` chỉ được dùng hằng số route.
- Mọi thay đổi phiên đăng nhập đi qua `sessionManager` (`src/features/auth/session`).

## 📦 Key Dependencies

| Package | Usage |
| --- | --- |
| `react-native` 0.83 / React 19 | Core |
| `@tanstack/react-query` v5 | Server state (dữ liệu API, hồ sơ user) |
| `zustand` v5 | Client state (trạng thái phiên, settings) |
| `react-native-mmkv` | Lưu phiên đăng nhập và settings |
| `react-native-config` | Cấu hình theo môi trường |
| `react-hook-form` v7 | Form |
| `@ant-design/react-native` v5 | UI + Toast |

## 🛠️ Development

### Scripts

```bash
npm run typecheck     # tsc --noEmit
npm run lint          # ESLint (gồm luật ranh giới kiến trúc)
npm test              # Jest
npm run verify        # cả ba — chạy trước khi commit / trên CI
```

---

## 📱 Adding New Screens & Stacks

### ✅ CASE 1: Thêm màn hình mới vào Main Stack

> **Khi nào dùng:** Thêm một màn hình đơn lẻ vào ứng dụng chính (sau khi đã login)

#### Bước 1: Tạo Screen Component

**File:** `src/features/<feature-name>/screens/NewScreen.tsx`

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * NewScreen - Mô tả màn hình
 */
const NewScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>New Screen Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewScreen;
```

#### Bước 2: Thêm vào Navigation Config

**File:** `src/navigation/config/navigationConfig.ts`

```typescript
export const MAIN_STACK_SCREENS: Record<string, ScreenConfig> = {
  // ... existing screens

  // ✨ Thêm màn hình mới
  NewScreen: {
    title: 'Tiêu đề màn hình',
    component: () => import('@/features/<feature-name>/screens/NewScreen'),
    showHeader: true, // Hiển thị header
    showTabs: false, // Ẩn bottom tabs
    headerType: 'minimal', // Loại header: 'minimal' | 'default' | 'search'
    showBack: true, // Hiển thị nút back
  },
};
```

#### Bước 3: Thêm Type Definition

**File:** `src/shared/types/index.ts`

```typescript
export type MainStackParamList = {
  MainTabs: undefined;
  ProductScreen: undefined;
  // ... existing screens

  // ✨ Thêm type cho screen mới
  NewScreen: undefined; // Không có params
  // Hoặc nếu cần params:
  // ProductDetail: { productId: string; categoryId?: number };
};
```

#### Bước 4: Navigate đến màn hình

**Từ MainStack (trong app):**

```tsx
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@/shared/types';

const MyComponent = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  const handlePress = () => {
    // Navigate đến màn hình mới trong MainStack
    navigation.navigate('NewScreen');

    // Hoặc với params (nếu có):
    // navigation.navigate('ProductDetail', {
    //   productId: '123',
    //   categoryId: 5
    // });
  };

  return <Button onPress={handlePress}>Go to New Screen</Button>;
};
```

**Từ Drawer Menu (CustomDrawer):**

Nếu muốn thêm vào drawer menu, cần:

1. Thêm route vào `DrawerStackParamList` trong `shared/types/index.ts`:
```typescript
export type DrawerStackParamList = {
  MainTabs: NavigatorScreenParams<MainStackParamList>;
  ProductScreen: NavigatorScreenParams<MainStackParamList>;
  // ... existing routes
  NewScreen: NavigatorScreenParams<MainStackParamList>; // ← Thêm
};
```

2. Thêm screen vào `DrawerStackNavigator.tsx`:
```tsx
<DrawerStack.Screen
  name="NewScreen"
  component={MainStackNavigator}
  initialParams={{ screen: 'NewScreen' }}
/>
```

3. Thêm key vào `NAVIGATION_KEYS.DRAWER_STACK` trong `navigationConfig.ts`:
```typescript
DRAWER_STACK: {
  // ... existing keys
  NEW_SCREEN: 'NewScreen', // ← Thêm
}
```

4. Thêm vào `menuItems` trong `src/navigation/components/CustomDrawer.tsx`:
```tsx
{
  label: 'Màn hình mới',
  icon: 'star',
  screen: NAVIGATION_KEYS.DRAWER_STACK.NEW_SCREEN,
}
```

#### ✅ Xong! Không cần code thêm

Màn hình sẽ **tự động:**

- ✅ Được wrap với `MainLayout` (header + layout)
- ✅ Lazy loading khi cần
- ✅ Type-safe navigation
- ✅ Header được quản lý theo config

---

### 🚀 CASE 2: Thêm Stack Navigator mới

> **Khi nào dùng:** Tạo một nhóm màn hình liên quan (flow riêng biệt), ví dụ: Settings Stack, Onboarding Stack, Checkout Stack

**Ví dụ:** Tạo Settings Stack với 3 màn hình (Settings Home, Account, Privacy)

#### Bước 1: Định nghĩa ParamList Types

**File:** `src/shared/types/index.ts`

```typescript
// ✨ Thêm Settings Stack ParamList
export type SettingsStackParamList = {
  SettingsHome: undefined;
  AccountSettings: undefined;
  PrivacySettings: undefined;
  NotificationSettings: { enabled: boolean }; // Với params
};

// Update RootStackParamList
export type RootStackParamList = {
  Auth: undefined;
  Drawer: undefined; // Drawer wrap toàn bộ Main flow
  SettingsStack: undefined; // ← Thêm stack mới (nếu cần)
};
```

#### Bước 2: Tạo Screen Components

**File:** `src/features/settings/screens/SettingsHomeScreen.tsx`

```tsx
import React from 'react';
import { View, Text } from 'react-native';

const SettingsHomeScreen: React.FC = () => {
  return (
    <View>
      <Text>Settings Home</Text>
    </View>
  );
};

export default SettingsHomeScreen;
```

**Lặp lại cho:** `AccountSettingsScreen.tsx`, `PrivacySettingsScreen.tsx`, etc.

#### Bước 3: Định nghĩa Screen Configs

**File:** `src/navigation/config/navigationConfig.ts`

```typescript
// ✨ Thêm config cho Settings screens
export const SETTINGS_STACK_SCREENS: Record<string, ScreenConfig> = {
  SettingsHome: {
    title: 'Cài đặt',
    component: () => import('@/features/settings/screens/SettingsHomeScreen'),
    showHeader: true,
    headerType: 'default',
  },
  AccountSettings: {
    title: 'Tài khoản',
    component: () =>
      import('@/features/settings/screens/AccountSettingsScreen'),
    showHeader: true,
    showBack: true,
  },
  PrivacySettings: {
    title: 'Quyền riêng tư',
    component: () =>
      import('@/features/settings/screens/PrivacySettingsScreen'),
    showHeader: true,
    showBack: true,
  },
};
```

#### Bước 4: Tạo Navigator Component

**File:** `src/navigation/navigators/SettingsStackNavigator.tsx`

```tsx
/**
 * SETTINGS STACK NAVIGATOR
 * =========================
 * Navigator cho settings flow
 *
 * @senior-pattern Separation of concerns và type-safe navigation
 */

import { createStackNavigator } from '@react-navigation/stack';
import { SettingsStackParamList } from '@/shared/types';
import { SETTINGS_STACK_SCREENS } from '@/navigation/config';
import { createMainStackNavigatorComponent } from '@/navigation/factories/navigatorFactory';

/**
 * Settings Stack Navigator instance
 * Typed với SettingsStackParamList
 */
const SettingsStack = createStackNavigator<SettingsStackParamList>();

/**
 * Settings Stack Navigator Component
 * Tự động tạo từ config sử dụng generic factory
 */
export const SettingsStackNavigator = createMainStackNavigatorComponent(
  SettingsStack,
  SETTINGS_STACK_SCREENS,
  {
    initialRouteName: 'SettingsHome',
    screenOptions: { headerShown: false },
  },
);
```

#### Bước 5: Export Navigator

**File:** `src/navigation/navigators/index.ts`

```typescript
export { AuthStackNavigator } from './AuthStackNavigator';
export { MainStackNavigator } from './MainStackNavigator';
export { DrawerNavigator } from './DrawerNavigator';
export { DrawerStackNavigator } from './DrawerStackNavigator';
export { SettingsStackNavigator } from './SettingsStackNavigator'; // ← Thêm
```

#### Bước 6: Thêm vào Root Navigation

**File:** `src/app/app-navigator.tsx`

```tsx
import {
  AuthStackNavigator,
  DrawerNavigator,
  SettingsStackNavigator, // ← Import
} from '@/navigation/navigators';

export const AppNavigator: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <RootStack.Screen name="Drawer" component={DrawerNavigator} />
            {/* ✨ Thêm Settings Stack (nếu cần) */}
            {/* <RootStack.Screen
              name="SettingsStack"
              component={SettingsStackNavigator}
            /> */}
          </>
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
```

#### Bước 7: Navigate to Settings Stack

```tsx
// Từ Root navigate sang Settings Stack
navigation.navigate('SettingsStack', {
  screen: 'SettingsHome', // Initial screen
});

// Hoặc navigate trực tiếp đến specific screen
navigation.navigate('SettingsStack', {
  screen: 'AccountSettings',
});

// Với params
navigation.navigate('SettingsStack', {
  screen: 'NotificationSettings',
  params: { enabled: true },
});
```

---

### 📋 Quick Reference

#### Checklist: Thêm màn hình mới vào MainStack

- [ ] Tạo screen component trong `features/<name>/screens/`
- [ ] Thêm config vào `MAIN_STACK_SCREENS` (navigationConfig.ts)
- [ ] Thêm type vào `MainStackParamList` (types/index.ts)
- [ ] Navigate: `navigation.navigate('ScreenName')`

#### Checklist: Thêm màn hình vào Drawer Menu

- [ ] Thêm type vào `DrawerStackParamList` (types/index.ts)
- [ ] Thêm screen vào `DrawerStackNavigator.tsx` với `initialParams`
- [ ] Thêm key vào `NAVIGATION_KEYS.DRAWER_STACK` (navigationConfig.ts)
- [ ] Thêm menu item vào `CustomDrawer.tsx` với `NAVIGATION_KEYS.MAIN_STACK.*`

#### Checklist: Thêm stack mới

- [ ] Định nghĩa `<Stack>ParamList` type (types/index.ts)
- [ ] Thêm stack name vào `RootStackParamList`
- [ ] Tạo screen components
- [ ] Tạo screen configs `<STACK>_SCREENS` (navigationConfig.ts)
- [ ] Tạo `<Stack>Navigator.tsx` trong `navigators/`
- [ ] Export từ `navigators/index.ts`
- [ ] Thêm `<RootStack.Screen>` vào `app-navigator.tsx`

---

### 💡 Best Practices

**1. Type-safe Navigation**

```tsx
// ✅ ĐÚNG - Type-safe với autocomplete
type NavigationProp = StackNavigationProp<MainStackParamList>;
const navigation = useNavigation<NavigationProp>();
navigation.navigate('ProductDetail', { productId: '123' }); // ← Type-checked

// ❌ SAI - Không type-safe
navigation.navigate('ProductDetail'); // Missing params, no error!
```

**2. Screen với Params**

```typescript
// Define types
export type MainStackParamList = {
  ProductDetail: { productId: string; variant?: string };
};

// Navigate với params
navigation.navigate('ProductDetail', {
  productId: '123',
  variant: 'blue',
});

// Access params trong screen
import { RouteProp } from '@react-navigation/native';

type ProductDetailRouteProp = RouteProp<MainStackParamList, 'ProductDetail'>;

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const { productId, variant } = route.params; // ← Type-safe

  return <Text>Product: {productId}</Text>;
};
```

**3. Reuse Generic Factory**

```tsx
// Generic factory tự động handle mọi stack type
export const MyStackNavigator = createMainStackNavigatorComponent(
  MyStack,
  MY_SCREENS,
  { initialRouteName: 'Home' },
);
// ✅ Type-safe, no `any`, reusable
```

**4. Drawer Navigation Pattern**

```tsx
// ✅ ĐÚNG - Navigate từ Drawer menu
// CustomDrawer.tsx
const handleNavigation = (screenName: keyof DrawerStackParamList) => {
  props.navigation.navigate(ROOT_STACKS.DRAWER_STACK, { screen: screenName });
  props.navigation.closeDrawer();
};

// Menu items dùng NAVIGATION_KEYS.DRAWER_STACK.*
const menuItems: DrawerMenuItem[] = [
  {
    label: 'Trang chủ',
    icon: 'home',
    screen: NAVIGATION_KEYS.DRAWER_STACK.MAIN_TABS, // ← Type-safe
  },
];
```

---

### Adding New Feature Module

1. Tạo thư mục trong `src/features/<feature-name>`
2. Tuân thủ cấu trúc:
   ```
   features/
   └── <feature-name>/
       ├── components/    # Feature-specific components
       ├── screens/       # Screen components
       ├── hooks/         # Custom hooks
       ├── services/      # API services
       ├── types/         # TypeScript types
       └── index.ts       # Public exports
   ```
3. Export public API qua `index.ts`
4. Follow navigation guides above để thêm screens

## 🐛 Troubleshooting

<details>
<summary><b>Lỗi: "Unrecognized View" hoặc "Uni" (hộp màu hồng)</b></summary>

- Nguyên nhân: Native module chưa được link/build.
- Khắc phục:
  ```bash
  cd ios && pod install && cd ..
  npm run ios (hoặc npm run android:dev)
  ```
  </details>

<details>
<summary><b>Lỗi Metro Bundler</b></summary>

- Khắc phục: Reset cache
  ```bash
  npm start -- --reset-cache
  ```
  </details>

## 🤝 Contributing

1. Tạo branch: `git checkout -b feature/tên-tính-năng`.
2. Commit: `git commit -m "feat: mô tả tính năng"`.
3. Push: `git push origin feature/tên-tính-năng`.
4. Tạo Merge Request.

---

**Made with ❤️ by Zamiga Team**
