# 🎨 Custom Ant Design Components

Custom wrappers cho **Ant Design React Native** components với **theme system integration**.

---

## 📦 Components Có Sẵn

### 1. **CustomButton**
Wrapper cho `Button` với theme integration

```tsx
import { CustomButton } from '@/components/custom-antd';

<CustomButton type="primary" onPress={handlePress}>
  Click me
</CustomButton>

<CustomButton variant="warning" onPress={handleDelete}>
  Delete
</CustomButton>
```

### 2. **CustomInput**
Wrapper cho `InputItem` với error handling

```tsx
import { CustomInput } from '@/components/custom-antd';

<CustomInput
  label="Email"
  placeholder="Nhập email"
  value={email}
  onChange={setEmail}
  error={errors.email}
/>
```

### 3. **CustomCard**
Wrapper cho `Card` với elevation/shadow

```tsx
import { CustomCard } from '@/components/custom-antd';

<CustomCard elevation={3}>
  <Text>Card content</Text>
</CustomCard>
```

### 4. **CustomModal**
Wrapper cho `Modal` với theme colors

```tsx
import { CustomModal } from '@/components/custom-antd';

<CustomModal
  visible={visible}
  title="Xác nhận"
  onClose={() => setVisible(false)}
>
  <Text>Modal content</Text>
</CustomModal>
```

### 5. **CustomList**
Wrapper cho `List` với padding options

```tsx
import { CustomList, List } from '@/components/custom-antd';

<CustomList padded>
  <List.Item>Item 1</List.Item>
  <List.Item>Item 2</List.Item>
</CustomList>
```

### 6. **CustomSwitch**
Wrapper cho `Switch` với theme colors

```tsx
import { CustomSwitch } from '@/components/custom-antd';

<CustomSwitch
  label="Dark Mode"
  checked={isDark}
  onChange={setIsDark}
/>
```

### 7. **CustomPicker**
Wrapper cho `Picker` với error handling

```tsx
import { CustomPicker } from '@/components/custom-antd';

<CustomPicker
  data={options}
  value={selected}
  onChange={setSelected}
  error={errors.selection}
/>
```

### 8. **CustomToast**
Helper methods cho Toast

```tsx
import { CustomToast } from '@/components/custom-antd';

// Success
CustomToast.success('Thành công!');

// Error
CustomToast.error('Có lỗi xảy ra!');

// Info
CustomToast.info('Thông tin');

// Loading
CustomToast.loading('Đang xử lý...');

// Hide
CustomToast.hide();
```

---

## 🎯 Tại Sao Cần Custom Wrappers?

### ✅ **1. Theme Integration**
Tất cả components tự động dùng theme từ `useTheme()`:
- Colors từ theme
- Spacing từ theme
- Typography từ theme

### ✅ **2. Consistent API**
API nhất quán cho tất cả components:
- `error` prop cho validation
- `label` prop cho labels
- Style overrides dễ dàng

### ✅ **3. Easy Customization**
Dễ dàng thêm custom behaviors:
- Validation
- Analytics tracking
- Accessibility
- Custom animations

### ✅ **4. Maintainability**
Nếu cần thay đổi UI library, chỉ cần update wrappers:
- Code sử dụng không đổi
- Centralized changes

---

## 📝 Best Practices

### ✅ **DO: Luôn dùng Custom components**
```tsx
// ✅ Good
import { CustomButton } from '@/components/custom-antd';
<CustomButton type="primary">Click</CustomButton>

// ❌ Bad - không dùng trực tiếp
import { Button } from '@ant-design/react-native';
<Button type="primary">Click</Button>
```

### ✅ **DO: Override styles khi cần**
```tsx
<CustomCard 
  elevation={2}
  style={{ marginBottom: 16 }}
>
  Content
</CustomCard>
```

### ✅ **DO: Thêm custom props cho use case riêng**
```tsx
// Trong CustomButton.tsx
interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'warning' | 'danger';
  loading?: boolean;
  analytics?: string; // Track button clicks
}
```

### ❌ **DON'T: Inline styles quá nhiều**
```tsx
// ❌ Bad
<CustomButton 
  style={{ 
    backgroundColor: '#ff0000',
    padding: 20,
    borderRadius: 10,
    // ... too many styles
  }}
>

// ✅ Good - tạo variant mới
<CustomButton variant="danger">
```

---

## 🔧 Thêm Custom Component Mới

### **Bước 1: Tạo file mới**
```tsx
// src/components/custom-antd/CustomXXX.tsx
import React from 'react';
import { XXX, type XXXProps } from '@ant-design/react-native';
import { useTheme } from '@/theme/use-theme';

interface CustomXXXProps extends XXXProps {
  // Thêm custom props
}

export const CustomXXX: React.FC<CustomXXXProps> = ({
  ...props
}) => {
  const theme = useTheme();
  
  return <XXX {...props} />;
};
```

### **Bước 2: Export trong index.ts**
```tsx
export { CustomXXX } from './CustomXXX';
```

### **Bước 3: Sử dụng**
```tsx
import { CustomXXX } from '@/components/custom-antd';

<CustomXXX />
```

---

## 🎨 Theme Integration Example

```tsx
import { useTheme } from '@/theme/use-theme';
import { createStyles } from '@/theme/create-styles';

export const CustomCard: React.FC<CustomCardProps> = ({ ... }) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  
  return (
    <Card style={[styles.card, customStyle]}>
      {children}
    </Card>
  );
};

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    borderColor: theme.colors.border,
    padding: theme.spacing[4],
  },
}));
```

---

## 📚 Resources

- [Ant Design React Native Docs](https://rn.mobile.ant.design/)
- [Theme System](../../theme/README.md)
- [Component Guidelines](../README.md)

---

**Maintained by:** Base React Native Team  
**Last Updated:** 2026-01-16
