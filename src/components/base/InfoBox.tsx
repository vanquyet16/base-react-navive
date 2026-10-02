import React, { useMemo, useCallback, memo } from 'react';
import {
  View,
  Pressable,
  ViewStyle,
} from 'react-native';
import FastImage, { type FastImageProps } from '@d11/react-native-fast-image';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
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
  image?: FastImageProps['source'] | string;
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
  const styles = useStyles();

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
        marginBottom: 4,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1, // Softer opacity
        shadowRadius: 6,
        elevation: 4,
        borderRadius: styles.rs.radius(18), // Squircle
        borderWidth: 0,
      },
      {
        backgroundColor: iconBackgroundColor || theme.colors.primaryLight,
      },
    ],
    [
      styles.iconCircle,
      styles.rs,
      type,
      iconBackgroundColor,
      theme.colors.primaryLight,
      theme.colors.black,
    ],
  );

  const renderVertical = useCallback(
    () => (
      <View style={styles.verticalContent}>
        <View style={iconCircleStyle}>
          <AppIcon
            name={icon || 'appstore-o'}
            size={24}
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

  const renderStatus = useCallback(
    () => (
      <View>
        <View style={styles.statusContentRow}>
          {image && (
            <FastImage
              source={
                typeof image === 'string' ? { uri: image } : image
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
                  size={12}
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
                  size={12}
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
            source={typeof image === 'string' ? { uri: image } : image}
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
            size={24}
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
                    size={14}
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
            size={24}
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
              style={styles.contactPhone}
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
            size={20}
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
          styles.pressableSpacing,
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

const useStyles = createStyles((theme, rs) => ({
    // Removed duplicate container styles to use ShadowCard's styles
    containerVertical: {
      padding: rs.moderateScale(12),
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: rs.scale(100),
      minHeight: rs.scale(100),
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
      width: rs.scale(48),
      height: rs.scale(48), // Circle symmetry
      borderRadius: rs.moderateScale(15),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: rs.moderateVerticalScale(8),
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
      marginBottom: rs.moderateVerticalScale(2),
    },
    subTitle: {
      color: theme.colors.textSecondary,
      marginBottom: rs.moderateVerticalScale(2),
    },
    dateText: {
      color: theme.colors.textSecondary,
    },
    statusBadge: {
      paddingHorizontal: rs.scale(8),
      paddingVertical: rs.moderateVerticalScale(2),
      borderRadius: rs.moderateScale(100), // Full radius
      marginTop: rs.moderateVerticalScale(4),
      marginLeft: rs.scale(8),
      alignSelf: 'flex-end', // Align to bottom
    },
    // News Styles
    thumbnail: {
      width: rs.scale(80),
      height: rs.scale(80), // Square thumbnail
      borderRadius: rs.moderateScale(8),
      marginRight: rs.scale(12),
      backgroundColor: theme.colors.backgroundSecondary,
    },
    newsContent: {
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
    newsTitle: {
      fontWeight: 'bold',
      marginBottom: rs.moderateVerticalScale(4),
    },
    newsMeta: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    newsTime: {
      color: theme.colors.textSecondary,
      marginLeft: rs.scale(4),
      marginRight: rs.scale(8),
    },
    newsTag: {
      color: theme.colors.textSecondary,
    },
    dotSeparator: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.textSecondary,
      marginRight: rs.scale(8),
    },
    // Suggestion Styles
    suggestionIconWrapper: {
      marginRight: rs.scale(12),
      justifyContent: 'flex-start',
      paddingTop: 2, // Align icon visually with text
    },
    suggestionTitle: {
      marginBottom: rs.moderateVerticalScale(4),
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
      marginLeft: rs.scale(4),
    },
    // New Status Styles
    statusContentRow: {
      flexDirection: 'row',
      marginBottom: rs.moderateVerticalScale(10),
    },
    statusImage: {
      width: rs.scale(80),
      height: rs.scale(80),
      borderRadius: rs.moderateScale(12),
      marginRight: rs.scale(12),
      backgroundColor: theme.colors.backgroundSecondary,
    },
    statusTitle: {
      marginBottom: rs.moderateVerticalScale(4),
    },
    statusMetaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: rs.moderateVerticalScale(2),
    },
    statusMetaText: {
      color: theme.colors.textSecondary,
      marginLeft: rs.scale(6),
    },
    statusDivider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginBottom: rs.moderateVerticalScale(10),
      // marginHorizontal: -rs.moderateScale(10), // Extend to edges
      opacity: 0.5,
    },
    statusFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    codeBadge: {
      backgroundColor: theme.colors.backgroundSecondary,
      paddingHorizontal: rs.scale(8),
      paddingVertical: rs.moderateVerticalScale(4),
      borderRadius: rs.moderateScale(4),
    },
    codeText: {
      color: theme.colors.text,
    },
    statusPill: {
      paddingHorizontal: rs.scale(12),
      paddingVertical: rs.moderateVerticalScale(4),
      borderRadius: rs.moderateScale(16),
      borderWidth: 1,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: rs.moderateVerticalScale(4),
    },
    locationText: {
      color: theme.colors.textSecondary,
      marginLeft: rs.scale(4),
    },
    // Contact Styles
    contactRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: rs.moderateScale(4),
    },
    contactIconContainer: {
      width: rs.scale(56),
      height: rs.scale(56),
      borderRadius: rs.moderateScale(20), // Squircle
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: rs.scale(16),
    },
    contactTitle: {
      marginBottom: 2,
    },
    contactSubtitle: {
      marginBottom: 2,
    },
    contactPhone: {
      color: theme.colors.text,
      marginTop: 4,
    },
    contactRightButton: {
      width: rs.scale(48),
      height: rs.scale(48),
      borderRadius: rs.moderateScale(16), // Squircle
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: rs.scale(12),
    },
  pressableSpacing: {
    marginBottom: rs.verticalGap(16),
  },
}));

export default InfoBox;
