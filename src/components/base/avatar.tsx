/**
 * AVATAR COMPONENT
 * ================
 * Component hiển thị avatar của user
 * Fallback sang initials nếu không có ảnh
 * Sử dụng theme system
 */

import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import type { User } from '@/shared/types/domain/user';

interface AvatarProps {
  user: User | null;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 40 }) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  if (user?.avatar) {
    return (
      <Image
        source={{ uri: user.avatar }}
        style={[styles.avatar, avatarStyle]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={[styles.placeholderAvatar, avatarStyle]}>
      <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
        {user?.displayName ? getInitials(user.displayName) : 'U'}
      </Text>
    </View>
  );
};

const useStyles = createStyles(theme => ({
  avatar: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  placeholderAvatar: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: theme.colors.white,
    fontWeight: '600',
  },
}));

export default Avatar;
