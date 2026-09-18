import {
  Pressable,
  View,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import React, { useMemo } from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppIcon from './AppIcon';
import { createStyles } from '@/shared/theme/create-styles';
import CustomText from './CustomText';

export interface IHeaderActionProps {
  isTransparent?: boolean;
  title?: string;
  titleStyle?: TextStyle;
  onIconRightPress?: () => void;
  onIconLeftPress?: () => void;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  styleContainer?: ViewStyle;
  styleIconButton?: ViewStyle;
}

const HeaderAction: React.FC<IHeaderActionProps> = React.memo(props => {
  const {
    isTransparent,
    title,
    titleStyle,
    onIconRightPress,
    onIconLeftPress,
    iconRight,
    iconLeft,
    styleContainer,
    styleIconButton,
  } = props;
  const insets = useSafeAreaInsets();
  const styles = useStyles();

  // Memoize container style để tránh tạo object mới mỗi render
  const containerStyle = useMemo(
    () => ({
      height: styles.rs.headerHeight + insets.top,
      paddingTop: insets.top,
    }),
    [insets.top, styles.rs.headerHeight],
  );

  // Memoize button style
  const buttonStyle = useMemo(
    () => [styles.iconButton, isTransparent && styles.transparentButton],
    [styles.iconButton, isTransparent, styles.transparentButton],
  );

  // Icon size
  const iconSize = styles.rs.scale(20);

  return (
    <View style={[styles.container, containerStyle, styleContainer]}>
      <Pressable
        style={({ pressed }) => [
          buttonStyle,
          styleIconButton,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={onIconLeftPress}
      >
        {iconLeft ? (
          iconLeft
        ) : (
          <AppIcon name="arrow-left" size={iconSize} color="white" />
        )}
      </Pressable>

      {!isTransparent && (
        <CustomText
          variant="h6"
          weight="bold"
          style={[styles.title, titleStyle]}
          numberOfLines={1}
        >
          {title}
        </CustomText>
      )}

      {iconRight ? (
        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={onIconRightPress}
        >
          {iconRight}
        </Pressable>
      ) : (
        <View style={styles.iconButton} />
      )}
    </View>
  );
});

// Set display name để debug dễ dàng
HeaderAction.displayName = 'HeaderAction';

export default HeaderAction;

const useStyles = createStyles(
  (theme, rs) => ({
    container: {
      height: rs.headerHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: rs.px(16),
    },
    iconButton: {
      width: rs.scale(30),
      height: rs.scale(30),
      borderRadius: 9999,
      alignItems: 'center',
      justifyContent: 'center',
    },
    transparentButton: {
      backgroundColor: theme.colors.scrim,
    },
    title: {
      flex: 1,
      textAlign: 'center',
      color: theme.colors.text,
      marginHorizontal: rs.mx(16),
    },
  }),
);
