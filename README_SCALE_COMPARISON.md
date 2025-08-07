# So sánh các hàm Scale trong React Native

## Tổng quan

Có 4 hàm scale chính được sử dụng trong dự án này, mỗi hàm có mục đích và cách tính toán khác nhau.

## 1. `scale(size: number)`

### Cách hoạt động:

- **Base size**: iPhone 6 (375px width)
- **Công thức**: `(size * screenWidth) / 375`
- **Dựa trên**: Chiều rộng màn hình

### Ví dụ:

```typescript
// Trên iPhone 6 (375px width)
scale(100) = (100 * 375) / 375 = 100px

// Trên iPhone 12 (390px width)
scale(100) = (100 * 390) / 375 = 104px

// Trên iPad (768px width)
scale(100) = (100 * 768) / 375 = 204.8px
```

### Trường hợp sử dụng:

- Font size
- Padding, margin
- Width, height
- Border radius
- Icon size

## 2. `verticalScale(size: number)`

### Cách hoạt động:

- **Base size**: iPhone 6 (667px height)
- **Công thức**: `(size * screenHeight) / 667`
- **Dựa trên**: Chiều cao màn hình

### Ví dụ:

```typescript
// Trên iPhone 6 (667px height)
verticalScale(100) = (100 * 667) / 667 = 100px

// Trên iPhone 12 (844px height)
verticalScale(100) = (100 * 844) / 667 = 126.5px

// Trên iPad (1024px height)
verticalScale(100) = (100 * 1024) / 667 = 153.5px
```

### Trường hợp sử dụng:

- Height cố định
- Top, bottom positioning
- MarginVertical

## 3. `getScaledWidth(percentage: number)`

### Cách hoạt động:

- **Công thức**: `(screenWidth * percentage) / 100`
- **Dựa trên**: Phần trăm chiều rộng màn hình hiện tại
- **Không dựa trên base size**

### Ví dụ:

```typescript
// Trên iPhone 6 (375px width)
getScaledWidth(25) = (375 * 25) / 100 = 93.75px

// Trên iPhone 12 (390px width)
getScaledWidth(25) = (390 * 25) / 100 = 97.5px

// Trên iPad (768px width)
getScaledWidth(25) = (768 * 25) / 100 = 192px
```

### Trường hợp sử dụng:

- Layout responsive
- Sidebar width
- Modal width
- Grid layout

## 4. `getScaledHeight(percentage: number)`

### Cách hoạt động:

- **Công thức**: `(screenHeight * percentage) / 100`
- **Dựa trên**: Phần trăm chiều cao màn hình hiện tại
- **Không dựa trên base size**

### Ví dụ:

```typescript
// Trên iPhone 6 (667px height)
getScaledHeight(25) = (667 * 25) / 100 = 166.75px

// Trên iPhone 12 (844px height)
getScaledHeight(25) = (844 * 25) / 100 = 211px

// Trên iPad (1024px height)
getScaledHeight(25) = (1024 * 25) / 100 = 256px
```

### Trường hợp sử dụng:

- Modal height
- Container height
- Section height

## So sánh trực quan

### Cùng giá trị input = 100:

| Màn hình  | scale(100) | verticalScale(100) | getScaledWidth(25) | getScaledHeight(25) |
| --------- | ---------- | ------------------ | ------------------ | ------------------- |
| iPhone 6  | 100px      | 100px              | 93.75px            | 166.75px            |
| iPhone 12 | 104px      | 126.5px            | 97.5px             | 211px               |
| iPad      | 204.8px    | 153.5px            | 192px              | 256px               |

## Khi nào dùng hàm nào?

### ✅ Dùng `scale()` khi:

- Font size, padding, margin
- Icon size, border radius
- Các element cần tỷ lệ với chiều rộng

### ✅ Dùng `verticalScale()` khi:

- Height cố định
- Top, bottom positioning
- MarginVertical

### ✅ Dùng `getScaledWidth()` khi:

- Layout responsive (sidebar, modal)
- Grid layout
- Cần tính theo phần trăm width

### ✅ Dùng `getScaledHeight()` khi:

- Modal height
- Container height
- Cần tính theo phần trăm height

## Best Practices

### 1. Không mix các loại scale không nhất quán:

```typescript
// ❌ Không tốt
const styles = StyleSheet.create({
  container: {
    padding: scale(16),
    margin: 20, // Không nhất quán
  },
});

// ✅ Tốt
const styles = StyleSheet.create({
  container: {
    padding: scale(16),
    margin: scale(20), // Nhất quán
  },
});
```

### 2. Sử dụng đúng hàm cho đúng mục đích:

```typescript
// ✅ Tốt
const styles = StyleSheet.create({
  text: {
    fontSize: scale(16), // Font size
    lineHeight: scale(24), // Line height
  },
  header: {
    height: verticalScale(60), // Height cố định
  },
  sidebar: {
    width: getScaledWidth(30), // Layout responsive
  },
});
```

### 3. Tránh sử dụng verticalScale cho width:

```typescript
// ❌ Không tốt
const styles = StyleSheet.create({
  box: {
    width: verticalScale(100), // Sai mục đích
  },
});

// ✅ Tốt
const styles = StyleSheet.create({
  box: {
    width: scale(100), // Đúng mục đích
  },
});
```

## Kết luận

- **`scale()`**: Hàm chính, dùng cho hầu hết trường hợp
- **`verticalScale()`**: Chỉ dùng cho height và positioning
- **`getScaledWidth/Height()`**: Dùng cho layout responsive
- **Không có hàm nào "giống nhau"** - mỗi hàm có mục đích riêng
- **Chọn hàm phù hợp** với mục đích sử dụng
