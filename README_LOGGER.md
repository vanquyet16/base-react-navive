# 📝 Logger Utility - Hướng Dẫn Sử Dụng

## 🎯 Tổng Quan

Logger utility cung cấp hệ thống logging chuyên nghiệp thay thế cho `console.log`, với các tính năng:

- **Multiple log levels**: ERROR, WARN, INFO, DEBUG, VERBOSE
- **Context-aware logging**: Tạo logger riêng cho từng component/service
- **Performance logging**: Tích hợp với performance monitor
- **Memory management**: Tự động giới hạn số lượng logs trong memory
- **Production ready**: Cấu hình khác nhau cho dev và production

## 🚀 Cách Sử Dụng

### 1. Import Logger

```typescript
import {
  logger,
  createLogger,
  logError,
  logApiRequest,
  logApiResponse,
  logPerformance,
} from '@/utils/logger';
```

### 2. Sử Dụng Default Logger

```typescript
// Log các level khác nhau
logger.error('Có lỗi xảy ra!', { userId: 123, action: 'login' });
logger.warn('Cảnh báo: API rate limit sắp đạt giới hạn');
logger.info('Người dùng đã đăng nhập thành công');
logger.debug('Debug info: Component đã render');
logger.verbose('Chi tiết: State đã được cập nhật');
```

### 3. Tạo Logger Với Context

```typescript
// Tạo logger cho component cụ thể
const userLogger = createLogger('UserComponent');
userLogger.info('User component đã mount');
userLogger.debug('User data:', { id: 1, name: 'John' });

// Tạo logger cho service
const apiLogger = createLogger('APIService');
apiLogger.debug('Gọi API users');
```

### 4. Log Performance

```typescript
// Log thời gian thực hiện operation
logPerformance('API call', 150); // 150ms
logPerformance('Database query', 25); // 25ms
logPerformance('UI render', 10); // 10ms
```

### 5. Log API Calls

```typescript
// Log request
logApiRequest('GET', '/api/users', { page: 1, limit: 10 });

// Log response
logApiResponse(200, '/api/users', { users: [], total: 0 });
logApiResponse(404, '/api/users/999', { error: 'User not found' });
```

### 6. Log Errors

```typescript
try {
  // Code có thể gây lỗi
  throw new Error('Network timeout');
} catch (error) {
  logError(error, 'NetworkService');
}
```

## 📊 Log Levels

### **Thứ Tự Từ Thấp Đến Cao:**

| Level     | Giá Trị | Mô Tả                    | Sử Dụng                         |
| --------- | ------- | ------------------------ | ------------------------------- |
| `ERROR`   | 0       | Chỉ log lỗi              | Production, critical errors     |
| `WARN`    | 1       | Cảnh báo và lỗi          | Production, warnings            |
| `INFO`    | 2       | Thông tin, cảnh báo, lỗi | Production, important events    |
| `DEBUG`   | 3       | Debug, info, warn, error | Development                     |
| `VERBOSE` | 4       | Tất cả logs              | Development, detailed debugging |

### **Cấu Hình Level:**

```typescript
// Trong development: DEBUG level (hiển thị tất cả)
// Trong production: ERROR level (chỉ hiển thị lỗi)

const LOG_CONFIG = {
  level: ENV.DEV ? LogLevel.DEBUG : LogLevel.ERROR,
  enableConsole: ENV.DEV,
  enableFile: ENV.PROD,
  maxLogSize: 1000, // Giới hạn logs trong memory
};
```

## 🛠️ Ví Dụ Thực Tế

