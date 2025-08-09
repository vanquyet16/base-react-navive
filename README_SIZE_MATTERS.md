# Hướng dẫn sử dụng react-native-size-matters (Đã Tối Ưu)

## Giới thiệu

`react-native-size-matters` là một thư viện giúp tạo ra các ứng dụng React Native responsive trên nhiều kích thước màn hình khác nhau. Thư viện này đã được **tối ưu hóa** với các tính năng mới như cache system, breakpoint system, device detection và nhiều helper functions tiện ích.

## 🚀 Các tính năng mới đã tối ưu

### Performance Optimization

- **Cache System**: Tự động cache các giá trị đã tính toán
- **Memoization**: Cache kích thước màn hình và pixel ratio
- **Lazy Loading**: Chỉ tính toán khi cần thiết

### Device Detection

- **isTablet()**: Detect thiết bị tablet
- **getDeviceType()**: Lấy loại thiết bị (phone/tablet)
- **getPixelRatio()**: Lấy pixel ratio với cache

### Breakpoint System

- **BREAKPOINTS**: Định nghĩa các điểm break cho responsive design
- **getBreakpoint()**: Lấy breakpoint hiện tại
- **getResponsiveValue()**: Lấy giá trị responsive theo breakpoint

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

## 🆕 Các function mới tối ưu

### 4. `getOptimalFontSize(baseSize: number, minSize?: number, maxSize?: number)`

- **Mô tả**: Tạo font size tối ưu với giới hạn min/max
- **Sử dụng cho**: Font size cần giới hạn để đảm bảo readability
- **Ví dụ**:

```typescript
import {getOptimalFontSize} from '../utils/sizeMatters';

const styles = StyleSheet.create({
  title: {
    fontSize: getOptimalFontSize(18, 14, 22), // Min: 14px, Max: 22px
  },
  subtitle: {
    fontSize: getOptimalFontSize(16), // Không giới hạn
  },
});
```

### 5. `getAspectRatio(width: number, height: number)`

- **Mô tả**: Tính tỷ lệ khung hình và scale
- **Sử dụng cho**: Images, videos, containers cần giữ tỷ lệ
- **Ví dụ**:

```typescript
import {getAspectRatio} from '../utils/sizeMatters';

const {width, height, aspectRatio} = getAspectRatio(16, 9);
const styles = StyleSheet.create({
  image: {
    width: width,
    height: height,
  },
});
```

### 6. `getResponsivePadding(horizontal: number, vertical: number)`

- **Mô tả**: Tạo padding responsive cho cả horizontal và vertical
- **Sử dụng cho**: Containers cần padding responsive
- **Ví dụ**:

```typescript
import {getResponsivePadding} from '../utils/sizeMatters';

const styles = StyleSheet.create({
  container: {
    ...getResponsivePadding(16, 12), // paddingHorizontal: scale(16), paddingVertical: verticalScale(12)
  },
});
```

### 7. `getResponsiveMargin(horizontal: number, vertical: number)`

- **Mô tả**: Tạo margin responsive cho cả horizontal và vertical
- **Sử dụng cho**: Spacing giữa các elements
- **Ví dụ**:

```typescript
import {getResponsiveMargin} from '../utils/sizeMatters';

const styles = StyleSheet.create({
  card: {
    ...getResponsiveMargin(20, 16), // marginHorizontal: scale(20), marginVertical: verticalScale(16)
  },
});
```

### 8. `getResponsiveSize(size: number, factor: number = 0.5)` (Có cache)

- **Mô tả**: Tạo kích thước responsive với factor có thể điều chỉnh (có cache)
- **Sử dụng cho**: Kích thước tùy chỉnh với performance tối ưu
- **Ví dụ**:

```typescript
import {getResponsiveSize} from '../utils/sizeMatters';

const styles = StyleSheet.create({
  customText: {
    fontSize: getResponsiveSize(20, 0.3), // Scale ít hơn với cache
  },
});
```

### 9. `getScaledWidth(percentage: number)` & `getScaledHeight(percentage: number)` (Có cache)

