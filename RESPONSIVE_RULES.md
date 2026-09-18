# RESPONSIVE_RULES.md
> Tài liệu chuẩn cho AI Agent & Developer khi phát triển giao diện React Native responsive (Phone + iPad/Tablet).
> BẮT BUỘC tuân theo các quy tắc dưới đây khi viết style, layout, và kích thước.

---

## 1. Bắt buộc dùng hook `useResponsiveSize`

Không dùng số cứng (`fontSize: 16`, `width: 100`, `padding: 12`...) trực tiếp trong style tĩnh nếu component cần co giãn theo màn hình.
Luôn lấy giá trị động từ hook `useResponsiveSize()`.

### Vị trí file:
- File gốc: `src/shared/hooks/useResponsiveSize.ts`
- Alias / Bridge: `src/hooks/useResponsiveSize.ts`

```tsx
import { useResponsiveSize } from '@/shared/hooks';
// hoặc:
import useResponsiveSize from '@/hooks/useResponsiveSize';
```

---

## 2. Các hàm Semantic Helper (Khuyên dùng — Không cần nhớ công thức!)

Hook `useResponsiveSize()` cung cấp sẵn các hàm nghiệp vụ tiện lợi để bạn không cần phải nhớ công thức hay factor:

| Thuộc tính UI | Hàm tiện ích | Tương đương công thức | Ví dụ sử dụng |
|---|---|---|---|
| **Font size** | `fontSize(size)` | `moderateScale(size, 0.25)` | `fontSize: fontSize(16)` |
| **Padding** | `padding(size)` | `moderateScale(size, 0.5)` | `padding: padding(16)` |
| **Margin** | `margin(size)` | `moderateScale(size, 0.5)` | `marginBottom: margin(12)` |
| **Border Radius** | `radius(size)` | `moderateScale(size, 0.5)` | `borderRadius: radius(8)` |
| **Icon Size** | `iconSize(size)` | `scale(size)` | `size={iconSize(24)}` |
| **Avatar Size** | `avatarSize(size)` | `scale(size)` | `width: avatarSize(48)` |
| **Khoảng cách dọc (Gap, Margin)** | `verticalGap(size)` | `verticalScale(size)` | `marginTop: verticalGap(8)` |
| **Khoảng cách ngang (Gap)** | `horizontalGap(size)` | `scale(size)` | `gap: horizontalGap(8)` |

---

## 3. Bảng quy tắc chọn hàm scale nền tảng (Khi cần tùy biến factor)

| Loại giá trị | Hàm dùng | Factor gợi ý | Ghi chú |
|---|---|---|---|
| **Font size** | `moderateScale(size, 0.25)` | 0.2 – 0.3 | Chống phóng to quá mức trên iPad |
| **Padding / Margin** | `moderateScale(size, 0.5)` | 0.4 – 0.5 | Đảm bảo bố cục cân đối giữa Phone và Tablet |
| **Width / Height cố định** (icon, avatar, badge) | `scale(size)` | — | Linear horizontal scaling |
| **Khoảng cách dọc** (marginTop/Bottom, lineHeight) | `verticalScale(size)` | — | Linear vertical scaling |
| **Width theo % màn hình** (card, container, grid) | `wp(percent)` | — | `(width * percent) / 100` |
| **Height theo % màn hình** (modal, banner, bottom sheet) | `hp(percent)` | — | `(height * percent) / 100` |

### Quy tắc bắt buộc:
1. **Font size**: Luôn dùng `fontSize()` hoặc `moderateScale` với factor thấp (0.2–0.3), **KHÔNG** dùng `scale` thuần (chữ sẽ quá to trên iPad).
2. **Dynamic Dimensions**: Không hardcode `Dimensions.get('window')` ở module scope — luôn lấy `width/height` từ hook (để tự cập nhật khi xoay màn hình / split view trên iPad).

---

## 3. Ngưỡng phân loại thiết bị & Orientation

