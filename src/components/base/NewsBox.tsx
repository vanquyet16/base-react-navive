import { createStyles } from '@/shared/theme/create-styles';
import React, { memo, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@/shared/theme/use-theme';
import CustomText from './CustomText';

export interface NewsItem {
  id: string;
  title: string;
  image?: string;
  date?: string;
  url?: string;
}

interface NewsBoxProps {
  data: NewsItem[];
  headerTitle?: string;
  brand?: React.ReactNode;
  onPressItem?: (item: NewsItem) => void;
  style?: any;
  variant?: 'primary' | 'success' | 'info' | 'party';
  headerColors?: string[];
  backgroundColor?: string;
  borderColor?: string;
  headerTitleColor?: string;
  brandTextColor?: string;
  brandSubTextColor?: string;
  brandSubSmallTextColor?: string;
}

const NewsBox: React.FC<NewsBoxProps> = ({
  data,
  headerTitle,
  brand,
  onPressItem,
  style,
  variant = 'primary',
  headerColors,
  backgroundColor,
  borderColor,
  headerTitleColor,
  brandTextColor,
  brandSubTextColor,
  brandSubSmallTextColor,
}) => {
  const styles = useStyles();
  const theme = useTheme();

  // Get variant colors from theme (memoized)
  const variantColors = useMemo(
    () => theme.colors.newsBox[variant],
    [theme.colors.newsBox, variant],
  );

  // Memoized color values
  const finalHeaderColors = useMemo(
    () =>
      headerColors || [variantColors.gradientStart, variantColors.gradientEnd],
    [headerColors, variantColors.gradientStart, variantColors.gradientEnd],
  );

  const finalBackgroundColor = useMemo(
    () => backgroundColor || variantColors.bg,
    [backgroundColor, variantColors.bg],
  );

  const finalBorderColor = useMemo(
    () => borderColor || variantColors.border,
    [borderColor, variantColors.border],
  );

  const finalHeaderTitleColor = useMemo(
    () => headerTitleColor || variantColors.text,
    [headerTitleColor, variantColors.text],
  );

  const finalBrandTextColor = useMemo(
    () => brandTextColor || variantColors.text,
    [brandTextColor, variantColors.text],
  );

  const finalBrandSubTextColor = useMemo(
    () => brandSubTextColor || variantColors.subText,
    [brandSubTextColor, variantColors.subText],
  );

  // Memoized dynamic style objects
  const dynamicContainerStyle = useMemo(
    () => ({
      backgroundColor: finalBackgroundColor,
      borderColor: finalBorderColor,
    }),
    [finalBackgroundColor, finalBorderColor],
  );

  const dynamicHeaderTitleStyle = useMemo(
    () => ({ color: finalHeaderTitleColor }),
    [finalHeaderTitleColor],
  );

  const dynamicBrandTextStyle = useMemo(
    () => ({ color: finalBrandTextColor }),
    [finalBrandTextColor],
  );

  // Memoized gradient config objects
  const gradientStart = useMemo(() => ({ x: 0, y: 0 }), []);
  const gradientEnd = useMemo(() => ({ x: 1, y: 0 }), []);
  const gradientLocations = useMemo(
    () => (finalHeaderColors.length === 3 ? [0, 0.5, 1] : [0, 1]),
    [finalHeaderColors.length],
  );

  // Memoized spacing style
  const emptyBrandSpacing = useMemo(
    () => ({ height: moderateVerticalScale(12) }),
    [],
  );

  const handlePress = useCallback(
    (item: NewsItem) => {
      if (onPressItem) {
        onPressItem(item);
      } else if (item.url) {
        // Fallback to opening URL if no handler provided
        Linking.openURL(item.url).catch(err =>
          console.error('An error occurred', err),
        );
      }
    },
    [onPressItem],
  );

  // Memoized render function for cards
  const renderCard = useCallback(
    (item: NewsItem) => (
      <TouchableOpacity
        key={item.id}
        style={styles.cardContainer}
        activeOpacity={0.8}
        onPress={() => handlePress(item)}
      >
        <View style={styles.cardImageContainer}>
          {item.image ? (
            <FastImage
              source={{ uri: item.image }}
              style={styles.cardImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Icon
                name="image"
                size={moderateScale(40)}
                color={theme.colors.textSecondary}
              />
            </View>
          )}
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={3}>
            {item.title}
          </Text>
          <View style={styles.cardFooter}>
            <Icon
              name="calendar-today"
              size={moderateScale(12)}
              color={theme.colors.textTertiary}
              style={styles.dateIcon}
            />
            <Text style={styles.dateText}>{item.date || '01-02-2026'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [
      handlePress,
      styles,
      theme.colors.textSecondary,
      theme.colors.textTertiary,
    ],
  );

  return (
    <View style={[styles.container, dynamicContainerStyle, style]}>
      {/* Header Banner */}
      {headerTitle ? (
        <View style={styles.headerWrapper}>
          <LinearGradient
            colors={finalHeaderColors}
            start={gradientStart}
            end={gradientEnd}
            style={styles.headerGradient}
            locations={gradientLocations}
          />
          <View style={styles.headerContent}>
            <View style={styles.headerTopDisplay}>
              <View style={styles.flagIconContainer}>
                <CustomText style={styles.flagIcon}>☭ ★</CustomText>
              </View>
              <CustomText
                variant="h8"
                style={[styles.headerTitle, dynamicHeaderTitleStyle]}
              >
                {headerTitle}
              </CustomText>
            </View>
          </View>
        </View>
      ) : null}

      {/* Sub-header / Brand Area */}
      {brand ? (
        <View style={styles.subHeader}>{brand}</View>
      ) : (
        <View style={emptyBrandSpacing} />
      )}

      {/* Content List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        style={styles.listContainer}
      >
        {data.map(renderCard)}
      </ScrollView>
    </View>
  );
};

export default memo(NewsBox);

const useStyles = createStyles(
  theme => ({
    container: {
      backgroundColor: theme.colors.partyBg, // Light beige "warm" background from image
      borderRadius: moderateScale(12),
      overflow: 'hidden',
      marginBottom: moderateVerticalScale(16),
      // ...theme.shadows.sm,
      borderWidth: 1,
      borderColor: theme.colors.partyBorder, // Subtle border matching the background tone
    },
    headerWrapper: {
      width: '100%',
    },
    headerGradient: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.1, // Fallback if we want just a tint
    },
    headerContent: {
      backgroundColor: theme.colors.partyHeaderBg, // Light yellow gradient start
    },
    headerTopDisplay: {
      flexDirection: 'row',
    },
    // Redesigning the Header to match the image exactly:
    // Top strip: Yellow to White Gradient? Or Solid Yellow?
    // Image: "DAI HOI DANG..." is Red text on Yellow background.
    // Left side: Red Flag with Star/Hammer.
    flagIconContainer: {
      backgroundColor: theme.colors.partyRed, // Party Red
      paddingHorizontal: scale(8),
      paddingVertical: moderateVerticalScale(4),
      borderTopLeftRadius: moderateScale(12),
      borderBottomRightRadius: moderateScale(20), // Curved effect
      justifyContent: 'center',
      alignItems: 'center',
    },
    flagIcon: {
      color: theme.colors.partyYellow, // Gold Yellow
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: 'bold',
    },
    headerTitle: {
      flex: 1,
      fontWeight: '900',
      textAlign: 'center',
      textTransform: 'uppercase',
      paddingVertical: moderateVerticalScale(8),
    },

    subHeader: {
      paddingHorizontal: scale(16),
      paddingBottom: moderateVerticalScale(4),
      paddingTop: moderateVerticalScale(8),
    },
    brandContainer: {
      alignItems: 'flex-start',
    },
    brandTextMain: {
      fontWeight: '900',
      color: theme.colors.partyRed, // Red
      fontFamily: 'serif', // Attempt to look like masthead
      lineHeight: moderateVerticalScale(28),
    },
    brandTextSub: {
      fontSize: moderateScale(6),
      color: theme.colors.textSecondary,
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    brandTextSubSmall: {
      fontSize: moderateScale(5),
      color: theme.colors.textTertiary,
      textTransform: 'uppercase',
    },

    listContainer: {
      marginTop: moderateVerticalScale(4),
    },
    listContent: {
      paddingHorizontal: scale(16),
      paddingBottom: moderateVerticalScale(16),
    },

    // Card Styles
    cardContainer: {
      width: scale(220), // Fixed width for carousel items
      marginRight: scale(12),
      backgroundColor: theme.colors.white,
      borderRadius: moderateScale(8),
      ...theme.shadows.sm,
      elevation: 2,
      overflow: 'hidden',
    },
    cardImageContainer: {
      width: '100%',
      height: moderateVerticalScale(110),
      backgroundColor: theme.colors.backgroundSecondary,
    },
    cardImage: {
      width: '100%',
      height: '100%',
    },
    placeholderContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.backgroundSecondary,
    },
    cardContent: {
      padding: moderateScale(12),
    },
    cardTitle: {
      fontSize: theme.typography.fontSizes.xs,
      // fontWeight: '600',
      color: theme.colors.text,
      lineHeight: moderateScale(20),
      // marginBottom: moderateVerticalScale(8),
      height: moderateScale(50), // Fix height for max 3 lines alignment
    },
    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 'auto',
    },
    dateIcon: {
      marginRight: scale(4),
    },
    dateText: {
      fontSize: theme.typography.fontSizes.xs,
      color: theme.colors.textTertiary,
    },
  }),
  true,
);