- **Mô tả**: Lấy kích thước theo phần trăm màn hình (có cache)
- **Sử dụng cho**: Layout responsive theo phần trăm
- **Ví dụ**:

```typescript
import {getScaledWidth, getScaledHeight} from '../utils/sizeMatters';

const styles = StyleSheet.create({
  modal: {
    width: getScaledWidth(80), // 80% chiều rộng màn hình
    height: getScaledHeight(40), // 40% chiều cao màn hình
  },
});
```

## 📱 Device Detection & Breakpoint System

### Device Detection

```typescript
import {isTablet, getDeviceType, getPixelRatio} from '../utils/sizeMatters';

// Kiểm tra loại thiết bị
const deviceType = getDeviceType(); // 'phone' | 'tablet'
const isTabletDevice = isTablet(); // boolean
const pixelRatio = getPixelRatio(); // number với cache

// Sử dụng trong component
const styles = StyleSheet.create({
  container: {
    padding: isTablet() ? scale(32) : scale(16),
  },
});
```

### Breakpoint System

```typescript
import {
  getBreakpoint,
  getResponsiveValue,
  BREAKPOINTS,
} from '../utils/sizeMatters';

// Lấy breakpoint hiện tại
const currentBreakpoint = getBreakpoint(); // 'phone_small' | 'phone_medium' | 'phone_large' | 'tablet_small' | 'tablet_medium' | 'tablet_large'

// Responsive values theo breakpoint
const fontSize = getResponsiveValue({
  phone_small: 12,
  phone_medium: 14,
  phone_large: 16,
  tablet_small: 18,
  tablet_medium: 20,
  tablet_large: 22,
});

const padding = getResponsiveValue({
  phone_small: 8,
  phone_medium: 12,
  phone_large: 16,
  tablet_small: 20,
  tablet_medium: 24,
  tablet_large: 28,
});
```

### BREAKPOINTS Constants

```typescript
import {BREAKPOINTS} from '../utils/sizeMatters';

console.log(BREAKPOINTS);
// {
//   PHONE_SMALL: 320,   // iPhone SE, Galaxy S8
//   PHONE_MEDIUM: 375,  // iPhone 12, 13, 14
//   PHONE_LARGE: 414,   // iPhone 12 Pro Max, 13 Pro Max
//   TABLET_SMALL: 768,  // iPad Mini
//   TABLET_MEDIUM: 834, // iPad Air
//   TABLET_LARGE: 1024, // iPad Pro 11"
// }
```

## Cách sử dụng trong dự án

### 1. Import từ file utility

```typescript
import {
  scale,
  verticalScale,
  moderateScale,
  SIZES,
  // Các function mới
  getOptimalFontSize,
  getAspectRatio,
  getResponsivePadding,
  getResponsiveMargin,
  getResponsiveSize,
  getScaledWidth,
  getScaledHeight,
  // Device detection
  isTablet,
  getDeviceType,
  getPixelRatio,
  // Breakpoint system
  getBreakpoint,
  getResponsiveValue,
  BREAKPOINTS,
} from '../utils/sizeMatters';
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

### 3. Ví dụ component hoàn chỉnh với các tính năng mới

```typescript
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  scale,
  verticalScale,
  SIZES,
  getOptimalFontSize,
  getResponsivePadding,
  getResponsiveMargin,
  isTablet,
  getResponsiveValue,
} from '../utils/sizeMatters';

