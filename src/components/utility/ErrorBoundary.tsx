/**
 * ERROR BOUNDARY
 * ==============
 * Component bắt lỗi React và hiển thị UI fallback
 * Sử dụng theme system
 */

import React, { Component, ReactNode } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { CustomText } from '@/components/base/CustomText';

interface Props {
  children?: ReactNode;
  error?: Error;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Cập nhật state để hiển thị giao diện lỗi
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log lỗi để debug
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    const error = this.state.error || this.props.error;
    const hasError = this.state.hasError || !!this.props.error;

    if (hasError) {
      return (
        <View style={styles.container}>
          <CustomText variant="h3" style={styles.title}>
            Có lỗi xảy ra!
          </CustomText>
          <CustomText variant="body" style={styles.message}>
            {error?.message || 'Ứng dụng gặp phải một lỗi không mong muốn.'}
          </CustomText>
          <Pressable 
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.7 : 1 },
            ]} 
            onPress={this.handleRetry}
          >
            <CustomText variant="body" weight="bold" style={styles.buttonText}>
              Thử lại
            </CustomText>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    // fontSize, fontWeight replaced by variant="h3"
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    // fontSize replaced by variant="body"
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    // fontSize, fontWeight replaced by variant="body" + bold
  },
});

export default ErrorBoundary;
