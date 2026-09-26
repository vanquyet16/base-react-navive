/**
 * CREATE STYLES
 * =============
 * StyleSheet gắn với theme (sáng/tối) + responsive engine.
 *
 * - `createStyles(factory)`          → style chỉ phụ thuộc theme + kích thước màn hình.
 * - `createStylesWithProps(factory)` → thêm props riêng của từng instance.
 *
 * Style tự tính lại khi: đổi theme, xoay màn hình, chia đôi màn hình, đổi cỡ chữ hệ thống.
 * Kết quả được cache theo (theme, rs) — `rs` là object dùng chung cho mỗi kích thước cửa sổ,
 * nên N component cùng loại chỉ compile StyleSheet một lần.
 *
 * Kết quả trả về kèm `theme` và `rs` để dùng trong JSX (vd: `styles.rs.iconSize(20)`),
 * vì vậy KHÔNG đặt tên style là `theme` hoặc `rs`.
 *
 * @example
 * const useStyles = createStyles((theme, rs) => ({
 *   container: { padding: rs.padding(theme.spacing.md), backgroundColor: theme.colors.background },
 * }));
 * const styles = useStyles();
 */

import { useMemo, useRef } from 'react';
import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';
import type { Theme } from './theme';
import { useTheme } from './use-theme';
import { useResponsiveSize, type ResponsiveSize } from '@/shared/hooks/useResponsiveSize';
import { logger } from '@/shared/utils/logger';

const RESERVED_KEYS = ['theme', 'rs'] as const;

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export type CompiledStyles<T> = T & { theme: Theme; rs: ResponsiveSize };

export type StyleFactory<T> = (theme: Theme, rs: ResponsiveSize) => T;

export type StyleFactoryWithProps<T, P> = (theme: Theme, rs: ResponsiveSize, props: P) => T;

const compile = <T extends NamedStyles<T>>(styles: T, theme: Theme, rs: ResponsiveSize): CompiledStyles<T> => {
  if (__DEV__) {
    for (const key of RESERVED_KEYS) {
      if (key in styles) {
        logger.warn(`[createStyles] Style key "${key}" trùng thuộc tính hệ thống và sẽ bị ghi đè — hãy đổi tên.`);
      }
    }
  }
  return { ...StyleSheet.create(styles), theme, rs };
};

export function createStyles<T extends NamedStyles<T>>(styleFactory: StyleFactory<T>): () => CompiledStyles<T> {
  // theme → rs → styles. WeakMap: theme/rs cũ bị thu gom khi không còn dùng.
  const cache = new WeakMap<Theme, WeakMap<ResponsiveSize, CompiledStyles<T>>>();

  return () => {
    const theme = useTheme();
    const rs = useResponsiveSize();

    let byRs = cache.get(theme);
    if (!byRs) {
      byRs = new WeakMap();
      cache.set(theme, byRs);
    }
    let styles = byRs.get(rs);
    if (!styles) {
      styles = compile(styleFactory(theme, rs), theme, rs);
      byRs.set(rs, styles);
    }
    return styles;
  };
}

/** So sánh nông props — tránh compile lại khi caller truyền object mới nhưng giá trị không đổi */
const shallowEqual = (a: object, b: object): boolean => {
  if (Object.is(a, b)) {
    return true;
  }
  const keysA = Object.keys(a);
  if (keysA.length !== Object.keys(b).length) {
    return false;
  }
  return keysA.every(
    key =>
      Object.prototype.hasOwnProperty.call(b, key) &&
      Object.is((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]),
  );
};

export function createStylesWithProps<T extends NamedStyles<T>, P extends object>(
  styleFactory: StyleFactoryWithProps<T, P>,
): (props: P) => CompiledStyles<T> {
  return (props: P) => {
    const theme = useTheme();
    const rs = useResponsiveSize();

    // Giữ tham chiếu props ổn định nếu giá trị không đổi
    const stableProps = useStableValue(props);

    return useMemo(() => compile(styleFactory(theme, rs, stableProps), theme, rs), [theme, rs, stableProps]);
  };
}

function useStableValue<P extends object>(value: P): P {
  const ref = useRef(value);
  if (!shallowEqual(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
}
