import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from '@ant-design/react-native';
import {COLORS} from '@/shared/constants';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});

export default LoadingScreen; 