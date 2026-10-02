import React, { useMemo, memo } from 'react';

import type { ImageRequireSource } from 'react-native';
import FastImage, { type FastImageProps } from '@d11/react-native-fast-image';
import { useResponsiveSize } from '@/shared/hooks/useResponsiveSize';

interface LogoProps {
  /** Kích thước của logo (width = height) */
  size?: number;
  /** Custom style cho Image - sử dụng kiểu của FastImage để tránh conflict */
  style?: FastImageProps['style'];
  /** Tên file logo */
  name?: LogoName;
}

/**
 * Logo component hiển thị logo của ứng dụng CBS Mobile
 *
 * Component này sử dụng FastImage để tối ưu hiệu năng:
 * - Caching thông minh với chiến lược immutable
 * - Load ảnh nhanh hơn với native implementation (SDWebImage/Glide)
 * - Tự động chọn resolution phù hợp (@2x, @3x) dựa trên màn hình
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Logo />
 *
 * // Custom size
 * <Logo size={80} />
 *
 * // With tint color (cho PNG với alpha channel)
 * <Logo size={120} style={{ tintColor: theme.colors.primary }} />
 * ```
 */
const IMAGES = {
  logo: require('@/assets/images/logo.png'),
  logoVnid: require('@/assets/images/logoVnid.png'),
} satisfies Record<string, ImageRequireSource>;

export type LogoName = keyof typeof IMAGES;

export const Logo: React.FC<LogoProps> = memo(
  ({ size = 120, style, name = 'logo' }) => {
    const rs = useResponsiveSize();
    // Cùng một kích thước cho 2 chiều — giữ logo vuông, không méo trên màn khác chuẩn
    const styleMemo = useMemo(() => {
      const dimension = rs.moderateScale(size);
      return [{ width: dimension, height: dimension }, style];
    }, [rs, size, style]);

    const source = IMAGES[name];

    return (
      <FastImage
        source={source}
        style={styleMemo}
        resizeMode={FastImage.resizeMode.contain}
        // Accessibility
        accessible
        accessibilityLabel={`Logo ${name}`}
      />
    );
  },
);

export default Logo;
