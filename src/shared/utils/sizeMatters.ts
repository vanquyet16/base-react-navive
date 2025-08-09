import {
    scale,           // Scale theo width - dùng cho font, padding, margin, width, height
    verticalScale,   // Scale theo height - dùng cho height, top, bottom, marginVertical
    moderateScale,   // Scale với factor có thể điều chỉnh - ít aggressive hơn scale
} from 'react-native-size-matters';
import { Dimensions, PixelRatio } from 'react-native';

// ============================================================================
// RE-EXPORT CÁC FUNCTION CHÍNH TỪ THƯ VIỆN GỐC
// ============================================================================

/**
 * scale(size: number) - Scale kích thước dựa trên chiều rộng màn hình
 * Sử dụng cho: Font size, padding, margin, width, height
 * Ví dụ: fontSize: scale(16), padding: scale(20)
 */
export { scale };

/**
 * verticalScale(size: number) - Scale kích thước dựa trên chiều cao màn hình
 * Sử dụng cho: Height, top, bottom, marginVertical
 * Ví dụ: height: verticalScale(100), marginTop: verticalScale(20)
 */
export { verticalScale };

/**
 * moderateScale(size: number, factor: number = 0.5) - Scale với factor có thể điều chỉnh
 * Sử dụng cho: Khi muốn kiểm soát mức độ scale
 * Ví dụ: fontSize: moderateScale(16, 0.3) - scale ít hơn
 */
export { moderateScale };

// Export Dimensions và PixelRatio từ react-native
export { Dimensions, PixelRatio };

// ============================================================================
// CÁC CONSTANT HỮU ÍCH VÀ CACHE
// ============================================================================

// Cache kích thước màn hình để tránh tính toán lại
let _screenDimensions: { width: number; height: number } | null = null;
let _pixelRatio: number | null = null;

/**
 * Lấy kích thước màn hình hiện tại (có cache)
 * SCREEN_WIDTH: Chiều rộng màn hình
 * SCREEN_HEIGHT: Chiều cao màn hình
 */
export const getScreenDimensions = () => {
    if (!_screenDimensions) {
        _screenDimensions = Dimensions.get('screen');
    }
    return _screenDimensions;
};

export const SCREEN_WIDTH = getScreenDimensions().width;
export const SCREEN_HEIGHT = getScreenDimensions().height;

/**
 * Lấy pixel ratio (có cache)
 */
export const getPixelRatio = () => {
    if (_pixelRatio === null) {
        _pixelRatio = PixelRatio.get();
    }
    return _pixelRatio;
};

// ============================================================================
// CÁC GIÁ TRỊ SCALE MẪU CHO CÁC KÍCH THƯỚC PHỔ BIẾN
// ============================================================================

/**
 * SIZES - Object chứa các giá trị scale có sẵn
 * Sử dụng: fontSize: SIZES.FONT_MEDIUM, padding: SIZES.SPACING_LARGE
 * 
 * Các loại:
 * - FONT_*: Kích thước font
 * - SPACING_*: Khoảng cách (padding, margin)
 * - RADIUS_*: Border radius
 * - ICON_*: Kích thước icon
 */
export const SIZES = {
    // ===== FONT SIZES =====
    FONT_TINY: scale(10),      // Font rất nhỏ - cho caption, label nhỏ
    FONT_SMALL: scale(12),     // Font nhỏ - cho caption, helper text
    FONT_NORMAL: scale(14),    // Font bình thường - cho body text
    FONT_MEDIUM: scale(16),    // Font trung bình - cho button text, subtitle
    FONT_LARGE: scale(18),     // Font lớn - cho section title
    FONT_XLARGE: scale(20),    // Font rất lớn - cho main title
    FONT_XXLARGE: scale(24),   // Font cực lớn - cho header
    FONT_TITLE: scale(28),     // Font title - cho page title
    FONT_HEADER: scale(32),    // Font header - cho app header

    // ===== SPACING =====
    SPACING_TINY: scale(4),    // Khoảng cách rất nhỏ - cho gap nhỏ
    SPACING_SMALL: scale(8),   // Khoảng cách nhỏ - cho padding nhỏ
    SPACING_NORMAL: scale(12), // Khoảng cách bình thường - cho padding cơ bản
    SPACING_MEDIUM: scale(16), // Khoảng cách trung bình - cho padding button
    SPACING_LARGE: scale(20),  // Khoảng cách lớn - cho margin section
    SPACING_XLARGE: scale(24), // Khoảng cách rất lớn - cho margin lớn
    SPACING_XXLARGE: scale(32), // Khoảng cách cực lớn - cho margin page

    // ===== BORDER RADIUS =====
    RADIUS_SMALL: scale(4),    // Border radius nhỏ - cho input, button nhỏ
    RADIUS_NORMAL: scale(8),   // Border radius bình thường - cho button, card
    RADIUS_MEDIUM: scale(12),  // Border radius trung bình - cho card lớn
    RADIUS_LARGE: scale(16),   // Border radius lớn - cho modal, popup
    RADIUS_XLARGE: scale(24),  // Border radius rất lớn - cho rounded container

    // ===== ICON SIZES =====
    ICON_TINY: scale(12),      // Icon rất nhỏ - cho status icon
    ICON_SMALL: scale(16),     // Icon nhỏ - cho action icon
    ICON_NORMAL: scale(20),    // Icon bình thường - cho tab icon
    ICON_MEDIUM: scale(24),    // Icon trung bình - cho button icon
    ICON_LARGE: scale(32),     // Icon lớn - cho feature icon
    ICON_XLARGE: scale(40),    // Icon rất lớn - cho hero icon
} as const;

