import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
  performanceMonitor,
  startMeasure,
  endMeasure,
  measureAsync,
  measureSync,
} from '@/features/performance/utils/performanceMonitor';

const PerformanceTest: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setResults(prev => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const testPerformanceMonitor = () => {
    addResult('Bắt đầu test performance monitor...');

    // Test 1: Sử dụng trực tiếp performanceMonitor
    performanceMonitor.startMeasure('test1');
    setTimeout(() => {
      const duration = performanceMonitor.endMeasure('test1');
      addResult(`Test 1 duration: ${duration?.toFixed(2)}ms`);
    }, 100);

    // Test 2: Sử dụng utility functions
    startMeasure('test2');
    setTimeout(() => {
      const duration = endMeasure('test2');
      addResult(`Test 2 duration: ${duration?.toFixed(2)}ms`);
    }, 50);

    // Test 3: Sử dụng measureSync
    const syncResult = measureSync('test3', () => {
      // Simulate some work
      let sum = 0;
      for (let i = 0; i < 100000; i++) {
        sum += i;
      }
      return sum;
    });
    addResult(`Test 3 result: ${syncResult}`);

    // Test 4: Sử dụng measureAsync
    measureAsync('test4', async () => {
      await new Promise(resolve => setTimeout(() => resolve(undefined), 200));
      return 'async result';
    }).then(result => {
      addResult(`Test 4 result: ${result}`);
    });

    addResult('Performance monitor tests completed!');
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Performance Monitor Test</Text>

      <Button title="Run Tests" onPress={testPerformanceMonitor} />
      <Button title="Clear Results" onPress={clearResults} />

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Results:</Text>
        {results.map((result, index) => (
          <Text key={index} style={styles.resultText}>
            {result}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'monospace',
  },
});

export default PerformanceTest;
