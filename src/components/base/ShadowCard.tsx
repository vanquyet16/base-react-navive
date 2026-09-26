import React, { memo } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { createStyles } from '@/shared/theme/create-styles';

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
    const styles = useStyles();

    return <View style={[styles.container, style]}>{children}</View>;
  },
);

const useStyles = createStyles(
  (theme, rs) => ({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: rs.moderateScale(12),
      padding: rs.moderateScale(16),
      // marginHorizontal: rs.scale(16),
      marginBottom: rs.moderateVerticalScale(16),

      // Unified 3D Shadow Effect
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  }),
);

export default ShadowCard;