### **Trong React Component:**

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { logger, createLogger, logPerformance } from '@/utils/logger';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tạo logger cho component này
  const componentLogger = createLogger('UserProfile');

  useEffect(() => {
    componentLogger.info('UserProfile component mounted');

    const fetchUser = async () => {
      try {
        componentLogger.debug('Bắt đầu fetch user data');
        const startTime = Date.now();

        const response = await fetch('/api/user/profile');
        const userData = await response.json();

        const duration = Date.now() - startTime;
        logPerformance('fetch_user_profile', duration);

        setUser(userData);
        componentLogger.info('User data loaded successfully', { userId: userData.id });
      } catch (error) {
        componentLogger.error('Failed to fetch user data', { error: error.message });
        logError(error, 'UserProfile');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    componentLogger.debug('Rendering loading state');
    return <Text>Loading...</Text>;
  }

  componentLogger.debug('Rendering user profile', { user });
  return (
    <View>
      <Text>User Profile</Text>
    </View>
  );
};
```

### **Trong API Service:**

```typescript
import { createLogger, logApiRequest, logApiResponse } from '@/utils/logger';

const apiLogger = createLogger('APIService');

export const userService = {
  async getUsers(params: any) {
    const url = '/api/users';

    // Log request
    logApiRequest('GET', url, params);
    apiLogger.debug('Fetching users with params:', params);

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Log response
      logApiResponse(response.status, url, data);

      if (response.ok) {
        apiLogger.info('Users fetched successfully', { count: data.length });
        return data;
      } else {
        apiLogger.error('Failed to fetch users', { status: response.status, data });
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      apiLogger.error('API call failed', { url, error: error.message });
      throw error;
    }
  },
};
```

### **Tích Hợp Với Performance Monitor:**

```typescript
import { performanceMonitor, logPerformance } from '@/utils';

// Tự động log performance
performanceMonitor.startMeasure('api_call');
const result = await apiCall();
const duration = performanceMonitor.endMeasure('api_call');

// Log performance với thông tin chi tiết
logPerformance('api_call', duration);
```

## 🔧 API Reference

### **Default Logger Instance**

```typescript
// Sử dụng logger mặc định
logger.error(message: string, data?: any, error?: Error): void
logger.warn(message: string, data?: any): void
logger.info(message: string, data?: any): void
logger.debug(message: string, data?: any): void
logger.verbose(message: string, data?: any): void
```

### **Create Logger**

```typescript
// Tạo logger với context
const customLogger = createLogger(context?: string): Logger
```

### **Utility Functions**

```typescript
// Log error với context
logError(error: Error, context?: string): void

// Log API request
logApiRequest(method: string, url: string, data?: any): void

// Log API response
logApiResponse(status: number, url: string, data?: any): void

// Log performance
logPerformance(operation: string, duration: number): void
```

### **Logger Methods**

```typescript
// Lấy tất cả logs
logger.getLogs(): LogEntry[]

// Xóa logs
logger.clearLogs(): void

// Export logs dạng JSON
logger.exportLogs(): string
```

## 📱 Xem Logs

### **Development Mode:**

- Logs hiển thị trong console với format:

```
2024-01-01T10:30:00.000Z DEBUG[UserProfile]: User data loaded successfully
2024-01-01T10:30:01.000Z ERROR[APIService]: API call failed
```

### **Production Mode:**

- Chỉ hiển thị ERROR level
- Có thể export logs để debug:

```typescript
const logs = logger.getLogs();
console.log(logs); // Xem tất cả logs trong memory

const logsJson = logger.exportLogs();
console.log(logsJson); // Export logs dạng JSON
```

## 🎯 Best Practices

### **1. Sử Dụng Context**

```typescript
// ✅ Tốt
const userLogger = createLogger('UserService');
userLogger.info('User created');

// ❌ Không tốt
logger.info('User created'); // Không biết từ đâu
```

### **2. Log Có Ý Nghĩa**

```typescript
// ✅ Tốt
logger.info('User logged in', { userId: 123, method: 'email' });

// ❌ Không tốt
logger.info('Something happened');
```

### **3. Log Performance Cho Operations Quan Trọng**

```typescript
// ✅ Tốt
const startTime = Date.now();
const result = await heavyOperation();
const duration = Date.now() - startTime;
logPerformance('heavy_operation', duration);
```

### **4. Log Errors Với Context**

```typescript
// ✅ Tốt
try {
  await apiCall();
} catch (error) {
  logError(error, 'APIService');
}
```

### **5. Clean Up Logs**

```typescript
// Xóa logs khi cần
logger.clearLogs();
```

## 🔄 Migration Từ Console.log

### **Thay Thế Console.log:**

```typescript
// ❌ Cũ
console.log('User data:', userData);
console.error('API error:', error);
console.warn('Rate limit warning');

// ✅ Mới
logger.debug('User data:', userData);
logger.error('API error:', error);
logger.warn('Rate limit warning');
```

### **Thay Thế Console.group:**

```typescript
// ❌ Cũ
console.group('API Calls');
console.log('Request:', request);
console.log('Response:', response);
console.groupEnd();

// ✅ Mới
const apiLogger = createLogger('API');
apiLogger.debug('Request:', request);
apiLogger.debug('Response:', response);
```

## 🚨 Troubleshooting

### **Logs Không Hiển Thị:**

1. Kiểm tra log level trong config
2. Đảm bảo `ENV.DEV` đúng trong development
3. Kiểm tra console output

### **Memory Issues:**

1. Sử dụng `logger.clearLogs()` định kỳ
2. Giảm `maxLogSize` trong config
3. Tránh log objects lớn

### **Performance Issues:**

1. Sử dụng `logPerformance` thay vì tự tính thời gian
2. Tránh log trong render cycle
3. Sử dụng `logger.debug` thay vì `logger.verbose` cho thông tin chi tiết

---

## 📚 Liên Kết

- [Performance Monitor](./performanceMonitor.ts) - Tích hợp với logger
- [Error Handler](./errorHandler.ts) - Xử lý lỗi
- [Config](../config/index.ts) - Cấu hình môi trường
