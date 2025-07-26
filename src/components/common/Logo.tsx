import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '@/constants';

const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>RN</Text>
      </View>
      <Text style={styles.appName}>React Native Base</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  appName: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
  },
});

export default Logo; 