import React, { useMemo } from 'react';
import { ImageStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { moderateScale, scale } from 'react-native-size-matters';

interface LogoProps {
  /** Kích thước của logo (width = height) */
  size?: number;
  /** Custom style cho Image - sử dụng kiểu của FastImage để tránh conflict */
  style?: FastImageProps['style'];
  /** Tên file logo */
  name?: string;
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
const IMAGES: Record<string, any> = {
  logo: require('@/assets/images/logo.png'),
  logoVnid: require('@/assets/images/logoVnid.png'),
};

export const Logo: React.FC<LogoProps> = ({
  size = 120,
  style,
  name = 'logo',
}) => {
  const styleMemo = useMemo(() => {
    return [
      {
        width: scale(size),
        height: moderateScale(size), // Ensure aspect ratio might need attention if images differ
      },
      style,
    ];
  }, [size, style]);

  const source = IMAGES[name] || IMAGES.logo;

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
};

/**
 * Memoized export để prevent unnecessary re-renders
 */
export default React.memo(Logo);
