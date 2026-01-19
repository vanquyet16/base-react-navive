import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  scale,
  verticalScale,
  SIZES,
  // Các function mới từ sizeMatters đã tối ưu
  getOptimalFontSize,
  getAspectRatio,
  getResponsivePadding,
  getResponsiveMargin,
  isTablet,
  getDeviceType,
  getBreakpoint,
  getResponsiveValue,
  BREAKPOINTS,
  getScreenDimensions,
  getPixelRatio,
  getResponsiveSize,
  getScaledWidth,
  getScaledHeight,
} from '@/shared/utils/sizeMatters';

const ResponsiveDemoScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header với thông tin màn hình */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Responsive Demo - Tối Ưu</Text>
        <Text style={styles.screenInfo}>
          Screen: {getScreenDimensions().width} x {getScreenDimensions().height}
        </Text>
        <Text style={styles.deviceInfo}>
          Device: {getDeviceType()} | Breakpoint: {getBreakpoint()} | Pixel Ratio: {getPixelRatio()}
        </Text>
      </View>

      {/* Section 1: Các Function Mới Tối Ưu */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Các Function Mới Tối Ưu</Text>

        {/* getOptimalFontSize */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>getOptimalFontSize() - Font Size Tối Ưu</Text>
          <Text style={styles.optimalFontText}>
            Font size tối ưu với giới hạn min/max: {Math.round(getOptimalFontSize(18, 14, 22))}px
          </Text>
          <Text style={styles.optimalFontText2}>
            Font size không giới hạn: {Math.round(getOptimalFontSize(16))}px
          </Text>
        </View>

        {/* getAspectRatio */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>getAspectRatio() - Tỷ Lệ Khung Hình</Text>
          <View style={styles.aspectRatioDemo}>
            <View style={styles.aspectRatioBox}>
              <Text style={styles.aspectRatioText}>16:9 Ratio</Text>
              <Text style={styles.aspectRatioSubtext}>
                {Math.round(getAspectRatio(16, 9).width)} x{' '}
                {Math.round(getAspectRatio(16, 9).height)}
              </Text>
            </View>
            <View style={styles.aspectRatioBox}>
              <Text style={styles.aspectRatioText}>4:3 Ratio</Text>
              <Text style={styles.aspectRatioSubtext}>
                {Math.round(getAspectRatio(4, 3).width)} x {Math.round(getAspectRatio(4, 3).height)}
              </Text>
            </View>
          </View>
        </View>

        {/* getResponsivePadding & getResponsiveMargin */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>getResponsivePadding() & getResponsiveMargin()</Text>
          <View style={styles.responsiveSpacingDemo}>
            <View style={styles.paddingDemo}>
              <Text style={styles.spacingLabel}>Responsive Padding</Text>
              <View style={styles.paddingBox}>
                <Text style={styles.paddingText}>
                  H: {Math.round(scale(16))}px, V: {Math.round(verticalScale(12))}px
                </Text>
              </View>
            </View>
            <View style={styles.marginDemo}>
              <Text style={styles.spacingLabel}>Responsive Margin</Text>
              <View style={styles.marginBox}>
                <Text style={styles.marginText}>
                  H: {Math.round(scale(20))}px, V: {Math.round(verticalScale(16))}px
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Section 2: Breakpoint System */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Breakpoint System</Text>

        {/* Breakpoint Demo */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Breakpoint System - Responsive Values</Text>
          <View style={styles.breakpointDemo}>
            <Text style={styles.breakpointText}>
              Current Breakpoint: <Text style={styles.breakpointValue}>{getBreakpoint()}</Text>
            </Text>
            <Text style={styles.breakpointText}>
              Responsive Font Size:{' '}
              <Text style={styles.breakpointValue}>
                {getResponsiveValue({
                  phone_small: 12,
                  phone_medium: 14,
                  phone_large: 16,
                  tablet_small: 18,
                  tablet_medium: 20,
                  tablet_large: 22,
                })}
                px
              </Text>
            </Text>
            <Text style={styles.breakpointText}>
              Responsive Padding:{' '}
              <Text style={styles.breakpointValue}>
                {getResponsiveValue({
                  phone_small: 8,
                  phone_medium: 12,
                  phone_large: 16,
                  tablet_small: 20,
                  tablet_medium: 24,
                  tablet_large: 28,
                })}
                px
              </Text>
            </Text>
          </View>
        </View>

        {/* BREAKPOINTS Constants */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>BREAKPOINTS Constants</Text>
          <View style={styles.breakpointsDemo}>
            <Text style={styles.breakpointText}>PHONE_SMALL: {BREAKPOINTS.PHONE_SMALL}px</Text>
            <Text style={styles.breakpointText}>PHONE_MEDIUM: {BREAKPOINTS.PHONE_MEDIUM}px</Text>
            <Text style={styles.breakpointText}>PHONE_LARGE: {BREAKPOINTS.PHONE_LARGE}px</Text>
            <Text style={styles.breakpointText}>TABLET_SMALL: {BREAKPOINTS.TABLET_SMALL}px</Text>
            <Text style={styles.breakpointText}>TABLET_MEDIUM: {BREAKPOINTS.TABLET_MEDIUM}px</Text>
            <Text style={styles.breakpointText}>TABLET_LARGE: {BREAKPOINTS.TABLET_LARGE}px</Text>
          </View>
        </View>
      </View>

      {/* Section 3: Device Detection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Device Detection</Text>

        {/* Device Detection Demo */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Device Detection</Text>
          <View style={styles.deviceDetectionDemo}>
            <View style={styles.deviceInfoBox}>
              <Text style={styles.deviceInfoTitle}>Device Type</Text>
              <Text style={styles.deviceInfoValue}>{getDeviceType()}</Text>
            </View>
            <View style={styles.deviceInfoBox}>
              <Text style={styles.deviceInfoTitle}>Is Tablet</Text>
              <Text style={styles.deviceInfoValue}>{isTablet() ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.deviceInfoBox}>
              <Text style={styles.deviceInfoTitle}>Screen Dimensions</Text>
              <Text style={styles.deviceInfoValue}>
                {getScreenDimensions().width} x {getScreenDimensions().height}
              </Text>
            </View>
          </View>
        </View>

        {/* Device-specific Layout */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Device-specific Layout</Text>
          <View style={[styles.deviceLayout, isTablet() && styles.tabletLayout]}>
            <Text style={styles.deviceLayoutText}>Layout cho {getDeviceType()}</Text>
            <Text style={styles.deviceLayoutSubtext}>
              {isTablet() ? 'Tablet layout với nhiều cột' : 'Phone layout với một cột'}
            </Text>
          </View>
        </View>
      </View>

      {/* Section 4: Performance Demo - Cache System */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Performance Demo - Cache System</Text>

        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Cached vs Non-Cached Values</Text>
          <View style={styles.performanceDemo}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Cached getResponsiveSize(20, 0.5)</Text>
              <Text style={styles.performanceValue}>
                {Math.round(getResponsiveSize(20, 0.5))}px
              </Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Cached getScaledWidth(50)</Text>
              <Text style={styles.performanceValue}>{Math.round(getScaledWidth(50))}px</Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Cached getScaledHeight(25)</Text>
              <Text style={styles.performanceValue}>{Math.round(getScaledHeight(25))}px</Text>
            </View>
          </View>
        </View>

        {/* Responsive Grid Demo */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Responsive Grid Layout</Text>
          <View style={styles.responsiveGrid}>
            {[1, 2, 3, 4].map(item => (
              <View key={item} style={styles.gridItem}>
                <Text style={styles.gridText}>Item {item}</Text>
                <Text style={styles.gridSubtext}>
                  {Math.round(getScaledWidth(48))} x {Math.round(verticalScale(60))}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Section 5: Bảng Trường Hợp Sử Dụng */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Bảng Trường Hợp Sử Dụng</Text>

        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Hướng Dẫn Sử Dụng sizeMatters.ts</Text>

          {/* Bảng Function Cơ Bản */}
          <View style={styles.usageTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Function</Text>
              <Text style={styles.tableHeaderText}>Trường Hợp Sử Dụng</Text>
              <Text style={styles.tableHeaderText}>Ví Dụ</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>scale()</Text>
              <Text style={styles.tableCell}>Font, padding, margin, width</Text>
              <Text style={styles.tableCell}>fontSize: scale(16)</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>verticalScale()</Text>
              <Text style={styles.tableCell}>Height, top, bottom</Text>
              <Text style={styles.tableCell}>height: verticalScale(100)</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>moderateScale()</Text>
              <Text style={styles.tableCell}>Kiểm soát mức độ scale</Text>
              <Text style={styles.tableCell}>fontSize: moderateScale(16, 0.3)</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>getResponsiveSize()</Text>
              <Text style={styles.tableCell}>Size với factor tùy chỉnh</Text>
              <Text style={styles.tableCell}>fontSize: getResponsiveSize(20, 0.5)</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>getScaledWidth()</Text>
              <Text style={styles.tableCell}>Width theo % màn hình</Text>
              <Text style={styles.tableCell}>width: getScaledWidth(50)</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>getScaledHeight()</Text>
              <Text style={styles.tableCell}>Height theo % màn hình</Text>
              <Text style={styles.tableCell}>height: getScaledHeight(25)</Text>
            </View>
          </View>

          {/* Bảng Function Mới */}
          <View style={styles.usageTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Function Mới</Text>
              <Text style={styles.tableHeaderText}>Trường Hợp Sử Dụng</Text>
              <Text style={styles.tableHeaderText}>Ví Dụ</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>getOptimalFontSize()</Text>
              <Text style={styles.tableCell}>Font size với giới hạn</Text>
              <Text style={styles.tableCell}>fontSize: getOptimalFontSize(18, 14, 22)</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>getAspectRatio()</Text>
              <Text style={styles.tableCell}>Tỷ lệ khung hình</Text>
              <Text style={styles.tableCell}>const size = getAspectRatio(16, 9)</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>getResponsivePadding()</Text>
              <Text style={styles.tableCell}>Padding responsive</Text>
              <Text style={styles.tableCell}>padding: getResponsivePadding(16, 12)</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>getResponsiveMargin()</Text>
              <Text style={styles.tableCell}>Margin responsive</Text>
              <Text style={styles.tableCell}>margin: getResponsiveMargin(20, 16)</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>isTablet()</Text>
              <Text style={styles.tableCell}>Kiểm tra thiết bị</Text>
              <Text style={styles.tableCell}>if (isTablet()) tablet layout</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>getDeviceType()</Text>
              <Text style={styles.tableCell}>Loại thiết bị</Text>
              <Text style={styles.tableCell}>const device = getDeviceType()</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>getBreakpoint()</Text>
              <Text style={styles.tableCell}>Breakpoint hiện tại</Text>
              <Text style={styles.tableCell}>const breakpoint = getBreakpoint()</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>getResponsiveValue()</Text>
              <Text style={styles.tableCell}>Giá trị theo breakpoint</Text>
              <Text style={styles.tableCell}>fontSize: getResponsiveValue(breakpoints)</Text>
            </View>
          </View>

          {/* Bảng Constants */}
          <View style={styles.usageTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Constants</Text>
              <Text style={styles.tableHeaderText}>Giá Trị</Text>
              <Text style={styles.tableHeaderText}>Sử Dụng</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>SIZES.FONT_*</Text>
              <Text style={styles.tableCell}>Font sizes</Text>
              <Text style={styles.tableCell}>fontSize: SIZES.FONT_MEDIUM</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>SIZES.SPACING_*</Text>
              <Text style={styles.tableCell}>Khoảng cách</Text>
              <Text style={styles.tableCell}>padding: SIZES.SPACING_LARGE</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>SIZES.RADIUS_*</Text>
              <Text style={styles.tableCell}>Border radius</Text>
              <Text style={styles.tableCell}>borderRadius: SIZES.RADIUS_NORMAL</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>SIZES.ICON_*</Text>
              <Text style={styles.tableCell}>Icon sizes</Text>
              <Text style={styles.tableCell}>width: SIZES.ICON_MEDIUM</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>BREAKPOINTS.*</Text>
              <Text style={styles.tableCell}>Điểm break</Text>
              <Text style={styles.tableCell}>if (width {'<'} BREAKPOINTS.TABLET_SMALL)</Text>
            </View>
          </View>

          {/* Bảng Best Practices */}
          <View style={styles.usageTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Best Practices</Text>
              <Text style={styles.tableHeaderText}>Khuyến Nghị</Text>
              <Text style={styles.tableHeaderText}>Lý Do</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Font Size</Text>
              <Text style={styles.tableCell}>Sử dụng getOptimalFontSize()</Text>
              <Text style={styles.tableCell}>Tránh font quá nhỏ/lớn</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Layout</Text>
              <Text style={styles.tableCell}>Kết hợp scale() + verticalScale()</Text>
              <Text style={styles.tableCell}>Responsive tốt hơn</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Performance</Text>
              <Text style={styles.tableCell}>Sử dụng cache functions</Text>
              <Text style={styles.tableCell}>Tránh tính toán lại</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Device</Text>
              <Text style={styles.tableCell}>Kiểm tra device type</Text>
              <Text style={styles.tableCell}>Layout phù hợp</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Breakpoints</Text>
              <Text style={styles.tableCell}>Sử dụng getResponsiveValue()</Text>
              <Text style={styles.tableCell}>Giá trị linh hoạt</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Section 6: Bảng So Sánh Chi Tiết */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Bảng So Sánh Chi Tiết</Text>

        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>So Sánh Function Cũ vs Mới</Text>

          {/* Bảng So Sánh Font Size */}
          <View style={styles.comparisonTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Trường Hợp</Text>
              <Text style={styles.tableHeaderText}>Function Cũ</Text>
              <Text style={styles.tableHeaderText}>Function Mới</Text>
              <Text style={styles.tableHeaderText}>Ưu Điểm</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Font Size</Text>
              <Text style={styles.tableCell}>scale(16)</Text>
              <Text style={styles.tableCell}>getOptimalFontSize(16, 12, 20)</Text>
              <Text style={styles.tableCell}>Giới hạn min/max</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Aspect Ratio</Text>
              <Text style={styles.tableCell}>width: scale(300), height: scale(200)</Text>
              <Text style={styles.tableCell}>getAspectRatio(16, 9)</Text>
              <Text style={styles.tableCell}>Tỷ lệ chính xác</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Padding</Text>
              <Text style={styles.tableCell}>
                paddingHorizontal: scale(16), paddingVertical: verticalScale(12)
              </Text>
              <Text style={styles.tableCell}>getResponsivePadding(16, 12)</Text>
              <Text style={styles.tableCell}>Code ngắn gọn</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Margin</Text>
              <Text style={styles.tableCell}>
                marginHorizontal: scale(20), marginVertical: verticalScale(16)
              </Text>
              <Text style={styles.tableCell}>getResponsiveMargin(20, 16)</Text>
              <Text style={styles.tableCell}>Code ngắn gọn</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Device Check</Text>
              <Text style={styles.tableCell}>Dimensions.get('window').width {'>'} 768</Text>
              <Text style={styles.tableCell}>isTablet()</Text>
              <Text style={styles.tableCell}>Logic đơn giản</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Breakpoint</Text>
              <Text style={styles.tableCell}>if (width {'<'} 768) phone else tablet</Text>
              <Text style={styles.tableCell}>getBreakpoint()</Text>
              <Text style={styles.tableCell}>Nhiều breakpoint</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Responsive Value</Text>
              <Text style={styles.tableCell}>const fontSize = width {'<'} 768 ? 14 : 16</Text>
              <Text style={styles.tableCell}>getResponsiveValue(breakpoints)</Text>
              <Text style={styles.tableCell}>Linh hoạt hơn</Text>
            </View>
          </View>

          {/* Bảng So Sánh Performance */}
          <View style={styles.comparisonTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Aspect</Text>
              <Text style={styles.tableHeaderText}>Trước</Text>
              <Text style={styles.tableHeaderText}>Sau</Text>
              <Text style={styles.tableHeaderText}>Cải Thiện</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Cache</Text>
              <Text style={styles.tableCell}>Tính toán lại mỗi lần</Text>
              <Text style={styles.tableCell}>Cache kết quả</Text>
              <Text style={styles.tableCell}>Performance tốt hơn</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Code Length</Text>
              <Text style={styles.tableCell}>Dài, lặp lại</Text>
              <Text style={styles.tableCell}>Ngắn gọn, tái sử dụng</Text>
              <Text style={styles.tableCell}>Maintainability</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Type Safety</Text>
              <Text style={styles.tableCell}>Ít type safety</Text>
              <Text style={styles.tableCell}>TypeScript support</Text>
              <Text style={styles.tableCell}>Error prevention</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Flexibility</Text>
              <Text style={styles.tableCell}>Cứng nhắc</Text>
              <Text style={styles.tableCell}>Linh hoạt, configurable</Text>
              <Text style={styles.tableCell}>Adaptability</Text>
            </View>
          </View>

          {/* Bảng So Sánh Use Cases */}
          <View style={styles.comparisonTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Use Case</Text>
              <Text style={styles.tableHeaderText}>Cách Cũ</Text>
              <Text style={styles.tableHeaderText}>Cách Mới</Text>
              <Text style={styles.tableHeaderText}>Lợi Ích</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Typography</Text>
              <Text style={styles.tableCell}>fontSize: scale(16)</Text>
              <Text style={styles.tableCell}>fontSize: getOptimalFontSize(16, 14, 18)</Text>
              <Text style={styles.tableCell}>Readability tốt hơn</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Image Container</Text>
              <Text style={styles.tableCell}>width: scale(300), height: scale(200)</Text>
              <Text style={styles.tableCell}>const size = getAspectRatio(16, 9)</Text>
              <Text style={styles.tableCell}>Tỷ lệ chính xác</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Card Layout</Text>
              <Text style={styles.tableCell}>padding: scale(16), margin: verticalScale(12)</Text>
              <Text style={styles.tableCell}>
                ...getResponsivePadding(16, 12), ...getResponsiveMargin(20, 16)
              </Text>
              <Text style={styles.tableCell}>Code sạch hơn</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Device Layout</Text>
              <Text style={styles.tableCell}>if (Dimensions.get('window').width {'>'} 768)</Text>
              <Text style={styles.tableCell}>if (isTablet())</Text>
              <Text style={styles.tableCell}>Logic rõ ràng</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Responsive Design</Text>
              <Text style={styles.tableCell}>Multiple if-else statements</Text>
              <Text style={styles.tableCell}>getResponsiveValue(config)</Text>
              <Text style={styles.tableCell}>Config-driven</Text>
            </View>
          </View>

          {/* Bảng Migration Guide */}
          <View style={styles.comparisonTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Migration</Text>
              <Text style={styles.tableHeaderText}>Từ</Text>
              <Text style={styles.tableHeaderText}>Đến</Text>
              <Text style={styles.tableHeaderText}>Lưu Ý</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Font Size</Text>
              <Text style={styles.tableCell}>scale(16)</Text>
              <Text style={styles.tableCell}>getOptimalFontSize(16, 14, 18)</Text>
              <Text style={styles.tableCell}>Thêm min/max values</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Aspect Ratio</Text>
              <Text style={styles.tableCell}>width: scale(300), height: scale(200)</Text>
              <Text style={styles.tableCell}>const size = getAspectRatio(16, 9)</Text>
              <Text style={styles.tableCell}>Sử dụng object destructuring</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Spacing</Text>
              <Text style={styles.tableCell}>
                paddingHorizontal: scale(16), paddingVertical: verticalScale(12)
              </Text>
              <Text style={styles.tableCell}>...getResponsivePadding(16, 12)</Text>
              <Text style={styles.tableCell}>Sử dụng spread operator</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Device Check</Text>
              <Text style={styles.tableCell}>Dimensions.get('window').width {'>'} 768</Text>
              <Text style={styles.tableCell}>isTablet()</Text>
              <Text style={styles.tableCell}>Logic đơn giản hơn</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Breakpoint</Text>
              <Text style={styles.tableCell}>if (width {'<'} 768) phone else tablet</Text>
              <Text style={styles.tableCell}>getBreakpoint()</Text>
              <Text style={styles.tableCell}>Nhiều breakpoint hơn</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Section 7: Practical Examples */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Ví Dụ Thực Tế</Text>

        {/* Responsive Card */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Responsive Card</Text>
          <View style={styles.responsiveCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Card Title</Text>
              <Text style={styles.cardSubtitle}>Responsive Design</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>
                Card này sử dụng các function responsive mới để tự động điều chỉnh kích thước theo
                thiết bị.
              </Text>
            </View>
            <View style={styles.cardFooter}>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Action</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Responsive Buttons */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Responsive Buttons</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Primary Button</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Secondary Button</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: scale(20),
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: SIZES.FONT_TITLE,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: SIZES.SPACING_SMALL,
  },
  screenInfo: {
    fontSize: SIZES.FONT_SMALL,
    color: 'white',
    opacity: 0.8,
  },
  deviceInfo: {
    fontSize: SIZES.FONT_SMALL,
    color: 'white',
    opacity: 0.7,
    marginTop: SIZES.SPACING_TINY,
  },
  section: {
    backgroundColor: 'white',
    margin: scale(16),
    padding: SIZES.SPACING_LARGE,
    borderRadius: SIZES.RADIUS_NORMAL,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: SIZES.RADIUS_SMALL,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: SIZES.FONT_LARGE,
    fontWeight: '600',
    color: '#333',
    marginBottom: SIZES.SPACING_MEDIUM,
  },
  demoItem: {
    marginBottom: SIZES.SPACING_LARGE,
  },
  demoLabel: {
    fontSize: SIZES.FONT_MEDIUM,
    fontWeight: '500',
    color: '#666',
    marginBottom: SIZES.SPACING_SMALL,
  },
  // Optimal Font Size styles
  optimalFontText: {
    fontSize: getOptimalFontSize(18, 14, 22),
    color: '#333',
    marginBottom: SIZES.SPACING_SMALL,
    fontWeight: '500',
  },
  optimalFontText2: {
    fontSize: getOptimalFontSize(16),
    color: '#333',
  },
  // Aspect Ratio styles
  aspectRatioDemo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZES.SPACING_MEDIUM,
  },
  aspectRatioBox: {
    backgroundColor: '#e8f5e8',
    padding: SIZES.SPACING_MEDIUM,
    borderRadius: SIZES.RADIUS_NORMAL,
    alignItems: 'center',
    minWidth: getScaledWidth(40),
  },
  aspectRatioText: {
    fontSize: SIZES.FONT_MEDIUM,
    color: '#2e7d32',
    fontWeight: '600',
    marginBottom: SIZES.SPACING_TINY,
  },
  aspectRatioSubtext: {
    fontSize: SIZES.FONT_SMALL,
    color: '#666',
  },
  // Responsive Spacing styles
  responsiveSpacingDemo: {
    marginTop: SIZES.SPACING_MEDIUM,
  },
  paddingDemo: {
    marginBottom: SIZES.SPACING_MEDIUM,
  },
  spacingLabel: {
    fontSize: SIZES.FONT_SMALL,
    color: '#666',
    marginBottom: SIZES.SPACING_TINY,
  },
  paddingBox: {
    backgroundColor: '#e3f2fd',
    padding: scale(16),
    borderRadius: SIZES.RADIUS_NORMAL,
  },
  paddingText: {
    fontSize: SIZES.FONT_SMALL,
    color: '#1976d2',
  },
  marginDemo: {
    marginBottom: SIZES.SPACING_MEDIUM,
  },
  marginBox: {
    backgroundColor: '#f3e5f5',
    padding: scale(20),
    borderRadius: SIZES.RADIUS_NORMAL,
  },
  marginText: {
    fontSize: SIZES.FONT_SMALL,
    color: '#7b1fa2',
  },
  // Breakpoint styles
  breakpointDemo: {
    backgroundColor: '#f5f5f5',
    padding: SIZES.SPACING_MEDIUM,
    borderRadius: SIZES.RADIUS_NORMAL,
  },
  breakpointText: {
    fontSize: SIZES.FONT_NORMAL,
    color: '#333',
    marginBottom: SIZES.SPACING_SMALL,
  },
  breakpointValue: {
    fontWeight: '600',
    color: '#007AFF',
  },
  breakpointsDemo: {
    backgroundColor: '#f0f8ff',
    padding: SIZES.SPACING_MEDIUM,
    borderRadius: SIZES.RADIUS_NORMAL,
  },
  // Device Detection styles
  deviceDetectionDemo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZES.SPACING_MEDIUM,
  },
  deviceInfoBox: {
    backgroundColor: '#fff3e0',
    padding: SIZES.SPACING_SMALL,
    borderRadius: SIZES.RADIUS_SMALL,
    alignItems: 'center',
    minWidth: getScaledWidth(25),
  },
  deviceInfoTitle: {
    fontSize: SIZES.FONT_TINY,
    color: '#e65100',
    fontWeight: '500',
    marginBottom: SIZES.SPACING_TINY,
  },
  deviceInfoValue: {
    fontSize: SIZES.FONT_SMALL,
    color: '#333',
    fontWeight: '600',
  },
  deviceLayout: {
    backgroundColor: '#e8f5e8',
    padding: SIZES.SPACING_MEDIUM,
    borderRadius: SIZES.RADIUS_NORMAL,
    alignItems: 'center',
  },
  tabletLayout: {
    backgroundColor: '#e3f2fd',
  },
  deviceLayoutText: {
    fontSize: SIZES.FONT_MEDIUM,
    color: '#2e7d32',
    fontWeight: '600',
    marginBottom: SIZES.SPACING_TINY,
  },
  deviceLayoutSubtext: {
    fontSize: SIZES.FONT_SMALL,
    color: '#666',
    textAlign: 'center',
  },
  // Performance Demo styles
  performanceDemo: {
    backgroundColor: '#f0f8ff',
    padding: SIZES.SPACING_MEDIUM,
    borderRadius: SIZES.RADIUS_NORMAL,
  },
  performanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.SPACING_SMALL,
  },
  performanceLabel: {
    fontSize: SIZES.FONT_SMALL,
    color: '#333',
    flex: 1,
  },
  performanceValue: {
    fontSize: SIZES.FONT_SMALL,
    color: '#007AFF',
    fontWeight: '600',
  },
  // Responsive Grid styles
  responsiveGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SIZES.SPACING_MEDIUM,
  },
  gridItem: {
    width: getScaledWidth(48),
    height: verticalScale(60),
    backgroundColor: '#e8f5e8',
    borderRadius: SIZES.RADIUS_NORMAL,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.SPACING_MEDIUM,
  },
  gridText: {
    fontSize: SIZES.FONT_MEDIUM,
    fontWeight: '600',
    color: '#2e7d32',
  },
  gridSubtext: {
    fontSize: SIZES.FONT_TINY,
    color: '#666',
    marginTop: SIZES.SPACING_TINY,
  },
  // Responsive Card styles
  responsiveCard: {
    backgroundColor: 'white',
    borderRadius: SIZES.RADIUS_NORMAL,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: SIZES.RADIUS_SMALL,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#E3F2FD',
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  cardTitle: {
    fontSize: SIZES.FONT_LARGE,
    color: '#1976D2',
    fontWeight: '600',
    marginBottom: SIZES.SPACING_TINY,
  },
  cardSubtitle: {
    fontSize: SIZES.FONT_SMALL,
    color: '#666',
  },
  cardContent: {
    padding: scale(16),
    flex: 1,
  },
  cardText: {
    fontSize: SIZES.FONT_NORMAL,
    color: '#333',
    lineHeight: scale(20),
  },
  cardFooter: {
    backgroundColor: '#F5F5F5',
    padding: scale(12),
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  cardButton: {
    backgroundColor: '#007AFF',
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    borderRadius: SIZES.RADIUS_SMALL,
    alignSelf: 'flex-start',
  },
  cardButtonText: {
    color: 'white',
    fontSize: SIZES.FONT_SMALL,
    fontWeight: '500',
  },
  // Button styles
  buttonContainer: {
    marginTop: SIZES.SPACING_MEDIUM,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: scale(12),
    paddingHorizontal: scale(24),
    borderRadius: SIZES.RADIUS_NORMAL,
    alignItems: 'center',
    marginBottom: SIZES.SPACING_MEDIUM,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: SIZES.FONT_MEDIUM,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: scale(12),
    paddingHorizontal: scale(24),
    borderRadius: SIZES.RADIUS_NORMAL,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: SIZES.FONT_MEDIUM,
    fontWeight: '600',
  },
  // Usage Table styles
  usageTable: {
    marginTop: SIZES.SPACING_MEDIUM,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: SIZES.RADIUS_SMALL,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    paddingVertical: SIZES.SPACING_SMALL,
    paddingHorizontal: SIZES.SPACING_MEDIUM,
  },
  tableHeaderText: {
    fontSize: SIZES.FONT_SMALL,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: SIZES.SPACING_SMALL,
    paddingHorizontal: SIZES.SPACING_MEDIUM,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tableCell: {
    fontSize: SIZES.FONT_SMALL,
    color: '#555',
    flex: 1,
  },
  // Comparison Table styles
  comparisonTable: {
    marginTop: SIZES.SPACING_MEDIUM,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: SIZES.RADIUS_SMALL,
    overflow: 'hidden',
  },
});

export default ResponsiveDemoScreen;
