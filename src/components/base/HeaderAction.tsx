import {
  StyleSheet,
  Text,
  TextStyle,
  Pressable,
  View,
  ViewStyle,
} from 'react-native';
import React, { useMemo } from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { layout } from '@/shared/theme/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppIcon from './AppIcon';
import { createStyles } from '@/shared/theme/create-styles';
import { useTheme } from '@/shared/theme/use-theme';
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
  const theme = useTheme();
  const styles = useStyles();

  // Memoize container style để tránh tạo object mới mỗi render
  const containerStyle = useMemo(
    () => ({
      height: layout.headerHeight + insets.top,
      paddingTop: insets.top,
    }),
    [insets.top],
  );

  // Memoize button style
  const buttonStyle = useMemo(
    () => [styles.iconButton, isTransparent && styles.transparentButton],
    [styles.iconButton, isTransparent, styles.transparentButton],
  );

  // Icon size
  const iconSize = moderateScale(20);

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
  theme => ({
    container: {
      height: layout.headerHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scale(16),
      // paddingBottom: moderateVerticalScale(8),
    },
    iconButton: {
      width: scale(30),
      height: scale(30),
      borderRadius: theme.radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: theme.colors.backgroundSecondary,
    },
    transparentButton: {
      backgroundColor: theme.colors.scrim, // Optional: slight scrim for better visibility
    },
    title: {
      flex: 1,
      textAlign: 'center',
      color: theme.colors.text,
      marginHorizontal: scale(16),
    },
  }),
  true,
);
