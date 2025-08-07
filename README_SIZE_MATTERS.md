# Hướng dẫn sử dụng react-native-size-matters

## Giới thiệu

`react-native-size-matters` là một thư viện giúp tạo ra các ứng dụng React Native responsive trên nhiều kích thước màn hình khác nhau. Thư viện này cung cấp các function để scale kích thước một cách thông minh và đã được cài đặt thành công trong dự án.

## Các function chính

### 1. `scale(size: number)`

- **Mô tả**: Scale kích thước dựa trên chiều rộng màn hình
- **Sử dụng cho**: Font size, padding, margin, width, height
- **Ví dụ**:

```typescript
import {scale} from '../utils/sizeMatters';

const styles = StyleSheet.create({
  text: {
    fontSize: scale(16), // Sẽ tự động scale theo màn hình
  },
  container: {
    padding: scale(20),
  },
});
```

### 2. `verticalScale(size: number)`

- **Mô tả**: Scale kích thước dựa trên chiều cao màn hình
- **Sử dụng cho**: Height, top, bottom, marginVertical
- **Ví dụ**:

```typescript
import {verticalScale} from '../utils/sizeMatters';

const styles = StyleSheet.create({
  container: {
    height: verticalScale(100),
    marginTop: verticalScale(20),
  },
});
```

### 3. `moderateScale(size: number, factor: number = 0.5)`

- **Mô tả**: Scale với factor có thể điều chỉnh (ít aggressive hơn scale)
- **Sử dụng cho**: Khi muốn kiểm soát mức độ scale
- **Ví dụ**:

```typescript
import {moderateScale} from '../utils/sizeMatters';

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(16, 0.3), // Scale ít hơn
  },
});
```

## Cách sử dụng trong dự án

### 1. Import từ file utility

```typescript
import {scale, verticalScale, moderateScale, SIZES} from '../utils/sizeMatters';
```

### 2. Sử dụng constants có sẵn

```typescript
import {SIZES} from '../utils/sizeMatters';

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.FONT_TITLE,
    marginBottom: SIZES.SPACING_LARGE,
  },
  button: {
    borderRadius: SIZES.RADIUS_NORMAL,
    padding: SIZES.SPACING_MEDIUM,
  },
});
```

### 3. Ví dụ component hoàn chỉnh

```typescript
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale, verticalScale, SIZES} from '../utils/sizeMatters';

const ExampleComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tiêu đề</Text>
      <Text style={styles.subtitle}>Phụ đề</Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Nút bấm</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale(20),
    marginTop: verticalScale(16),
  },
  title: {
    fontSize: SIZES.FONT_TITLE,
    fontWeight: 'bold',
    marginBottom: SIZES.SPACING_MEDIUM,
  },
  subtitle: {
    fontSize: SIZES.FONT_NORMAL,
    color: '#666',
    marginBottom: SIZES.SPACING_LARGE,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: SIZES.SPACING_MEDIUM,
    borderRadius: SIZES.RADIUS_NORMAL,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: SIZES.FONT_MEDIUM,
    fontWeight: '600',
  },
});

export default ExampleComponent;
```

## Best Practices

### 1. Khi nào sử dụng function nào?

- **`scale`**: Font size, padding, margin, width, height
- **`verticalScale`**: Height, top, bottom, marginVertical
- **`moderateScale`**: Khi muốn kiểm soát mức độ scale

### 2. Sử dụng constants

- Tạo và sử dụng constants cho các kích thước phổ biến
- Giúp code dễ maintain và consistent

### 3. Test trên nhiều thiết bị

- Luôn test trên các kích thước màn hình khác nhau
- Sử dụng iOS Simulator và Android Emulator với các kích thước khác nhau

### 4. Tránh scale quá nhiều

- Không scale tất cả mọi thứ
- Một số element có thể giữ nguyên kích thước

## Ví dụ thực tế

### Responsive Button Component

```typescript
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {scale, SIZES} from '../utils/sizeMatters';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(24),
    borderRadius: SIZES.RADIUS_NORMAL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  text: {
    fontSize: SIZES.FONT_MEDIUM,
    fontWeight: '600',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#007AFF',
  },
});

export default Button;
```

## Lưu ý quan trọng

1. **Base size**: Thư viện sử dụng iPhone 6 (375x667) làm base size
2. **Performance**: Các function scale được tính toán một lần và cache lại
3. **TypeScript**: Thư viện hỗ trợ TypeScript đầy đủ
4. **Testing**: Test trên cả iOS và Android với các kích thước khác nhau

## Troubleshooting

### Vấn đề thường gặp:

1. **Text quá nhỏ/lớn**: Điều chỉnh factor trong `moderateScale`
2. **Layout bị vỡ**: Kiểm tra lại việc sử dụng đúng function scale
3. **Performance**: Tránh scale quá nhiều element cùng lúc

### Debug:

```typescript
import {Dimensions} from '../utils/sizeMatters';

console.log('Screen dimensions:', Dimensions.get('window'));
console.log('Scaled size:', scale(16));
```
