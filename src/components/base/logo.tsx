/**
 * LOGO COMPONENT
 * ==============
 * Component hiển thị logo app
 * Sử dụng theme system
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/theme/use-theme';
import { createStyles } from '@/theme/create-styles';

const Logo: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>RN</Text>
      </View>
      <Text style={styles.appName}>React Native Base</Text>
    </View>
  );
};

const useStyles = createStyles(theme => ({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  appName: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.text,
  },
}));

export default Logo;
