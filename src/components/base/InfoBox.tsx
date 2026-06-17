import React, { useMemo, useCallback, memo } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { useTheme } from '@/shared/theme/use-theme';
import { CustomText } from './CustomText';
import AppIcon from './AppIcon';

export type InfoBoxType =
  | 'vertical'
  | 'status'
  | 'news'
  | 'utility'
  | 'suggestion'
  | 'contact';

export interface InfoBoxProps {
  type: InfoBoxType;
  onPress?: () => void;
  title: string;
  style?: ViewStyle;

  // Vertical Props
  icon?: string;
  iconColor?: string;
  iconBackgroundColor?: string;

  // Status & News Shared
  subTitle?: string;
  date?: string;

  // Status Props
  status?: string;
  statusColor?: string;
  statusTextColor?: string;
  location?: string;

  // News Props
  image?: ImageSourcePropType | string;
  tag?: string;
  time?: string;

  // Suggestion Props
  author?: string;
  likeCount?: number;

  // Contact Props
  phoneNumber?: string;
  rightIcon?: string;
  rightColor?: string;
  onRightPress?: () => void;
}

/**
 * InfoBox Component
 * =================
 * A multi-variant box component for displaying various content types.
 *
 * Variants:
 * 1. 'vertical': Icon on top, text below (Square-ish).
 * 2. 'status': Horizontal card with title, metadata, and status badge.
 * 3. 'news': Horizontal card with image thumbnail, title, and metadata.
 * 4. 'suggestion': Horizontal card with icon, title, author, and like count.
 * 5. 'contact': Horizontal card for emergency/contact info with call button.
 */
import { ShadowCard } from './ShadowCard';

