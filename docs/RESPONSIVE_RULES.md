# Quy tắc Responsive & Theme

Engine: `src/shared/hooks/useResponsiveSize.ts` (nguồn duy nhất, không dùng `react-native-size-matters`).
Style: `createStyles` / `createStylesWithProps` trong `src/shared/theme/create-styles.ts`.

## 1. Engine hoạt động thế nào

| Nguyên tắc | Chi tiết |
|---|---|
| Co giãn theo **cạnh ngắn / cạnh dài** | Xoay ngang **không** làm chữ, icon, padding to lên. Thiết kế gốc: 390 × 844 |
| Tablet = cạnh ngắn **≥ 600dp** | Điện thoại lớn xoay ngang vẫn là phone; iPad chia đôi màn hẹp được coi là phone |
| Mọi hàm đều bị **kẹp biên** theo bậc thiết bị | Phone: chữ 0,9–1,12×, padding 0,85–1,2×. Tablet: chữ 1,08–1,25×, padding 1,15–1,45× |
| `wp` / `hp` theo **cửa sổ hiện tại** | Bố cục phần trăm đi theo hướng xoay |
| Tự cập nhật | Khi xoay, chia đôi màn hình, đổi cỡ chữ hệ thống |
| Cỡ chữ hệ thống bị giới hạn ×1,3 | `CustomText`, `CustomInput` đặt `maxFontSizeMultiplier` — layout không vỡ khi bật chữ to |

## 2. Dùng hàm nào

| Mục đích | Hàm | Ghi chú |
|---|---|---|
| Cỡ chữ | Ưu tiên `<CustomText variant="…">`; nếu tự viết: `rs.fontSize(16)` + `rs.lineHeight(16)` | Thang chữ ở `theme.typography` |
| Padding / margin | `rs.padding(theme.spacing.lg)`, `rs.px()`, `rs.py()`… | Thang `theme.spacing` (4, 8, 12, 16, 20, 24, 32…) |
| Gap dọc / ngang | `rs.verticalGap()`, `rs.horizontalGap()` | |
| Bo góc | `rs.radius(theme.radii.md)` | |
| Icon | Truyền **kích thước thiết kế** vào `<AppIcon size={20} />` | `AppIcon` tự scale — **không** bọc `rs.*` bên ngoài (sẽ scale 2 lần) |
| Avatar / ảnh vuông | `rs.avatarSize(48)` hoặc `rs.moderateScale(n)` cho **cả width lẫn height** | Không dùng `scale` cho một chiều và `moderateScale` cho chiều kia (méo ảnh) |
| Nút / ô nhập | `rs.buttonHeight('md')`, `rs.inputHeight('md')` | Luôn ≥ 44dp (vùng chạm tối thiểu) |
| Viền | Số cố định (`1`) hoặc `rs.borderWidth(0)` = hairline | Viền **không** co giãn |
| Khối nội dung (form, bài viết) | `maxWidth: rs.maxContentWidth` | Không kéo dài hết màn tablet |
| Số cột lưới | `rs.columns(1, 2, 2)` | phone / tablet / phone xoay ngang |
| Chọn giá trị theo thiết bị | `rs.select({ phone, tablet, landscape, smallPhone })` | |
| `rs.scale` / `rs.verticalScale` | Tỉ lệ tuyến tính **không kẹp** | Chỉ dùng khi thật cần |

Không dùng `Platform.OS` để đoán phone/tablet — dùng `rs.isTablet`.

## 3. Viết style

```tsx
const useStyles = createStyles((theme, rs) => ({
  card: {
    padding: rs.padding(theme.spacing.lg),
    borderRadius: rs.radius(theme.radii.lg),
    backgroundColor: theme.colors.surface,
    maxWidth: rs.maxContentWidth,
    ...theme.shadows.sm,
  },
  row: {
    flexDirection: rs.isTablet ? 'row' : 'column',
    gap: rs.horizontalGap(theme.spacing.md),
  },
}));

const Card = () => {
  const styles = useStyles();
  return (
    <View style={styles.card}>
      <AppIcon name="bell" size={20} />
      <CustomText variant="h6">Tiêu đề</CustomText>
    </View>
  );
};
```

- Style phụ thuộc props: `createStylesWithProps((theme, rs, props: { active: boolean }) => ({ … }))`.
- Cần giá trị responsive trong JSX: `styles.rs.iconSize(20)`, `styles.theme.colors.primary`.
- Dùng `styles.rs` trong `useMemo`/`useCallback` thì **phải** đưa `styles.rs` vào mảng dependency, nếu không giá trị sẽ đứng yên khi xoay màn hình (ESLint `exhaustive-deps` sẽ cảnh báo).
- **Không** đặt tên style là `theme` hoặc `rs`.
- **Không** tính kích thước ở cấp module (`const H = rs...` ngoài component) — sẽ không cập nhật khi xoay.

## 4. Màu sắc

- Chỉ dùng token: `theme.colors.*`. **Không** viết mã hex trong component.
- Nền thẻ, sheet, input: `surface` / `inputBackground` — **không** dùng `white` làm nền (sai khi bật dark mode).
- Chữ trắng trên nền màu thương hiệu: `theme.colors.white`. Đổ bóng: `theme.colors.black`.
- Độ trong suốt: `theme.alpha(theme.colors.black, 0.4)`.
- Chế độ giao diện: `'light' | 'dark' | 'system'` (settings store). `'system'` theo cài đặt của máy.

## 5. Kiểm tra trước khi merge

- [ ] iPhone SE (320×568), iPhone 15 (390×844), iPhone Pro Max (430×932)
- [ ] Xoay ngang trên phone — không có phần tử nào to bất thường, không tràn ngang
- [ ] iPad dọc và ngang, iPad chia đôi màn hình
- [ ] Bật cỡ chữ lớn nhất trong cài đặt máy
- [ ] Dark mode (nếu bật chế độ `system`)
