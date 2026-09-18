import { View } from 'react-native';
import React from 'react';
import { createStyles } from '@/shared/theme/create-styles';
import CustomText from './CustomText';
import AppIcon from './AppIcon';

export interface LeverIdentityProps {
  lever: number;
}

const LeverIdentity = (props: LeverIdentityProps) => {
  const { lever } = props;
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <CustomText variant="h7">Định danh mức {lever}</CustomText>
      <AppIcon
        name="star-circle-outline"
        size={24}
        color={styles.theme.colors.primary}
        type="material"
      />
    </View>
  );
};

export default LeverIdentity;

const useStyles = createStyles((theme, rs) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    paddingHorizontal: rs.px(8),
    paddingVertical: rs.py(4),
    borderRadius: rs.radius(12),
    gap: rs.gap(4),
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}));
