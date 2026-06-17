/**
 * CREATE STYLES HELPER
 * ====================
 * Type-safe StyleSheet.create alternative với theme integration.
 * Tự động inject theme để tạo hook useStyles sử dụng trong component.
 */

import { useMemo, useRef } from 'react';
import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';
import type { Theme } from './theme';
import { useTheme } from './use-theme';

// Hàm so sánh nông để tránh re-create stylesheet khi props thay đổi reference nhưng giữ nguyên value
function shallowEqual<T>(objA: T, objB: T): boolean {
    if (Object.is(objA, objB)) return true;
    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) return false;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for (let i = 0; i < keysA.length; i++) {
        const key = keysA[i];
        if (!Object.prototype.hasOwnProperty.call(objB, key) || !Object.is((objA as any)[key], (objB as any)[key])) {
            return false;
        }
    }
    return true;
}

/**
 * Named styles type - union of all style types
 */
type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

/**
 * Style factory function type
 * Function nhận theme và return styles object
 */
export type StyleFactory<T> = (theme: Theme) => T;

/**
 * Style factory function type với props
 * Function nhận theme và props, return styles object
 */
export type StyleFactoryWithProps<T, P = Record<string, unknown>> = (
    theme: Theme,
    props: P,
) => T;

/**
 * createStyles Function (Auto Theme Injection với Props)
 * Tạo hook để tự động inject theme và nhận props.
 * Hỗ trợ nhận theme optional ở client-side để tương thích ngược.
 */
export function createStyles<T extends NamedStyles<any>, P = void>(
    styleFactory: StyleFactoryWithProps<T, P>,
    autoInject?: boolean,
): P extends void ? (theme?: any) => T & { theme: Theme } : (props: P) => T & { theme: Theme };

/**
 * createStyles Function (Auto Theme Injection - Recommended)
 * Tạo hook tự động inject theme, không bắt buộc truyền autoInject: true.
 * Hỗ trợ nhận theme optional ở client-side để tương thích ngược.
 */
export function createStyles<T extends NamedStyles<any>>(
    styleFactory: StyleFactory<T>,
    autoInject?: boolean,
): (theme?: any) => T & { theme: Theme };

// Implementation
export function createStyles<T extends NamedStyles<any>, P = Record<string, unknown>>(
    styleFactory: StyleFactory<T> | StyleFactoryWithProps<T, P>,
    autoInject?: boolean,
) {
    // Luôn ưu tiên check props trước (nếu nhận 2 đối số)
    const hasProps = styleFactory.length === 2;

    if (hasProps) {
        // Auto-inject theme với props
        return (props: P): T & { theme: Theme } => {
            const theme = useTheme();
            const propsRef = useRef<P>(props);
            const themeRef = useRef<Theme>(theme);
            const stylesRef = useRef<T & { theme: Theme } | undefined>(undefined);

            const isThemeChanged = theme !== themeRef.current;
            const isPropsChanged = !shallowEqual(propsRef.current, props);

            if (!stylesRef.current || isThemeChanged || isPropsChanged) {
                propsRef.current = props;
                themeRef.current = theme;
                const styles = (styleFactory as StyleFactoryWithProps<T, P>)(theme, props);
                const compiled = StyleSheet.create(styles);
                stylesRef.current = { ...compiled, theme };
            }

            return stylesRef.current;
        };
    } else {
        // Auto-inject theme không có props
        return (themeArg?: any): T & { theme: Theme } => {
            const theme = useTheme();
            const themeRef = useRef<Theme>(theme);
            const stylesRef = useRef<T & { theme: Theme } | undefined>(undefined);

            const isThemeChanged = theme !== themeRef.current;

            if (!stylesRef.current || isThemeChanged) {
                themeRef.current = theme;
                const styles = (styleFactory as StyleFactory<T>)(theme);
                const compiled = StyleSheet.create(styles);
                stylesRef.current = { ...compiled, theme };
            }

            return stylesRef.current;
        };
    }
}

/**
 * Alternative: makeStyles (alias)
 */
export const makeStyles = createStyles;
