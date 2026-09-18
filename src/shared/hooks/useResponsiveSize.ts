import { useWindowDimensions, Platform } from 'react-native';
import { useMemo } from 'react';

/**
 * Kích thước thiết kế chuẩn (Base theo Figma / iPhone 14)
 * Chiều rộng chuẩn: 390pt, Chiều cao chuẩn: 844pt
 */
const GUIDELINE_BASE_WIDTH = 390;
const GUIDELINE_BASE_HEIGHT = 844;

/** Hàm kẹp giá trị an toàn trong khoảng [min, max] để chống vỡ giao diện */
const clamp = (val: number, min: number, max: number): number =>
  Math.min(Math.max(val, min), max);

export type ComponentSizePreset = 'sm' | 'md' | 'lg';

export interface ResponsiveSize {
  // ----------------------------------------------------------------------------
  // 1. KÍCH THƯỚC MÀN HÌNH HIỆN TẠI
  // ----------------------------------------------------------------------------
  width: number;
  height: number;
  /** Alias của `width` — lấy nhanh chiều rộng thực tế màn hình. */
  screenWidth: number;
  /** Alias của `height` — lấy nhanh chiều cao thực tế màn hình. */
  screenHeight: number;

  // ----------------------------------------------------------------------------
  // 2. PHÂN LOẠI THIẾT BỊ & HƯỚNG HIỂN THỊ (3 bậc: Phone / Tablet / Desktop)
  // ----------------------------------------------------------------------------
  /** true nếu là iPad/Tablet cầm tay thật sự (width >= 768 VÀ không phải web). */
  isTablet: boolean;
  /** true nếu là Smartphone (không phải tablet, không phải web). */
  isPhone: boolean;
  /**
   * true nếu đang chạy trên nền tảng Web (trình duyệt), bất kể kích thước cửa sổ.
   * Tách riêng khỏi isTablet/isPhone để tránh desktop bị xử lý nhầm như phone
   * (bug đã phát hiện: ép isTablet=false khiến isPhone tự động = true trên web).
   */
  isDesktop: boolean;
  isSmallPhone: boolean;
  isLandscape: boolean;
  isPortrait: boolean;

  // ----------------------------------------------------------------------------
  // 3. TYPOGRAPHY
  // ----------------------------------------------------------------------------
  fontSize: (size: number, factor?: number) => number;
  lineHeight: (fontSizeVal: number, multiplier?: number) => number;

  // ----------------------------------------------------------------------------
  // 4. SPACING & BOX MODEL
  // ----------------------------------------------------------------------------
  padding: (size: number, factor?: number) => number;
  px: (size: number, factor?: number) => number;
  py: (size: number, factor?: number) => number;
  margin: (size: number, factor?: number) => number;
  mx: (size: number, factor?: number) => number;
  my: (size: number, factor?: number) => number;
  gap: (size: number) => number;
  verticalGap: (size: number) => number;
  horizontalGap: (size: number) => number;

  // ----------------------------------------------------------------------------
  // 5. BORDERS & SHAPES
  // ----------------------------------------------------------------------------
  radius: (size: number, factor?: number) => number;
  borderWidth: (size?: number) => number;

  // ----------------------------------------------------------------------------
  // 6. ICONS & MEDIA
  // ----------------------------------------------------------------------------
  iconSize: (size: number) => number;
  avatarSize: (size: number) => number;

  // ----------------------------------------------------------------------------
  // 7. COMPONENT SIZING CHUẨN
  // ----------------------------------------------------------------------------
  /**
   * DÙNG CHO: `height` của Button.
   * Preset: 'sm' (36/42), 'md' (48/54), 'lg' (56/64) — Phone/Tablet.
   * Truyền số tùy chỉnh: dùng `moderateVerticalScale` + clamp riêng theo trục dọc
   * (KHÔNG dùng chung công thức `fontSize` như bản trước, vì chiều cao button
   * là kích thước dọc / vùng chạm, không phải kích thước chữ).
   */
  buttonHeight: (presetOrCustom?: ComponentSizePreset | number) => number;
  inputHeight: (presetOrCustom?: ComponentSizePreset | number) => number;
  headerHeight: number;

