import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {User} from '@/shared/types';
import {COLORS} from '@/shared/constants';

interface AvatarProps {
  user: User | null;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({user, size = 40}) => {
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
        source={{uri: user.avatar}}
        style={[styles.avatar, avatarStyle]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={[styles.placeholderAvatar, avatarStyle]}>
      <Text style={[styles.initials, {fontSize: size * 0.4}]}>
        {user?.name ? getInitials(user.name) : 'U'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.backgroundSecondary,
  },
  placeholderAvatar: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: COLORS.background,
    fontWeight: '600',
  },
});

export default Avatar; 