/**
 * RESPONSIVE ENGINE
 * =================
 * Nguồn DUY NHẤT cho kích thước co giãn theo màn hình (thay react-native-size-matters).
 *
 * Nguyên tắc:
 * 1. Co giãn theo kích thước "portrait tương đương" (cạnh ngắn / cạnh dài), KHÔNG theo width hiện
 *    tại → xoay ngang không làm chữ, icon, padding phình to gấp đôi.
 * 2. Phân loại tablet theo cạnh ngắn ≥ 600dp (chuẩn sw600dp của Android): điện thoại lớn xoay ngang
 *    vẫn là phone; iPad chia đôi màn hình vẫn đúng bậc.
 * 3. Mọi hàm tỉ lệ đều bị kẹp (clamp) trong biên an toàn theo bậc thiết bị → không vỡ layout trên
 *    màn quá nhỏ (iPhone SE) hoặc quá lớn (tablet 13").
 * 4. `wp/hp` theo kích thước cửa sổ HIỆN TẠI (bố cục phần trăm phải theo hướng xoay).
 * 5. Một bộ metrics được tính một lần cho mỗi kích thước cửa sổ và dùng chung cho mọi component
 *    (cache theo `width × height × fontScale`), giữ nguyên tham chiếu để memo/cache phía sau hiệu quả.
 */

import { useWindowDimensions, Platform, StyleSheet } from 'react-native';

/** Thiết kế gốc: iPhone 14/15 (390 × 844) */
const GUIDELINE_SHORT_SIDE = 390;
const GUIDELINE_LONG_SIDE = 844;
/** Ngưỡng tablet theo cạnh ngắn (dp) */
const TABLET_MIN_SHORT_SIDE = 600;
const SMALL_PHONE_MAX_SHORT_SIDE = 360;
/** Giới hạn cỡ chữ hệ thống (Accessibility) để layout không vỡ — dùng cho `maxFontSizeMultiplier` */
export const MAX_FONT_SIZE_MULTIPLIER = 1.3;
/** Bề rộng nội dung tối đa trên màn lớn — tránh dòng chữ/form kéo dài hết màn tablet */
const MAX_CONTENT_WIDTH = 720;

const clamp = (val: number, min: number, max: number): number => Math.min(Math.max(val, min), max);

export type ComponentSizePreset = 'sm' | 'md' | 'lg';

type Bounds = readonly [min: number, max: number];

/** Biên co giãn [min, max] (bội số của giá trị thiết kế) theo bậc thiết bị */
const BOUNDS = {
  font: { phone: [0.9, 1.12], tablet: [1.08, 1.25] },
  spacing: { phone: [0.85, 1.2], tablet: [1.15, 1.45] },
  gap: { phone: [0.85, 1.2], tablet: [1.1, 1.35] },
  radius: { phone: [0.9, 1.15], tablet: [1.05, 1.25] },
  icon: { phone: [0.88, 1.15], tablet: [1.1, 1.3] },
  avatar: { phone: [0.85, 1.15], tablet: [1.15, 1.4] },
  control: { phone: [0.9, 1.15], tablet: [1.05, 1.25] },
} as const satisfies Record<string, { phone: Bounds; tablet: Bounds }>;

export interface ResponsiveSize {
  /** Kích thước cửa sổ hiện tại (đổi theo hướng xoay) */
  width: number;
  height: number;
  /** @deprecated Dùng `width`/`height` — giữ để tương thích */
  screenWidth: number;
  /** @deprecated Dùng `width`/`height` — giữ để tương thích */
  screenHeight: number;
  /** Cạnh ngắn / cạnh dài — không đổi khi xoay */
  shortSide: number;
  longSide: number;
  /** Hệ số cỡ chữ hệ thống (Accessibility) */
  fontScale: number;

  isTablet: boolean;
  isPhone: boolean;
  isDesktop: boolean;
  isSmallPhone: boolean;
  isLandscape: boolean;
  isPortrait: boolean;

  // Typography
  fontSize: (size: number, factor?: number) => number;
  lineHeight: (fontSizeVal: number, multiplier?: number) => number;

  // Spacing
  padding: (size: number, factor?: number) => number;
  px: (size: number, factor?: number) => number;
  py: (size: number, factor?: number) => number;
  margin: (size: number, factor?: number) => number;
  mx: (size: number, factor?: number) => number;
  my: (size: number, factor?: number) => number;
  gap: (size: number) => number;
  verticalGap: (size: number) => number;
  horizontalGap: (size: number) => number;

