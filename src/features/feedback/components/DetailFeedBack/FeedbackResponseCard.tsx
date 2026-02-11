import React, { memo } from 'react';
import { View, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { CustomText, AppIcon, ShadowCard } from '@/components/base';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

interface FeedbackResponseCardProps {
  content: string;
  responderName: string;
  images?: string[];
}

const FeedbackResponseCard: React.FC<FeedbackResponseCardProps> = memo(
  ({ content, responderName, images }) => {
    const theme = useTheme();
    const styles = useStyles();

    return (
      <ShadowCard>
        <View style={styles.header}>
          <AppIcon
            name="check-circle"
            size={moderateScale(20)}
            color={theme.colors.success}
          />
          <CustomText variant="h7" weight="bold" style={styles.headerTitle}>
            Kết quả xử lý
          </CustomText>
        </View>

        <View style={styles.content}>
          <CustomText variant="h8" style={styles.responseText}>
            {content}
          </CustomText>

          <View style={styles.responderContainer}>
            <CustomText variant="h9" color="secondary">
              Người xử lý:
            </CustomText>
            <CustomText variant="h9" weight="bold" style={styles.responderName}>
              {responderName}
            </CustomText>
          </View>

          {images && images.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imageScroll}
              contentContainerStyle={styles.imageContainer}
              removeClippedSubviews={true} // ✅ Optimize horizontal scroll
              nestedScrollEnabled={false} // ✅ Avoid nested scroll conflicts
            >
              {images.map((img, index) => (
                <FastImage
                  key={index}
                  source={{ uri: img }}
                  style={styles.image}
                  resizeMode={FastImage.resizeMode.cover}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </ShadowCard>
    );
  },
);

const useStyles = createStyles(
  theme => ({
    // Container style removed as it is handled by ShadowCard
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: moderateVerticalScale(12),
    },
    headerTitle: {
      marginLeft: scale(8),
      color: theme.colors.success,
    },
    content: {
      marginTop: moderateVerticalScale(4),
    },
    responseText: {
      lineHeight: moderateVerticalScale(22),
      color: theme.colors.text,
    },
    responderContainer: {
      flexDirection: 'row',
      marginTop: moderateVerticalScale(12),
      alignItems: 'center',
    },
    responderName: {
      marginLeft: scale(4),
      color: theme.colors.text,
    },
    imageScroll: {
      marginTop: moderateVerticalScale(16),
    },
    imageContainer: {
      gap: scale(8),
    },
    image: {
      width: scale(100),
      height: scale(100),
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colors.background,
    },
  }),
  true,
);

export default FeedbackResponseCard;
