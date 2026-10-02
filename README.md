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
- [Development](#️-development)
- [Thêm màn hình / feature](#-thêm-màn-hình--feature-mới)
- [Troubleshooting](#-troubleshooting)

---

## 📖 Introduction

Đây là base project React Native chuẩn senior level, được xây dựng với các best practices hàng đầu như Feature-based architecture, Strict TypeScript, declarative navigation (React Navigation v7), và New Architecture (Fabric).

## 🌟 Features

- ✅ **React Native 0.83.1** với New Architecture (Fabric + TurboModules)
- ✅ **TypeScript Strict Mode** - Cấm `any` bằng ESLint (`no-explicit-any`)
- ✅ **Feature-based Architecture** - Modular, scalable, maintainable
- ✅ **Ranh giới kiến trúc** - Phụ thuộc một chiều giữa các tầng, ESLint ép buộc
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

Feature-based architecture, phụ thuộc **một chiều**: `app → navigation → features → components → shared` (ESLint ép buộc, xem [Ranh giới kiến trúc](#ranh-giới-kiến-trúc-eslint-ép-buộc)).

```
src/
├── app/                          # Composition root
│   ├── app-root.tsx              # Providers → bootstrap → navigator
│   ├── app-providers.tsx         # SafeArea, TanStack Query, Antd theme
│   ├── app-navigator.tsx         # Root stack: Auth ↔ Drawer theo trạng thái phiên
│   ├── bootstrap.ts              # Nơi DUY NHẤT nối HTTP ↔ SessionManager, khôi phục phiên
│   └── hooks/use-app-init.ts
│
├── navigation/                   # Cây điều hướng của app
│   ├── navigators/               # AuthStack, MainDrawer → MainStack → MainTabs
│   ├── components/               # UI gắn với route của app (CustomDrawer)
│   ├── config/                   # NAVIGATION_KEYS (tên route)
│   ├── linking.ts                # Deep link
│   ├── navigation-ref.ts         # Điều hướng ngoài component
│   └── navigation-theme.ts
│
├── features/<feature>/           # Module theo domain (auth, home)
│   ├── screens/                  # Màn hình
│   ├── components/               # UI riêng của feature
│   ├── hooks/queries/            # React Query hooks
│   ├── services/                 # Gọi API
│   ├── types/
│   └── index.ts                  # Public API của feature
│
├── components/                   # UI dùng chung, không biết feature/navigation
│   ├── base/                     # Atomic: CustomText, CustomButton, Avatar, Logo, Spacer…
│   ├── form/                     # Bọc react-hook-form (FormInput, FormDropdown…)
│   ├── layout/                   # MainLayout, AppHeader, ScreenContainer
│   ├── navigation/               # Tab bar dùng chung (CustomBottomTabBar, CustomTabNavigator)
│   └── utility/                  # ErrorBoundary, LoadingScreen
│
├── shared/                       # Hạ tầng thuần, không biết UI/feature
│   ├── config/                   # env (validate khi khởi động), app config
│   ├── constants/                # API endpoints, storage keys, messages…
│   ├── hooks/                    # useBaseForm, useBaseQuery, useBaseMutation, useResponsiveSize…
│   ├── query/                    # QueryClient, query keys, mutation helpers
│   ├── services/http/            # Axios instance + interceptors (single-flight refresh)
│   ├── store/                    # Zustand (session, settings) + tokenStore (MMKV)
│   ├── theme/                    # tokens, light/dark theme, createStyles
│   ├── types/                    # Kiểu dùng chung, navigation types
│   └── utils/                    # logger, errorHandler, toast…
│
└── assets/                       # images, icons, fonts
```

### Navigation Architecture

```
Root Stack (app/app-navigator.tsx)
├── AuthStack (chưa đăng nhập)
│   ├── Login
│   └── Register
└── MainDrawer (đã đăng nhập)
    └── MainStack
        └── MainTabsScreen → MainTabs
            └── Home
```

Đăng xuất chỉ cần đổi trạng thái phiên — conditional screens của React Navigation v7 tự gỡ toàn bộ màn hình đã đăng nhập.

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

## 📱 Thêm màn hình / feature mới

Hướng dẫn chi tiết (khai báo type, tạo screen, đăng ký navigator, mẫu `AppHeader`): **[docs/NAVIGATION_GUIDE.md](docs/NAVIGATION_GUIDE.md)**.

Checklist thêm feature mới:

1. Tạo `src/features/<feature-name>/` theo cấu trúc ở trên, export public API qua `index.ts`.
2. Thêm tên feature vào mảng `FEATURES` trong [.eslintrc.js](.eslintrc.js) để bật luật chặn import chéo feature.
3. Khai báo route trong `src/shared/types/navigation.types.ts` + `NAVIGATION_KEYS`, rồi đăng ký vào navigator tương ứng.
4. Chạy `npm run verify`.

### 📚 Tài liệu khác

- [docs/API_CONFIG_GUIDE.md](docs/API_CONFIG_GUIDE.md) — cấu hình API & môi trường
- [docs/COMPONENTS_GUIDE.md](docs/COMPONENTS_GUIDE.md) — CustomTabs, CustomSwiper, CustomFlashList
- [docs/RESPONSIVE_RULES.md](docs/RESPONSIVE_RULES.md) — quy tắc responsive
- [docs/ASSETS_GUIDE.md](docs/ASSETS_GUIDE.md) — quy ước ảnh, icon, font

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
