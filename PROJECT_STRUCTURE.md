# 📁 Cấu trúc thư mục dự án (hiện tại)

Tài liệu này mô tả cấu trúc thực tế của dự án hiện tại theo hướng Feature-based + Shared.

## 🗂️ Sơ đồ thư mục `src/`

```
src/
├── components/                 # Component tái sử dụng theo domain UI
│   ├── form/                   # FormInput, ... (barrel: index.ts)
│   ├── layout/                 # Header, MainLayout, ... (barrel)
│   └── navigation/             # CustomBottomBar/Drawer/TabBar (barrel + READMEs)
├── config/                     # Cấu hình app & axios (barrel)
│   └── axios/                  # axios.config.ts, index.ts
├── features/                   # Nhóm theo tính năng (feature)
│   ├── auth/
│   │   ├── components/         # (để trống/chưa dùng)
│   │   ├── hooks/              # Barrel export
│   │   │   └── queries/        # useAuth.ts + index.ts (barrel)
│   │   ├── screens/            # LoginScreen, RegisterScreen (+ index.ts)
│   │   ├── services/           # auth.service.ts (+ index.ts)
│   │   ├── store/              # authStore.ts (+ index.ts)
│   │   └── types/              # index.ts
│   ├── example/
│   │   ├── hooks/
│   │   │   └── queries/        # useProducts.ts + index.ts (barrel)
│   │   ├── screens/            # ProductScreen, Lazy*, Pdf*, ... (+ index.ts)
│   │   └── services/           # product.service.ts (+ index.ts)
│   ├── home/                   # Home feature (screens + index.ts)
│   ├── performance/            # PDF/Performance demo (components/utils/screens)
│   └── profile/                # Profile/Settings screens (+ index.ts)
├── navigation/                 # RootNavigator, Stacks/Tabs, config (barrels)
├── shared/                     # Dùng chung toàn app (barrels đầy đủ)
│   ├── components/             # Avatar, Logo, LoadingScreen, LazyScreen, ...
│   ├── constants/              # COLORS, VALIDATION, ...
│   ├── hooks/                  # useBaseQuery/useBaseMutation/useBaseForm, ...
│   ├── types/                  # global.d.ts, type utils
│   └── utils/                  # logger, errorHandler, queryClient, ...
└── stores/                     # appStore.ts (độc lập với feature)
```

## 📦 Barrel exports (quan trọng)

- `features/auth/hooks/index.ts` → `export * from './queries'`
- `features/auth/hooks/queries/index.ts` → `export * from './useAuth'`
- `features/example/hooks/index.ts` → `export * from './queries'`
- `features/example/hooks/queries/index.ts` → `export * from './useProducts'`
- `shared/hooks/index.ts` → re-export từ `@/features/*/hooks` để dùng chung:
  - `export * from '@/features/auth/hooks'`
  - `export * from '@/features/example/hooks'`

Lợi ích:

- Import ngắn gọn: `import { useLogin } from '@/shared/hooks'` hoặc `import { useLogin } from '../hooks'` trong feature.
- Dễ mở rộng khi thêm hooks mới, chỉ cần export tại barrel tương ứng.

## 🔗 Alias import

- Được cấu hình trong `tsconfig.json` với `baseUrl` và `paths`:
  - `@/*` trỏ tới `src/*`
- Ví dụ:
  - `@/shared/hooks`, `@/features/auth/hooks`, `@/components/layout`, ...

## ✅ Quy ước import đề xuất

- Trong nội bộ feature: dùng barrel cấp feature
  - Ví dụ (Auth): `import { useLogin } from '../hooks'`
- Từ nơi khác dùng chung: qua `@/shared/hooks`
  - Ví dụ: `import { useLogin } from '@/shared/hooks'`

## 🧭 Điều hướng thư mục chính

- `src/components`: tập trung UI tái sử dụng (có README ở `components/navigation`)
- `src/features`: code theo domain/tính năng, mỗi feature có `hooks/screens/services/store/types`
- `src/shared`: utilities, hooks cơ sở, constants, types toàn cục
- `src/navigation`: Root/Stacks/Tabs + config factory
- `src/config`: config app + axios (interceptors trong `axios.config.ts`)
- `src/stores`: global stores (ví dụ `appStore.ts`)

## 📝 Tips mở rộng

- Mỗi thư mục con nên có `index.ts` để barrel export.
- Tránh import sâu (deep import) vào file con, ưu tiên `index.ts` của thư mục.
- Khi thêm feature mới, giữ cấu trúc đồng nhất: `components/`, `hooks/`, `screens/`, `services/`, `store/`, `types/`.
