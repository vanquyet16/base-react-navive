# React Native Base Project

Dự án React Native cơ sở với các tính năng hiện đại và cấu trúc modular, sử dụng TypeScript, React Navigation, TanStack Query, Zustand và Ant Design.

## 📦 Công nghệ sử dụng

- **React Native** 0.76.0 với TypeScript
- **React Navigation** v7 (Stack & Bottom Tabs)
- **TanStack Query** v5 cho quản lý server state
- **Zustand** cho global state management với MMKV storage
- **Axios** cho HTTP client với interceptors
- **Ant Design React Native** cho UI components
- **React Hook Form** cho form management
- **React Native Vector Icons** cho icons

## 🗂️ Cấu trúc thư mục

```
src/
├── components/           # Các component tái sử dụng
│   ├── common/          # Component cơ bản (Avatar, Loading, Logo)
│   ├── form/            # Component form (FormInput)
│   ├── layout/          # Layout components (Header, MainLayout)
│   ├── navigation/      # Custom navigation components
│   └── ui/              # UI utilities (ErrorBoundary)
├── constants/           # Hằng số (colors, API config, messages)
├── hooks/               # Custom hooks
│   ├── queries/         # React Query hooks
│   ├── useBaseForm.ts   # Base form hook
│   ├── useBaseMutation.ts # Base mutation hook
│   └── useBaseQuery.ts  # Base query hook
├── navigation/          # Navigation setup
├── screens/             # Các màn hình
│   ├── auth/           # Màn hình authentication
│   ├── main/           # Màn hình chính
│   └── example/        # Màn hình demo
├── services/            # API services
├── stores/             # Zustand stores
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

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
└── MainTabs (khi đã đăng nhập)
    ├── HomeScreen
    ├── ProfileScreen
    └── SettingsScreen
```

### 2. Bottom Tabs Usage

#### Tạo Bottom Tabs cơ bản:

```typescript
// src/navigation/MainTabs.tsx
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={CustomTabBar} // Custom tab bar component
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

#### Custom Tab Bar:

```typescript
// src/components/navigation/CustomTabBar.tsx
const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          // Custom styling cho từng tab
          return (
            <TouchableOpacity key={route.key} onPress={onPress}>
              {/* Icon và label */}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};
```

## 🏗️ Layout & Header System

### 1. MainLayout Component

MainLayout là wrapper component chính cung cấp cấu trúc layout thống nhất:

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

#### Header tìm kiếm (search):

```typescript
headerProps={{
  type: 'search',
  onSearch: (text) => handleSearch(text),
  placeholder: 'Tìm kiếm...',
}}
```

## 🏪 Store Management với Zustand

### 1. Tạo Store cơ bản

```typescript
// src/stores/exampleStore.ts
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';

// Tạo MMKV storage
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
      // State
      count: 0,
      user: null,

      // Actions
      increment: () => set(state => ({count: state.count + 1})),
      setUser: user => set({user}),
      reset: () => set({count: 0, user: null}),
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

// Selectors
export const useCount = () => useExampleStore(state => state.count);
export const useUser = () => useExampleStore(state => state.user);
```

### 2. Sử dụng Store trong Component

```typescript
import {useExampleStore, useCount} from '@/stores/exampleStore';

const MyComponent = () => {
  const {increment, setUser} = useExampleStore();
  const count = useCount(); // Optimized selector

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button onPress={increment} title="Tăng" />
    </View>
  );
};
```

## 🌐 Service Layer

### 1. API Service cơ bản

```typescript
// src/services/userService.ts
import api from './api';
import {User, CreateUserRequest, UpdateUserRequest} from '@/types';

