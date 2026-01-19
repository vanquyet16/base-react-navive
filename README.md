# Base React Native 0.83

> **Production-ready** React Native boilerplate với New Architecture (Fabric + TurboModules), feature-based architecture, và enterprise-grade tooling.

[![React Native](https://img.shields.io/badge/React%20Native-0.83.1-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![New Architecture](https://img.shields.io/badge/New%20Architecture-Enabled-green)](https://reactnative.dev/docs/the-new-architecture/landing-page)

## 🌟 Features

- ✅ **React Native 0.83.1** với New Architecture (Fabric + TurboModules)
- ✅ **TypeScript** strict mode với senior-level code standards
- ✅ **Feature-based Architecture** - modular, scalable, maintainable
- ✅ **TanStack Query** (React Query) cho data fetching & caching
- ✅ **Zustand** cho global state management
- ✅ **React Navigation v7** với custom Bottom Tabs, Drawer, Stack
- ✅ **Ant Design Mobile** components với custom wrappers
- ✅ **Axios** với interceptors, error handling, retry logic
- ✅ **Path Aliases** (`@/components`, `@/features`, etc.)
- ✅ **Yoga API Patch** - fixed compatibility issue với New Architecture
- ✅ **Enterprise tooling**: ESLint, Prettier, patch-package

## 📋 Prerequisites

- **Node.js**: >= 20.x
- **npm** hoặc **Yarn**: Latest version
- **Xcode**: 15+ (cho iOS)
- **Android Studio**: Latest (cho Android)
- **Ruby**: 2.7+ (cho CocoaPods)
- **CocoaPods**: 1.15+

Xem [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) để setup đầy đủ.

## 🚀 Quick Start

### 1. Clone và Install Dependencies

```bash
# Clone repository
git clone https://github.com/vanquyet16/base-react-navive.git
cd base-react-navive

# Install JavaScript dependencies
npm install --legacy-peer-deps
# hoặc
yarn install

# Install iOS dependencies (macOS only)
cd ios
pod install
cd ..
```

> **Lưu ý**: Sử dụng `--legacy-peer-deps` để tránh peer dependency conflicts.

### 2. Start Metro Bundler

```bash
# Start Metro với cache reset
npm start
# hoặc
yarn start

# Metro sẽ chạy trên http://localhost:8081
```

**Metro Shortcuts:**

- Press `r` - Reload app
- Press `d` - Open Dev Menu
- Press `j` - Open React Native DevTools

### 3. Run App

**iOS:**

```bash
# Run trên iPhone Xs simulator
yarn ios

# Run trên simulator khác
yarn ios --simulator="iPhone 15 Pro"
```

**Android:**

```bash
yarn android
```

## 📁 Project Structure

```
src/
├── app/                    # App root & providers
├── components/             # Shared UI components
│   ├── base/              # Atomic components (Button, Text, etc.)
│   ├── custom-antd/       # Wrapped Ant Design components
│   ├── form/              # Form components
│   ├── layout/            # Layout components
│   ├── navigation/        # Custom navigation components
│   └── utility/           # Utility components (ErrorBoundary, LazyScreen)
├── config/                # App configuration
│   ├── app.config.ts      # App constants
│   ├── env.ts             # Environment variables
│   └── build-info.ts      # Build information
├── constants/             # Constants & enums
│   ├── api-endpoints.ts   # API endpoints
│   ├── routes.ts          # Route names
│   └── storage-keys.ts    # AsyncStorage keys
├── features/              # Feature modules (by domain)
│   ├── auth/              # Authentication feature
│   │   ├── screens/       # Auth screens (Login, Register)
│   │   ├── hooks/         # Auth-specific hooks & queries
│   │   ├── services/      # Auth API services
│   │   └── types/         # Auth types
│   ├── home/              # Home feature
│   ├── profile/           # Profile feature
│   ├── example/           # Example/demo features
│   └── performance/       # Performance monitoring
├── hooks/                 # Global custom hooks
├── navigation/            # Navigation configuration
│   ├── MainTabs.tsx       # Main tab navigator
│   ├── config/            # Navigation configs
│   └── factories/         # Screen factory patterns
├── query/                 # TanStack Query setup
│   ├── query-client.ts    # Query client configuration
│   ├── query-keys.ts      # Query key factories
│   └── query-provider.tsx # Query provider wrapper
├── services/              # Global services
│   ├── http/              # HTTP client (Axios)
│   ├── auth/              # Auth service & token management
│   └── user/              # User service
├── shared/                # Shared utilities
│   ├── hooks/             # Shared hooks (useBaseQuery, useBaseMutation)
│   ├── types/             # Global TypeScript types
│   └── utils/             # Utility functions
├── store/                 # Zustand stores
│   ├── app-store.ts       # App state
│   ├── session-store.ts   # Session/auth state
│   └── settings-store.ts  # User settings
├── theme/                 # Theme system
│   ├── theme.ts           # Theme configuration
│   ├── tokens.ts          # Design tokens
│   └── use-theme.ts       # Theme hook
└── types/                 # Shared TypeScript types
    ├── api.ts             # API response types
    ├── common.ts          # Common types
    └── domain/            # Domain models
```

## 🔧 Important Configuration

### Path Aliases

`babel.config.js` đã được config với path aliases:

```javascript
'@': './src',
'@components': './src/components',
'@features': './src/features',
'@services': './src/services',
// ... etc
```

**Sử dụng:**

```typescript
import { CustomButton } from '@/components';
import { useAuth } from '@/features/auth';
```

### Yoga API Patch

Project có patch quan trọng cho `react-native-safe-area-context` để fix lỗi yoga API với New Architecture:

**File patch:** `patches/react-native-safe-area-context+4.14.1.patch`

Patch này thay đổi yoga API từ `.unit()` sang `.isDefined()` để tương thích với Yoga 3.0 trong RN 0.83.

**Patch được tự động apply** sau `npm install` nhờ `postinstall` script.

> ⚠️ **QUAN TRỌNG**: Không xóa thư mục `patches/` và package `patch-package`.

## 📦 Key Dependencies

### Core

- `react-native`: 0.83.1
- `react`: 19.2.0
- `typescript`: 5.8.3

### State Management & Data Fetching

- `@tanstack/react-query`: 5.90.19 - Server state management
- `zustand`: 5.0.10 - Client state management
- `axios`: 1.13.2 - HTTP client

### Navigation

- `@react-navigation/native`: 7.1.14
- `@react-navigation/stack`: 7.4.0
- `@react-navigation/bottom-tabs`: 7.4.0
- `@react-navigation/drawer`: 7.5.0

### UI Components

- `@ant-design/react-native`: 5.4.3
- `react-native-vector-icons`: 10.3.0
- `react-native-size-matters`: 0.4.2 - Responsive sizing

### Storage & Utilities

- `react-native-mmkv`: 3.3.3 - Fast key-value storage
- `react-hook-form`: 7.71.1 - Form management

### Development

- `patch-package`: 8.0.1 - Patch node_modules
- `babel-plugin-module-resolver`: 5.0.2 - Path aliases

## 🛠️ Development

### Commands

```bash
# Start Metro bundler
yarn start

# Run iOS
yarn ios

# Run Android
yarn android

# Run tests
yarn test

# Lint code
yarn lint

# Type check
npx tsc --noEmit
```

### Adding New Features

1. Tạo folder mới trong `src/features/<feature-name>/`
2. Cấu trúc feature:
   ```
   features/my-feature/
   ├── screens/
   ├── hooks/
   ├── services/
   ├── types/
   └── index.ts
   ```
3. Export public API qua `index.ts`
4. Sử dụng feature qua path alias: `@/features/my-feature`

### Code Standards

- **TypeScript strict mode** - Tránh `any`, sử dụng proper types
- **Senior-level code** - Clean, scalable, maintainable
- **Comments required** - Giải thích logic, trade-offs, edge cases
- **Defensive programming** - Validate inputs, handle errors gracefully
- **Consistent patterns** - Follow existing patterns trong codebase

## 🐛 Troubleshooting

### iOS Build Errors

**Lỗi: `No member named 'unit' in 'facebook::yoga::StyleLength'`**

✅ **Đã fix** với patch trong `patches/react-native-safe-area-context+4.14.1.patch`

Nếu vẫn gặp lỗi:

```bash
# Re-apply patches
npx patch-package

# Reinstall pods
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# Clean và rebuild
rm -rf ~/Library/Developer/Xcode/DerivedData/*
yarn ios
```

### Metro Bundler Issues

**Lỗi: `Cannot find module 'babel-plugin-module-resolver'`**

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json yarn.lock
npm install --legacy-peer-deps

# Restart Metro with cache reset
yarn start --reset-cache
```

### Android Build Issues

```bash
# Clean Android build
cd android
./gradlew clean
cd ..

# Rebuild
yarn android
```

## 📝 New Architecture Notes

Project này sử dụng **New Architecture** (Fabric + TurboModules):

**Enabled trong:** `ios/BaseReactNative083/Info.plist`

```xml
<key>RCTNewArchEnabled</key>
<true/>
```

**Benefits:**

- ⚡ Faster rendering với Fabric
- 🚀 Better performance với TurboModules
- 🔄 Synchronous access to native modules
- 📦 Smaller bundle sizes

**Trade-offs:**

- Cần patches cho một số libraries chưa tương thích
- Debugging phức tạp hơn (sử dụng Bridgeless mode)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -m 'feat: add my feature'`
3. Push branch: `git push origin feature/my-feature`
4. Create Pull Request

## 📄 License

MIT

## 👥 Author

**vanquyet16**

GitHub: [@vanquyet16](https://github.com/vanquyet16)

---

Made with ❤️ using React Native 0.83 + New Architecture
