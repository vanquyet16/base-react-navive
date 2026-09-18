/**
 * CREATE STYLES HELPER (SENIOR ARCHITECTURE STANDARD)
 * ====================================================
 * Type-safe StyleSheet alternative tích hợp đồng thời:
 * 1. Base Theme System (Màu sắc, Dark/Light mode, Semantic tokens)
 * 2. Responsive Engine (useResponsiveSize: Scale, Clamping, Tablet/Phone/Orientation)
 *
 * API tách rõ 2 hàm:
 * - `createStyles(factory)`          → style TĨNH, không props.
 * - `createStylesWithProps(factory)` → style ĐỘNG, nhận thêm props tùy biến.
 *
 * ⚠️ ROADMAP DEPRECATION (Dự kiến hoàn thành ở v2.0):
 * - Tham số thứ 2 `_deprecatedAutoInject` của `createStyles` và `createStylesWithProps`
 *   sẽ bị gỡ bỏ hoàn toàn.
 * - Tham số `_deprecatedTheme` truyền vào hook trả về (`useStyles(_deprecatedTheme)`)
 *   sẽ bị gỡ bỏ hoàn toàn.
 * - Hiện tại các tham số này chỉ đóng vai trò backward-compatibility tạm thời để
 *   tránh vỡ build, và sẽ đưa ra console.warn trong môi trường __DEV__.
 */

import { useRef } from 'react';
import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';
import type { Theme } from './theme';
import { useTheme } from './use-theme';
import { useResponsiveSize, type ResponsiveSize } from '@/shared/hooks/useResponsiveSize';

const MAX_CACHE_ENTRIES_PER_THEME = 5;
const RESERVED_KEYS = ['theme', 'rs'] as const;

/** So sánh nông — tránh re-tính style khi props đổi reference nhưng giữ nguyên value */
function shallowEqual<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) return true;
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) return false;
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key) || !Object.is((objA as any)[key], (objB as any)[key])) {
      return false;
    }
  }
  return true;
}

/** Cảnh báo dev nếu style factory lỡ đặt key trùng với `theme`/`rs` (sẽ bị ghi đè ngầm) */
function warnIfReservedKeyCollision<T extends Record<string, unknown>>(styles: T): void {
  if (typeof __DEV__ === 'undefined' || !__DEV__) return;
  for (const reserved of RESERVED_KEYS) {
    if (reserved in styles) {
      console.warn(
        `[createStyles] Style key "${reserved}" trùng với thuộc tính hệ thống (theme/rs) ` +
          `và sẽ bị ghi đè ngầm trong kết quả trả về. Hãy đổi tên style key này.`,
      );
    }
  }
}

/** Named styles type - union of all style types */
type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

/** Kiểu kết quả trả về: style đã compile + theme + rs hiện tại */
export type CompiledStyles<T> = T & {
  theme: Theme;
  rs: ResponsiveSize;
};

/** Style factory KHÔNG props */
export type StyleFactory<T> = (theme: Theme, rs: ResponsiveSize) => T;

/** Style factory CÓ props */
export type StyleFactoryWithProps<T, P> = (theme: Theme, rs: ResponsiveSize, props: P) => T;

// ============================================================================
// 1. createStyles — STYLE TĨNH, KHÔNG PROPS
// ============================================================================
/**
 * Dùng cho style KHÔNG phụ thuộc props của component (trường hợp phổ biến nhất).
 * Cache module-level 2 tầng: theme (WeakMap, tự GC) → kích thước màn hình (Map).
 *
 * @param styleFactory Hàm tạo stylesheet nhận (theme, rs)
 * @param _deprecatedAutoInject @deprecated Không còn tác dụng — factory luôn tự inject theme và rs. Sẽ bị xoá ở v2.0.
 *
 * @example
 * const useStyles = createStyles((theme, rs) => ({
 *   container: { padding: rs.padding(16), backgroundColor: theme.colors.background },
 * }));
 *
 * function MyComponent() {
 *   const styles = useStyles();
 *   return <View style={styles.container} />;
 * }
 */
