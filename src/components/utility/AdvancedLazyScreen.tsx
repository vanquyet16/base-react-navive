/**
 * ADVANCED LAZY SCREEN
 * ====================
 * Advanced lazy loading với retry, error handling, và loading states
 * Sử dụng theme system
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/theme/use-theme';
import { createStyles } from '@/theme/create-styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AdvancedLazyScreenProps {
  component: () => Promise<{ default: React.ComponentType<any> }>;
  fallback?: React.ReactNode;
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onError?: (error: Error) => void;
  retryCount?: number;
}

const AdvancedLazyScreen: React.FC<AdvancedLazyScreenProps> = ({
  component,
  fallback,
  onLoadStart,
  onLoadComplete,
  onError,
  retryCount = 3,
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryAttempts, setRetryAttempts] = useState(0);

  const loadComponent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      onLoadStart?.();

      // Mô phỏng thời gian load component
      await new Promise(resolve => setTimeout(resolve, 1000));

      const module = await component();
      setComponent(() => module.default);
      onLoadComplete?.();
    } catch (err) {
      const error = err as Error;
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (retryAttempts < retryCount) {
      setRetryAttempts(prev => prev + 1);
      loadComponent();
    }
  };

  useEffect(() => {
    loadComponent();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        {fallback || (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Đang tải component...</Text>
            <Text style={styles.loadingSubtext}>
              Thời gian load: ~1 giây (mô phỏng)
            </Text>
          </View>
        )}
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name="error-outline" size={64} color={theme.colors.error} />
          <Text style={styles.errorTitle}>Lỗi tải component</Text>
          <Text style={styles.errorMessage}>{error.message}</Text>

          {retryAttempts < retryCount && (
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Icon name="refresh" size={20} color="#fff" />
              <Text style={styles.retryText}>
                Thử lại ({retryAttempts + 1}/{retryCount})
              </Text>
            </TouchableOpacity>
          )}

          <Text style={styles.errorSubtext}>
            Lazy loading giúp tối ưu performance bằng cách chỉ load component
            khi cần thiết
          </Text>
        </View>
      </View>
    );
  }

  // Render component
  if (Component) {
    return <Component />;
  }

  return null;
};

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
}));

export default AdvancedLazyScreen;
