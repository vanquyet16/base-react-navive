import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Dimensions, StyleSheet } from 'react-native';
import {
  computeResponsiveSize,
  getResponsiveSize,
  useResponsiveSize,
  type ResponsiveSize,
} from '@/shared/hooks/useResponsiveSize';

const rs = (width: number, height: number, fontScale = 1) => computeResponsiveSize({ width, height, fontScale });

describe('Responsive engine — thiết bị chuẩn', () => {
  it('iPhone 14 (390×844): giá trị thiết kế giữ nguyên', () => {
    const r = rs(390, 844);
    expect(r.isPhone).toBe(true);
    expect(r.fontSize(16)).toBe(16);
    expect(r.padding(20)).toBe(20);
    expect(r.iconSize(24)).toBe(24);
    expect(r.scale(16)).toBe(16);
    expect(r.wp(50)).toBe(195);
    expect(r.hp(50)).toBe(422);
    expect(r.buttonHeight('md')).toBe(48);
    expect(r.headerHeight).toBe(56);
    expect(r.containerWidth).toBe(r.wp(92));
  });

  it('iPhone SE (320×568): chữ không co dưới 90%', () => {
    const r = rs(320, 568);
    expect(r.isSmallPhone).toBe(true);
    expect(r.fontSize(16)).toBeGreaterThanOrEqual(14);
    expect(r.padding(16)).toBeGreaterThanOrEqual(14);
  });

  it('iPad (768×1024): lớn hơn phone nhưng có trần', () => {
    const r = rs(768, 1024);
    expect(r.isTablet).toBe(true);
    expect(r.fontSize(16)).toBeGreaterThanOrEqual(17);
    expect(r.fontSize(16)).toBeLessThanOrEqual(20);
    expect(r.padding(16)).toBeLessThanOrEqual(24);
    expect(r.iconSize(24)).toBeLessThanOrEqual(31);
    expect(r.buttonHeight('md')).toBe(54);
    expect(r.columns(1, 2)).toBe(2);
  });
});

describe('Responsive engine — xoay màn hình & màn đặc biệt', () => {
  it('xoay ngang KHÔNG làm đổi cỡ chữ/icon/padding (co giãn theo cạnh ngắn)', () => {
    const portrait = rs(390, 844);
    const landscape = rs(844, 390);
    for (const size of [8, 12, 16, 24, 32]) {
      expect(landscape.fontSize(size)).toBe(portrait.fontSize(size));
      expect(landscape.padding(size)).toBe(portrait.padding(size));
      expect(landscape.iconSize(size)).toBe(portrait.iconSize(size));
      expect(landscape.scale(size)).toBe(portrait.scale(size));
      expect(landscape.moderateVerticalScale(size)).toBe(portrait.moderateVerticalScale(size));
    }
  });

  it('bố cục phần trăm (wp/hp) theo hướng hiện tại', () => {
    const r = rs(844, 390);
    expect(r.isLandscape).toBe(true);
    expect(r.wp(100)).toBe(844);
    expect(r.hp(100)).toBe(390);
  });

  it('điện thoại lớn xoay ngang (932×430) vẫn là phone, không phải tablet', () => {
    const r = rs(932, 430);
    expect(r.isTablet).toBe(false);
    expect(r.isPhone).toBe(true);
    expect(r.buttonHeight('md')).toBe(48);
  });

  it('tablet xoay ngang vẫn là tablet', () => {
    expect(rs(1024, 768).isTablet).toBe(true);
  });

  it('iPad chia đôi màn hình hẹp (507×1024) được coi là phone để layout một cột', () => {
    const r = rs(507, 1024);
    expect(r.isTablet).toBe(false);
    expect(r.columns(1, 2)).toBe(1);
  });

  it('khối nội dung không bị kéo quá rộng trên màn lớn', () => {
    expect(rs(1366, 1024).maxContentWidth).toBe(720);
    expect(rs(390, 844).maxContentWidth).toBe(390);
    expect(rs(844, 390).containerWidth).toBeLessThanOrEqual(640);
  });

  it('viền không bị phóng to khi xoay; 0 → hairline', () => {
    expect(rs(844, 390).borderWidth(1)).toBe(1);
    expect(rs(390, 844).borderWidth(0)).toBe(StyleSheet.hairlineWidth);
  });

  it('control luôn đạt vùng chạm tối thiểu 44dp', () => {
    expect(rs(320, 568).buttonHeight('sm')).toBeGreaterThanOrEqual(44);
    expect(rs(320, 568).inputHeight(30)).toBeGreaterThanOrEqual(44);
  });

  it('giá trị âm (shadow offset) được kẹp theo độ lớn, giữ dấu', () => {
    const value = rs(768, 1024).moderateVerticalScale(-3);
    expect(value).toBeLessThan(0);
    expect(Math.abs(value)).toBeLessThanOrEqual(5);
  });
});

describe('Responsive engine — cache dùng chung', () => {
  it('cùng kích thước cửa sổ → cùng một object (để cache style theo tham chiếu)', () => {
    const a = getResponsiveSize({ width: 390, height: 844, fontScale: 1 });
    const b = getResponsiveSize({ width: 390, height: 844, fontScale: 1 });
    const c = getResponsiveSize({ width: 844, height: 390, fontScale: 1 });
    expect(a).toBe(b);
    expect(a).not.toBe(c);
  });

  it('hook cập nhật khi đổi kích thước cửa sổ', () => {
    let result!: ResponsiveSize;
    const Consumer = () => {
      result = useResponsiveSize();
      return null;
    };
    const set = (width: number, height: number) =>
      ReactTestRenderer.act(() => {
        Dimensions.set({
          window: { width, height, scale: 2, fontScale: 1 },
          screen: { width, height, scale: 2, fontScale: 1 },
        });
      });

    set(390, 844);
    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<Consumer />);
    });
    expect(result.isPortrait).toBe(true);

    set(844, 390);
    expect(result.isLandscape).toBe(true);
    expect(result.width).toBe(844);
  });
});