export function createStyles<T extends NamedStyles<any>>(
  styleFactory: StyleFactory<T>,
  /** @deprecated Không còn tác dụng — factory luôn tự inject theme và rs. Sẽ bị xoá ở v2.0. */
  _deprecatedAutoInject?: boolean,
): (
  /** @deprecated Không còn tác dụng — hook luôn tự gọi useTheme() nội bộ. Sẽ bị xoá ở v2.0. */
  _deprecatedTheme?: any,
) => CompiledStyles<T> {
  if (typeof __DEV__ !== 'undefined' && __DEV__ && _deprecatedAutoInject !== undefined) {
    console.warn(
      '[createStyles] Tham số thứ hai (autoInject/boolean) không còn được sử dụng và sẽ bị bỏ qua. ' +
        'Thư viện luôn tự inject (theme, rs). Dự kiến xoá hoàn toàn ở v2.0.',
    );
  }

  // theme → (widthxheight → compiled result)
  const cache = new WeakMap<Theme, Map<string, CompiledStyles<T>>>();

  return (_deprecatedTheme?: any): CompiledStyles<T> => {
    if (typeof __DEV__ !== 'undefined' && __DEV__ && _deprecatedTheme !== undefined) {
      console.warn(
        '[createStyles] Tham số theme truyền vào hook useStyles(theme) không còn được dùng và sẽ bị bỏ qua. ' +
          'Hook tự lấy theme qua useTheme() nội bộ. Hãy gọi useStyles() không tham số. Dự kiến xoá hoàn toàn ở v2.0.',
      );
    }

    const theme = useTheme();
    const rs = useResponsiveSize();
    const dimKey = `${rs.width}x${rs.height}`;

    let bucket = cache.get(theme);
    if (!bucket) {
      bucket = new Map();
      cache.set(theme, bucket);
    }

    const cached = bucket.get(dimKey);
    if (cached) return cached;

    const styles = styleFactory(theme, rs);
    warnIfReservedKeyCollision(styles as Record<string, unknown>);
    const compiled = StyleSheet.create(styles);
    const result: CompiledStyles<T> = { ...compiled, theme, rs };

    // Giới hạn số kích thước cache mỗi theme, tránh phình bộ nhớ khi app cho
    // resize liên tục (ví dụ kéo split-view trên iPad)
    if (bucket.size >= MAX_CACHE_ENTRIES_PER_THEME) {
      const oldestKey = bucket.keys().next().value;
      if (oldestKey !== undefined) bucket.delete(oldestKey);
    }
    bucket.set(dimKey, result);

    return result;
  };
}

// ============================================================================
// 2. createStylesWithProps — STYLE ĐỘNG, CÓ PROPS
// ============================================================================
/**
 * Dùng cho style phụ thuộc thêm props riêng của từng instance component
 * (ví dụ: màu sắc theo trạng thái, kích thước theo variant...).
 * Cache theo từng instance (useRef) — không dùng chung module-level cache
 * vì props khác nhau giữa các instance.
 *
 * @param styleFactory Hàm tạo stylesheet nhận (theme, rs, props)
 * @param _deprecatedAutoInject @deprecated Không còn tác dụng — factory luôn tự inject theme và rs. Sẽ bị xoá ở v2.0.
 *
 * @example
 * const useStyles = createStylesWithProps((theme, rs, props: { active: boolean }) => ({
 *   box: { borderColor: props.active ? theme.colors.primary : theme.colors.border },
 * }));
 *
 * function MyComponent({ active }: { active: boolean }) {
 *   const styles = useStyles({ active });
 *   return <View style={styles.box} />;
 * }
 */
export function createStylesWithProps<T extends NamedStyles<any>, P>(
  styleFactory: StyleFactoryWithProps<T, P>,
  /** @deprecated Không còn tác dụng — factory luôn tự inject theme và rs. Sẽ bị xoá ở v2.0. */
  _deprecatedAutoInject?: boolean,
): (props: P) => CompiledStyles<T> {
  if (typeof __DEV__ !== 'undefined' && __DEV__ && _deprecatedAutoInject !== undefined) {
    console.warn(
      '[createStylesWithProps] Tham số thứ hai (autoInject/boolean) không còn được sử dụng và sẽ bị bỏ qua. ' +
        'Thư viện luôn tự inject (theme, rs, props). Dự kiến xoá hoàn toàn ở v2.0.',
    );
  }

  return (props: P): CompiledStyles<T> => {
    const theme = useTheme();
    const rs = useResponsiveSize();

    const propsRef = useRef<P>(props);
    const themeRef = useRef<Theme>(theme);
    const widthRef = useRef<number>(rs.width);
    const heightRef = useRef<number>(rs.height);
    const resultRef = useRef<CompiledStyles<T> | undefined>(undefined);

    const isThemeChanged = theme !== themeRef.current;
    const isDimChanged = rs.width !== widthRef.current || rs.height !== heightRef.current;
    const isPropsChanged = !shallowEqual(propsRef.current, props);

    if (!resultRef.current || isThemeChanged || isDimChanged || isPropsChanged) {
      propsRef.current = props;
      themeRef.current = theme;
      widthRef.current = rs.width;
      heightRef.current = rs.height;

      const styles = styleFactory(theme, rs, props);
      warnIfReservedKeyCollision(styles as Record<string, unknown>);
      const compiled = StyleSheet.create(styles);
      resultRef.current = { ...compiled, theme, rs };
    }

    return resultRef.current!;
  };
}

/** Alias giữ tương thích tên gọi cũ cho style tĩnh */
export const makeStyles = createStyles;