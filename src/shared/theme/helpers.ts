/**
 * THEME HELPERS & UTILITIES (SENIOR DX UTILS)
 * ============================================
 * Bộ công cụ tiện ích giúp tối ưu trải nghiệm lập trình (Developer Experience):
 * - alpha(): Chuyển đổi mã màu sang dạng có độ trong suốt (opacity) an toàn.
 * - Typography Presets: Các mẫu typography định nghĩa sẵn (h1-h5, body, caption).
 */

import { TextStyle } from 'react-native';
import { typography } from './tokens';

/**
 * Chuyển đổi mã màu hex hoặc rgb sang rgba với độ mờ (opacity) từ 0 đến 1.
 * 
 * @param color - Mã màu định dạng Hex ('#FFFFFF', '#FFF') hoặc RGB ('rgb(255, 255, 255)')
 * @param opacity - Giá trị độ mờ từ 0 (trong suốt hoàn toàn) đến 1 (đậm đặc hoàn toàn)
 * @returns Chuỗi màu 'rgba(r, g, b, opacity)'
 * 
 * @example
 * alpha('#E65100', 0.1) // -> 'rgba(230, 81, 0, 0.1)'
 * alpha(theme.colors.primary, 0.15) // Rất tiện để làm màu nền nhạt của badge/button
 */
export const alpha = (color: string, opacity: number): string => {
  if (!color || typeof color !== 'string') return color;

  // Giới hạn opacity trong khoảng [0, 1]
  const safeOpacity = Math.max(0, Math.min(1, opacity));

  // 1. Xử lý màu Hex (#RGB hoặc #RRGGBB hoặc #RRGGBBAA)
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        return `rgba(${r}, ${g}, ${b}, ${safeOpacity})`;
      }
    }
  }

  // 2. Xử lý màu RGB hoặc RGBA
  if (color.startsWith('rgb')) {
    const rgbValues = color.match(/\d+(\.\d+)?/g);
    if (rgbValues && rgbValues.length >= 3) {
      const [r, g, b] = rgbValues;
      return `rgba(${r}, ${g}, ${b}, ${safeOpacity})`;
    }
  }

  // Fallback nếu màu không hợp lệ hoặc là tên màu named (red, blue...)
  return color;
};

/**
 * Typography Presets - Các kiểu chữ định sẵn cho giao diện
 */
export const typographyPresets = {
  h1: {
    fontSize: typography.fontSizes['4xl'],
    lineHeight: Math.round(typography.fontSizes['4xl'] * typography.lineHeights.tight),
    fontWeight: typography.fontWeights.bold,
  } as TextStyle,

  h2: {
    fontSize: typography.fontSizes['3xl'],
    lineHeight: Math.round(typography.fontSizes['3xl'] * typography.lineHeights.tight),
    fontWeight: typography.fontWeights.bold,
  } as TextStyle,

  h3: {
    fontSize: typography.fontSizes['2xl'],
    lineHeight: Math.round(typography.fontSizes['2xl'] * typography.lineHeights.normal),
    fontWeight: typography.fontWeights.bold,
  } as TextStyle,

  h4: {
    fontSize: typography.fontSizes.xl,
    lineHeight: Math.round(typography.fontSizes.xl * typography.lineHeights.normal),
    fontWeight: typography.fontWeights.bold,
  } as TextStyle,

  h5: {
    fontSize: typography.fontSizes.lg,
    lineHeight: Math.round(typography.fontSizes.lg * typography.lineHeights.normal),
    fontWeight: typography.fontWeights.semibold,
  } as TextStyle,

  bodyLarge: {
    fontSize: typography.fontSizes.base,
    lineHeight: Math.round(typography.fontSizes.base * typography.lineHeights.normal),
    fontWeight: typography.fontWeights.normal,
  } as TextStyle,

  bodyMedium: {
    fontSize: typography.fontSizes.sm,
    lineHeight: Math.round(typography.fontSizes.sm * typography.lineHeights.normal),
    fontWeight: typography.fontWeights.normal,
  } as TextStyle,

  bodySmall: {
    fontSize: typography.fontSizes.xs,
    lineHeight: Math.round(typography.fontSizes.xs * typography.lineHeights.normal),
    fontWeight: typography.fontWeights.normal,
  } as TextStyle,

  caption: {
    fontSize: typography.fontSizes['2xs'],
    lineHeight: Math.round(typography.fontSizes['2xs'] * typography.lineHeights.normal),
    fontWeight: typography.fontWeights.normal,
  } as TextStyle,

  button: {
    fontSize: typography.fontSizes.sm,
    lineHeight: Math.round(typography.fontSizes.sm * typography.lineHeights.tight),
    fontWeight: typography.fontWeights.semibold,
  } as TextStyle,
} as const;
