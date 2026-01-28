import React, { memo } from 'react';
import { StyleProp, TextStyle, ColorValue } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@/shared/theme/use-theme';

export type IconType = 'ant' | 'feather' | 'material' | 'ionic';

export interface AppIconProps {
  name: string;
  type?: IconType;
  size?: number;
  color?: ColorValue;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

/**
 * AppIcon Component
 * =================
 * Standardized icon component for the entire application.
 * Wraps react-native-vector-icons to provide a consistent interface.
 *
 * Default type: 'feather' (Beautiful, consistent lines)
 *
 * Usage:
 * <AppIcon name="home" /> (Defaults to Feather home)
 * <AppIcon name="user" type="ant" /> (AntDesign user)
 */
const AppIcon: React.FC<AppIconProps> = ({
  name,
  type = 'feather',
  size = 24,
  color,
  style,
  onPress,
}) => {
  const theme = useTheme();
  const iconColor = color || theme.colors.text;

  const IconComponent = getIconComponent(type);

  return (
    <IconComponent
      name={name}
      size={size}
      color={iconColor as string}
      style={style}
      onPress={onPress}
    />
  );
};

const getIconComponent = (type: IconType) => {
  switch (type) {
    case 'ant':
      return AntDesign;
    case 'material':
      return MaterialCommunityIcons;
    case 'ionic':
      return Ionicons;
    case 'feather':
    default:
      return Feather;
  }
};

export default memo(AppIcon);
