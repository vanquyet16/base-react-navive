# 📁 Cấu Trúc Thư Mục Dự Án React Native

## 🎯 Tổng Quan

Cấu trúc thư mục được tổ chức theo nguyên tắc:

- **Separation of Concerns**: Tách biệt rõ ràng các concerns
- **Scalability**: Dễ dàng mở rộng khi dự án lớn
- **Maintainability**: Dễ bảo trì và tìm kiếm
- **Reusability**: Tái sử dụng components và utilities

## 📂 Cấu Trúc Hiện Tại vs Đề Xuất

### **Hiện Tại:**

```
src/
├── components/
│   ├── common/          # Components dùng chung
│   ├── form/           # Form components
│   ├── layout/         # Layout components
│   ├── navigation/     # Navigation components
│   ├── test/           # Test components (không nên ở đây)
│   └── ui/             # UI components
├── screens/
│   ├── auth/           # Auth screens
│   ├── example/        # Example screens (không nên ở đây)
│   └── main/           # Main screens
├── services/
├── utils/
├── hooks/
├── stores/
├── types/
├── config/
└── constants/
```

### **Đề Xuất Cải Tiến:**

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components
│   ├── forms/         # Form components
│   ├── layout/        # Layout components
│   └── navigation/    # Navigation components
├── screens/           # Screen components
│   ├── auth/          # Authentication screens
│   ├── main/          # Main app screens
│   └── features/      # Feature-specific screens
├── features/          # Feature-based modules
│   ├── auth/          # Auth feature
│   ├── products/      # Products feature
│   ├── pdf/           # PDF feature
│   └── performance/   # Performance feature
├── shared/            # Shared utilities & components
│   ├── components/    # Shared components
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utility functions
│   ├── constants/     # App constants
│   └── types/         # TypeScript types
├── services/          # API & external services
├── stores/            # State management
├── navigation/        # Navigation configuration
└── config/            # App configuration
```

## 🔄 Kế Hoạch Refactor

### **Bước 1: Tạo Cấu Trúc Mới**

1. Tạo thư mục `features/` cho feature-based modules
2. Tạo thư mục `shared/` cho shared resources
3. Di chuyển components test vào `features/performance/`

### **Bước 2: Di Chuyển Files**

1. Di chuyển test components → `features/performance/components/`
2. Di chuyển example screens → `features/` tương ứng
3. Tổ chức lại utils theo chức năng

### **Bước 3: Cập Nhật Imports**

1. Cập nhật tất cả import paths
2. Cập nhật navigation
3. Cập nhật index files

## 📋 Chi Tiết Từng Thư Mục

### **`src/components/` - UI Components**

```
components/
├── ui/                # Base UI components
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   └── index.ts
├── forms/             # Form components
│   ├── FormInput/
│   ├── FormSelect/
│   └── index.ts
├── layout/            # Layout components
│   ├── Header/
│   ├── Footer/
│   ├── Sidebar/
│   └── index.ts
└── navigation/        # Navigation components
    ├── TabBar/
    ├── Drawer/
    └── index.ts
```

### **`src/features/` - Feature Modules**

```
features/
├── auth/              # Authentication feature
│   ├── components/    # Auth-specific components
│   ├── screens/       # Auth screens
│   ├── services/      # Auth services
│   ├── hooks/         # Auth hooks
│   ├── types/         # Auth types
│   └── index.ts
├── products/          # Products feature
│   ├── components/
│   ├── screens/
│   ├── services/
│   └── index.ts
├── pdf/               # PDF feature
│   ├── components/
│   ├── screens/
│   ├── utils/
│   └── index.ts
└── performance/       # Performance monitoring
    ├── components/
    ├── screens/
    ├── utils/
    └── index.ts
```

### **`src/shared/` - Shared Resources**

```
shared/
├── components/        # Shared components
│   ├── Loading/
│   ├── ErrorBoundary/
│   └── index.ts
├── hooks/             # Custom hooks
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── index.ts
├── utils/             # Utility functions
│   ├── logger.ts
│   ├── performanceMonitor.ts
│   ├── errorHandler.ts
│   └── index.ts
├── constants/         # App constants
│   ├── colors.ts
│   ├── sizes.ts
│   └── index.ts
└── types/             # TypeScript types
    ├── api.ts
    ├── navigation.ts
    └── index.ts
```

### **`src/services/` - External Services**

```
services/
├── api/               # API configuration
│   ├── client.ts
│   ├── interceptors.ts
│   └── index.ts
├── auth/              # Auth services
│   ├── authService.ts
│   └── index.ts
├── products/          # Product services
│   ├── productService.ts
│   └── index.ts
└── index.ts
```

## 🎯 Lợi Ích Của Cấu Trúc Mới

### **1. Feature-Based Organization**

- Mỗi feature có thể phát triển độc lập
- Dễ dàng thêm/xóa features
- Code liên quan được nhóm lại với nhau

### **2. Shared Resources**

- Tránh duplicate code
- Dễ dàng tái sử dụng
- Centralized management

### **3. Scalability**

- Dễ dàng mở rộng khi dự án lớn
- Có thể tách thành micro-frontends sau này
- Team có thể làm việc song song

### **4. Maintainability**

- Dễ tìm kiếm code
- Clear separation of concerns
- Reduced coupling

## 🚀 Implementation Plan

### **Phase 1: Setup Structure**

1. Tạo thư mục mới
2. Di chuyển files cơ bản
3. Cập nhật imports

### **Phase 2: Feature Migration**

1. Di chuyển auth feature
2. Di chuyển products feature
3. Di chuyển PDF feature
4. Di chuyển performance feature

### **Phase 3: Cleanup**

1. Xóa thư mục cũ
2. Cập nhật documentation
3. Test toàn bộ app

## 📝 Naming Conventions

### **Files & Folders**

- **PascalCase**: Components, Screens, Features
- **camelCase**: Utilities, Services, Hooks
- **kebab-case**: CSS files, config files

### **Exports**

- **Named exports**: Components, Utilities
- **Default exports**: Screens, Pages
- **Index files**: Re-export everything

### **Imports**

```typescript
// ✅ Good
import { Button } from '@/components/ui';
import { useAuth } from '@/shared/hooks';
import { ProductScreen } from '@/features/products';

// ❌ Bad
import Button from '@/components/ui/Button/Button';
```

## 🔧 Tools & Scripts

### **Path Aliases**

```json
{
  "@/*": ["src/*"],
  "@/components/*": ["src/components/*"],
  "@/features/*": ["src/features/*"],
  "@/shared/*": ["src/shared/*"],
  "@/services/*": ["src/services/*"]
}
```

### **Linting Rules**

- Enforce import order
- Prevent circular dependencies
- Enforce naming conventions

---

## 📚 References

- [React Native Project Structure](https://reactnative.dev/docs/project-structure)
- [Feature-Based Architecture](https://martinfowler.com/articles/micro-frontends.html)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
