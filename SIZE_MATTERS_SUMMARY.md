# Tóm tắt sử dụng react-native-size-matters

## ✅ Đã cài đặt thành công

Thư viện `react-native-size-matters` đã được cài đặt và cấu hình trong dự án với đầy đủ chức năng.

## 📁 Files đã tạo/cập nhật

1. **`src/utils/sizeMatters.ts`** - File utility với các function từ thư viện gốc
2. **`src/components/common/ResponsiveExample.tsx`** - Component ví dụ
3. **`src/screens/example/ResponsiveDemoScreen.tsx`** - Screen demo
4. **`README_SIZE_MATTERS.md`** - Hướng dẫn chi tiết
5. **Navigation đã được cập nhật** - Thêm tab "Responsive" để test

## 🚀 Cách sử dụng nhanh

### Import

```typescript
import {scale, verticalScale, moderateScale, SIZES} from '../utils/sizeMatters';
```

### Sử dụng cơ bản

```typescript
const styles = StyleSheet.create({
  text: {
    fontSize: SIZES.FONT_MEDIUM, // 16px scaled
    padding: scale(20), // 20px scaled
  },
  container: {
    height: verticalScale(100), // 100px scaled theo height
    width: scale(200), // 200px scaled theo width
  },
});
```

## 🎯 Các function chính

| Function          | Mô tả                      | Sử dụng cho              |
| ----------------- | -------------------------- | ------------------------ |
| `scale()`         | Scale theo width           | Font, padding, margin    |
| `verticalScale()` | Scale theo height          | Height, top, bottom      |
| `moderateScale()` | Scale với factor tùy chỉnh | Khi muốn kiểm soát scale |

## 📱 Test ngay

1. Chạy ứng dụng
2. Vào tab "Responsive"
3. Xem các ví dụ responsive design
4. Test trên các kích thước màn hình khác nhau

## 💡 Tips

- Sử dụng `SIZES` constants thay vì hardcode số
- Test trên nhiều thiết bị khác nhau
- Không scale tất cả mọi thứ
- Sử dụng `moderateScale` khi muốn kiểm soát mức độ scale

## 🔧 Thư viện gốc

- **Package**: `react-native-size-matters@0.4.2`
- **Base size**: iPhone 6 (375x667)
- **Algorithms**: Optimized scaling algorithms
- **TypeScript**: Full support
- **Performance**: Cached calculations

## 🎨 Cách sử dụng thực tế

```typescript
import {scale, verticalScale, SIZES} from '../utils/sizeMatters';

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.FONT_TITLE, // 28px scaled
    marginBottom: SIZES.SPACING_LARGE, // 20px scaled
  },
  button: {
    padding: scale(16), // 16px scaled
    borderRadius: SIZES.RADIUS_NORMAL, // 8px scaled
  },
  container: {
    height: verticalScale(100), // 100px scaled theo height
    padding: scale(20), // 20px scaled theo width
  },
});
```
