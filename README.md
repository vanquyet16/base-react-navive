# App CBS Mobile

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

Đây là ứng dụng mobile client cho hệ thống CBS, được xây dựng bằng React Native mới nhất, tối ưu hiệu năng và khả năng mở rộng. Dự án áp dụng các best practices hàng đầu như Feature-based architecture, Strict TypeScript, và New Architecture (Fabric).

## 🌟 Features

- ✅ **React Native 0.83.1** với New Architecture (Fabric + TurboModules)
- ✅ **TypeScript Strict Mode** - Type safety 100%
- ✅ **Feature-based Architecture** - Modular, scalable, maintainable
- ✅ **TanStack Query** - Server state management & Caching
- ✅ **Zustand** - Client state management (nhẹ nhàng, hiệu quả)
- ✅ **React Navigation v7** - Routing mới nhất
- ✅ **Ant Design Mobile** - UI Components chuẩn design system
- ✅ **React Hook Form** - Form validation hiệu năng cao
- ✅ **SVG & Vector Icons** - Hỗ trợ tốt graphics
- ✅ **Path Aliases** (`@/components`, `@/features`, etc.)
- ✅ **React Hook Form** cho form management và validation

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
# Clone repository
git clone http://gitlab.zamiga.org/zmg-dev-training/app_cbs_mobile.git
cd app_cbs_mobile

# Install JavaScript dependencies
yarn install

# Install iOS dependencies (Required for macOS)
cd ios && pod install && cd ..
```

### 2. Start Metro Bundler

```bash
yarn start
```

### 3. Run Application

**iOS:**

```bash
yarn ios
# Hoặc chạy trên simulator cụ thể:
yarn ios --simulator="iPhone 15 Pro"
```

**Android:**

```bash
yarn android
```

## 📁 Project Structure

Cấu trúc dự án theo hướng Feature-based architecture:

```
src/
├── app/                      # App entry, providers & root navigation
│   ├── app-navigator.tsx    # Root navigation container
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
│   ├── navigation/          # Navigation UI components (TabBar, Header)
│   └── utility/             # Utility components (ErrorBoundary, etc.)
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
│   ├── MainTabs.tsx         # Tab navigator definition
│   ├── config/              # Navigation config & types
│   └── factories/           # Screen factory functions
│
├── shared/                   # Shared utilities & configurations
│   ├── config/              # App configuration (env, API URLs, etc.)
│   ├── constants/           # App constants (enums, keys, etc.)
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
- **`app/`**: Entry point, global setup, root navigation

## 🔧 Configuration

### Path Aliases

Dự án sử dụng `babel-plugin-module-resolver` để import gọn gàng:

```typescript
import { CustomButton } from '@/components'; // thay vì ../../../components
import { useAuth } from '@/features/auth'; // thay vì ../../features/auth
import { API_URL } from '@/config';
```

## 📦 Key Dependencies

| Package                    | Version | Usage            |
| -------------------------- | ------- | ---------------- |
| `react-native`             | 0.83.1  | Core             |
| `@tanstack/react-query`    | v5      | Data Fetching    |
| `zustand`                  | v5      | State Management |
| `react-hook-form`          | v7      | Form Handling    |
| `react-native-mmkv`        | v3      | Fast Storage     |
| `@ant-design/react-native` | v5      | UI Framework     |
| `react-native-svg`         | Latest  | SVG Support      |

## 🛠️ Development

### Scripts

```bash
yarn start          # Start Metro
yarn ios            # Run iOS
yarn android        # Run Android
yarn test           # Run Jest Tests
yarn lint           # Run ESLint
yarn type-check     # Run TypeScript check
```

### Adding New Feature

1. Tạo thư mục trong `src/features/<feature-name>`.
2. Tuân thủ cấu trúc: `components`, `screens`, `hooks`, `services`.
3. Export public API qua `index.ts`.

## 🐛 Troubleshooting

<details>
<summary><b>Lỗi: "Unrecognized View" hoặc "Uni" (hộp màu hồng)</b></summary>

- Nguyên nhân: Native module chưa được link/build.
- Khắc phục:
  ```bash
  cd ios && pod install && cd ..
  yarn ios (hoặc yarn android)
  ```
  </details>

<details>
<summary><b>Lỗi Metro Bundler</b></summary>

- Khắc phục: Reset cache
  ```bash
  yarn start --reset-cache
  ```
  </details>

## 🤝 Contributing

1. Tạo branch: `git checkout -b feature/tên-tính-năng`.
2. Commit: `git commit -m "feat: mô tả tính năng"`.
3. Push: `git push origin feature/tên-tính-năng`.
4. Tạo Merge Request.

---

**Made with ❤️ by Zamiga Team**