export const userService = {
  // Lấy danh sách users
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  // Lấy user theo ID
  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Tạo user mới
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Cập nhật user
  updateUser: async (
    id: string,
    userData: UpdateUserRequest,
  ): Promise<User> => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Xóa user
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
```

### 2. API Configuration với Interceptors

```typescript
// src/services/api.ts
import axios from 'axios';
import {useAuthStore} from '@/stores/authStore';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - thêm token vào header
api.interceptors.request.use(config => {
  const {tokens} = useAuthStore.getState();
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
      // Logic refresh token
      try {
        const newTokens = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Logout user nếu refresh thất bại
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
  // Kế thừa tất cả options của useQuery
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
      // Không retry với lỗi 401, 403, 404
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

  // Auto toast success handling
  useEffect(() => {
    if (
      query.data &&
      query.isSuccess &&
      showSuccessToast &&
      !query.isFetching
    ) {
      Toast.show({
        type: 'success',
        text1: successMessage,
      });
    }
  }, [
    query.data,
    query.isSuccess,
    showSuccessToast,
    successMessage,
    query.isFetching,
  ]);

  return query;
};
```

**Cách sử dụng useBaseQuery:**

```typescript
// Ví dụ cơ bản
const {data, isLoading, error} = useBaseQuery({
  queryKey: ['users'],
  queryFn: () => userService.getUsers(),
});

// Với custom error message
const {data: user} = useBaseQuery({
  queryKey: ['user', userId],
  queryFn: () => userService.getUserById(userId),
  errorMessage: 'Không thể tải thông tin người dùng',
  enabled: !!userId, // Chỉ chạy khi có userId
});

// Với success toast
const {data: profile} = useBaseQuery({
  queryKey: ['profile'],
  queryFn: () => authService.getCurrentUser(),
  showSuccessToast: true,
  successMessage: 'Tải hồ sơ thành công',
});
```

#### useBaseMutation - Mutation hook cơ bản:

```typescript
// src/hooks/useBaseMutation.ts
interface UseBaseMutationProps<TData, TError, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidateQueries?: QueryKey[]; // Các query cần invalidate
  refetchQueries?: QueryKey[]; // Các query cần refetch
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
  errorMessage?: string;
  onSuccessCallback?: (data: TData, variables: TVariables) => void;
  onErrorCallback?: (error: TError, variables: TVariables) => void;
}

export const useBaseMutation = <TData, TError = Error, TVariables = void>({
  mutationFn,
  invalidateQueries = [],
  refetchQueries = [],
  showSuccessToast = true,
  successMessage = 'Thao tác thành công!',
  showErrorToast = true,
  errorMessage = 'Có lỗi xảy ra!',
  onSuccessCallback,
  onErrorCallback,
  ...options
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      // Auto invalidate queries
      invalidateQueries.forEach(queryKey => {
        queryClient.invalidateQueries({queryKey});
      });

      // Auto refetch queries
      refetchQueries.forEach(queryKey => {
        queryClient.refetchQueries({queryKey});
      });

      // Auto success toast
      if (showSuccessToast) {
        Toast.show({
          type: 'success',
          text1: successMessage,
        });
      }

      // Custom success callback
      onSuccessCallback?.(data, variables);
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      // Auto error toast
      if (showErrorToast) {
        const message =
          error?.response?.data?.message || error?.message || errorMessage;
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: message,
        });
      }

      // Custom error callback
      onErrorCallback?.(error, variables);
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
  invalidateQueries: [['users']], // Invalidate danh sách users
});

// Sử dụng
const handleCreateUser = (userData: CreateUserRequest) => {
  createUserMutation.mutate(userData, {
    onSuccess: newUser => {
      console.log('User created:', newUser);
      navigation.navigate('UserDetail', {userId: newUser.id});
    },
  });
};

// Với custom callbacks
const updateUserMutation = useBaseMutation({
  mutationFn: ({id, ...data}: UpdateUserRequest) =>
    userService.updateUser(id, data),
  showSuccessToast: false, // Tắt toast mặc định
  onSuccessCallback: (updatedUser, variables) => {
    // Custom logic sau khi update thành công
    queryClient.setQueryData(['user', variables.id], updatedUser);
    navigation.goBack();
  },
  invalidateQueries: [['users'], ['user-profile']],
});
```

#### useBaseForm - Form hook với validation:

```typescript
// src/hooks/useBaseForm.ts
interface UseBaseFormProps<T extends FieldValues> {
  onSubmit: (data: T) => Promise<void> | void;
  successMessage?: string;
  errorMessage?: string;
  resetOnSuccess?: boolean;
  // Kế thừa tất cả props của useForm
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

      // Auto success toast
      Toast.show({
        type: 'success',
        text1: successMessage,
      });

