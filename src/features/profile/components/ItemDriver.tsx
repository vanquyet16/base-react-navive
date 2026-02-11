import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStyles } from '@/shared/theme/create-styles';
import { useTheme } from '@/shared/theme/use-theme';
import { CustomText } from '@/components';

interface ItemDriverProps {
  title: string;
  value: string;
}

export default function ItemDriver({ title, value }: ItemDriverProps) {
  const theme = useTheme();
  const styles = useStyles();
  return (
    <View style={styles.item}>
      <CustomText variant="label">{title}</CustomText>
      <CustomText variant="bodySmall">{value}</CustomText>
    </View>
  );
}

const useStyles = createStyles(
  theme => ({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[2],
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
      paddingVertical: theme.spacing[4],
    },
  }),
  true,
);
