import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {PdfUtils} from '@/shared/utils';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PdfIosDownloaderProps {
  url: string;
  fileName?: string;
  onDownloadComplete?: (localPath: string) => void;
  onDownloadError?: (error: any) => void;
  style?: any;
}

const PdfIosDownloader: React.FC<PdfIosDownloaderProps> = ({
  url,
  fileName,
  onDownloadComplete,
  onDownloadError,
  style,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Tạo tên file từ URL nếu không được cung cấp
  const getFileName = () => {
    if (fileName) return fileName;
    return PdfUtils.getFilenameFromUrl(url);
  };

  // Tải PDF và lưu vào Files app
  const downloadAndSaveToFiles = async () => {
    try {
      setDownloading(true);

      // Tải file trước
      const localPath = await PdfUtils.downloadPdf(url, getFileName());
      const appFilePath = `${
        ReactNativeBlobUtil.fs.dirs.DocumentDir
      }/${getFileName()}`;

      // Đọc file data
      const fileData = await ReactNativeBlobUtil.fs.readFile(
        appFilePath,
        'base64',
      );

      // Chỉ hiển thị trên iOS
      if (Platform.OS !== 'ios') {
        Alert.alert('Thông báo', 'Tính năng này chỉ khả dụng trên iOS');
        return;
      }

      // Thử sử dụng DocumentPicker
      try {
        const DocumentPicker = require('react-native-document-picker').default;

        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
          mode: 'open',
          allowMultiSelection: false,
          copyTo: 'cachesDirectory',
        });

        if (result && result.length > 0) {
          const selectedFile = result[0];

          // Lưu file vào vị trí được chọn
          await saveFileToLocation(fileData, selectedFile);

          Alert.alert(
            'Thành công!',
            `PDF "${getFileName()}" đã được lưu vào Files app`,
            [
              {
                text: 'Mở Files',
                onPress: () => openFilesApp(),
              },
              {text: 'OK'},
            ],
          );

          onDownloadComplete?.(selectedFile.fileCopyUri || '');
        }
      } catch (pickerError: any) {
        if (pickerError.code === 'E_PICKER_CANCELLED') {
          console.log('User cancelled the picker');
          Alert.alert('Thông báo', 'Đã hủy chọn vị trí lưu file');
        } else {
          console.error('DocumentPicker error:', pickerError);

          // Kiểm tra nếu là lỗi read-only (simulator)
          if (
            pickerError.message &&
            pickerError.message.includes('read only')
          ) {
            Alert.alert(
              'Lưu ý Simulator',
              'Trong iOS Simulator, một số thư mục có thể chỉ đọc. File đã được lưu vào Documents của app.',
              [
                {
                  text: 'Mở Files',
                  onPress: () => openFilesApp(),
                },
                {text: 'OK'},
              ],
            );
          } else {
            // Fallback: Lưu vào Documents của app
            await saveToAppDocuments(fileData);
            Alert.alert(
              'Thành công!',
              `PDF "${getFileName()}" đã được lưu vào Documents của app`,
              [
                {
                  text: 'Mở Files',
                  onPress: () => openFilesApp(),
                },
                {text: 'OK'},
              ],
            );
          }
          onDownloadComplete?.(appFilePath);
        }
      }
    } catch (error: any) {
      console.error('Lỗi khi tải/lưu PDF:', error);
      Alert.alert('Lỗi', 'Không thể tải hoặc lưu PDF. Vui lòng thử lại.');
      onDownloadError?.(error);
    } finally {
      setDownloading(false);
    }
  };

  // Lưu file vào Documents của app
  const saveToAppDocuments = async (fileData: string) => {
    try {
      const appFilePath = `${
        ReactNativeBlobUtil.fs.dirs.DocumentDir
      }/${getFileName()}`;
      await ReactNativeBlobUtil.fs.writeFile(appFilePath, fileData, 'base64');
    } catch (error) {
      console.error('Lỗi khi lưu file:', error);
      throw error;
    }
  };

  // Lưu file vào vị trí được chọn
  const saveFileToLocation = async (fileData: string, selectedFile: any) => {
    try {
      setSaving(true);

      // Tạo file tạm thời
      const tempPath = `${
        ReactNativeBlobUtil.fs.dirs.CacheDir
      }/${getFileName()}`;
      await ReactNativeBlobUtil.fs.writeFile(tempPath, fileData, 'base64');

      // Copy file đến vị trí được chọn
      if (selectedFile.fileCopyUri) {
        const targetPath = selectedFile.fileCopyUri.replace('file://', '');
        await ReactNativeBlobUtil.fs.writeFile(targetPath, fileData, 'base64');
      }
    } catch (error) {
      console.error('Lỗi khi lưu file:', error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  // Mở Files app
  const openFilesApp = () => {
    Alert.alert(
      'Mở Files App',
      '1. Mở ứng dụng Files trên iPhone\n2. Tìm file PDF vừa lưu\n3. File sẽ hiển thị trong thư mục bạn đã chọn',
      [
        {text: 'OK'},
        {
          text: 'Hướng dẫn chi tiết',
          onPress: () => {
            Alert.alert(
              'Hướng dẫn sử dụng Files',
              '• Mở ứng dụng Files\n• Chọn "Browse" ở dưới\n• Tìm thư mục bạn đã chọn\n• File PDF sẽ hiển thị ở đó\n• Tap để mở file',
            );
          },
        },
      ],
    );
  };

  // Chọn thư mục để lưu file
  const pickDirectory = async () => {
    try {
      setSaving(true);

      // Tải file trước
      const localPath = await PdfUtils.downloadPdf(url, getFileName());
      const appFilePath = `${
        ReactNativeBlobUtil.fs.dirs.DocumentDir
      }/${getFileName()}`;
      const fileData = await ReactNativeBlobUtil.fs.readFile(
        appFilePath,
        'base64',
      );

      // Thử sử dụng DocumentPicker
      try {
        const DocumentPicker = require('react-native-document-picker').default;

        const result = await DocumentPicker.pickDirectory();

        if (result) {
          const targetPath = `${result.uri}/${getFileName()}`;
          await ReactNativeBlobUtil.fs.writeFile(
            targetPath,
            fileData,
            'base64',
          );

          Alert.alert('Thành công!', `PDF đã được lưu vào thư mục đã chọn`, [
            {
              text: 'Mở Files',
              onPress: () => openFilesApp(),
            },
            {text: 'OK'},
          ]);

          onDownloadComplete?.(targetPath);
        }
      } catch (pickerError: any) {
        if (pickerError.code === 'E_PICKER_CANCELLED') {
          console.log('User cancelled directory picker');
          Alert.alert('Thông báo', 'Đã hủy chọn thư mục');
        } else {
          console.error('Directory picker error:', pickerError);

          // Kiểm tra nếu là lỗi read-only (simulator)
          if (
            pickerError.message &&
            pickerError.message.includes('read only')
          ) {
            Alert.alert(
              'Lưu ý Simulator',
              'Trong iOS Simulator, một số thư mục có thể chỉ đọc. File đã được lưu vào Documents của app.',
              [
                {
                  text: 'Mở Files',
                  onPress: () => openFilesApp(),
                },
                {text: 'OK'},
              ],
            );
          } else {
            // Fallback: Lưu vào Documents của app
            await saveToAppDocuments(fileData);
            Alert.alert(
              'Thành công!',
              `PDF "${getFileName()}" đã được lưu vào Documents của app`,
              [
                {
                  text: 'Mở Files',
                  onPress: () => openFilesApp(),
                },
                {text: 'OK'},
              ],
            );
          }
          onDownloadComplete?.(appFilePath);
        }
      }
    } catch (error: any) {
      console.error('Lỗi khi chọn thư mục:', error);
      Alert.alert('Lỗi', 'Không thể chọn thư mục. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  // Chỉ hiển thị trên iOS
  if (Platform.OS !== 'ios') {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.notSupported}>
          <Icon name="phone-iphone" size={24} color="#666" />
          <Text style={styles.notSupportedText}>
            Tính năng này chỉ khả dụng trên iOS
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {/* Thông tin iOS */}
      <View style={styles.iosInfo}>
        <Icon name="phone-iphone" size={24} color="#007AFF" />
        <View style={styles.iosInfoText}>
          <Text style={styles.iosInfoTitle}>
            📱 Lưu vào Files app của iPhone
          </Text>
          <Text style={styles.iosInfoSubtitle}>
            Chọn vị trí lưu file trong Files app (iCloud, On My iPhone, etc.)
          </Text>
        </View>
      </View>

      {/* Nút tải và lưu */}
      <TouchableOpacity
        style={[
          styles.downloadButton,
          (downloading || saving) && styles.downloadingButton,
        ]}
        onPress={downloadAndSaveToFiles}
        disabled={downloading || saving}>
        {downloading || saving ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Icon name="file-download" size={20} color="#fff" />
        )}
        <Text style={styles.downloadButtonText}>
          {downloading
            ? 'Đang tải...'
            : saving
            ? 'Đang lưu...'
            : 'Tải và lưu vào Files'}
        </Text>
      </TouchableOpacity>

      {/* Nút chọn thư mục */}
      <TouchableOpacity
        style={styles.pickDirectoryButton}
        onPress={pickDirectory}
        disabled={downloading || saving}>
        <Icon name="folder-open" size={20} color="#007AFF" />
        <Text style={styles.pickDirectoryButtonText}>Chọn thư mục cụ thể</Text>
      </TouchableOpacity>

      {/* Thông tin bổ sung */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>ℹ️ Lưu ý:</Text>
        <Text style={styles.infoText}>
          • File sẽ được lưu vào Files app của iPhone
        </Text>
        <Text style={styles.infoText}>
          • Có thể chọn iCloud Drive, On My iPhone, hoặc thư mục khác
        </Text>
        <Text style={styles.infoText}>
          • File sẽ hiển thị trong ứng dụng Files
        </Text>
        <Text style={styles.infoText}>
          • Có thể mở file bằng ứng dụng PDF khác
        </Text>
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
  notSupported: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  notSupportedText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
  },
  iosInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  iosInfoText: {
    marginLeft: 12,
    flex: 1,
  },
  iosInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  iosInfoSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  downloadButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
  },
  downloadingButton: {
    backgroundColor: '#666',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  pickDirectoryButton: {
    backgroundColor: '#f0f8ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  pickDirectoryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
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

export default PdfIosDownloader;
