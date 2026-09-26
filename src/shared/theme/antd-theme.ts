/**
 * ANTD THEME ADAPTER
 * ==================
 * Ánh xạ theme của app sang biến theme của @ant-design/react-native, để Card/List/Switch/Picker/Toast
 * dùng cùng màu thương hiệu và tự đổi theo sáng/tối.
 */

import type { Theme } from './theme';

export const toAntdTheme = ({ colors, radii }: Theme) => ({
    color_text_base: colors.text,
    color_text_base_inverse: colors.textInverse,
    color_text_placeholder: colors.placeholder,
    color_text_disabled: colors.disabled,
    color_text_caption: colors.textSecondary,
    color_text_paragraph: colors.textSecondary,
    color_link: colors.primary,
    color_icon_base: colors.textTertiary,
    fill_body: colors.background,
    fill_base: colors.surface,
    fill_tap: colors.surfaceVariant,
    fill_disabled: colors.disabledBackground,
    fill_mask: colors.backdrop,
    fill_grey: colors.backgroundSecondary,
    brand_primary: colors.primary,
    brand_primary_tap: colors.primaryDark,
    brand_success: colors.success,
    brand_warning: colors.warning,
    brand_error: colors.error,
    brand_important: colors.error,
    border_color_base: colors.border,
    border_color_thin: colors.borderLight,
    radius_xs: radii.xs,
    radius_sm: radii.sm,
    radius_md: radii.md,
    radius_lg: radii.lg,
});
