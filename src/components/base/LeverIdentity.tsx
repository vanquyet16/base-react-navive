import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStyles } from '@/shared/theme/create-styles';
import { useTheme } from '@/shared/theme/use-theme';
import CustomText from './CustomText';
import AppIcon from './AppIcon';

export interface LeverIdentityProps {
  lever: number;
}

const LeverIdentity = (props: LeverIdentityProps) => {
  const { lever } = props;
  const theme = useTheme();
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <CustomText variant="h7">Định danh mức {lever}</CustomText>
      <AppIcon
        name="star-circle-outline"
        size={24}
        color={theme.colors.primary}
        type="material"
      />
    </View>
  );
};

export default LeverIdentity;

const useStyles = createStyles(theme => {
  return {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      paddingHorizontal: theme.spacing[2],
      paddingVertical: theme.spacing[1],
      borderRadius: theme.radius['lg'],
      gap: theme.spacing[1],
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  };
}, true);
