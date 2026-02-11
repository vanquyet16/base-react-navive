/**
 * CREATE STYLES HELPER
 * ====================
 * Type-safe StyleSheet.create alternative với theme integration.
 * Similar API to StyleSheet.create nhưng có access vào theme.
 * 
 */

import { useMemo } from 'react';
import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';
import type { Theme } from './theme';
import { useTheme } from './use-theme';

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
 * Tạo hook để tự động inject theme và nhận props
 * Uses conditional type to make props optional if P is void/undefined
 */
export function createStyles<T extends NamedStyles<any>, P = void>(
    styleFactory: StyleFactoryWithProps<T, P>,
    autoInject: true,
): P extends void ? () => T : (props: P) => T;

/**
 * createStyles Function (Auto Theme Injection - Recommended)
 * Tạo hook để tự động inject theme, không cần pass theme manually
 */
export function createStyles<T extends NamedStyles<any>>(
    styleFactory: StyleFactory<T>,
    autoInject: true,
): () => T;

// Implementation
export function createStyles<T extends NamedStyles<any>, P = Record<string, unknown>>(
    styleFactory: StyleFactory<T> | StyleFactoryWithProps<T, P>,
    autoInject?: boolean,
) {
    // Luôn ưu tiên check props trước
    const hasProps = styleFactory.length === 2;

    if (hasProps) {
        // Auto-inject theme variant với props
        return (props: P): T => {
            const theme = useTheme();
            // useMemo để tránh recreate styles không cần thiết
            return useMemo(() => {
                const styles = (styleFactory as StyleFactoryWithProps<T, P>)(theme, props);
                return StyleSheet.create(styles);
            }, [theme, props]);
        };
    } else {
        // Auto-inject theme variant không có props
        return (): T => {
            const theme = useTheme();
            // useMemo để tránh recreate styles không cần thiết
            return useMemo(() => {
                const styles = (styleFactory as StyleFactory<T>)(theme);
                return StyleSheet.create(styles);
            }, [theme]);
        };
    }
}

/**
 * Alternative: makeStyles (alias)
 * Some developers prefer makeStyles naming
 */
export const makeStyles = createStyles;

