import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PerformanceTest } from '@/features/performance/components';

const PerformanceDemoScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <PerformanceTest />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default PerformanceDemoScreen;