const ExampleComponent: React.FC = () => {
  const isTabletDevice = isTablet();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tiêu đề Responsive</Text>
      <Text style={styles.subtitle}>Phụ đề với font size tối ưu</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Nút bấm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Thiết bị: {isTabletDevice ? 'Tablet' : 'Phone'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...getResponsivePadding(20, 16),
    ...getResponsiveMargin(16, 12),
  },
  title: {
    fontSize: getOptimalFontSize(28, 20, 36), // Min: 20px, Max: 36px
    fontWeight: 'bold',
    marginBottom: SIZES.SPACING_MEDIUM,
    color: '#333',
  },
  subtitle: {
    fontSize: getResponsiveValue({
      phone_small: 12,
      phone_medium: 14,
      phone_large: 16,
      tablet_small: 18,
      tablet_medium: 20,
      tablet_large: 22,
    }),
    color: '#666',
    marginBottom: SIZES.SPACING_LARGE,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: SIZES.SPACING_LARGE,
  },
  button: {
    backgroundColor: '#007AFF',
    ...getResponsivePadding(24, 12),
    borderRadius: SIZES.RADIUS_NORMAL,
    alignItems: 'center',
    minWidth: isTablet() ? scale(200) : scale(150),
  },
  buttonText: {
    color: 'white',
    fontSize: SIZES.FONT_MEDIUM,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#f5f5f5',
    ...getResponsivePadding(16, 12),
    borderRadius: SIZES.RADIUS_NORMAL,
  },
  infoText: {
    fontSize: SIZES.FONT_SMALL,
    color: '#666',
    textAlign: 'center',
  },
});

export default ExampleComponent;
```

## 🎯 Best Practices

### 1. Khi nào sử dụng function nào?

- **`scale`**: Font size, padding, margin, width, height
- **`verticalScale`**: Height, top, bottom, marginVertical
- **`moderateScale`**: Khi muốn kiểm soát mức độ scale
- **`getOptimalFontSize`**: Font size cần giới hạn min/max
- **`getAspectRatio`**: Images, videos, containers cần giữ tỷ lệ
- **`getResponsivePadding/Margin`**: Spacing responsive
- **`getResponsiveSize`**: Kích thước tùy chỉnh với cache
- **`getScaledWidth/Height`**: Layout theo phần trăm màn hình

### 2. Sử dụng constants và cache system

- Tạo và sử dụng constants cho các kích thước phổ biến
- Tận dụng cache system để tối ưu performance
- Sử dụng `getResponsiveValue` cho responsive design

### 3. Device-specific design

```typescript
// Responsive design theo thiết bị
const styles = StyleSheet.create({
  container: {
    padding: isTablet() ? scale(32) : scale(16),
    flexDirection: isTablet() ? 'row' : 'column',
  },
  text: {
    fontSize: getResponsiveValue({
      phone_small: 12,
      phone_medium: 14,
      phone_large: 16,
      tablet_small: 18,
      tablet_medium: 20,
      tablet_large: 22,
    }),
  },
});
```

### 4. Performance optimization

```typescript
// Sử dụng cache system
const cachedSize = getResponsiveSize(20, 0.5); // Được cache
const cachedWidth = getScaledWidth(50); // Được cache

// Clear cache khi cần (ví dụ: xoay màn hình)
import {clearSizeCache} from '../utils/sizeMatters';
// clearSizeCache(); // Gọi khi cần tính toán lại
```

### 5. Test trên nhiều thiết bị

- Luôn test trên các kích thước màn hình khác nhau
- Sử dụng iOS Simulator và Android Emulator với các kích thước khác nhau
- Test trên cả phone và tablet

## 📊 Ví dụ thực tế nâng cao

### Responsive Card Component

```typescript
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  scale,
  SIZES,
  getOptimalFontSize,
  getResponsivePadding,
  getAspectRatio,
  isTablet,
  getResponsiveValue,
} from '../utils/sizeMatters';

interface CardProps {
  title: string;
  subtitle: string;
  imageRatio?: {width: number; height: number};
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  imageRatio = {width: 16, height: 9},
  onPress,
}) => {
  const {width: imageWidth, height: imageHeight} = getAspectRatio(
    imageRatio.width,
    imageRatio.height,
  );

  return (
    <TouchableOpacity
      style={[styles.card, isTablet() && styles.cardTablet]}
      onPress={onPress}>
      <View style={[styles.image, {width: imageWidth, height: imageHeight}]}>
        <Text style={styles.imagePlaceholder}>Image</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: SIZES.RADIUS_NORMAL,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.1,
    shadowRadius: SIZES.RADIUS_SMALL,
    elevation: 3,
    marginBottom: SIZES.SPACING_MEDIUM,
  },
  cardTablet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    backgroundColor: '#f0f0f0',
    borderRadius: SIZES.RADIUS_SMALL,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.SPACING_SMALL,
  },
  imagePlaceholder: {
    fontSize: SIZES.FONT_SMALL,
    color: '#666',
  },
  content: {
    ...getResponsivePadding(16, 12),
    flex: 1,
  },
  title: {
    fontSize: getOptimalFontSize(18, 14, 24),
    fontWeight: '600',
    color: '#333',
    marginBottom: SIZES.SPACING_TINY,
  },
  subtitle: {
    fontSize: getResponsiveValue({
      phone_small: 12,
      phone_medium: 13,
      phone_large: 14,
      tablet_small: 15,
      tablet_medium: 16,
      tablet_large: 17,
    }),
    color: '#666',
    lineHeight: scale(20),
  },
});

