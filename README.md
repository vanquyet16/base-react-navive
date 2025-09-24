# React Native Base Project

Dự án React Native cơ sở với các tính năng hiện đại và cấu trúc modular, sử dụng TypeScript, React Navigation, TanStack Query, Zustand và Ant Design.

## 📋 Mục lục

- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc thư mục](#️-cấu-trúc-thư-mục)
- [Khởi chạy dự án](#-khởi-chạy-dự-án)
- [Navigation System](#️-navigation-system)
- [Layout & Header System](#️-layout--header-system)
- [Store Management](#️-store-management)
- [Service Layer](#️-service-layer)
- [Query Management](#️-query-management)
- [Cache Behavior](#️-cache-behavior)
- [Lazy Loading](#️-lazy-loading)
- [Custom Components](#️-custom-components)
- [Theming & Validation](#️-theming--validation)
- [Testing](#️-testing)
- [Development Tips](#️-development-tips)

## 📦 Công nghệ sử dụng

- **React Native** 0.76.0 với TypeScript
- **React Navigation** v7 (Stack & Bottom Tabs)
- **TanStack Query** v5 cho quản lý server state
- **Zustand** cho global state management với MMKV storage
- **Axios** cho HTTP client với interceptors
- **Ant Design React Native** cho UI components
- **React Hook Form** cho form management
- **React Native Vector Icons** cho icons

## 🗂️ Cấu trúc thư mục (hiện tại)

```
src/
├── components/           # Component tái sử dụng
│   ├── form/            # FormInput (barrel index.ts)
│   ├── layout/          # Header, MainLayout, ... (barrel)
│   └── navigation/      # CustomBottomBar/Drawer/TabBar (barrel + READMEs)
├── config/              # app.config, axios.config (barrel)
├── features/            # Tổ chức theo tính năng (feature)
│   ├── auth/
│   │   ├── hooks/      # index.ts → export * from './queries'
│   │   │   └── queries/ # useAuth.ts + index.ts (barrel)
│   │   ├── screens/    # LoginScreen, RegisterScreen (+ index.ts)
│   │   ├── services/   # auth.service.ts (+ index.ts)
│   │   ├── store/      # authStore.ts (+ index.ts)
│   │   └── types/      # index.ts
│   ├── example/
│   │   ├── hooks/      # index.ts → export * from './queries'
│   │   │   └── queries/ # useProducts.ts + index.ts (barrel)
│   │   ├── screens/    # ProductScreen, Lazy*, Pdf*, ... (+ index.ts)
│   │   └── services/   # product.service.ts (+ index.ts)
│   ├── home/           # Home feature (screens + index.ts)
│   ├── performance/    # PDF/Performance demo (components/utils/screens)
│   └── profile/        # Profile/Settings screens (+ index.ts)
├── navigation/          # RootNavigator, Stacks/Tabs, config (barrels)
├── shared/              # Dùng chung: components, hooks, utils, constants, types
│   ├── hooks/          # useBaseQuery/useBaseMutation/useBaseForm (barrel)
│   └── components/     # Avatar, LazyScreen, LoadingScreen, ErrorBoundary, ...
├── stores/              # appStore.ts
└── config/              # app/axios config
```

### Barrel exports nổi bật

- `features/auth/hooks/index.ts` → `export * from './queries'`
- `features/auth/hooks/queries/index.ts` → `export * from './useAuth'`
- `features/example/hooks/index.ts` → `export * from './queries'`
- `features/example/hooks/queries/index.ts` → `export * from './useProducts'`
- `shared/hooks/index.ts` re-export từ features để dùng tiện lợi:
  - `export * from '@/features/auth/hooks'`
  - `export * from '@/features/example/hooks'`

## 🚀 Khởi chạy dự án

### Cài đặt dependencies

```bash
# Cài đặt packages
npm install
# hoặc
yarn install

# iOS (chỉ macOS)
cd ios && pod install && cd ..
```

### Chạy ứng dụng

```bash
# Android
npm run android
# hoặc
yarn android

# iOS (chỉ macOS)
npm run ios
# hoặc
yarn ios
```

## 🗺️ Navigation System

### 1. Cấu trúc Navigation

```typescript
RootNavigator
├── AuthStack (khi chưa đăng nhập)
│   ├── LoginScreen
│   └── RegisterScreen
└── MainStack (khi đã đăng nhập)
    ├── MainTabs
    │   ├── HomeScreen
    │   ├── ProfileScreen
    │   └── SettingsScreen
    ├── ProductScreen
    ├── LazyDemoScreen
    ├── LazyTestScreen
    ├── ApiLazyDemoScreen
    └── CacheDemoScreen
```

### 2. MainStack - Quản lý màn hình không có trong bottom tabs

```typescript
// src/navigation/MainStack.tsx
const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="ProductScreen" component={ProductScreenWrapper} />
      <Stack.Screen name="LazyDemoScreen" component={LazyDemoScreenWrapper} />
      <Stack.Screen name="LazyTestScreen" component={LazyTestScreenWrapper} />
      <Stack.Screen
        name="ApiLazyDemoScreen"
        component={ApiLazyDemoScreenWrapper}
      />
      <Stack.Screen name="CacheDemoScreen" component={CacheDemoScreenWrapper} />
    </Stack.Navigator>
  );
};
```

### 3. Bottom Tabs Usage

```typescript
// src/navigation/MainTabs.tsx
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={CustomTabBar}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreenWrapper}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      {/* Thêm các tabs khác */}
    </Tab.Navigator>
  );
};
```

## 🏗️ Layout & Header System

### 1. MainLayout Component

```typescript
// Sử dụng cơ bản
<MainLayout
  showHeader={true}
  showTabs={false}
  headerProps={{
    title: 'Trang chủ',
    subtitle: 'Chào mừng trở lại!',
    showProfile: true,
    showSearch: true,
    showNotification: true,
  }}>
  <YourScreenContent />
</MainLayout>
```

### 2. Header Types

#### Header mặc định (default):

```typescript
headerProps={{
  title: 'Tiêu đề',
  subtitle: 'Phụ đề',
  showProfile: true,
  showSearch: true,
  showNotification: true,
  notificationCount: 3,
  onSearch: (text) => console.log('Search:', text),
  onNotificationPress: () => console.log('Notification pressed'),
}}
```

#### Header tối giản (minimal):

```typescript
headerProps={{
  title: 'Tiêu đề',
  type: 'minimal',
  showBack: true,
  onBack: () => navigation.goBack(),
}}
```

## 🏪 Store Management với Zustand

### 1. Tạo Store cơ bản

```typescript
// src/stores/exampleStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();
const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};

interface ExampleState {
  count: number;
  user: User | null;
}

interface ExampleActions {
  increment: () => void;
  setUser: (user: User) => void;
  reset: () => void;
}

export const useExampleStore = create<ExampleState & ExampleActions>()(
  persist(
    (set, get) => ({
      count: 0,
      user: null,
      increment: () => set(state => ({ count: state.count + 1 })),
      setUser: user => set({ user }),
      reset: () => set({ count: 0, user: null }),
    }),
    {
      name: 'example-store',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: state => ({
        count: state.count,
        user: state.user,
      }),
    },
  ),
);
```

## 🌐 Service Layer

### 1. API Service cơ bản

```typescript
// src/services/userService.ts
import api from './api';
import { User, CreateUserRequest, UpdateUserRequest } from '@/types';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  updateUser: async (id: string, userData: UpdateUserRequest): Promise<User> => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
```

### 2. API Configuration với Interceptors

```typescript
// src/services/api.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - thêm token vào header
api.interceptors.request.use(config => {
  const { tokens } = useAuthStore.getState();
  if (tokens?.token) {
    config.headers.Authorization = `Bearer ${tokens.token}`;
  }
  return config;
});

// Response interceptor - xử lý lỗi và refresh token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newTokens = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  },
);
```

## 🔄 Query Management với TanStack Query

### 1. Base Hooks

#### useBaseQuery - Query hook cơ bản:

```typescript
// src/hooks/useBaseQuery.ts
interface UseBaseQueryProps<TData, TError = Error> {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  showErrorToast?: boolean;
  errorMessage?: string;
  showSuccessToast?: boolean;
  successMessage?: string;
}

export const useBaseQuery = <TData, TError = Error>({
  queryKey,
  queryFn,
  showErrorToast = true,
  errorMessage = 'Lỗi khi tải dữ liệu',
  showSuccessToast = false,
  successMessage = 'Tải dữ liệu thành công',
  ...options
}) => {
  const query = useQuery({
    queryKey,
    queryFn,
    retry: (failureCount, error: any) => {
      if ([401, 403, 404].includes(error?.response?.status)) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000, // 5 phút
    ...options,
  });

  // Auto toast error handling
  useEffect(() => {
    if (query.error && showErrorToast) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: getErrorMessage(query.error),
      });
    }
  }, [query.error]);

  return query;
};
```

**Cách sử dụng useBaseQuery:**

```typescript
// Ví dụ cơ bản
const { data, isLoading, error } = useBaseQuery({
  queryKey: ['users'],
  queryFn: () => userService.getUsers(),
});

// Với custom error message
const { data: user } = useBaseQuery({
  queryKey: ['user', userId],
  queryFn: () => userService.getUserById(userId),
  errorMessage: 'Không thể tải thông tin người dùng',
  enabled: !!userId,
});
```

#### useBaseMutation - Mutation hook cơ bản:

```typescript
// src/hooks/useBaseMutation.ts
interface UseBaseMutationProps<TData, TError, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidateQueries?: QueryKey[];
  refetchQueries?: QueryKey[];
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
  errorMessage?: string;
}

export const useBaseMutation = <TData, TError = Error, TVariables = void>({
  mutationFn,
  invalidateQueries = [],
  refetchQueries = [],
  showSuccessToast = true,
  successMessage = 'Thao tác thành công!',
  showErrorToast = true,
  errorMessage = 'Có lỗi xảy ra!',
  ...options
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      // Auto invalidate queries
      invalidateQueries.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey });
      });

      // Auto success toast
      if (showSuccessToast) {
        Toast.show({
          type: 'success',
          text1: successMessage,
        });
      }

      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      // Auto error toast
      if (showErrorToast) {
        const message = error?.response?.data?.message || error?.message || errorMessage;
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: message,
        });
      }

      options.onError?.(error, variables, context);
    },
    ...options,
  });
};
```

**Cách sử dụng useBaseMutation:**

```typescript
// Ví dụ cơ bản
const createUserMutation = useBaseMutation({
  mutationFn: (userData: CreateUserRequest) => userService.createUser(userData),
  successMessage: 'Tạo người dùng thành công!',
  invalidateQueries: [['users']],
});

// Sử dụng
const handleCreateUser = (userData: CreateUserRequest) => {
  createUserMutation.mutate(userData, {
    onSuccess: newUser => {
      console.log('User created:', newUser);
      navigation.navigate('UserDetail', { userId: newUser.id });
    },
  });
};
```

#### useBaseForm - Form hook với validation:

```typescript
// src/hooks/useBaseForm.ts
interface UseBaseFormProps<T extends FieldValues> {
  onSubmit: (data: T) => Promise<void> | void;
  successMessage?: string;
  errorMessage?: string;
  resetOnSuccess?: boolean;
}

interface UseBaseFormReturn<T extends FieldValues> extends UseFormReturn<T> {
  isSubmitting: boolean;
  handleSubmitWithLoading: () => void;
  submitError: string | null;
}

export const useBaseForm = <T extends FieldValues>({
  onSubmit,
  successMessage = 'Thành công!',
  errorMessage = 'Có lỗi xảy ra!',
  resetOnSuccess = true,
  ...formProps
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<T>(formProps);

  const handleSubmitWithLoading = form.handleSubmit(async data => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      await onSubmit(data);

      Toast.show({
        type: 'success',
        text1: successMessage,
      });

      if (resetOnSuccess) {
        form.reset();
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || errorMessage;
      setSubmitError(message);

      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    ...form,
    isSubmitting,
    handleSubmitWithLoading,
    submitError,
  };
};
```

**Cách sử dụng useBaseForm:**

```typescript
// Interface cho form data
interface LoginFormData {
  email: string;
  password: string;
}

// Trong component
const LoginScreen = () => {
  const loginMutation = useLogin();

  const {
    control,
    handleSubmitWithLoading,
    isSubmitting,
    submitError,
    formState: {errors},
  } = useBaseForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async data => {
      await loginMutation.mutateAsync(data);
    },
    successMessage: 'Đăng nhập thành công!',
    resetOnSuccess: false,
  });

  return (
    <View>
      <FormInput
        name="email"
        control={control}
        label="Email"
        rules={{
          required: 'Email là bắt buộc',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email không hợp lệ',
          },
        }}
      />

      <FormInput
        name="password"
        control={control}
        label="Mật khẩu"
        type="password"
        rules={{
          required: 'Mật khẩu là bắt buộc',
          minLength: {
            value: 6,
            message: 'Mật khẩu phải có ít nhất 6 ký tự',
          },
        }}
      />

      {submitError && <Text style={styles.error}>{submitError}</Text>}

      <Button
        title="Đăng nhập"
        onPress={handleSubmitWithLoading}
        loading={isSubmitting}
        disabled={isSubmitting}
      />
    </View>
  );
};
```

## 🎯 Cache Behavior

### 1. Cache Strategy với Detail Navigation

Khi bạn vào detail của một item và back ra rồi vào lại, hook của bạn **đã cache** và sẽ không gọi API nếu cùng ID:

```typescript
// ✅ Lần đầu vào Product ID = "123"
const { data } = useBaseQuery({
  queryKey: ['product', '123'], // Cache key unique
  queryFn: () => apiService.getProductById('123'),
});
// Result: Gọi API, cache data

// ✅ Lần sau vào lại Product ID = "123"
const { data } = useBaseQuery({
  queryKey: ['product', '123'], // Cùng cache key
  queryFn: () => apiService.getProductById('123'),
});
// Result: Load từ cache, KHÔNG gọi API
```

### 2. Cache Key Strategy

```typescript
// ✅ Cache theo ID - Recommended
const useProductDetail = (productId: string) => {
  return useBaseQuery({
    queryKey: ['product', productId], // Unique cache key
    queryFn: () => apiService.getProductById(productId),
    staleTime: 5 * 60 * 1000, // Cache 5 phút
  });
};

// ✅ Cache theo multiple params
const useOrderDetail = (orderId: string, userId: string) => {
  return useBaseQuery({
    queryKey: ['order', orderId, userId], // Complex cache key
    queryFn: () => apiService.getOrderById(orderId, userId),
  });
};
```

### 3. Cache Benefits

- ✅ **Instant loading** khi navigate back
- ✅ **Giảm API calls** đáng kể
- ✅ **Background refetch** khi data stale
- ✅ **Offline support** với cached data
- ✅ **Better UX** với smooth navigation

### 4. Cache Invalidation

```typescript
// Auto invalidation với useBaseMutation
const updateProduct = useBaseMutation({
  mutationFn: apiService.updateProduct,
  invalidateQueries: [['product']], // Invalidate tất cả product queries
  showSuccessToast: true,
});

// Manual invalidation
queryClient.invalidateQueries({ queryKey: ['product', '123'] });
queryClient.invalidateQueries({ queryKey: ['product'] });
queryClient.clear(); // Clear all cache
```

## ⚡ Lazy Loading

### 1. Component Lazy Loading

```typescript
// src/components/common/LazyScreen.tsx
interface LazyScreenProps {
  component: () => Promise<{default: React.ComponentType<any>}>;
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

const LazyScreen: React.FC<LazyScreenProps> = ({
  component,
  fallback = <LoadingScreen />,
  onLoad,
  onError,
}) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    component()
      .then(module => {
        setComponent(() => module.default);
        setIsLoading(false);
        onLoad?.();
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
        onError?.(err);
      });
  }, [component]);

  if (isLoading) return <>{fallback}</>;
  if (error) return <ErrorScreen error={error} />;
  if (!Component) return null;

  return <Component />;
};
```

### 2. Sử dụng trong Navigation

```typescript
// Wrapper cho LazyScreen
const LazyDemoScreenWrapper = () => (
  <MainLayout
    showHeader={true}
    showTabs={false}
    headerProps={{
      title: 'Demo Lazy Loading',
      type: 'minimal',
    }}>
    <LazyScreen component={() => import('../screens/example/LazyDemoScreen')} />
  </MainLayout>
);
```

### 3. Advanced Lazy Loading

```typescript
// src/components/common/AdvancedLazyScreen.tsx
interface AdvancedLazyScreenProps {
  component: () => Promise<{default: React.ComponentType<any>}>;
  fallback?: React.ReactNode;
  retryCount?: number;
  retryDelay?: number;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onRetry?: () => void;
}

const AdvancedLazyScreen: React.FC<AdvancedLazyScreenProps> = ({
  component,
  fallback = <LoadingScreen />,
  retryCount = 3,
  retryDelay = 1000,
  onLoad,
  onError,
  onRetry,
}) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryAttempts, setRetryAttempts] = useState(0);

  const loadComponent = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const module = await component();
      setComponent(() => module.default);
      setIsLoading(false);
      onLoad?.();
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      onError?.(err as Error);
    }
  }, [component, onLoad, onError]);

  const handleRetry = useCallback(() => {
    if (retryAttempts < retryCount) {
      setRetryAttempts(prev => prev + 1);
      setTimeout(loadComponent, retryDelay);
      onRetry?.();
    }
  }, [retryAttempts, retryCount, retryDelay, loadComponent, onRetry]);

  useEffect(() => {
    loadComponent();
  }, [loadComponent]);

  if (isLoading) return <>{fallback}</>;
  if (error) {
    return (
      <ErrorScreen
        error={error}
        onRetry={handleRetry}
        canRetry={retryAttempts < retryCount}
      />
    );
  }
  if (!Component) return null;

  return <Component />;
};
```

### 4. API Lazy Loading

```typescript
// Lazy loading queries - chỉ fetch khi enabled
const usersQuery = useQuery({
  queryKey: ['users', page],
  queryFn: () => apiService.getUsers(page, 10),
  enabled: isEnabled && activeTab === 'users', // Conditional fetching
  staleTime: 5 * 60 * 1000, // 5 phút
});

const postsQuery = useQuery({
  queryKey: ['posts', page],
  queryFn: () => apiService.getPosts(page, 10),
  enabled: isEnabled && activeTab === 'posts',
  staleTime: 5 * 60 * 1000,
});
```

### 5. Lazy Loading Benefits

- ✅ **Giảm bundle size** với code splitting
- ✅ **Faster initial load** với component lazy loading
- ✅ **Conditional API calls** với enabled option
- ✅ **Better performance** với background loading
- ✅ **Memory optimization** với dynamic imports

## 🎨 Custom Components

### 1. CustomHeader Component

```typescript
// Props Interface
interface CustomHeaderProps {
  title?: string;
  subtitle?: string;
  showProfile?: boolean;
  showBack?: boolean;
  showSearch?: boolean;
  showNotification?: boolean;
  showMenu?: boolean;
  onBack?: () => void;
  onSearch?: (text: string) => void;
  onNotificationPress?: () => void;
  onMenuPress?: () => void;
  rightComponent?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  type?: 'default' | 'search' | 'minimal';
  notificationCount?: number;
}

// Sử dụng
<CustomHeader
  title="Ứng dụng của tôi"
  subtitle="Chào mừng bạn"
  showSearch={true}
  showNotification={true}
  notificationCount={5}
  onSearch={text => console.log('Tìm kiếm:', text)}
  onNotificationPress={() => console.log('Mở thông báo')}
/>;
```

### 2. CustomTabBar Component

```typescript
// Props Interface
interface CustomTabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  backgroundColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  showLabels?: boolean;
  animationType?: 'slide' | 'scale' | 'fade';
}

interface TabItem {
  key: string;
  icon: string;
  label: string;
  badge?: number;
  disabled?: boolean;
}

// Sử dụng
const tabs = [
  BottomBarTab.Home,
  {...BottomBarTab.Search, badge: 3},
  BottomBarTab.Favorites,
  BottomBarTab.Profile,
];

<CustomTabBar
  tabs={tabs}
  activeTab="home"
  onTabPress={tabKey => setActiveTab(tabKey)}
  showLabels={true}
  animationType="slide"
/>;
```

### 3. Form Components

```typescript
// src/components/form/FormInput.tsx
interface FormInputProps {
  label: string;
  name: string;
  control: Control<any>;
  rules?: object;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  control,
  rules,
  placeholder,
  type = 'text',
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field, fieldState}) => (
        <View>
          <Text>{label}</Text>
          <TextInput
            {...field}
            placeholder={placeholder}
            secureTextEntry={type === 'password'}
            style={[styles.input, fieldState.error && styles.inputError]}
          />
          {fieldState.error && (
            <Text style={styles.errorText}>{fieldState.error.message}</Text>
          )}
        </View>
      )}
    />
  );
};
```

## 🎨 Theming & Validation

### 1. Colors & Constants

```typescript
// src/constants/index.ts
export const COLORS = {
  primary: '#1890ff',
  secondary: '#722ed1',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#13c2c2',
  text: '#262626',
  textSecondary: '#8c8c8c',
  background: '#ffffff',
  border: '#f0f0f0',
};

export const BORDER_RADIUS = 8;
export const SCREEN_PADDING = 16;
export const API_CONFIG = {
  BASE_URL: 'https://api.example.com',
  TIMEOUT: 10000,
};
```

### 2. Validation Rules

```typescript
// src/constants/index.ts
export const VALIDATION = {
  USER_NAME_REGEX: /^[a-zA-Z0-9.]*$/,
  PASSWORD_MIN_LENGTH: 6,
  PHONE_REGEX: /^[0-9]{10,11}$/,
};

// Sử dụng trong form
const validationRules = {
  username: {
    required: 'Tên đăng nhập là bắt buộc',
    pattern: {
      value: VALIDATION.USER_NAME_REGEX,
      message: 'Tên đăng nhập không hợp lệ',
    },
  },
  password: {
    required: 'Mật khẩu là bắt buộc',
    minLength: {
      value: VALIDATION.PASSWORD_MIN_LENGTH,
      message: `Mật khẩu phải có ít nhất ${VALIDATION.PASSWORD_MIN_LENGTH} ký tự`,
    },
  },
};
```

## 🧪 Testing

```bash
# Chạy tests
npm test
# hoặc
yarn test

# Test với coverage
npm run test -- --coverage
```

## 📝 Development Tips

### 1. Performance Optimization

```typescript
// Sử dụng React.memo cho components
const UserCard: React.FC<UserCardProps> = memo(({user, onPress}) => {
  const handlePress = useCallback(() => onPress?.(user), [user, onPress]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{user.name}</Text>
    </TouchableOpacity>
  );
});

// Sử dụng useMemo cho expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// Sử dụng useCallback cho event handlers
const handleSubmit = useCallback(
  (data: FormData) => {
    submitMutation.mutate(data);
  },
  [submitMutation],
);
```

### 2. Error Handling

```typescript
// Component với error boundary
<ErrorBoundary fallback={<ErrorScreen />}>
  <QueryErrorResetBoundary>
    {({reset}) => <UserListScreen onError={reset} />}
  </QueryErrorResetBoundary>
</ErrorBoundary>
```

### 3. Code Splitting

```typescript
// Lazy load các screen nặng
const HeavyScreen = lazy(() => import('./HeavyScreen'));

// Sử dụng với Suspense
<Suspense fallback={<LoadingScreen />}>
  <HeavyScreen />
</Suspense>;
```

### 4. Memory Management

```typescript
// Cleanup subscriptions và timers
useEffect(() => {
  const subscription = someService.subscribe();
  const timer = setInterval(() => {
    // Do something
  }, 1000);

  return () => {
    subscription.unsubscribe();
    clearInterval(timer);
  };
}, []);
```

## 🔧 Configuration Files

- `babel.config.js` - Babel configuration với module resolver
- `metro.config.js` - Metro bundler configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Jest testing configuration

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

---

**Lưu ý**: Đây là project base template, bạn có thể tùy chỉnh theo nhu cầu cụ thể của dự án.
