# Navigation Guide - CBS Mobile App

> Hướng dẫn chi tiết về navigation architecture và cách thêm screens/stacks mới

## 📚 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Adding New Screen](#adding-new-screen)
- [Adding New Stack](#adding-new-stack)
- [Type-Safe Navigation](#type-safe-navigation)
- [Best Practices](#best-practices)

---

## Architecture Overview

### Cấu trúc Navigation

```
navigation/
├── config/                    # Screen configurations
│   └── navigationConfig.ts   # MAIN_STACK_SCREENS, AUTH_SCREENS, TAB_SCREENS
│
├── factories/                 # Generic factory functions
│   ├── screenFactory.tsx     # Screen wrapper factories
│   ├── navigatorFactory.tsx  # Navigator factories (type-safe)
│   └── index.ts
│
├── navigators/                # Dedicated navigator components
│   ├── AuthStackNavigator.tsx
│   ├── MainStackNavigator.tsx
│   └── index.ts
│
└── MainTabs.tsx              # Bottom tab navigator
```

### Nguyên tắc

1. **Config-driven**: Screens được định nghĩa trong config, không hardcode
2. **Factory pattern**: Sử dụng generic factories để tạo navigators
3. **Type-safe**: 100% TypeScript với strict typing, không có `any`
4. **Separation of concerns**: Config → Factories → Navigators → Root

---

## Adding New Screen

### Quick Start

**3 bước đơn giản để thêm màn hình mới:**

1. Tạo screen component
2. Thêm vào config
3. Thêm type definition

### Step-by-Step

#### 1. Tạo Screen Component

```bash
# Location
src/features/<feature-name>/screens/NewScreen.tsx
```

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>New Screen</Text>
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

#### 2. Thêm vào Navigation Config

**File:** `src/navigation/config/navigationConfig.ts`

```typescript
export const MAIN_STACK_SCREENS: Record<string, ScreenConfig> = {
  // ... existing screens

  NewScreen: {
    title: 'New Screen Title',
    component: () => import('@/features/<feature-name>/screens/NewScreen'),
    showHeader: true,
    showTabs: false,
    headerType: 'minimal', // 'minimal' | 'default' | 'search'
    showBack: true,
  },
};
```

**Config Options:**

| Option       | Type                                 | Description                  | Default     |
| ------------ | ------------------------------------ | ---------------------------- | ----------- |
| `title`      | `string`                             | Tiêu đề hiển thị trên header | Required    |
| `component`  | `() => Promise<any>`                 | Lazy import function         | Required    |
| `showHeader` | `boolean`                            | Hiển thị header              | `true`      |
| `showTabs`   | `boolean`                            | Hiển thị bottom tabs         | `false`     |
| `headerType` | `'minimal' \| 'default' \| 'search'` | Loại header                  | `'minimal'` |
| `showBack`   | `boolean`                            | Hiển thị nút back            | `false`     |

#### 3. Thêm Type Definition

**File:** `src/shared/types/index.ts`

```typescript
export type MainStackParamList = {
  MainTabs: undefined;
  // ... existing screens

  NewScreen: undefined; // No params

  // Hoặc với params:
  // ProductDetail: { productId: string; categoryId?: number };
};
```

#### 4. Navigate

```tsx
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@/shared/types';

const MyComponent = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  return (
    <Button onPress={() => navigation.navigate('NewScreen')}>
      Go to New Screen
    </Button>
  );
};
```

**✅ Done!** Screen sẽ tự động:

- Được wrap với MainLayout
- Lazy loading
- Type-safe navigation

---

## Adding New Stack

### Use Cases

Tạo stack mới khi bạn có nhóm screens liên quan:

- **Settings Stack**: Settings Home, Account, Privacy, Notifications
- **Onboarding Stack**: Welcome, Tutorial, Permissions
- **Checkout Stack**: Cart, Shipping, Payment, Confirmation

### Example: Settings Stack

#### 1. Define Types

**File:** `src/shared/types/index.ts`

```typescript
// Settings Stack ParamList
export type SettingsStackParamList = {
  SettingsHome: undefined;
  AccountSettings: undefined;
  PrivacySettings: undefined;
  NotificationSettings: { enabled: boolean };
};

// Update Root ParamList
export type RootStackParamList = {
  Auth: undefined;
  MainStack: undefined;
  SettingsStack: undefined; // ← Add new stack
};
```

#### 2. Create Screen Components

```bash
# Create screens
src/features/settings/screens/
├── SettingsHomeScreen.tsx
├── AccountSettingsScreen.tsx
└── PrivacySettingsScreen.tsx
```

```tsx
// SettingsHomeScreen.tsx
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

#### 3. Define Screen Configs

**File:** `src/navigation/config/navigationConfig.ts`

```typescript
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

#### 4. Create Navigator Component

**File:** `src/navigation/navigators/SettingsStackNavigator.tsx`

```tsx
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsStackParamList } from '@/shared/types';
import { SETTINGS_STACK_SCREENS } from '@/navigation/config';
import { createMainStackNavigatorComponent } from '@/navigation/factories/navigatorFactory';

const SettingsStack = createStackNavigator<SettingsStackParamList>();

export const SettingsStackNavigator = createMainStackNavigatorComponent(
  SettingsStack,
  SETTINGS_STACK_SCREENS,
  {
    initialRouteName: 'SettingsHome',
    screenOptions: { headerShown: false },
  },
);
```

#### 5. Export Navigator

**File:** `src/navigation/navigators/index.ts`

```typescript
export { AuthStackNavigator } from './AuthStackNavigator';
export { MainStackNavigator } from './MainStackNavigator';
export { SettingsStackNavigator } from './SettingsStackNavigator';
```

#### 6. Add to Root Navigation

**File:** `src/app/app-navigator.tsx`

```tsx
import {
  AuthStackNavigator,
  MainStackNavigator,
  SettingsStackNavigator,
} from '@/navigation/navigators';

export const AppNavigator: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <RootStack.Screen name="MainStack" component={MainStackNavigator} />
            <RootStack.Screen
              name="SettingsStack"
              component={SettingsStackNavigator}
            />
          </>
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
```

#### 7. Navigate Between Stacks

```tsx
// Navigate to Settings Stack
navigation.navigate('SettingsStack', {
  screen: 'SettingsHome',
});

// Navigate to specific screen
navigation.navigate('SettingsStack', {
  screen: 'AccountSettings',
});

// With params
navigation.navigate('SettingsStack', {
  screen: 'NotificationSettings',
  params: { enabled: true },
});
```

---

## Type-Safe Navigation

### Basic Navigation

```tsx
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@/shared/types';

type NavigationProp = StackNavigationProp<MainStackParamList>;

const MyComponent = () => {
  const navigation = useNavigation<NavigationProp>();

  // ✅ Type-safe - autocomplete available
  navigation.navigate('ProductDetail', { productId: '123' });

  // ❌ TypeScript error - missing required params
  navigation.navigate('ProductDetail');
};
```

### Navigation with Params

**Define types:**

```typescript
export type MainStackParamList = {
  ProductDetail: {
    productId: string;
    variant?: string;
    fromScreen?: string;
  };
};
```

**Navigate:**

```tsx
navigation.navigate('ProductDetail', {
  productId: '123',
  variant: 'blue',
  fromScreen: 'Home',
});
```

**Access params in screen:**

```tsx
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '@/shared/types';

type ProductDetailRouteProp = RouteProp<MainStackParamList, 'ProductDetail'>;

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const { productId, variant, fromScreen } = route.params; // ← Type-safe

  return (
    <View>
      <Text>Product ID: {productId}</Text>
      <Text>Variant: {variant ?? 'default'}</Text>
      <Text>From: {fromScreen ?? 'unknown'}</Text>
    </View>
  );
};
```

### Composite Navigation Hook

```tsx
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '@/shared/types';

type ProductDetailNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ProductDetail'
>;
type ProductDetailRouteProp = RouteProp<MainStackParamList, 'ProductDetail'>;

const ProductDetailScreen = () => {
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const route = useRoute<ProductDetailRouteProp>();

  // Both navigation and route are fully typed
  const handleGoBack = () => navigation.goBack();
  const { productId } = route.params;

  return <View>...</View>;
};
```

---

## Best Practices

### 1. Always Use Type-Safe Navigation

```tsx
// ✅ GOOD - Type-safe
const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
navigation.navigate('ProductDetail', { productId: '123' });

// ❌ BAD - No type safety
const navigation = useNavigation();
navigation.navigate('ProductDetail'); // Can navigate with wrong params
```

### 2. Define Params Types Explicitly

```typescript
// ✅ GOOD - Clear param types
export type MainStackParamList = {
  ProductDetail: {
    productId: string; // Required
    variant?: string; // Optional
    fromScreen?: string; // Optional
  };
  ProductList: undefined; // No params
};

// ❌ BAD - Unclear types
export type MainStackParamList = {
  ProductDetail: any; // ❌ Never use any
};
```

### 3. Use Generic Factories

```tsx
// ✅ GOOD - Reusable generic factory
export const MyStackNavigator = createMainStackNavigatorComponent(
  MyStack,
  MY_SCREENS,
  { initialRouteName: 'Home' }
);

// ❌ BAD - Manual navigator creation with duplication
const MyStackNavigator = () => {
  const screens = /* ... manual mapping ... */;
  return <MyStack.Navigator>{screens}</MyStack.Navigator>;
};
```

### 4. Lazy Load Screens

```typescript
// ✅ GOOD - Lazy loading with dynamic import
component: () => import('@/features/product/screens/ProductDetailScreen'),

// ❌ BAD - Direct import
import ProductDetailScreen from '@/features/product/screens/ProductDetailScreen';
component: ProductDetailScreen,
```

### 5. Organize Screens by Feature

```
features/
├── products/
│   ├── screens/
│   │   ├── ProductListScreen.tsx
│   │   └── ProductDetailScreen.tsx
│   ├── components/
│   └── services/
└── settings/
    └── screens/
        └── SettingsScreen.tsx
```

### 6. Navigation Guards

```tsx
// Custom hook for protected navigation
const useProtectedNavigation = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const isAuthenticated = useIsAuthenticated();

  const navigateToProtectedScreen = useCallback(
    (screenName: keyof MainStackParamList, params?: any) => {
      if (!isAuthenticated) {
        navigation.navigate('Login');
        return;
      }
      navigation.navigate(screenName, params);
    },
    [isAuthenticated, navigation],
  );

  return { navigateToProtectedScreen };
};
```

---

## Checklists

### ✅ Adding New Screen Checklist

- [ ] Create screen component in `features/<name>/screens/`
- [ ] Add config to `MAIN_STACK_SCREENS` (navigationConfig.ts)
- [ ] Add type to `MainStackParamList` (types/index.ts)
- [ ] Test navigation works
- [ ] Test lazy loading works
- [ ] Test back button works (if applicable)

### ✅ Adding New Stack Checklist

- [ ] Define `<Stack>ParamList` type (types/index.ts)
- [ ] Add stack name to `RootStackParamList`
- [ ] Create screen components
- [ ] Create screen configs `<STACK>_SCREENS` (navigationConfig.ts)
- [ ] Create `<Stack>Navigator.tsx` in `navigators/`
- [ ] Export from `navigators/index.ts`
- [ ] Add `<RootStack.Screen>` to `app-navigator.tsx`
- [ ] Test navigation between stacks
- [ ] Test deep linking (if applicable)

---

## Troubleshooting

### TypeScript Errors

**"Type is not assignable to..."**

- Verify ParamList types match navigation config
- Check screen names are consistent
- Ensure params match type definitions

**"Property does not exist on type..."**

- Check export from navigators/index.ts
- Verify screen config export from navigationConfig.ts

### Runtime Errors

**"Unable to resolve module..."**

- Check import paths
- Verify lazy import syntax: `() => import(...)`
- Run `yarn start --reset-cache`

**"undefined is not an object (evaluating 'navigation.navigate')"**

- Ensure component is inside NavigationContainer
- Check navigation hook is called inside function component

---

**Made with ❤️ by Zamiga Team**
