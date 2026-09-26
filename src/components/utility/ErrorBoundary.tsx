/**
 * ERROR BOUNDARY
 * ==============
 * - Bắt lỗi render của cây con và hiển thị màn hình dự phòng.
 * - Cũng dùng để hiển thị lỗi truyền vào (vd: lỗi khởi tạo) qua prop `error`.
 * - "Thử lại": reset boundary và gọi `onRetry` (nếu có) để chạy lại nguồn gây lỗi.
 *   Ẩn nút khi `canRetry=false` (vd: thiết bị bị chặn vì không an toàn).
 */

import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CustomText } from '@/components/base/CustomText';
import { lightTheme } from '@/shared/theme/theme';
import { logger } from '@/shared/utils/logger';

interface Props {
  children?: ReactNode;
  /** Lỗi từ bên ngoài (không phải lỗi render) */
  error?: Error | null;
  onRetry?: () => void;
  canRetry?: boolean;
  title?: string;
}

interface State {
  renderError: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { renderError: null };

  static getDerivedStateFromError(renderError: Error): State {
    return { renderError };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('[ErrorBoundary] Lỗi render', { error, componentStack: errorInfo.componentStack });
  }

  private handleRetry = () => {
    this.setState({ renderError: null });
    this.props.onRetry?.();
  };

  render() {
    const { children, error, canRetry = true, title = 'Có lỗi xảy ra!' } = this.props;
    const shownError = this.state.renderError ?? error ?? null;

    if (!shownError) {
      return children ?? null;
    }

    return (
      <View style={styles.container} accessibilityRole="alert">
        <CustomText variant="h3" style={styles.title}>
          {title}
        </CustomText>
        <CustomText variant="body" style={styles.message}>
          {shownError.message || 'Ứng dụng gặp phải một lỗi không mong muốn.'}
        </CustomText>
        {canRetry && (
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={this.handleRetry}
          >
            <CustomText variant="body" weight="bold" style={styles.buttonText}>
              Thử lại
            </CustomText>
          </Pressable>
        )}
      </View>
    );
  }
}

const { colors } = lightTheme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
  },
});

export default ErrorBoundary;