```tsx
const { isTablet, isLandscape, width, height } = useResponsiveSize();

// isTablet: width >= 768 (iPad Mini trở lên)
// isLandscape: width > height
```

Khi cần thay đổi layout giữa Phone/iPad, **bắt buộc kiểm tra `isTablet`**, tuyệt đối **KHÔNG** đoán theo `Platform.OS === 'ios'`.

---

## 4. Template Component Chuẩn Mẫu

```tsx
import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '@/components';
import useResponsiveSize from '@/hooks/useResponsiveSize';

export const ExampleCard: FC = memo(() => {
  const { moderateScale, verticalScale, wp, isTablet, isLandscape } = useResponsiveSize();

  return (
    <View
      style={[
        styles.container,
        {
          padding: moderateScale(16, 0.5),
          width: isTablet || isLandscape ? wp(48) : wp(92),
        },
      ]}
    >
      <CustomText style={{ fontSize: moderateScale(18, 0.25) }} weight="bold">
        Tiêu đề Card
      </CustomText>
      <View style={{ marginTop: verticalScale(8) }}>
        <CustomText style={{ fontSize: moderateScale(14, 0.25) }} color="secondary">
          Nội dung mô tả linh hoạt trên cả iPhone và iPad.
        </CustomText>
      </View>
    </View>
  );
});

ExampleCard.displayName = 'ExampleCard';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
});
```

---

## 5. Thay Đổi Cấu Trúc Layout Trên iPad (Structural Adaptation)

> *"Tablet sinh ra để hiển thị **nhiều nội dung hơn**, không phải phóng to giao diện như kính lúp."*

Khi có nội dung dạng list/detail hoặc nhiều khối thông tin:
- **Phone (Portrait)**: Xếp dọc (`flexDirection: 'column'`), full width (`wp(92)` - `wp(100)`).
- **Tablet / iPad & Landscape**: Xếp ngang 2 cột (`flexDirection: 'row'`), mỗi cột `wp(45)` - `wp(48)`, hoặc chia master-detail / sidebar.

```tsx
<View style={{ flexDirection: isTablet ? 'row' : 'column', gap: moderateScale(16) }}>
  <View style={{ width: isTablet ? wp(48) : wp(100) }}>
    {/* Cột chính */}
  </View>
  {isTablet && (
    <View style={{ width: wp(48) }}>
      {/* Sidebar hoặc Chi tiết */}
    </View>
  )}
</View>
```

---

## 6. SafeArea (Bắt buộc cho mọi màn hình)

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
  {/* Nội dung */}
</SafeAreaView>
```

---

## 7. Những Việc KHÔNG ĐƯỢC LÀM (Anti-patterns)

- ❌ Không dùng số px/pt cố định trực tiếp trong `StyleSheet.create` cho font/padding.
- ❌ Không dùng `Dimensions.get('window')` ở top-level file (giá trị bị đóng băng, không cập nhật khi xoay màn hình).
- ❌ Không dùng `scale()` thuần cho font size.
- ❌ Không phân biệt Phone/iPad bằng `Platform.OS`.
- ❌ Không kéo giãn container toàn màn hình 800–1200px trên iPad mà không giới hạn `maxWidth` hoặc chia đa cột.

---

## 8. Những Việc PHẢI LÀM (Mandatory Checklist)

- ✅ Gọi `useResponsiveSize()` ở đầu component khi cần tính toán style co giãn.
- ✅ Dùng `moderateScale(size, 0.25)` cho font, `moderateScale(size, 0.5)` cho padding/margin.
- ✅ Dùng `scale` / `verticalScale` cho kích thước icon, avatar, khoảng cách dọc.
- ✅ Dùng `wp` / `hp` cho kích thước tỉ lệ theo phần trăm màn hình.
- ✅ Kiểm tra `isTablet` và `isLandscape` để đổi cấu trúc giao diện phù hợp.
- ✅ Đảm bảo form & màn hình tĩnh scrollable trên thiết bị xoay ngang (Landscape).
