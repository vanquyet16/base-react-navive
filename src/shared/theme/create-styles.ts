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
export type StyleFactory<T extends NamedStyles<T>> = (theme: Theme) => T;

/**
 * createStyles Function (Legacy - Manual Theme)
 * Tạo style factory function với theme access
 * 
 * @param styleFactory - Function nhận theme và return styles
 * @returns Style factory function cần pass theme manually
 * 
 * @example
 * const useStyles = createStyles((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing[4],
 *   },
 * }));
 * 
 * // In component (cách cũ):
 * const theme = useTheme();
 * const styles = useStyles(theme);
 */
export function createStyles<T extends NamedStyles<T>>(
    styleFactory: StyleFactory<T>,
): (theme: Theme) => T;

/**
 * createStyles Function (Auto Theme Injection - Recommended)
 * Tạo hook để tự động inject theme, không cần pass theme manually
 * 
 * @param styleFactory - Function nhận theme và return styles
 * @param autoInject - Set true để tự động inject theme
 * @returns Hook function tự động lấy theme
 * 
 * @example
 * const useStyles = createStyles((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing[4],
 *   },
 * }), true);
 * 
 * // In component (cách mới - chỉ 1 dòng):
 * const styles = useStyles();
 */
export function createStyles<T extends NamedStyles<T>>(
    styleFactory: StyleFactory<T>,
    autoInject: true,
): () => T;

// Implementation
export function createStyles<T extends NamedStyles<T>>(
    styleFactory: StyleFactory<T>,
    autoInject?: boolean,
) {
    if (autoInject) {
        // Auto-inject theme variant
        return (): T => {
            const theme = useTheme();
            // useMemo để tránh recreate styles không cần thiết
            return useMemo(() => {
                const styles = styleFactory(theme);
                return StyleSheet.create(styles);
            }, [theme]);
        };
    } else {
        // Manual theme variant (legacy)
        return (theme: Theme): T => {
            const styles = styleFactory(theme);
            return StyleSheet.create(styles);
        };
    }
}

/**
 * Alternative: makeStyles (alias)
 * Some developers prefer makeStyles naming
 */
export const makeStyles = createStyles;