export const InfoBox: React.FC<InfoBoxProps> = memo(props => {
  const {
    type,
    onPress,
    title,
    style,
    icon,
    iconColor,
    iconBackgroundColor,
    subTitle,
    date,
    status,
    statusColor,
    statusTextColor,
    image,
    tag,
    time,
    author,
    likeCount,
    phoneNumber,
    rightIcon,
    rightColor,
    onRightPress,
  } = props;

  const theme = useTheme();
  const styles = useStyles(theme);

  const containerStyle = useMemo(
    () => [
      type === 'vertical' && styles.containerVertical,
      type === 'utility' && styles.containerUtility,
      style,
    ],
    [styles, type, style],
  );

  const iconCircleStyle = useMemo(
    () => [
      styles.iconCircle,
      type === 'utility' && {
        marginBottom: theme.spacing[1],
        shadowColor: '#000000', // Standard black shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1, // Softer opacity
        shadowRadius: 6,
        elevation: 4,
        borderRadius: moderateScale(18), // Squircle
        borderWidth: 0,
      },
      {
        backgroundColor: iconBackgroundColor || theme.colors.primaryLight,
      },
    ],
    [
      styles.iconCircle,
      type,
      theme.spacing,
      iconBackgroundColor,
      theme.colors.primaryLight,
    ],
  );

  const renderVertical = useCallback(
    () => (
      <View style={styles.verticalContent}>
        <View style={iconCircleStyle}>
          <AppIcon
            name={icon || 'appstore-o'}
            size={moderateScale(24)}
            color={
              iconColor ||
              (type === 'utility' ? theme.colors.white : theme.colors.primary)
            }
          />
        </View>
        <CustomText
          variant="caption"
          weight="bold"
          style={styles.verticalTitle}
          numberOfLines={2}
        >
          {title}
        </CustomText>
      </View>
    ),
    [
      styles.verticalContent,
      iconCircleStyle,
      styles.verticalTitle,
      icon,
      iconColor,
      theme.colors.primary,
      title,
      type,
      theme.colors.white,
    ],
  );

  const statusBadgeStyle = useMemo(
    () => [
      styles.statusBadge,
      { backgroundColor: statusColor || theme.colors.warningLight },
    ],
    [styles.statusBadge, statusColor, theme.colors.warningLight],
  );

  const statusTextStyle = useMemo(
    () => ({
      color: statusTextColor || theme.colors.warning,
      fontWeight: 'bold' as const,
    }),
    [statusTextColor, theme.colors.warning],
  );

  const renderStatus = useCallback(
    () => (
      <View>
        <View style={styles.statusContentRow}>
          {image && (
            <FastImage
              source={
                typeof image === 'string' ? { uri: image } : (image as any)
              }
              style={styles.statusImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}

          <View style={styles.flex1}>
            <CustomText
              variant="h7"
              weight="bold"
              style={styles.statusTitle}
              numberOfLines={2}
            >
              {title}
            </CustomText>

            {/* Location */}
            {props.location && (
              <View style={styles.statusMetaRow}>
                <AppIcon
                  name="map-pin"
                  size={moderateScale(12)}
                  color={theme.colors.textSecondary}
                />
                <CustomText
                  variant="caption"
                  style={styles.statusMetaText}
                  numberOfLines={1}
                >
                  {props.location}
                </CustomText>
              </View>
            )}

            {/* Time */}
            {date && (
              <View style={styles.statusMetaRow}>
                <AppIcon
                  name="clock"
                  size={moderateScale(12)}
                  color={theme.colors.textSecondary}
                />
                <CustomText
                  variant="caption"
                  style={styles.statusMetaText}
                  numberOfLines={1}
                >
                  {date}
                </CustomText>
              </View>
            )}
          </View>
        </View>

        {/* Divider */}
        <View style={styles.statusDivider} />

        {/* Footer */}
        <View style={styles.statusFooter}>
          {subTitle && (
            <View style={styles.codeBadge}>
              <CustomText variant="h10" weight="bold" style={styles.codeText}>
                {subTitle}
              </CustomText>
            </View>
          )}

          {status && (
            <View
              style={[
                styles.statusPill,
                {
                  backgroundColor: statusColor
                    ? `${statusColor}15`
                    : theme.colors.backgroundSecondary,
                  borderColor: statusColor || theme.colors.border,
                },
              ]}
            >
              <CustomText
                variant="h10"
                weight="bold"
                style={{
                  color: statusTextColor || statusColor || theme.colors.text,
                }}
              >
                {status}
              </CustomText>
            </View>
          )}
        </View>
      </View>
    ),
    [
      styles,
      title,
      subTitle,
      date,
      status,
      statusColor,
      statusTextColor,
      image,
      props.location,
      theme.colors.textSecondary,
      theme.colors.backgroundSecondary,
      theme.colors.border,
      theme.colors.text,
    ],
  );

  const renderNews = useCallback(
    () => (
      <View style={styles.rowContent}>
        {image && (
          <FastImage
            source={typeof image === 'string' ? { uri: image } : (image as any)}
            style={styles.thumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        <View style={[styles.flex1, styles.newsContent]}>
          <CustomText
            variant="h7"
            weight="bold"
            style={styles.newsTitle}
            numberOfLines={2}
          >
            {title}
          </CustomText>
          <View style={styles.newsMeta}>
            {time && (
              <>
                <AppIcon
                  name="clock"
                  size={12}
                  color={theme.colors.textSecondary}
                />
                <CustomText
                  variant="caption"
                  style={styles.newsTime}
                  numberOfLines={1}
                >
                  {time}
                </CustomText>
              </>
            )}
            {tag && (
              <>
                <View style={styles.dotSeparator} />
                <CustomText
                  variant="caption"
                  style={styles.newsTag}
                  numberOfLines={1}
                >
                  {tag}
                </CustomText>
              </>
            )}
          </View>
        </View>
      </View>
    ),
    [styles, image, title, time, theme.colors.textSecondary, tag],
  );

  const renderSuggestion = useCallback(
    () => (
      <View style={styles.rowContent}>
        <View style={styles.suggestionIconWrapper}>
          <AppIcon
            name="bulb"
            size={moderateScale(24)}
            color={theme.colors.orangeAccent}
          />
        </View>
        <View style={styles.flex1}>
          <CustomText
            variant="h7"
            weight="bold"
            style={styles.suggestionTitle}
            numberOfLines={2}
          >
            {title}
          </CustomText>
          <View style={styles.suggestionMeta}>
            {author && (
              <CustomText
                variant="caption"
                style={styles.suggestionAuthor}
                numberOfLines={1}
              >
                {author}
              </CustomText>
            )}
            {typeof likeCount === 'number' && (
              <>
                <View style={styles.dotSeparator} />
                <View style={styles.likeContainer}>
                  <AppIcon
                    name="like-o"
                    size={moderateScale(14)}
                    color={theme.colors.textSecondary}
                  />
                  <CustomText variant="caption" style={styles.likeCount}>
                    {likeCount}
                  </CustomText>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    ),
    [
      styles,
      theme.colors.orangeAccent,
      theme.colors.textSecondary,
      title,
      author,
      likeCount,
    ],
  );

  const renderContact = useCallback(
    () => (
      <View style={styles.contactRow}>
        <View
          style={[
            styles.contactIconContainer,
            { backgroundColor: iconBackgroundColor || theme.colors.background },
          ]}
        >
          <AppIcon
            name={icon || 'phone'}
            size={moderateScale(24)}
            color={iconColor || theme.colors.text}
          />
        </View>

        <View style={styles.flex1}>
          <CustomText
            variant="h7"
            weight="bold"
            numberOfLines={1}
            style={styles.contactTitle}
          >
            {title}
          </CustomText>

          {subTitle && (
            <CustomText
              variant="caption"
              color="secondary"
              numberOfLines={1}
              style={styles.contactSubtitle}
            >
              {subTitle}
            </CustomText>
          )}

          {phoneNumber && (
            <CustomText
              variant="h7"
              weight="bold"
              style={{ color: theme.colors.text, marginTop: 4 }}
            >
              {phoneNumber}
            </CustomText>
          )}
        </View>

        <Pressable
          onPress={onRightPress}
          disabled={!onRightPress}
          style={({ pressed }) => [
            styles.contactRightButton,
            { backgroundColor: rightColor || theme.colors.primary },
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <AppIcon
            name={rightIcon || 'phone-call'}
            size={moderateScale(20)}
            color={theme.colors.white}
          />
        </Pressable>
      </View>
    ),
    [
      styles,
      iconBackgroundColor,
      theme.colors.background,
      theme.colors.text,
      theme.colors.primary,
      theme.colors.white,
      icon,
      iconColor,
      title,
      subTitle,
      phoneNumber,
      onRightPress,
      rightColor,
      rightIcon,
    ],
  );

  const content = (() => {
    switch (type) {
      case 'vertical':
        return renderVertical();
      case 'status':
        return renderStatus();
      case 'news':
        return renderNews();
      case 'suggestion':
        return renderSuggestion();
      case 'utility':
        return renderVertical();
      case 'contact':
        return renderContact();
      default:
        return null;
    }
  })();

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          { marginBottom: moderateVerticalScale(16) },
          style, // Allow override
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <ShadowCard style={containerStyle}>{content}</ShadowCard>
      </Pressable>
    );
  }

  return <ShadowCard style={containerStyle}>{content}</ShadowCard>;
});

const useStyles = (theme: any) =>
  StyleSheet.create({
    // Removed duplicate container styles to use ShadowCard's styles
    containerVertical: {
      padding: moderateScale(12),
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: scale(100),
      minHeight: scale(100),
    },
    containerUtility: {
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      shadowOpacity: 0,
      elevation: 0,
      borderWidth: 0,
    },
    // Vertical Styles
    verticalContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconCircle: {
      width: scale(48),
      height: scale(48), // Circle symmetry
      borderRadius: moderateScale(15),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: moderateVerticalScale(8),
    },
    verticalTitle: {
      textAlign: 'center',
      fontWeight: '600',
    },
    // Shared Row Styles
    rowContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    flex1: {
      flex: 1,
    },
    // Status Styles
    title: {
      fontWeight: 'bold',
      marginBottom: moderateVerticalScale(2),
    },
    subTitle: {
      color: theme.colors.textSecondary,
      marginBottom: moderateVerticalScale(2),
    },
    dateText: {
      color: theme.colors.textSecondary,
    },
    statusBadge: {
      paddingHorizontal: scale(8),
      paddingVertical: moderateVerticalScale(2),
      borderRadius: moderateScale(100), // Full radius
      marginTop: moderateVerticalScale(4),
      marginLeft: scale(8),
      alignSelf: 'flex-end', // Align to bottom
    },
    // News Styles
    thumbnail: {
      width: scale(80),
      height: scale(80), // Square thumbnail
      borderRadius: moderateScale(8),
      marginRight: scale(12),
      backgroundColor: theme.colors.backgroundSecondary,
    },
    newsContent: {
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
    newsTitle: {
      fontWeight: 'bold',
      marginBottom: moderateVerticalScale(4),
    },
    newsMeta: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    newsTime: {
      color: theme.colors.textSecondary,
      marginLeft: scale(4),
      marginRight: scale(8),
    },
    newsTag: {
      color: theme.colors.textSecondary,
    },
    dotSeparator: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.textSecondary,
      marginRight: scale(8),
    },
    // Suggestion Styles
    suggestionIconWrapper: {
      marginRight: scale(12),
      justifyContent: 'flex-start',
      paddingTop: 2, // Align icon visually with text
    },
    suggestionTitle: {
      marginBottom: moderateVerticalScale(4),
    },
    suggestionMeta: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    suggestionAuthor: {
      color: theme.colors.textSecondary,
    },
    likeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    likeCount: {
      color: theme.colors.textSecondary,
      marginLeft: scale(4),
    },
    // New Status Styles
    statusContentRow: {
      flexDirection: 'row',
      marginBottom: moderateVerticalScale(10),
    },
    statusImage: {
      width: scale(80),
      height: scale(80),
      borderRadius: moderateScale(12),
      marginRight: scale(12),
      backgroundColor: theme.colors.backgroundSecondary,
    },
    statusTitle: {
      marginBottom: moderateVerticalScale(4),
    },
    statusMetaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: moderateVerticalScale(2),
    },
    statusMetaText: {
      color: theme.colors.textSecondary,
      marginLeft: scale(6),
    },
    statusDivider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginBottom: moderateVerticalScale(10),
      // marginHorizontal: -moderateScale(10), // Extend to edges
      opacity: 0.5,
    },
    statusFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    codeBadge: {
      backgroundColor: theme.colors.backgroundSecondary,
      paddingHorizontal: scale(8),
      paddingVertical: moderateVerticalScale(4),
      borderRadius: moderateScale(4),
    },
    codeText: {
      color: theme.colors.text,
    },
    statusPill: {
      paddingHorizontal: scale(12),
      paddingVertical: moderateVerticalScale(4),
      borderRadius: moderateScale(16),
      borderWidth: 1,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: moderateVerticalScale(4),
    },
    locationText: {
      color: theme.colors.textSecondary,
      marginLeft: scale(4),
    },
    // Contact Styles
    contactRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: moderateScale(4),
    },
    contactIconContainer: {
      width: scale(56),
      height: scale(56),
      borderRadius: moderateScale(20), // Squircle
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: scale(16),
    },
    contactTitle: {
      marginBottom: 2,
    },
    contactSubtitle: {
      marginBottom: 2,
    },
    contactRightButton: {
      width: scale(48),
      height: scale(48),
      borderRadius: moderateScale(16), // Squircle
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: scale(12),
    },
  });

export default InfoBox;