export default Card;
```

### Responsive Grid Layout

```typescript
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  getScaledWidth,
  verticalScale,
  SIZES,
  isTablet,
  getResponsiveValue,
} from '../utils/sizeMatters';

interface GridItem {
  id: string;
  title: string;
}

interface ResponsiveGridProps {
  data: GridItem[];
  renderItem: (item: GridItem) => React.ReactElement;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({data, renderItem}) => {
  const numColumns = getResponsiveValue({
    phone_small: 1,
    phone_medium: 2,
    phone_large: 2,
    tablet_small: 3,
    tablet_medium: 4,
    tablet_large: 5,
  });

  const itemWidth = getScaledWidth(100 / numColumns - 2); // Trừ margin

  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <View style={[styles.gridItem, {width: itemWidth}]}>
          {renderItem(item)}
        </View>
      )}
      keyExtractor={item => item.id}
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.SPACING_MEDIUM,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SIZES.SPACING_MEDIUM,
  },
  gridItem: {
    marginBottom: SIZES.SPACING_SMALL,
  },
});

export default ResponsiveGrid;
```

## 🔧 Troubleshooting

### Vấn đề thường gặp:

1. **Text quá nhỏ/lớn**: Sử dụng `getOptimalFontSize` với giới hạn min/max
2. **Layout bị vỡ**: Kiểm tra lại việc sử dụng đúng function scale
3. **Performance chậm**: Tận dụng cache system, tránh scale quá nhiều element cùng lúc
4. **Responsive không đúng**: Sử dụng breakpoint system với `getResponsiveValue`

### Debug:

```typescript
import {
  Dimensions,
  getScreenDimensions,
  getPixelRatio,
  getDeviceType,
  getBreakpoint,
} from '../utils/sizeMatters';

console.log('Screen dimensions:', getScreenDimensions());
console.log('Pixel ratio:', getPixelRatio());
console.log('Device type:', getDeviceType());
console.log('Current breakpoint:', getBreakpoint());
console.log('Scaled size:', scale(16));
```

### Clear cache khi cần:

```typescript
import {clearSizeCache} from '../utils/sizeMatters';

// Gọi khi xoay màn hình hoặc thay đổi orientation
const handleOrientationChange = () => {
  clearSizeCache();
  // Re-render component
};
```

## 📈 Performance Tips

1. **Sử dụng cache system**: Các function `getResponsiveSize`, `getScaledWidth`, `getScaledHeight` đã có cache
2. **Tối ưu re-render**: Sử dụng `useMemo` cho các giá trị scale phức tạp
3. **Lazy loading**: Chỉ tính toán khi cần thiết
4. **Batch updates**: Tránh gọi nhiều function scale trong một lần render

```typescript
import React, {useMemo} from 'react';
import {getResponsiveValue, isTablet} from '../utils/sizeMatters';

const MyComponent = () => {
  const responsiveStyles = useMemo(
    () => ({
      fontSize: getResponsiveValue({
        phone_small: 12,
        phone_medium: 14,
        tablet_small: 16,
      }),
      padding: isTablet() ? scale(32) : scale(16),
    }),
    [],
  );

  return <Text style={responsiveStyles}>Content</Text>;
};
```

Với các tính năng mới này, `react-native-size-matters` giờ đây cung cấp một giải pháp responsive design hoàn chỉnh, tối ưu và dễ sử dụng cho React Native!
