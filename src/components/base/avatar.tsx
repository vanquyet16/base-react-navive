/**
 * AVATAR COMPONENT
 * ================
 * Component hiển thị avatar của user
 * Fallback sang initials nếu không có ảnh
 * Sử dụng theme system
 */

import React, { useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import type { User } from '@/shared/types/domain/user';

interface AvatarProps {
  user: User | null;
  size?: number;
  /** Optional accent border (gold/yellow) */
  accentBorder?: boolean;
}

/**
 * Avatar Component
 *
 * @optimized React.memo, useMemo
 */
const Avatar: React.FC<AvatarProps> = ({
  user,
  size = 40,
  accentBorder = false,
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  // Memoize initials calculation
  const initials = useMemo(() => {
    if (!user?.displayName) return 'U';
    return user.displayName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [user?.displayName]);

  // Memoize avatar style
  const avatarStyle = useMemo(
    () => ({
      width: size,
      height: size,
      borderRadius: size / 2,
    }),
    [size],
  );

  // Memoize accent border style
  const accentBorderStyle = useMemo(
    () =>
      accentBorder
        ? {
            borderWidth: 2,
            borderColor: `${theme.colors.avatarBorder}80`, // #eab308 with 50% opacity
          }
        : undefined,
    [accentBorder, theme.colors.avatarBorder],
  );

  // Memoize initials font size
  const initialsFontSize = useMemo(() => ({ fontSize: size * 0.4 }), [size]);

  if (user?.avatar) {
    return (
      <Image
        source={{ uri: user.avatar }}
        style={[styles.avatar, styles.shadow, avatarStyle, accentBorderStyle]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View
      style={[
        styles.placeholderAvatar,
        styles.shadow,
        avatarStyle,
        accentBorderStyle,
      ]}
    >
      <Text style={[styles.initials, initialsFontSize]}>{initials}</Text>
    </View>
  );
};

/**
 * Memoized export để prevent unnecessary re-renders
 */
export default React.memo(Avatar);

const useStyles = createStyles(theme => ({
  avatar: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  placeholderAvatar: {
    backgroundColor: theme.colors.primary, // Use new government blue
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
}));
