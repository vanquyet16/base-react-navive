/**
 * CREATE STYLES HELPER
 * ====================
 * Type-safe StyleSheet.create alternative với theme integration.
 * Similar API to StyleSheet.create nhưng có access vào theme.
 * 
 * @senior-pattern Typed styles với theme injection
 */

import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';
import type { Theme } from './theme';

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
 * createStyles Function
 * Tạo style factory function với theme access
 * 
 * @param styleFactory - Function nhận theme và return styles
 * @returns Style factory function
 * 
 * @example
 * const useStyles = createStyles((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing[4],
 *   },
 *   text: {
 *     color: theme.colors.text,
 *     fontSize: theme.typography.fontSizes.base,
 *   },
 * }));
 * 
 * // In component:
 * const styles = useStyles();
 */
export const createStyles = <T extends NamedStyles<T>>(
    styleFactory: StyleFactory<T>,
) => {
    return (theme: Theme): T => {
        const styles = styleFactory(theme);
        return StyleSheet.create(styles);
    };
};

/**
 * Alternative: makeStyles (alias)
 * Some developers prefer makeStyles naming
 */
export const makeStyles = createStyles;