  // ----------------------------------------------------------------------------
  // 8. LAYOUT & CONTAINERS
  // ----------------------------------------------------------------------------
  /**
   * DÙNG CHO: `width` của Card/Form chính, có lề an toàn.
   * - Phone: 92% màn hình (lề 4% mỗi bên) — KHÔNG dùng 100% vì nếu View cha có
   *   thêm paddingHorizontal, tổng chiều rộng sẽ tràn ra ngoài màn hình.
   * - Tablet: giới hạn tối đa 60% hoặc 640px, căn giữa.
   * Nếu bạn thật sự muốn 1 View ăn hết chiều rộng của View cha, dùng trực tiếp
   * `width: '100%'` hoặc `alignSelf: 'stretch'` trong style — không cần hàm này.
   */
  containerWidth: number;
  modalWidth: number;
  columns: (phoneCols?: number, tabletCols?: number, landscapeCols?: number) => number;
  select: <T>(options: {
    phone: T;
    tablet: T;
    smallPhone?: T;
    landscape?: T;
  }) => T;

  // ----------------------------------------------------------------------------
  // 9. TỈ LỆ % & HÀM NỀN TẢNG
  // ----------------------------------------------------------------------------
  wp: (percent: number) => number;
  hp: (percent: number) => number;
  scale: (size: number) => number;
  verticalScale: (size: number) => number;
  moderateScale: (size: number, factor?: number) => number;
  moderateVerticalScale: (size: number, factor?: number) => number;
}

/**
 * Hook `useResponsiveSize`
 * =======================
 * Gọi `const rs = useResponsiveSize()` — không cần cấu hình gì thêm.
 */