// ============================================================================
// HELPER FUNCTIONS TỐI ƯU
// ============================================================================

// Cache cho các giá trị đã tính toán
const sizeCache = new Map<string, number>();

/**
 * getResponsiveSize(size: number, factor: number = 0.5)
 * Tạo kích thước responsive với factor có thể điều chỉnh (có cache)
 * 
 * @param size - Kích thước gốc
 * @param factor - Factor điều chỉnh (0-1), mặc định 0.5
 * @returns Kích thước đã scale
 * 
 * Ví dụ: getResponsiveSize(16, 0.3) - scale ít hơn
 */
export const getResponsiveSize = (size: number, factor: number = 0.5) => {
    const cacheKey = `${size}_${factor}`;

    if (sizeCache.has(cacheKey)) {
        return sizeCache.get(cacheKey)!;
    }

    const result = moderateScale(size, factor);
    sizeCache.set(cacheKey, result);
    return result;
};

/**
 * getScaledWidth(percentage: number)
 * Lấy chiều rộng theo phần trăm màn hình và scale
 * 
 * @param percentage - Phần trăm chiều rộng (0-100)
 * @returns Chiều rộng đã scale
 * 
 * Ví dụ: getScaledWidth(50) - 50% chiều rộng màn hình
 */
export const getScaledWidth = (percentage: number) => {
    const cacheKey = `width_${percentage}`;

    if (sizeCache.has(cacheKey)) {
        return sizeCache.get(cacheKey)!;
    }

    const result = (SCREEN_WIDTH * percentage) / 100;
    sizeCache.set(cacheKey, result);
    return result;
};

/**
 * getScaledHeight(percentage: number)
 * Lấy chiều cao theo phần trăm màn hình và scale
 * 
 * @param percentage - Phần trăm chiều cao (0-100)
 * @returns Chiều cao đã scale
 * 
 * Ví dụ: getScaledHeight(25) - 25% chiều cao màn hình
 */
export const getScaledHeight = (percentage: number) => {
    const cacheKey = `height_${percentage}`;

    if (sizeCache.has(cacheKey)) {
        return sizeCache.get(cacheKey)!;
    }

    const result = (SCREEN_HEIGHT * percentage) / 100;
    sizeCache.set(cacheKey, result);
    return result;
};

// ============================================================================
// CÁC FUNCTION MỚI TỐI ƯU
// ============================================================================

/**
 * getOptimalFontSize(baseSize: number, minSize?: number, maxSize?: number)
 * Tạo font size tối ưu với giới hạn min/max
 * 
 * @param baseSize - Kích thước font cơ bản
 * @param minSize - Kích thước tối thiểu (tùy chọn)
 * @param maxSize - Kích thước tối đa (tùy chọn)
 * @returns Font size đã tối ưu
 */
export const getOptimalFontSize = (
    baseSize: number,
    minSize?: number,
    maxSize?: number
) => {
    const scaledSize = scale(baseSize);

    if (minSize !== undefined && scaledSize < minSize) {
        return minSize;
    }

    if (maxSize !== undefined && scaledSize > maxSize) {
        return maxSize;
    }

    return scaledSize;
};

/**
 * getAspectRatio(width: number, height: number)
 * Tính tỷ lệ khung hình và scale
 * 
 * @param width - Chiều rộng gốc
 * @param height - Chiều cao gốc
 * @returns Object chứa width và height đã scale
 */
