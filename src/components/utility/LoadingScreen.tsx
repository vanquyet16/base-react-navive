/**
 * LOADING SCREEN
 * ==============
 * Component hiển thị loading state
 * Sử dụng theme system thay vì COLORS deprecated
 */

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

const LoadingScreen: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
}));

export default LoadingScreen;
