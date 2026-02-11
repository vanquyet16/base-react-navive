import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { CustomText, AppIcon, CustomButton } from '@/components/base';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

interface FeedbackActionFooterProps {
  onRate: () => void;
  onComment: () => void;
}

const FeedbackActionFooter: React.FC<FeedbackActionFooterProps> = memo(
  ({ onRate, onComment }) => {
    const theme = useTheme();
    const styles = useStyles();

    return (
      <View style={[styles.container]}>
        <CustomButton
          title="Đánh giá kết quả"
          onPress={onRate}
          variant="primary"
          style={styles.rateButton}
          leftIcon={
            <AppIcon
              name="thumbs-up"
              size={moderateScale(20)}
              color={theme.colors.white}
            />
          }
        />

        {/* Comment Button - Square Secondary */}
        <TouchableOpacity
          style={styles.commentButton}
          onPress={onComment}
          activeOpacity={0.8}
        >
          <AppIcon
            name="message-square"
            size={moderateScale(24)}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    );
  },
);

const useStyles = createStyles(
  theme => ({
    container: {
      backgroundColor: theme.colors.white,
      flexDirection: 'row',
      paddingHorizontal: scale(10),
      paddingTop: moderateVerticalScale(12),
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,0.05)',
      ...theme.shadows.lg,
      gap: scale(12),
      alignItems: 'center',
      paddingBottom: moderateVerticalScale(27),
    },
    rateButton: {
      flex: 1,
      gap: scale(8),
    },
    rateButtonText: {
      color: theme.colors.white,
    },
    commentButton: {
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.backgroundSecondary, // Light gray/blue
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  true,
);

export default FeedbackActionFooter;
