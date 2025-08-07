import {
    scale,           // Scale theo width - dùng cho font, padding, margin, width, height
    verticalScale,   // Scale theo height - dùng cho height, top, bottom, marginVertical
    moderateScale,   // Scale với factor có thể điều chỉnh - ít aggressive hơn scale
} from 'react-native-size-matters';
import { Dimensions } from 'react-native';

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

// Export Dimensions từ react-native để lấy kích thước màn hình
export { Dimensions };

// ============================================================================
// CÁC CONSTANT HỮU ÍCH
// ============================================================================

/**
 * Lấy kích thước màn hình hiện tại
 * SCREEN_WIDTH: Chiều rộng màn hình
 * SCREEN_HEIGHT: Chiều cao màn hình
 */
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

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
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * getResponsiveSize(size: number, factor: number = 0.5)
 * Tạo kích thước responsive với factor có thể điều chỉnh
 * 
 * @param size - Kích thước gốc
 * @param factor - Factor điều chỉnh (0-1), mặc định 0.5
 * @returns Kích thước đã scale
 * 
 * Ví dụ: getResponsiveSize(16, 0.3) - scale ít hơn
 */
export const getResponsiveSize = (size: number, factor: number = 0.5) => {
    return moderateScale(size, factor);
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
    return (SCREEN_WIDTH * percentage) / 100;
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
    return (SCREEN_HEIGHT * percentage) / 100;
};