  // Shapes
  radius: (size: number, factor?: number) => number;
  /** Viền KHÔNG co giãn (viền dày lên trông lỗi); `0` → hairline */
  borderWidth: (size?: number) => number;

  // Icons & media
  iconSize: (size: number) => number;
  avatarSize: (size: number) => number;

  // Component sizing
  buttonHeight: (presetOrCustom?: ComponentSizePreset | number) => number;
  inputHeight: (presetOrCustom?: ComponentSizePreset | number) => number;
  headerHeight: number;

  // Layout
  containerWidth: number;
  modalWidth: number;
  /** Bề rộng tối đa của khối nội dung (form, bài viết) trên màn lớn */
  maxContentWidth: number;
  columns: (phoneCols?: number, tabletCols?: number, landscapeCols?: number) => number;
  select: <T>(options: { phone: T; tablet: T; smallPhone?: T; landscape?: T }) => T;

  // Primitives
  wp: (percent: number) => number;
  hp: (percent: number) => number;
  /** Tỉ lệ tuyến tính theo cạnh ngắn — KHÔNG kẹp, chỉ dùng khi thật cần */
  scale: (size: number) => number;
  /** Tỉ lệ tuyến tính theo cạnh dài — KHÔNG kẹp */
  verticalScale: (size: number) => number;
  /** Co giãn vừa phải theo cạnh ngắn, có kẹp theo bậc thiết bị */
  moderateScale: (size: number, factor?: number) => number;
  /** Co giãn vừa phải theo cạnh dài, có kẹp theo bậc thiết bị */
  moderateVerticalScale: (size: number, factor?: number) => number;
}

export interface WindowMetrics {
  width: number;
  height: number;
  fontScale?: number;
}

/**
 * Tính bộ metrics từ kích thước cửa sổ (hàm thuần — dùng được ngoài React và trong test).
 */
