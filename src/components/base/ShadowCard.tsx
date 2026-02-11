import React, { memo } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import {
  moderateScale,
  scale,
  moderateVerticalScale,
} from 'react-native-size-matters';

export interface ShadowCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * ShadowCard Component
 * ====================
 * A generic container component with a consistent 3D shadow effect.
 * Used for cards that need to "pop" off the screen.
 *
 * @example
 * <ShadowCard>
 *   <Text>Card Content</Text>
 * </ShadowCard>
 */
export const ShadowCard: React.FC<ShadowCardProps> = memo(
  ({ children, style }) => {
    const theme = useTheme();
    const styles = useStyles();

    return <View style={[styles.container, style]}>{children}</View>;
  },
);

const useStyles = createStyles(
  theme => ({
    container: {
      backgroundColor: theme.colors.white,
      borderRadius: moderateScale(12),
      padding: moderateScale(16),
      // marginHorizontal: scale(16),
      marginBottom: moderateVerticalScale(16),

      // Unified 3D Shadow Effect
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  }),
  true,
);

export default ShadowCard;