export function useResponsiveSize(): ResponsiveSize {
  const { width, height } = useWindowDimensions();

  return useMemo<ResponsiveSize>(() => {
    // 1. Phân loại thiết bị & hướng — tách 3 bậc: Phone / Tablet / Desktop(web)
    const isDesktop = Platform.OS === 'web';
    const isTabletBySize = width >= 768;
    const isTablet = !isDesktop && isTabletBySize;
    const isPhone = !isDesktop && !isTablet;
    const isSmallPhone = !isDesktop && width < 360;
    const isLandscape = width > height;
    const isPortrait = !isLandscape;

    // 2. Linear scaling gốc
    const scale = (size: number) => (width / GUIDELINE_BASE_WIDTH) * size;
    const verticalScale = (size: number) => (height / GUIDELINE_BASE_HEIGHT) * size;
    const moderateScale = (size: number, factor: number = 0.5) =>
      size + (scale(size) - size) * factor;
    const moderateVerticalScale = (size: number, factor: number = 0.5) =>
      size + (verticalScale(size) - size) * factor;

    // 3. Typography
    const fontSize = (size: number, factor: number = 0.25) => {
      const raw = moderateScale(size, factor);
      return isTablet
        ? Math.round(clamp(raw, size * 1.08, size * 1.25))
        : Math.round(clamp(raw, size * 0.9, size * 1.12));
    };
    const lineHeight = (fontSizeVal: number, multiplier: number = 1.35) =>
      Math.round(fontSize(fontSizeVal) * multiplier);

    // 4. Spacing (padding/margin dùng chung 1 công thức)
    const spacing = (size: number, factor: number = 0.5) => {
      const raw = moderateScale(size, factor);
      return isTablet
        ? Math.round(clamp(raw, size * 1.15, size * 1.45))
        : Math.round(clamp(raw, size * 0.85, size * 1.2));
    };
    const padding = spacing;
    const margin = spacing;
    const px = spacing;
    const py = spacing;
    const mx = spacing;
    const my = spacing;

    const verticalGap = (size: number) => {
      const raw = verticalScale(size);
      return isTablet
        ? Math.round(clamp(raw, size * 1.1, size * 1.35))
        : Math.round(clamp(raw, size * 0.85, size * 1.2));
    };
    const horizontalGap = (size: number) => {
      const raw = scale(size);
      return isTablet
        ? Math.round(clamp(raw, size * 1.1, size * 1.35))
        : Math.round(clamp(raw, size * 0.85, size * 1.2));
    };
    const gap = (size: number) => verticalGap(size);

    // 5. Borders & shapes
    const radius = (size: number, factor: number = 0.5) => {
      const raw = moderateScale(size, factor);
      return isTablet
        ? Math.round(clamp(raw, size * 1.05, size * 1.25))
        : Math.round(clamp(raw, size * 0.9, size * 1.15));
    };
    const borderWidth = (size: number = 1) => Math.max(1, Math.round(scale(size)));

    // 6. Icons & media
    const iconSize = (size: number) => {
      const raw = scale(size);
      return isTablet
        ? Math.round(clamp(raw, size * 1.1, size * 1.3))
        : Math.round(clamp(raw, size * 0.88, size * 1.15));
    };
    const avatarSize = (size: number) => {
      const raw = scale(size);
      return isTablet
        ? Math.round(clamp(raw, size * 1.15, size * 1.4))
        : Math.round(clamp(raw, size * 0.85, size * 1.15));
    };

    // 7. Component sizing
    // FIX Rủi ro 1: custom number giờ dùng moderateVerticalScale + clamp riêng
    // theo trục dọc, KHÔNG còn gọi nhầm fontSize().
    const clampedVertical = (size: number, factor: number, lo: number, hi: number) => {
      const raw = moderateVerticalScale(size, factor);
      return isTablet
        ? Math.round(clamp(raw, size * 1.05, size * 1.25))
        : Math.round(clamp(raw, size * lo, size * hi));
    };

    const buttonHeight = (presetOrCustom: ComponentSizePreset | number = 'md') => {
      if (typeof presetOrCustom === 'number') {
        return clampedVertical(presetOrCustom, 0.4, 0.9, 1.15);
      }
      const presets = {
        sm: isTablet ? 42 : 36,
        md: isTablet ? 54 : 48,
        lg: isTablet ? 64 : 56,
      };
      return presets[presetOrCustom] ?? presets.md;
    };

    const inputHeight = (presetOrCustom: ComponentSizePreset | number = 'md') => {
      if (typeof presetOrCustom === 'number') {
        return clampedVertical(presetOrCustom, 0.4, 0.9, 1.15);
      }
      const presets = {
        sm: isTablet ? 44 : 38,
        md: isTablet ? 54 : 48,
        lg: isTablet ? 62 : 56,
      };
      return presets[presetOrCustom] ?? presets.md;
    };

    const headerHeight = isTablet ? 64 : 56;

    // 8. Layout & containers
    const wp = (percent: number) => (width * percent) / 100;
    const hp = (percent: number) => (height * percent) / 100;

    const screenWidth = width;
    const screenHeight = height;

    // FIX Rủi ro 2: quay lại wp(92) trên phone để đảm bảo lề an toàn, không
    // tràn màn hình khi View cha có thêm padding. Muốn full-width thật sự,
    // dùng `width: '100%'` trực tiếp trong style thay vì containerWidth.
    const containerWidth = isTablet ? Math.min(wp(60), 640) : wp(92);
    const modalWidth = isTablet ? Math.min(wp(50), 520) : wp(90);

    const columns = (
      phoneCols: number = 1,
      tabletCols: number = 2,
      landscapeCols?: number
    ) => {
      if (isTablet) return tabletCols;
      if (isLandscape && landscapeCols !== undefined) return landscapeCols;
      return phoneCols;
    };

    // 9. Conditional selector
    const select = <T,>(options: {
      phone: T;
      tablet: T;
      smallPhone?: T;
      landscape?: T;
    }): T => {
      if (isLandscape && options.landscape !== undefined) return options.landscape;
      if (isSmallPhone && options.smallPhone !== undefined) return options.smallPhone;
      return isTablet ? options.tablet : options.phone;
    };

    return {
      width,
      height,
      screenWidth,
      screenHeight,
      isTablet,
      isPhone,
      isDesktop,
      isSmallPhone,
      isLandscape,
      isPortrait,
      fontSize,
      lineHeight,
      padding,
      px,
      py,
      margin,
      mx,
      my,
      gap,
      verticalGap,
      horizontalGap,
      radius,
      borderWidth,
      iconSize,
      avatarSize,
      buttonHeight,
      inputHeight,
      headerHeight,
      containerWidth,
      modalWidth,
      columns,
      select,
      wp,
      hp,
      scale,
      verticalScale,
      moderateScale,
      moderateVerticalScale,
    };
  }, [width, height]);
}

export default useResponsiveSize;