export function computeResponsiveSize({ width, height, fontScale = 1 }: WindowMetrics): ResponsiveSize {
  const shortSide = Math.min(width, height);
  const longSide = Math.max(width, height);

  const isDesktop = Platform.OS === 'web';
  const isTablet = !isDesktop && shortSide >= TABLET_MIN_SHORT_SIDE;
  const isPhone = !isDesktop && !isTablet;
  const isSmallPhone = isPhone && shortSide < SMALL_PHONE_MAX_SHORT_SIDE;
  const isLandscape = width > height;
  const isPortrait = !isLandscape;

  const tier = isTablet ? 'tablet' : 'phone';
  // Kẹp trong [size×lo, size×hi]; giá trị âm (vd: shadow offset) kẹp theo độ lớn, giữ dấu
  const bounded = (raw: number, size: number, bounds: { phone: Bounds; tablet: Bounds }) => {
    const [lo, hi] = bounds[tier];
    const sign = size < 0 ? -1 : 1;
    const magnitude = Math.abs(size);
    return sign * Math.round(clamp(Math.abs(raw), magnitude * lo, magnitude * hi));
  };

  // Tỉ lệ tuyến tính theo kích thước portrait tương đương
  const scale = (size: number) => (shortSide / GUIDELINE_SHORT_SIDE) * size;
  const verticalScale = (size: number) => (longSide / GUIDELINE_LONG_SIDE) * size;
  const rawModerate = (size: number, factor: number) => size + (scale(size) - size) * factor;
  const rawModerateVertical = (size: number, factor: number) => size + (verticalScale(size) - size) * factor;

  const moderateScale = (size: number, factor = 0.5) => bounded(rawModerate(size, factor), size, BOUNDS.spacing);
  const moderateVerticalScale = (size: number, factor = 0.5) =>
    bounded(rawModerateVertical(size, factor), size, BOUNDS.spacing);

  // Typography — RN tự nhân thêm fontScale hệ thống khi render Text (đã giới hạn bằng
  // MAX_FONT_SIZE_MULTIPLIER trong CustomText), nên KHÔNG nhân fontScale ở đây.
  const fontSize = (size: number, factor = 0.25) => bounded(rawModerate(size, factor), size, BOUNDS.font);
  const lineHeight = (fontSizeVal: number, multiplier = 1.35) => Math.round(fontSize(fontSizeVal) * multiplier);

  // Spacing
  const spacing = (size: number, factor = 0.5) => bounded(rawModerate(size, factor), size, BOUNDS.spacing);
  const verticalGap = (size: number) => bounded(verticalScale(size), size, BOUNDS.gap);
  const horizontalGap = (size: number) => bounded(scale(size), size, BOUNDS.gap);

  // Shapes
  const radius = (size: number, factor = 0.5) => bounded(rawModerate(size, factor), size, BOUNDS.radius);
  const borderWidth = (size = 1) => (size <= 0 ? StyleSheet.hairlineWidth : size);

  // Icons & media
  const iconSize = (size: number) => bounded(scale(size), size, BOUNDS.icon);
  const avatarSize = (size: number) => bounded(scale(size), size, BOUNDS.avatar);

  // Component sizing — chiều cao control theo cạnh dài, đảm bảo vùng chạm tối thiểu 44dp
  const controlHeight = (size: number) =>
    Math.max(44, bounded(rawModerateVertical(size, 0.4), size, BOUNDS.control));
  const PRESETS = {
    button: isTablet ? { sm: 44, md: 54, lg: 64 } : { sm: 44, md: 48, lg: 56 },
    input: isTablet ? { sm: 44, md: 54, lg: 62 } : { sm: 44, md: 48, lg: 56 },
  };
  const buttonHeight = (preset: ComponentSizePreset | number = 'md') =>
    typeof preset === 'number' ? controlHeight(preset) : PRESETS.button[preset] ?? PRESETS.button.md;
  const inputHeight = (preset: ComponentSizePreset | number = 'md') =>
    typeof preset === 'number' ? controlHeight(preset) : PRESETS.input[preset] ?? PRESETS.input.md;
  const headerHeight = isTablet ? 64 : 56;

  // Layout
  const wp = (percent: number) => (width * percent) / 100;
  const hp = (percent: number) => (height * percent) / 100;
  const maxContentWidth = Math.min(width, MAX_CONTENT_WIDTH);
  const containerWidth = isTablet || isLandscape ? Math.min(wp(isTablet ? 60 : 80), 640) : wp(92);
  const modalWidth = isTablet || isLandscape ? Math.min(wp(isTablet ? 50 : 60), 520) : wp(90);

  const columns = (phoneCols = 1, tabletCols = 2, landscapeCols?: number) => {
    if (isTablet) {
      return tabletCols;
    }
    if (isLandscape && landscapeCols !== undefined) {
      return landscapeCols;
    }
    return phoneCols;
  };

  const select = <T,>(options: { phone: T; tablet: T; smallPhone?: T; landscape?: T }): T => {
    if (isLandscape && options.landscape !== undefined) {
      return options.landscape;
    }
    if (isSmallPhone && options.smallPhone !== undefined) {
      return options.smallPhone;
    }
    return isTablet ? options.tablet : options.phone;
  };

  return {
    width,
    height,
    screenWidth: width,
    screenHeight: height,
    shortSide,
    longSide,
    fontScale,
    isTablet,
    isPhone,
    isDesktop,
    isSmallPhone,
    isLandscape,
    isPortrait,
    fontSize,
    lineHeight,
    padding: spacing,
    px: spacing,
    py: spacing,
    margin: spacing,
    mx: spacing,
    my: spacing,
    gap: verticalGap,
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
    maxContentWidth,
    columns,
    select,
    wp,
    hp,
    scale,
    verticalScale,
    moderateScale,
    moderateVerticalScale,
  };
}

/** Cache dùng chung: cùng kích thước cửa sổ → cùng một object (tham chiếu ổn định) */
const MAX_CACHE_ENTRIES = 8;
const metricsCache = new Map<string, ResponsiveSize>();

export function getResponsiveSize(metrics: WindowMetrics): ResponsiveSize {
  const key = `${metrics.width}x${metrics.height}@${metrics.fontScale ?? 1}`;
  let result = metricsCache.get(key);
  if (!result) {
    result = computeResponsiveSize(metrics);
    if (metricsCache.size >= MAX_CACHE_ENTRIES) {
      const oldest = metricsCache.keys().next().value;
      if (oldest !== undefined) {
        metricsCache.delete(oldest);
      }
    }
    metricsCache.set(key, result);
  }
  return result;
}

/**
 * Hook responsive — tự cập nhật khi xoay màn hình, chia đôi màn hình, đổi cỡ chữ hệ thống.
 */
export function useResponsiveSize(): ResponsiveSize {
  const { width, height, fontScale } = useWindowDimensions();
  return getResponsiveSize({ width, height, fontScale });
}

export default useResponsiveSize;
