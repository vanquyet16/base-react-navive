import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { CustomText, AppIcon, ShadowCard } from '@/components/base';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

interface FeedbackInfoCardProps {
  address: string;
  feedbackCode: string;
  createdAt: string;
}

const FeedbackInfoCard: React.FC<FeedbackInfoCardProps> = memo(
  ({ address, feedbackCode, createdAt }) => {
    const theme = useTheme();
    const styles = useStyles();

    const renderItem = useCallback(
      (icon: string, label: string, value: string) => (
        <View style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <AppIcon
              name={icon}
              size={moderateScale(18)}
              color={theme.colors.textSecondary}
            />
          </View>
          <View style={styles.textContainer}>
            <CustomText variant="h9" color="secondary" style={styles.label}>
              {label}
            </CustomText>
            <CustomText variant="h8" style={styles.value}>
              {value}
            </CustomText>
          </View>
        </View>
      ),
      [styles, theme.colors.textSecondary],
    );

    return (
      <ShadowCard style={styles.containerOverride}>
        {renderItem('map-pin', 'Địa điểm', address)}
        <View style={styles.divider} />
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            {renderItem('hash', 'Mã phản ánh', feedbackCode)}
          </View>
          <View style={styles.halfWidth}>
            {renderItem('clock', 'Thời gian gửi', createdAt)}
          </View>
        </View>
      </ShadowCard>
    );
  },
);

const useStyles = createStyles(
  theme => ({
    containerOverride: {
      marginTop: -moderateVerticalScale(30), // Overlap header
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      marginRight: scale(8),
    },
    textContainer: {
      flex: 1,
    },
    label: {
      marginBottom: moderateVerticalScale(2),
    },
    value: {
      lineHeight: moderateVerticalScale(20),
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: moderateVerticalScale(12),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center', // Center vertically
    },
    halfWidth: {
      flex: 1,
    },
  }),
  true,
);

export default FeedbackInfoCard;
