import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Dimensions } from 'react-native';
import { useResponsiveSize, ResponsiveSize } from '@/shared/hooks/useResponsiveSize';

// Helper component để test hook qua react-test-renderer
const TestConsumer: React.FC<{ onHookResult: (res: ResponsiveSize) => void }> = ({ onHookResult }) => {
  const res = useResponsiveSize();
  onHookResult(res);
  return null;
};

describe('useResponsiveSize Hook', () => {
  const setWindowDimensions = (width: number, height: number) => {
    ReactTestRenderer.act(() => {
      Dimensions.set({
        window: { width, height, scale: 2, fontScale: 1 },
        screen: { width, height, scale: 2, fontScale: 1 },
      });
    });
  };

  beforeEach(() => {
    setWindowDimensions(390, 844);
  });

  it('tính toán chính xác trên màn hình iPhone 14 chuẩn (390 x 844)', () => {
    setWindowDimensions(390, 844);

    let result!: ResponsiveSize;
    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<TestConsumer onHookResult={res => { result = res; }} />);
    });

    expect(result.width).toBe(390);
    expect(result.height).toBe(844);
    expect(result.isTablet).toBe(false);
    expect(result.isLandscape).toBe(false);

    // Tại base dimensions, scale trả về đúng giá trị gốc
    expect(result.scale(16)).toBe(16);
    expect(result.verticalScale(20)).toBe(20);
    expect(result.fontSize(16)).toBe(16);
    expect(result.padding(20)).toBe(20);
    expect(result.iconSize(24)).toBe(24);
    expect(result.wp(50)).toBe(195);
    expect(result.hp(50)).toBe(422);
  });

  it('kiểm soát fontSize trên Phone nhỏ (iPhone SE 320px) không bị quá nhỏ', () => {
    setWindowDimensions(320, 568);

    let result!: ResponsiveSize;
    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<TestConsumer onHookResult={res => { result = res; }} />);
    });

    // Cỡ chữ 16 trên màn 320px không bị co dúm dưới 14px (giới hạn 0.9x)
    expect(result.fontSize(16)).toBeGreaterThanOrEqual(14);
  });

  it('kiểm soát fontSize trên Tablet/iPad (768px, 1024px) không bị quá nhỏ cũng không bị quá to', () => {
    setWindowDimensions(768, 1024);

    let result!: ResponsiveSize;
    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<TestConsumer onHookResult={res => { result = res; }} />);
    });

    expect(result.isTablet).toBe(true);

    // Chữ 16 trên Tablet: lớn hơn phone (>= 17) nhưng không bị to như kính lúp (<= 20)
    const tabletFont = result.fontSize(16);
    expect(tabletFont).toBeGreaterThanOrEqual(17);
    expect(tabletFont).toBeLessThanOrEqual(20);

    // Padding trên Tablet được mở rộng thoáng đãng (16 -> 18..23)
    const tabletPadding = result.padding(16);
    expect(tabletPadding).toBeGreaterThanOrEqual(18);
    expect(tabletPadding).toBeLessThanOrEqual(24);

    // Icon 24 trên Tablet vừa vặn (26..31) chứ không bị 48-60px
    const tabletIcon = result.iconSize(24);
    expect(tabletIcon).toBeGreaterThanOrEqual(26);
    expect(tabletIcon).toBeLessThanOrEqual(31);
  });

  it('nhận diện đúng chế độ xoay ngang (Landscape)', () => {
    setWindowDimensions(844, 390);

    let result!: ResponsiveSize;
    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<TestConsumer onHookResult={res => { result = res; }} />);
    });

    expect(result.isLandscape).toBe(true);
    expect(result.wp(100)).toBe(844);
    expect(result.hp(100)).toBe(390);
  });

  it('tính toán chính xác các component sizing và layout helpers (All-in-One)', () => {
    // 1. Phone chuẩn (390 x 844)
    setWindowDimensions(390, 844);
    let result!: ResponsiveSize;
    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<TestConsumer onHookResult={res => { result = res; }} />);
    });

    expect(result.isPhone).toBe(true);
    expect(result.buttonHeight('md')).toBe(48);
    expect(result.inputHeight('md')).toBe(48);
    expect(result.headerHeight).toBe(56);
    expect(result.containerWidth).toBe(result.wp(92));
    expect(result.columns(1, 2)).toBe(1);
    expect(result.px(16)).toBe(16);
    expect(result.py(12)).toBe(12);
    expect(result.lineHeight(16)).toBeGreaterThanOrEqual(20);

    // Conditional selector
    expect(result.select({ phone: 'A', tablet: 'B' })).toBe('A');

    // 2. Tablet (768 x 1024)
    setWindowDimensions(768, 1024);
    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<TestConsumer onHookResult={res => { result = res; }} />);
    });

    expect(result.isTablet).toBe(true);
    expect(result.buttonHeight('md')).toBe(54);
    expect(result.headerHeight).toBe(64);
    expect(result.columns(1, 2)).toBe(2);
    expect(result.select({ phone: 'A', tablet: 'B' })).toBe('B');
  });
});