      if (resetOnSuccess) {
        form.reset();
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || errorMessage;
      setSubmitError(message);

      // Auto error toast
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
    resetOnSuccess: false, // Không reset form sau khi đăng nhập
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

### 2. Query Hooks cho từng module

```typescript
// src/hooks/queries/useUsers.ts
import {useBaseQuery, useBaseMutation} from '@/hooks';
import {userService} from '@/services/userService';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), {filters}] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// Get users
export const useGetUsers = (filters?: string) => {
  return useBaseQuery({
    queryKey: userKeys.list(filters || ''),
    queryFn: () => userService.getUsers(),
    showSuccessToast: false,
  });
};

// Get user by ID
export const useGetUser = (id: string) => {
  return useBaseQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
};

// Create user
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    mutationFn: userService.createUser,
    showSuccessToast: true,
    onSuccessCallback: () => {
      // Invalidate và refetch users list
      queryClient.invalidateQueries({queryKey: userKeys.lists()});
    },
  });
};

// Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    mutationFn: ({id, ...data}: {id: string} & UpdateUserRequest) =>
      userService.updateUser(id, data),
    showSuccessToast: true,
    onSuccessCallback: (data, variables) => {
      // Cập nhật cache cho user detail
      queryClient.setQueryData(userKeys.detail(variables.id), data);
      // Invalidate users list
      queryClient.invalidateQueries({queryKey: userKeys.lists()});
    },
  });
};
```

### 3. Sử dụng Query trong Component

```typescript
// src/screens/UserListScreen.tsx
import {useGetUsers, useCreateUser} from '@/hooks/queries/useUsers';

const UserListScreen = () => {
  const {data: users, isLoading, error, refetch} = useGetUsers();
  const createUserMutation = useCreateUser();

  const handleCreateUser = (userData: CreateUserRequest) => {
    createUserMutation.mutate(userData, {
      onSuccess: () => {
        console.log('User created successfully');
      },
    });
  };

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen onRetry={refetch} />;

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({item}) => <UserItem user={item} />}
        refreshing={isLoading}
        onRefresh={refetch}
      />
      <Button
        title="Tạo User"
        onPress={() => handleCreateUser({name: 'New User'})}
        loading={createUserMutation.isPending}
      />
    </View>
  );
};
```

## 🛠️ Patterns và Best Practices

### 1. Component Pattern

```typescript
// Component với TypeScript và memo
import React, {memo} from 'react';

interface UserCardProps {
  user: User;
  onPress?: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = memo(({user, onPress}) => {
  const handlePress = () => onPress?.(user);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{user.name}</Text>
    </TouchableOpacity>
  );
});

UserCard.displayName = 'UserCard';
```

### 2. Service Integration Pattern

```typescript
// Kết hợp Service + Store + Query
const useAuthFlow = () => {
  const {login: setAuthState} = useAuthStore();

  const loginMutation = useBaseMutation({
    mutationFn: authService.login,
    onSuccessCallback: data => {
      setAuthState(data.tokens);
    },
  });

  const logout = () => {
    authService.logout();
    useAuthStore.getState().logout();
  };

  return {
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isPending,
  };
};
```

### 3. Error Handling Pattern

```typescript
// Component với error boundary
<ErrorBoundary fallback={<ErrorScreen />}>
  <QueryErrorResetBoundary>
    {({reset}) => <UserListScreen onError={reset} />}
  </QueryErrorResetBoundary>
</ErrorBoundary>
```

## 📱 Custom Components

### 1. CustomHeader Component

CustomHeader là component header tùy chỉnh với nhiều tính năng như tìm kiếm, thông báo, menu và profile.

#### Props Interface:

```typescript
interface CustomHeaderProps {
  title?: string; // Tiêu đề header
  subtitle?: string; // Phụ đề (hiển thị dưới title)
  showProfile?: boolean; // Hiển thị avatar profile
  showBack?: boolean; // Hiển thị nút back
  showSearch?: boolean; // Hiển thị nút search
  showNotification?: boolean; // Hiển thị nút thông báo
  showMenu?: boolean; // Hiển thị nút menu
  onBack?: () => void; // Callback khi nhấn nút back
  onSearch?: (text: string) => void; // Callback khi tìm kiếm
  onNotificationPress?: () => void; // Callback khi nhấn thông báo
  onMenuPress?: () => void; // Callback khi nhấn menu
  rightComponent?: React.ReactNode; // Component tùy chỉnh bên phải
  backgroundColor?: string; // Màu nền header
  textColor?: string; // Màu chữ
  type?: 'default' | 'search' | 'minimal'; // Kiểu hiển thị
  notificationCount?: number; // Số lượng thông báo
}
```

#### Cách sử dụng CustomHeader:

```typescript
import {CustomHeader} from '@/components';

// Header cơ bản
<CustomHeader
  title="Trang chủ"
  showProfile={true}
/>

// Header với tìm kiếm và thông báo
<CustomHeader
  title="Ứng dụng của tôi"
  subtitle="Chào mừng bạn"
  showSearch={true}
  showNotification={true}
  notificationCount={5}
  onSearch={(text) => console.log('Tìm kiếm:', text)}
  onNotificationPress={() => console.log('Mở thông báo')}
/>

// Header minimal với nút back
<CustomHeader
  title="Chi tiết"
  showBack={true}
  onBack={() => navigation.goBack()}
  type="minimal"
/>

// Header tìm kiếm
<CustomHeader
  type="search"
  onSearch={(text) => handleSearch(text)}
  placeholder="Tìm kiếm sản phẩm..."
/>
```

### 2. CustomTabBar Component

CustomTabBar là component bottom navigation tùy chỉnh với animation và hiệu ứng đẹp.

#### Props Interface:

```typescript
interface CustomTabBarProps {
  tabs: TabItem[]; // Danh sách tabs
  activeTab: string; // Tab đang active
  onTabPress: (tabKey: string) => void; // Callback khi nhấn tab
  backgroundColor?: string; // Màu nền
  activeColor?: string; // Màu khi active
  inactiveColor?: string; // Màu khi không active
  showLabels?: boolean; // Hiển thị label
  animationType?: 'slide' | 'scale' | 'fade'; // Kiểu animation
}

interface TabItem {
  key: string; // Key duy nhất của tab
  icon: string; // Tên icon (Material Icons)
  label: string; // Label hiển thị
  badge?: number; // Số badge (thông báo)
  disabled?: boolean; // Vô hiệu hóa tab
}
```

#### Cách sử dụng CustomTabBar:

```typescript
import {CustomTabBar, BottomBarTab} from '@/components';

// Sử dụng với BottomBarTab có sẵn
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

// Tạo tabs tùy chỉnh
const customTabs = [
  {
    key: 'dashboard',
    icon: 'dashboard',
    label: 'Bảng điều khiển',
  },
  {
    key: 'orders',
    icon: 'receipt',
    label: 'Đơn hàng',
    badge: 12,
  },
  {
    key: 'customers',
    icon: 'people',
    label: 'Khách hàng',
  },
];
```

#### BottomBarTab có sẵn:

```typescript
// Các tab định nghĩa sẵn
BottomBarTab.Home; // Trang chủ
BottomBarTab.Search; // Tìm kiếm
BottomBarTab.Favorites; // Yêu thích
BottomBarTab.Profile; // Hồ sơ
BottomBarTab.Settings; // Cài đặt
BottomBarTab.Cart; // Giỏ hàng
BottomBarTab.Notifications; // Thông báo
BottomBarTab.Messages; // Tin nhắn
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

### 4. Layout Helpers

```typescript
// Wrapper cho screens với layout thống nhất
const ScreenWrapper = ({children, title}) => (
  <MainLayout headerProps={{title}} enableScroll={true}>
    <View style={styles.screenPadding}>{children}</View>
  </MainLayout>
);
```

### 5. Tính năng nổi bật

#### CustomHeader:

- 🔍 Tìm kiếm với animation mượt mà
- 🔔 Thông báo với badge số lượng
- 👤 Profile avatar
- 🎨 Tùy chỉnh màu sắc và style
- 📱 3 kiểu hiển thị: default, search, minimal

#### CustomTabBar:

- 🎬 Animation slide indicator
- 📊 Scale animation khi nhấn
- 🔵 Badge thông báo cho từng tab
- 🎨 Tùy chỉnh màu sắc
- 🚫 Vô hiệu hóa tab
- 📱 Responsive design

### 6. Ví dụ hoàn chỉnh

```typescript
// Screen sử dụng cả CustomHeader và CustomTabBar
const ExampleScreen = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchText, setSearchText] = useState('');

