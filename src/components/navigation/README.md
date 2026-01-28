# Components Structure

Thư mục này chứa tất cả các React components được tổ chức theo chức năng.

## 📁 Cấu trúc thư mục

```
src/components/
├── 🧭 navigation/          # Navigation Components
│   ├── CustomBottomTabBar.tsx    # Custom tab bar cho React Navigation
│   ├── CustomBottomBar.tsx # Standalone bottom bar component
│   └── index.ts
├── 🎨 layout/              # Layout Components
│   ├── CustomHeader.tsx    # Header với search, notifications, profile
│   ├── Header.tsx          # Header cơ bản
│   └── index.ts
├── ⚡ common/              # Common/Shared Components
│   ├── Avatar.tsx          # User avatar component
│   ├── Logo.tsx            # App logo component
│   ├── LoadingScreen.tsx   # Loading screen component
│   └── index.ts
├── 📝 form/                # Form Components
│   ├── FormInput.tsx       # Input field với validation
│   └── index.ts
├── 🎪 ui/                  # Basic UI Components
│   ├── ErrorBoundary.tsx   # Error boundary wrapper
│   └── index.ts
├── 📚 ExampleUsage.tsx     # Ví dụ sử dụng components
├── 📖 README_CUSTOM_COMPONENTS.md  # Documentation chi tiết
├── 📄 README.md            # File này
└── 🗂️ index.ts             # Main export file
```

## 🚀 Cách sử dụng

### Import từ categories

```typescript
// Navigation components
import { CustomBottomTabBar, CustomBottomBar } from '@/components/navigation';

// Layout components
import { CustomHeader, Header } from '@/components/layout';

// Common components
import { Avatar, Logo, LoadingScreen } from '@/components/common';

// Form components
import { FormInput } from '@/components/form';

// UI components
import { ErrorBoundary } from '@/components/ui';
```

### Import trực tiếp

```typescript
// Navigation
import CustomBottomTabBar from '@/components/navigation/CustomBottomTabBar';

// Layout
import CustomHeader from '@/components/layout/CustomHeader';

// Common
import Avatar from '@/components/common/Avatar';
```

### Import từ main index

```typescript
// Tất cả components available từ main index
import {
  CustomTabBar,
  CustomHeader,
  Avatar,
  FormInput,
  ErrorBoundary,
} from '@/components';
```

## 📋 Component Categories

### 🧭 Navigation Components

- **CustomBottomTabBar**: Custom tab bar tích hợp với React Navigation
- **CustomBottomBar**: Standalone bottom navigation với animations

### 🎨 Layout Components

- **CustomHeader**: Header với search, notifications, profile avatar
- **Header**: Header component cơ bản

### ⚡ Common Components

- **Avatar**: Hiển thị avatar người dùng với fallback
- **Logo**: App logo với styling
- **LoadingScreen**: Màn hình loading

### 📝 Form Components

- **FormInput**: Input field với validation và error handling

### 🎪 UI Components

- **ErrorBoundary**: Wrapper để catch và handle React errors

## 🛠️ Conventions

1. **Naming**: PascalCase cho component names
2. **Exports**: Default export cho main component, named exports cho utilities
3. **Index files**: Mỗi category có index.ts để re-export components
4. **Types**: TypeScript interfaces định nghĩa trong cùng file hoặc types/
5. **Styling**: StyleSheet.create() trong cùng file component

## 📖 Documentation

Xem thêm chi tiết trong:

- `README_CUSTOM_COMPONENTS.md` - Documentation cho custom components
- `ExampleUsage.tsx` - Ví dụ code sử dụng

## 🔄 Migration Guide

Nếu bạn đang migrate từ cấu trúc cũ:

```typescript
// Cũ
import CustomHeader from '@/components/CustomHeader';
import Avatar from '@/components/Avatar';

// Mới
import CustomHeader from '@/components/layout/CustomHeader';
import Avatar from '@/components/common/Avatar';

// Hoặc sử dụng category import
import { CustomHeader } from '@/components/layout';
import { Avatar } from '@/components/common';
```
