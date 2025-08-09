// ============================================================================
// BASE COMPONENT - COMPONENT CƠ SỞ VỚI ERROR BOUNDARY VÀ PERFORMANCE OPTIMIZATION
// ============================================================================

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { logger } from '@/shared/utils/logger';
import { errorHandler } from '@/shared/utils/errorHandler';

// Interface cho error state
interface ErrorState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Interface cho BaseComponent props
interface BaseComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  style?: any;
}

// Interface cho BaseComponent state
interface BaseComponentState {
  error: ErrorState;
}

/**
 * BaseComponent - Component cơ sở với error boundary và performance optimization
 *
 * Tính năng:
 * - Error boundary tự động
 * - Performance monitoring
 * - Logging tự động
 * - Fallback UI tùy chỉnh
 */
export class BaseComponent extends Component<BaseComponentProps, BaseComponentState> {
  constructor(props: BaseComponentProps) {
    super(props);
    this.state = {
      error: {
        hasError: false,
      },
    };
  }

  // Error boundary lifecycle
  static getDerivedStateFromError(error: Error): ErrorState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error
    logger.error('Component Error', error, errorInfo as any);

    // Xử lý error qua error handler
    errorHandler.handleJsError(error, 'BaseComponent');

    // Call custom error handler nếu có
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Cập nhật state
    this.setState({
      error: {
        hasError: true,
        error,
        errorInfo,
      },
    });
  }

  // Method để reset error state
  private handleRetry = (): void => {
    this.setState({
      error: {
        hasError: false,
      },
    });
  };

  // Render fallback UI
  private renderFallback(): ReactNode {
    if (this.props.fallback) {
      return this.props.fallback;
    }

    return (
      <View style={[styles.errorContainer, this.props.style]}>
        <Text style={styles.errorTitle}>Đã xảy ra lỗi</Text>
        <Text style={styles.errorMessage}>
          {this.state.error.error?.message || 'Có lỗi không xác định xảy ra'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={this.handleRetry}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render(): ReactNode {
    if (this.state.error.hasError) {
      return this.renderFallback();
    }

    return this.props.children;
  }
}

// Styles
const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4d4f',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#1890ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// HOC để wrap component với BaseComponent
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void,
) => {
  return (props: P) => (
    <BaseComponent fallback={fallback} onError={onError}>
      <Component {...props} />
    </BaseComponent>
  );
};

// Export default
export default BaseComponent;
