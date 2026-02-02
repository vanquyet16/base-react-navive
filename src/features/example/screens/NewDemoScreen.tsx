// src/screens/example/NewDemoScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

/**
 * NewDemoScreen - Màn hình demo mới
 *
 * Chức năng:
 * - Hiển thị nội dung demo mới
 * - Test navigation và layout
 */
const NewDemoScreen: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Demo Màn Hình Mới</Text>
      <Text style={styles.subtitle}>
        Chúc mừng! Bạn đã thêm thành công một màn hình mới vào hệ thống
        navigation.
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>📋 Thông tin:</Text>
        <Text style={styles.infoText}>• Màn hình này được tạo từ config</Text>
        <Text style={styles.infoText}>
          • Sử dụng LazyScreen để tối ưu performance
        </Text>
        <Text style={styles.infoText}>• Có header với menu button</Text>
        <Text style={styles.infoText}>• Có thể navigate từ bất kỳ đâu</Text>
      </View>

      <View style={styles.stepsContainer}>
        <Text style={styles.stepsTitle}>🔧 Các bước đã thực hiện:</Text>
        <Text style={styles.stepsText}>1. Tạo file screen component</Text>
        <Text style={styles.stepsText}>2. Thêm vào navigation config</Text>
        <Text style={styles.stepsText}>3. Cập nhật types (nếu cần)</Text>
        <Text style={styles.stepsText}>4. Test navigation</Text>
      </View>
    </View>
  );
};

const useStyles = createStyles(
  theme => ({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: theme.colors.primary,
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 30,
      color: theme.colors.textSecondary,
      lineHeight: 24,
    },
    infoContainer: {
      backgroundColor: theme.colors.backgroundSecondary,
      padding: 20,
      borderRadius: 12,
      marginBottom: 20,
    },
    infoTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
      color: theme.colors.text,
    },
    infoText: {
      fontSize: 14,
      marginBottom: 5,
      color: theme.colors.textSecondary,
    },
    stepsContainer: {
      backgroundColor: theme.colors.backgroundSecondary,
      padding: 20,
      borderRadius: 12,
    },
    stepsTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
      color: theme.colors.text,
    },
    stepsText: {
      fontSize: 14,
      marginBottom: 5,
      color: theme.colors.textSecondary,
    },
  }),
  true,
);

export default NewDemoScreen;