  const tabs = [
    BottomBarTab.Home,
    {...BottomBarTab.Search, badge: 3},
    BottomBarTab.Favorites,
    BottomBarTab.Profile,
  ];

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title="Ứng dụng Demo"
        subtitle="Chào mừng bạn!"
        showSearch={true}
        showNotification={true}
        notificationCount={5}
        onSearch={setSearchText}
        onNotificationPress={() => console.log('Notifications')}
      />

      <View style={{flex: 1}}>
        {/* Nội dung chính */}
        <Text>Active Tab: {activeTab}</Text>
        <Text>Search: {searchText}</Text>
      </View>

      <CustomTabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
        showLabels={true}
        animationType="slide"
      />
    </View>
  );
};
```

### 7. Lưu ý sử dụng

- Cả CustomHeader và CustomTabBar đều tương thích với React Navigation
- Sử dụng Material Icons từ react-native-vector-icons
- Tương thích với cả iOS và Android
- Hỗ trợ TypeScript đầy đủ
- Components được tối ưu performance với React.memo

## 🎨 Theming

```typescript
// src/constants/index.ts
export const COLORS = {
  primary: '#1890ff',
  secondary: '#722ed1',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  // ... themes khác
};

// Sử dụng trong component
const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS,
    padding: SCREEN_PADDING,
  },
});
```

## 🚦 Validation

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

1. **Hot Reload**: Sử dụng Metro bundler cho hot reload nhanh
2. **Debugging**: Dùng Flipper hoặc React Native Debugger
3. **Performance**: Sử dụng `React.memo`, `useMemo`, `useCallback` cho tối ưu
4. **Type Safety**: Định nghĩa types đầy đủ trong `src/types/`
5. **Code Splitting**: Lazy load các screen nặng
6. **Memory Management**: Cleanup subscriptions và timers

## 🔧 Configuration Files

- `babel.config.js` - Babel configuration với module resolver
- `metro.config.js` - Metro bundler configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Jest testing configuration

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

---

**Lưu ý**: Đây là project base template, bạn có thể tùy chỉnh theo nhu cầu cụ thể của dự án.
