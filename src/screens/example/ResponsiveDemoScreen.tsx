import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  SIZES,
  getResponsiveSize,
  getScaledWidth,
  getScaledHeight,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  Dimensions,
} from '../../utils/sizeMatters';

const ResponsiveDemoScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header với thông tin màn hình */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Responsive Demo Screen</Text>
        <Text style={styles.screenInfo}>
          Screen: {SCREEN_WIDTH} x {SCREEN_HEIGHT}
        </Text>
      </View>

      {/* Section 1: Các function scale cơ bản */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Các Function Scale Cơ Bản</Text>

        {/* scale() function */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>scale() - Font & Padding</Text>
          <Text style={styles.scaleText}>
            Text với scale(16) - Font size responsive
          </Text>
          <View style={styles.scaleBox}>
            <Text style={styles.scaleBoxText}>Box với padding scale(20)</Text>
          </View>
        </View>

        {/* verticalScale() function */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>
            verticalScale() - Height & Margin
          </Text>
          <View style={styles.verticalScaleBox}>
            <Text style={styles.verticalScaleText}>
              Box với height verticalScale(80)
            </Text>
          </View>
        </View>

        {/* moderateScale() function */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>moderateScale() - Với Factor</Text>
          <Text style={styles.moderateText}>
            Text với moderateScale(18, 0.3) - Scale ít hơn
          </Text>
          <Text style={styles.moderateText2}>
            Text với moderateScale(18, 0.8) - Scale nhiều hơn
          </Text>
        </View>
      </View>

      {/* Section 2: SIZES Constants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. SIZES Constants</Text>

        {/* Font Sizes */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Font Sizes</Text>
          <Text style={styles.fontTiny}>FONT_TINY - {SIZES.FONT_TINY}px</Text>
          <Text style={styles.fontSmall}>
            FONT_SMALL - {SIZES.FONT_SMALL}px
          </Text>
          <Text style={styles.fontNormal}>
            FONT_NORMAL - {SIZES.FONT_NORMAL}px
          </Text>
          <Text style={styles.fontMedium}>
            FONT_MEDIUM - {SIZES.FONT_MEDIUM}px
          </Text>
          <Text style={styles.fontLarge}>
            FONT_LARGE - {SIZES.FONT_LARGE}px
          </Text>
          <Text style={styles.fontTitle}>
            FONT_TITLE - {SIZES.FONT_TITLE}px
          </Text>
        </View>

        {/* Spacing */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Spacing</Text>
          <View style={styles.spacingDemo}>
            <View style={[styles.spacingBox, {margin: SIZES.SPACING_TINY}]}>
              <Text style={styles.spacingText}>TINY</Text>
            </View>
            <View style={[styles.spacingBox, {margin: SIZES.SPACING_SMALL}]}>
              <Text style={styles.spacingText}>SMALL</Text>
            </View>
            <View style={[styles.spacingBox, {margin: SIZES.SPACING_NORMAL}]}>
              <Text style={styles.spacingText}>NORMAL</Text>
            </View>
            <View style={[styles.spacingBox, {margin: SIZES.SPACING_LARGE}]}>
              <Text style={styles.spacingText}>LARGE</Text>
            </View>
          </View>
        </View>

        {/* Border Radius */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Border Radius</Text>
          <View style={styles.radiusDemo}>
            <View
              style={[styles.radiusBox, {borderRadius: SIZES.RADIUS_SMALL}]}>
              <Text style={styles.radiusText}>SMALL</Text>
            </View>
            <View
              style={[styles.radiusBox, {borderRadius: SIZES.RADIUS_NORMAL}]}>
              <Text style={styles.radiusText}>NORMAL</Text>
            </View>
            <View
              style={[styles.radiusBox, {borderRadius: SIZES.RADIUS_MEDIUM}]}>
              <Text style={styles.radiusText}>MEDIUM</Text>
            </View>
            <View
              style={[styles.radiusBox, {borderRadius: SIZES.RADIUS_LARGE}]}>
              <Text style={styles.radiusText}>LARGE</Text>
            </View>
          </View>
        </View>

        {/* Icon Sizes */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Icon Sizes</Text>
          <View style={styles.iconDemo}>
            <View
              style={[
                styles.iconBox,
                {width: SIZES.ICON_TINY, height: SIZES.ICON_TINY},
              ]}>
              <Text style={styles.iconText}>T</Text>
            </View>
            <View
              style={[
                styles.iconBox,
                {width: SIZES.ICON_SMALL, height: SIZES.ICON_SMALL},
              ]}>
              <Text style={styles.iconText}>S</Text>
            </View>
            <View
              style={[
                styles.iconBox,
                {width: SIZES.ICON_NORMAL, height: SIZES.ICON_NORMAL},
              ]}>
              <Text style={styles.iconText}>N</Text>
            </View>
            <View
              style={[
                styles.iconBox,
                {width: SIZES.ICON_MEDIUM, height: SIZES.ICON_MEDIUM},
              ]}>
              <Text style={styles.iconText}>M</Text>
            </View>
            <View
              style={[
                styles.iconBox,
                {width: SIZES.ICON_LARGE, height: SIZES.ICON_LARGE},
              ]}>
              <Text style={styles.iconText}>L</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Section 3: Helper Functions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Helper Functions</Text>

        {/* getResponsiveSize */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>getResponsiveSize()</Text>
          <Text style={styles.responsiveText}>
            Text với getResponsiveSize(20, 0.3)
          </Text>
          <Text style={styles.responsiveText2}>
            Text với getResponsiveSize(20, 0.8)
          </Text>
        </View>

        {/* getScaledWidth & getScaledHeight */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>
            getScaledWidth() & getScaledHeight()
          </Text>
          <View style={styles.percentageBox}>
            <Text style={styles.percentageText}>50% Width x 25% Height</Text>
          </View>
          <View style={styles.percentageBox2}>
            <Text style={styles.percentageText}>80% Width x 15% Height</Text>
          </View>
        </View>
      </View>

      {/* Section 4: Grid Layout */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Grid Layout Responsive</Text>
        <View style={styles.gridContainer}>
          {[1, 2, 3, 4].map(item => (
            <View key={item} style={styles.gridItem}>
              <Text style={styles.gridText}>Item {item}</Text>
              <Text style={styles.gridSubtext}>
                {getScaledWidth(48)} x {verticalScale(60)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Section 5: Buttons với các style khác nhau */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Responsive Buttons</Text>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Primary Button</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Secondary Button</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton}>
          <Text style={styles.smallButtonText}>Small Button</Text>
        </TouchableOpacity>
      </View>

      {/* Section 6: Modal Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Modal Size Demo</Text>
        <View style={styles.modalDemo}>
          <Text style={styles.modalText}>Modal 80% Width x 40% Height</Text>
        </View>
      </View>

      {/* Section 7: Flexbox với Scale */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Flexbox với Scale Functions</Text>

        {/* Flex Container với scale padding/margin */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>
            Flex Container với Scale Padding/Margin
          </Text>
          <View style={styles.flexContainer}>
            <View style={styles.flexItem}>
              <Text style={styles.flexItemText}>Item 1</Text>
            </View>
            <View style={styles.flexItem}>
              <Text style={styles.flexItemText}>Item 2</Text>
            </View>
            <View style={styles.flexItem}>
              <Text style={styles.flexItemText}>Item 3</Text>
            </View>
          </View>
        </View>

        {/* Fixed Header với Flexible Content */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Fixed Header + Flexible Content</Text>
          <View style={styles.headerContentLayout}>
            <View style={styles.fixedHeader}>
              <Text style={styles.headerText}>Fixed Header</Text>
            </View>
            <View style={styles.flexibleContent}>
              <Text style={styles.contentText}>Flexible Content Area</Text>
              <Text style={styles.contentSubtext}>
                Chiếm phần còn lại của container
              </Text>
            </View>
          </View>
        </View>

        {/* Grid Layout với Flexbox */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Grid Layout với Flexbox</Text>
          <View style={styles.flexGridContainer}>
            {[1, 2, 3, 4, 5, 6].map(item => (
              <View key={item} style={styles.flexGridItem}>
                <Text style={styles.gridItemText}>Grid {item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Sidebar Layout */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Sidebar Layout Responsive</Text>
          <View style={styles.sidebarLayout}>
            <View style={styles.sidebar}>
              <Text style={styles.sidebarText}>Sidebar</Text>
              <Text style={styles.sidebarSubtext}>Fixed width</Text>
            </View>
            <View style={styles.mainArea}>
              <Text style={styles.mainText}>Main Content</Text>
              <Text style={styles.mainSubtext}>Flexible area</Text>
            </View>
          </View>
        </View>

        {/* Form Layout với Flexbox */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Form Layout với Flexbox</Text>
          <View style={styles.formLayout}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email:</Text>
              <View style={styles.inputField}>
                <Text style={styles.inputText}>user@example.com</Text>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password:</Text>
              <View style={styles.inputField}>
                <Text style={styles.inputText}>••••••••</Text>
              </View>
            </View>
            <View style={styles.buttonGroup}>
              <View style={styles.flexButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </View>
              <View style={styles.flexButton}>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Responsive Card với Flexbox */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Responsive Card với Flexbox</Text>
          <View style={styles.responsiveCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Card Title</Text>
              <Text style={styles.cardSubtitle}>Card Subtitle</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>
                Đây là nội dung của card sử dụng flexbox để layout responsive.
                Text sẽ tự động wrap và container sẽ mở rộng theo nội dung.
              </Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.footerText}>Footer</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Section 8: So sánh các hàm Scale */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. So sánh các hàm Scale</Text>

        {/* So sánh scale() vs verticalScale() */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>
            scale() vs verticalScale() - Cùng giá trị 50
          </Text>
          <View style={styles.comparisonContainer}>
            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>scale(50)</Text>
              <View
                style={[
                  styles.comparisonBox,
                  {width: scale(50), height: scale(50)},
                ]}>
                <Text style={styles.comparisonText}>
                  {Math.round(scale(50))}
                </Text>
              </View>
            </View>
            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>verticalScale(50)</Text>
              <View
                style={[
                  styles.comparisonBox,
                  {width: verticalScale(50), height: verticalScale(50)},
                ]}>
                <Text style={styles.comparisonText}>
                  {Math.round(verticalScale(50))}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* So sánh scale() vs getScaledWidth() */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>
            scale(100) vs getScaledWidth(25%) - Cùng mục đích
          </Text>
          <View style={styles.comparisonContainer}>
            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>scale(100)</Text>
              <View
                style={[
                  styles.comparisonBox,
                  {width: scale(100), height: verticalScale(40)},
                ]}>
                <Text style={styles.comparisonText}>
                  {Math.round(scale(100))}px
                </Text>
              </View>
            </View>
            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>getScaledWidth(25)</Text>
              <View
                style={[
                  styles.comparisonBox,
                  {width: getScaledWidth(25), height: verticalScale(40)},
                ]}>
                <Text style={styles.comparisonText}>
                  {Math.round(getScaledWidth(25))}px
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Demo responsive với các hàm khác nhau */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>
            Demo Responsive với các hàm khác nhau
          </Text>
          <View style={styles.responsiveDemo}>
            <View style={styles.responsiveRow}>
              <Text style={styles.responsiveLabel}>scale(20):</Text>
              <View
                style={[
                  styles.responsiveBox,
                  {width: scale(20), height: scale(20)},
                ]}
              />
              <Text style={styles.responsiveValue}>
                {Math.round(scale(20))}px
              </Text>
            </View>
            <View style={styles.responsiveRow}>
              <Text style={styles.responsiveLabel}>verticalScale(20):</Text>
              <View
                style={[
                  styles.responsiveBox,
                  {width: verticalScale(20), height: verticalScale(20)},
                ]}
              />
              <Text style={styles.responsiveValue}>
                {Math.round(verticalScale(20))}px
              </Text>
            </View>
            <View style={styles.responsiveRow}>
              <Text style={styles.responsiveLabel}>getScaledWidth(10):</Text>
              <View
                style={[
                  styles.responsiveBox,
                  {width: getScaledWidth(10), height: verticalScale(20)},
                ]}
              />
              <Text style={styles.responsiveValue}>
                {Math.round(getScaledWidth(10))}px
              </Text>
            </View>
            <View style={styles.responsiveRow}>
              <Text style={styles.responsiveLabel}>getScaledHeight(5):</Text>
              <View
                style={[
                  styles.responsiveBox,
                  {width: scale(20), height: getScaledHeight(5)},
                ]}
              />
              <Text style={styles.responsiveValue}>
                {Math.round(getScaledHeight(5))}px
              </Text>
            </View>
          </View>
        </View>

        {/* Bảng so sánh */}
        <View style={styles.demoItem}>
          <Text style={styles.demoLabel}>Bảng so sánh các hàm Scale</Text>
          <View style={styles.comparisonTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Hàm</Text>
              <Text style={styles.tableHeaderText}>Cơ sở tính toán</Text>
              <Text style={styles.tableHeaderText}>Trường hợp sử dụng</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>scale()</Text>
              <Text style={styles.tableCell}>Width màn hình</Text>
              <Text style={styles.tableCell}>Font, padding, margin</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>verticalScale()</Text>
              <Text style={styles.tableCell}>Height màn hình</Text>
              <Text style={styles.tableCell}>Height, top, bottom</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>getScaledWidth()</Text>
              <Text style={styles.tableCell}>% Width màn hình</Text>
              <Text style={styles.tableCell}>Layout responsive</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>getScaledHeight()</Text>
              <Text style={styles.tableCell}>% Height màn hình</Text>
              <Text style={styles.tableCell}>Layout responsive</Text>
            </View>
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
  // Scale function styles
  scaleText: {
    fontSize: scale(16),
    color: '#333',
    marginBottom: SIZES.SPACING_SMALL,
  },
  scaleBox: {
    backgroundColor: '#e3f2fd',
    padding: scale(20),
    borderRadius: SIZES.RADIUS_NORMAL,
  },
  scaleBoxText: {
    fontSize: SIZES.FONT_NORMAL,
    color: '#1976d2',
  },
  // VerticalScale function styles
  verticalScaleBox: {
    backgroundColor: '#f3e5f5',
    height: verticalScale(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.RADIUS_NORMAL,
  },
  verticalScaleText: {
    fontSize: SIZES.FONT_NORMAL,
    color: '#7b1fa2',
  },
  // ModerateScale function styles
  moderateText: {
    fontSize: moderateScale(18, 0.3),
    color: '#333',
    marginBottom: SIZES.SPACING_SMALL,
  },
  moderateText2: {
    fontSize: moderateScale(18, 0.8),
    color: '#333',
  },
  // Font sizes styles
  fontTiny: {
    fontSize: SIZES.FONT_TINY,
    color: '#666',
    marginBottom: SIZES.SPACING_TINY,
  },
  fontSmall: {
    fontSize: SIZES.FONT_SMALL,
    color: '#666',
    marginBottom: SIZES.SPACING_TINY,
  },
  fontNormal: {
    fontSize: SIZES.FONT_NORMAL,
    color: '#666',
    marginBottom: SIZES.SPACING_TINY,
  },
  fontMedium: {
    fontSize: SIZES.FONT_MEDIUM,
    color: '#666',
    marginBottom: SIZES.SPACING_TINY,
  },
  fontLarge: {
    fontSize: SIZES.FONT_LARGE,
    color: '#666',
    marginBottom: SIZES.SPACING_TINY,
  },
  fontTitle: {
    fontSize: SIZES.FONT_TITLE,
    color: '#333',
    fontWeight: '600',
  },
  // Spacing demo styles
  spacingDemo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  spacingBox: {
    backgroundColor: '#007AFF',
    padding: SIZES.SPACING_SMALL,
    borderRadius: SIZES.RADIUS_SMALL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacingText: {
    color: 'white',
    fontSize: SIZES.FONT_SMALL,
    fontWeight: '500',
  },
  // Border radius demo styles
  radiusDemo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  radiusBox: {
    backgroundColor: '#4caf50',
    padding: SIZES.SPACING_SMALL,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.SPACING_SMALL,
  },
  radiusText: {
    color: 'white',
    fontSize: SIZES.FONT_SMALL,
    fontWeight: '500',
  },
  // Icon demo styles
  iconDemo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconBox: {
    backgroundColor: '#ff9800',
    borderRadius: SIZES.RADIUS_SMALL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: 'white',
    fontSize: SIZES.FONT_SMALL,
    fontWeight: 'bold',
  },
  // Helper functions styles
  responsiveText: {
    fontSize: getResponsiveSize(20, 0.3),
    color: '#333',
    marginBottom: SIZES.SPACING_SMALL,
  },
  responsiveText2: {
    fontSize: getResponsiveSize(20, 0.8),
    color: '#333',
  },
  percentageBox: {
    width: getScaledWidth(50),
    height: getScaledHeight(25),
    backgroundColor: '#9c27b0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.RADIUS_NORMAL,
    marginBottom: SIZES.SPACING_MEDIUM,
  },
  percentageBox2: {
    width: getScaledWidth(80),
    height: getScaledHeight(15),
    backgroundColor: '#ff5722',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.RADIUS_NORMAL,
  },
  percentageText: {
    color: 'white',
    fontSize: SIZES.FONT_SMALL,
    fontWeight: '500',
    textAlign: 'center',
  },
  // Grid layout styles
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  // Button styles
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
    marginBottom: SIZES.SPACING_MEDIUM,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: SIZES.FONT_MEDIUM,
    fontWeight: '600',
  },
  smallButton: {
    backgroundColor: '#666',
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    borderRadius: SIZES.RADIUS_SMALL,
    alignItems: 'center',
  },
  smallButtonText: {
    color: 'white',
    fontSize: SIZES.FONT_SMALL,
    fontWeight: '500',
  },
  // Modal demo styles
  modalDemo: {
    width: getScaledWidth(80),
    height: getScaledHeight(40),
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.RADIUS_LARGE,
    alignSelf: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: SIZES.FONT_MEDIUM,
    fontWeight: '500',
    textAlign: 'center',
  },
  // Flexbox với Scale styles
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(16),
    backgroundColor: '#f0f8ff',
    borderRadius: SIZES.RADIUS_NORMAL,
  },
  flexItem: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: scale(12),
    marginHorizontal: scale(4),
    borderRadius: SIZES.RADIUS_SMALL,
    alignItems: 'center',
  },
  flexItemText: {
    color: 'white',
    fontSize: SIZES.FONT_SMALL,
    fontWeight: '500',
  },
  headerContentLayout: {
    height: verticalScale(200),
    backgroundColor: '#f5f5f5',
    borderRadius: SIZES.RADIUS_NORMAL,
    overflow: 'hidden',
  },
  fixedHeader: {
    height: verticalScale(50),
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  headerText: {
    color: 'white',
    fontSize: SIZES.FONT_MEDIUM,
    fontWeight: '600',
  },
  flexibleContent: {
    flex: 1,
    padding: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: SIZES.FONT_LARGE,
    color: '#333',
    fontWeight: '600',
    marginBottom: SIZES.SPACING_SMALL,
  },
  contentSubtext: {
    fontSize: SIZES.FONT_SMALL,
    color: '#666',
    textAlign: 'center',
  },
  flexGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flexGridItem: {
    width: getScaledWidth(48),
    height: verticalScale(80),
    backgroundColor: '#FF9800',
    borderRadius: SIZES.RADIUS_NORMAL,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.SPACING_MEDIUM,
  },
  gridItemText: {
    color: 'white',
    fontSize: SIZES.FONT_MEDIUM,
    fontWeight: '600',
  },
  sidebarLayout: {
    flexDirection: 'row',
    height: verticalScale(120),
    backgroundColor: '#f5f5f5',
    borderRadius: SIZES.RADIUS_NORMAL,
    overflow: 'hidden',
  },
  sidebar: {
    width: getScaledWidth(30),
    backgroundColor: '#9C27B0',
    padding: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarText: {
    color: 'white',
    fontSize: SIZES.FONT_MEDIUM,
    fontWeight: '600',
    marginBottom: SIZES.SPACING_TINY,
  },
  sidebarSubtext: {
    color: 'white',
    fontSize: SIZES.FONT_TINY,
    opacity: 0.8,
  },
  mainArea: {
    flex: 1,
    padding: scale(16),
    justifyContent: 'center',
  },
  mainText: {
    fontSize: SIZES.FONT_LARGE,
    color: '#333',
    fontWeight: '600',
    marginBottom: SIZES.SPACING_SMALL,
  },
  mainSubtext: {
    fontSize: SIZES.FONT_SMALL,
    color: '#666',
  },
  formLayout: {
    backgroundColor: '#f9f9f9',
    padding: scale(16),
    borderRadius: SIZES.RADIUS_NORMAL,
  },
  inputGroup: {
    marginBottom: verticalScale(16),
  },
  inputLabel: {
    fontSize: SIZES.FONT_MEDIUM,
    color: '#333',
    fontWeight: '500',
    marginBottom: SIZES.SPACING_SMALL,
  },
  inputField: {
    height: verticalScale(40),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: SIZES.RADIUS_SMALL,
    paddingHorizontal: scale(12),
    justifyContent: 'center',
  },
  inputText: {
    fontSize: SIZES.FONT_NORMAL,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(16),
  },
  flexButton: {
    flex: 1,
    height: verticalScale(40),
    backgroundColor: '#007AFF',
    borderRadius: SIZES.RADIUS_SMALL,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(4),
  },
  buttonText: {
    color: 'white',
    fontSize: SIZES.FONT_MEDIUM,
    fontWeight: '500',
  },
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
  footerText: {
    fontSize: SIZES.FONT_SMALL,
    color: '#666',
    textAlign: 'center',
  },
  // So sánh các hàm Scale styles
  comparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZES.SPACING_MEDIUM,
  },
  comparisonItem: {
    alignItems: 'center',
  },
  comparisonLabel: {
    fontSize: SIZES.FONT_SMALL,
    color: '#666',
    marginBottom: SIZES.SPACING_TINY,
  },
  comparisonBox: {
    backgroundColor: '#e0e0e0',
    borderRadius: SIZES.RADIUS_SMALL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comparisonText: {
    fontSize: SIZES.FONT_SMALL,
    color: '#333',
    fontWeight: '500',
  },
  responsiveDemo: {
    marginTop: SIZES.SPACING_MEDIUM,
  },
  responsiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.SPACING_TINY,
  },
  responsiveLabel: {
    fontSize: SIZES.FONT_SMALL,
    color: '#666',
    marginRight: SIZES.SPACING_SMALL,
  },
  responsiveBox: {
    backgroundColor: '#007AFF',
    borderRadius: SIZES.RADIUS_SMALL,
  },
  responsiveValue: {
    fontSize: SIZES.FONT_SMALL,
    color: '#333',
    fontWeight: '500',
    marginLeft: SIZES.SPACING_SMALL,
  },
  comparisonTable: {
    marginTop: SIZES.SPACING_MEDIUM,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: SIZES.RADIUS_SMALL,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: SIZES.SPACING_SMALL,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: SIZES.FONT_SMALL,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: SIZES.SPACING_SMALL,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    fontSize: SIZES.FONT_SMALL,
    color: '#555',
    textAlign: 'center',
  },
});

export default ResponsiveDemoScreen;