export const getAspectRatio = (width: number, height: number) => {
    const aspectRatio = width / height;
    const scaledWidth = scale(width);
    const scaledHeight = scaledWidth / aspectRatio;

    return {
        width: scaledWidth,
        height: scaledHeight,
        aspectRatio
    };
};

/**
 * getResponsivePadding(horizontal: number, vertical: number)
 * Tạo padding responsive cho cả horizontal và vertical
 * 
 * @param horizontal - Padding ngang
 * @param vertical - Padding dọc
 * @returns Object padding đã scale
 */
export const getResponsivePadding = (horizontal: number, vertical: number) => {
    return {
        paddingHorizontal: scale(horizontal),
        paddingVertical: verticalScale(vertical)
    };
};

/**
 * getResponsiveMargin(horizontal: number, vertical: number)
 * Tạo margin responsive cho cả horizontal và vertical
 * 
 * @param horizontal - Margin ngang
 * @param vertical - Margin dọc
 * @returns Object margin đã scale
 */
export const getResponsiveMargin = (horizontal: number, vertical: number) => {
    return {
        marginHorizontal: scale(horizontal),
        marginVertical: verticalScale(vertical)
    };
};

/**
 * clearSizeCache()
 * Xóa cache để tính toán lại khi cần thiết (ví dụ: khi xoay màn hình)
 */
export const clearSizeCache = () => {
    sizeCache.clear();
    _screenDimensions = null;
    _pixelRatio = null;
};

/**
 * isTablet()
 * Kiểm tra xem thiết bị có phải là tablet không
 * 
 * @returns true nếu là tablet, false nếu là phone
 */
export const isTablet = () => {
    const { width, height } = getScreenDimensions();
    const pixelRatio = getPixelRatio();

    // Logic đơn giản để detect tablet
    return (
        (width >= 768 && height >= 1024) || // iPad
        (width >= 1024 && height >= 768) || // iPad landscape
        pixelRatio <= 2 // Một số tablet có pixel ratio thấp
    );
};

/**
 * getDeviceType()
 * Lấy loại thiết bị hiện tại
 * 
 * @returns 'phone' | 'tablet'
 */
export const getDeviceType = () => {
    return isTablet() ? 'tablet' : 'phone';
};

// ============================================================================
// BREAKPOINTS VÀ RESPONSIVE HELPERS
// ============================================================================

/**
 * BREAKPOINTS - Các điểm break cho responsive design
 */
export const BREAKPOINTS = {
    PHONE_SMALL: 320,   // iPhone SE, Galaxy S8
    PHONE_MEDIUM: 375,  // iPhone 12, 13, 14
    PHONE_LARGE: 414,   // iPhone 12 Pro Max, 13 Pro Max
    TABLET_SMALL: 768,  // iPad Mini
    TABLET_MEDIUM: 834, // iPad Air
    TABLET_LARGE: 1024, // iPad Pro 11"
} as const;

/**
 * getBreakpoint()
 * Lấy breakpoint hiện tại dựa trên chiều rộng màn hình
 * 
 * @returns Tên breakpoint hiện tại
 */
export const getBreakpoint = () => {
    const width = SCREEN_WIDTH;

    if (width < BREAKPOINTS.PHONE_SMALL) return 'phone_small';
    if (width < BREAKPOINTS.PHONE_MEDIUM) return 'phone_medium';
    if (width < BREAKPOINTS.PHONE_LARGE) return 'phone_large';
    if (width < BREAKPOINTS.TABLET_SMALL) return 'tablet_small';
    if (width < BREAKPOINTS.TABLET_MEDIUM) return 'tablet_medium';
    if (width < BREAKPOINTS.TABLET_LARGE) return 'tablet_large';

    return 'tablet_large';
};

/**
 * getResponsiveValue<T>(values: Record<string, T>)
 * Lấy giá trị responsive dựa trên breakpoint hiện tại
 * 
 * @param values - Object chứa các giá trị cho từng breakpoint
 * @returns Giá trị phù hợp với breakpoint hiện tại
 * 
 * Ví dụ: getResponsiveValue({
 *   phone_small: 12,
 *   phone_medium: 14,
 *   tablet_small: 16
 * })
 */
export const getResponsiveValue = <T>(values: Record<string, T>): T => {
    const currentBreakpoint = getBreakpoint();
    return values[currentBreakpoint] || values.phone_medium || Object.values(values)[0];
};
