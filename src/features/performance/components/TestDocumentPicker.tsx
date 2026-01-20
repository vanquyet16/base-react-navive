import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

const TestDocumentPicker: React.FC = () => {
  const [testing, setTesting] = useState(false);

  const testDocumentPicker = async () => {
    try {
      setTesting(true);

      if (Platform.OS !== 'ios') {
        Alert.alert('Thông báo', 'Tính năng này chỉ khả dụng trên iOS');
        return;
      }

      // Thử import DocumentPicker
      let DocumentPicker;
      try {
        DocumentPicker = require('@react-native-documents/picker').default;
        console.log('DocumentPicker imported successfully');
      } catch (importError) {
        console.error('Error importing DocumentPicker:', importError);
        Alert.alert('Lỗi', 'Không thể import DocumentPicker');
        return;
      }

      // Thử sử dụng DocumentPicker
      try {
        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
          mode: 'open',
          allowMultiSelection: false,
        });

        console.log('DocumentPicker result:', result);
        Alert.alert('Thành công!', 'DocumentPicker hoạt động bình thường');
      } catch (pickerError: any) {
        console.error('DocumentPicker error:', pickerError);

        if (pickerError.code === 'E_PICKER_CANCELLED') {
          Alert.alert('Thông báo', 'Người dùng đã hủy chọn file');
        } else if (
          pickerError.message &&
          pickerError.message.includes('read only')
        ) {
          Alert.alert(
            'Lưu ý Simulator',
            'Trong iOS Simulator, một số thư mục có thể chỉ đọc. Đây là hành vi bình thường.',
          );
        } else {
          Alert.alert(
            'Lỗi',
            `DocumentPicker error: ${pickerError.message || pickerError}`,
          );
        }
      }
    } catch (error: any) {
      console.error('Test error:', error);
      Alert.alert('Lỗi', `Test error: ${error.message || error}`);
    } finally {
      setTesting(false);
    }
  };

  const testDirectoryPicker = async () => {
    try {
      setTesting(true);

      if (Platform.OS !== 'ios') {
        Alert.alert('Thông báo', 'Tính năng này chỉ khả dụng trên iOS');
        return;
      }

      // Thử import DocumentPicker
      let DocumentPicker;
      try {
        DocumentPicker = require('@react-native-documents/picker').default;
        console.log('DocumentPicker imported successfully');
      } catch (importError) {
        console.error('Error importing DocumentPicker:', importError);
        Alert.alert('Lỗi', 'Không thể import DocumentPicker');
        return;
      }

      // Thử sử dụng Directory Picker
      try {
        const result = await DocumentPicker.pickDirectory();

        console.log('Directory picker result:', result);
        Alert.alert('Thành công!', 'Directory picker hoạt động bình thường');
      } catch (pickerError: any) {
        console.error('Directory picker error:', pickerError);

        if (pickerError.code === 'E_PICKER_CANCELLED') {
          Alert.alert('Thông báo', 'Người dùng đã hủy chọn thư mục');
        } else if (
          pickerError.message &&
          pickerError.message.includes('read only')
        ) {
          Alert.alert(
            'Lưu ý Simulator',
            'Trong iOS Simulator, một số thư mục có thể chỉ đọc. Đây là hành vi bình thường.',
          );
        } else {
          Alert.alert(
            'Lỗi',
            `Directory picker error: ${pickerError.message || pickerError}`,
          );
        }
      }
    } catch (error: any) {
      console.error('Test error:', error);
      Alert.alert('Lỗi', `Test error: ${error.message || error}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧪 Test DocumentPicker</Text>
      <Text style={styles.subtitle}>
        Kiểm tra xem @react-native-documents/picker có hoạt động không
      </Text>

      <TouchableOpacity
        style={[styles.testButton, testing && styles.testingButton]}
        onPress={testDocumentPicker}
        disabled={testing}
      >
        <Text style={styles.testButtonText}>
          {testing ? 'Đang test...' : 'Test File Picker'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.testButton, testing && styles.testingButton]}
        onPress={testDirectoryPicker}
        disabled={testing}
      >
        <Text style={styles.testButtonText}>
          {testing ? 'Đang test...' : 'Test Directory Picker'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>ℹ️ Thông tin test:</Text>
        <Text style={styles.infoText}>• Kiểm tra import DocumentPicker</Text>
        <Text style={styles.infoText}>• Test file picker functionality</Text>
        <Text style={styles.infoText}>
          • Test directory picker functionality
        </Text>
        <Text style={styles.infoText}>• Xem console logs để debug</Text>
        <Text style={styles.infoText}>
          • Trong Simulator, một số thư mục có thể chỉ đọc
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  testButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  testingButton: {
    backgroundColor: '#666',
  },
  testButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

export default TestDocumentPicker;
