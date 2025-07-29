import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
  Share,
} from 'react-native';
import {PdfUtils} from '../../utils';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PdfPhoneDownloaderProps {
  url: string;
  fileName?: string;
  onDownloadComplete?: (localPath: string) => void;
  onDownloadError?: (error: any) => void;
  style?: any;
}

const PdfPhoneDownloader: React.FC<PdfPhoneDownloaderProps> = ({
  url,
  fileName,
  onDownloadComplete,
  onDownloadError,
  style,
}) => {
  const [downloading, setDownloading] = useState(false);

  // Tạo tên file từ URL nếu không được cung cấp
  const getFileName = () => {
    if (fileName) return fileName;
    return PdfUtils.getFilenameFromUrl(url);
  };

  // Tải PDF về thư mục Downloads của điện thoại
  const downloadToPhone = async () => {
    try {
      setDownloading(true);

      let targetPath: string;
      let successMessage: string;

      if (Platform.OS === 'ios') {
        // iOS: Lưu vào Documents của điện thoại
        targetPath = `${
          ReactNativeBlobUtil.fs.dirs.DocumentDir
        }/${getFileName()}`;
        successMessage = `PDF đã được lưu vào Documents của điện thoại`;
      } else {
        // Android: Lưu vào Downloads
        targetPath = `${
          ReactNativeBlobUtil.fs.dirs.DownloadDir
        }/${getFileName()}`;
        successMessage = `PDF đã được lưu vào Downloads của điện thoại`;
      }

      // Tải file
      const localPath = await PdfUtils.downloadPdf(url, getFileName());

      // Copy file từ Documents của app sang thư mục điện thoại
      const appFilePath = `${
        ReactNativeBlobUtil.fs.dirs.DocumentDir
      }/${getFileName()}`;
      const data = await ReactNativeBlobUtil.fs.readFile(appFilePath, 'base64');
      await ReactNativeBlobUtil.fs.writeFile(targetPath, data, 'base64');

      Alert.alert('Tải thành công!', successMessage, [
        {
          text: 'Mở File Manager',
          onPress: () => openFileManager(),
        },
        {text: 'OK'},
      ]);

      onDownloadComplete?.(targetPath);
    } catch (error) {
      console.error('Lỗi khi tải PDF:', error);
      Alert.alert('Lỗi', 'Không thể tải PDF về điện thoại. Vui lòng thử lại.');
      onDownloadError?.(error);
    } finally {
      setDownloading(false);
    }
  };

  // Mở File Manager
  const openFileManager = () => {
    if (Platform.OS === 'ios') {
      // Mở Files app trên iOS
      Alert.alert(
        'Mở Files App',
        'Vui lòng mở ứng dụng Files và tìm file trong thư mục Documents',
        [
          {text: 'OK'},
          {
            text: 'Mở Files',
            onPress: () => {
              // iOS không thể mở Files app trực tiếp
              Alert.alert(
                'Hướng dẫn',
                '1. Mở ứng dụng Files\n2. Chọn "On My iPhone"\n3. Tìm file PDF vừa tải',
              );
            },
          },
        ],
      );
    } else {
      // Mở File Manager trên Android
      Alert.alert(
        'Mở File Manager',
        'Vui lòng mở File Manager và tìm file trong thư mục Downloads',
        [
          {text: 'OK'},
          {
            text: 'Mở Downloads',
            onPress: () => {
              // Có thể mở Downloads folder trên Android
              Alert.alert(
                'Hướng dẫn',
                '1. Mở File Manager\n2. Chọn "Downloads"\n3. Tìm file PDF vừa tải',
              );
            },
          },
        ],
      );
    }
  };

  // Share file
  const shareFile = async () => {
    try {
      setDownloading(true);

      // Tải file trước
      const localPath = await PdfUtils.downloadPdf(url, getFileName());
      const appFilePath = `${
        ReactNativeBlobUtil.fs.dirs.DocumentDir
      }/${getFileName()}`;

      // Share file
      await Share.share({
        url: Platform.OS === 'ios' ? appFilePath : `file://${appFilePath}`,
        title: getFileName(),
        message: `PDF: ${getFileName()}`,
      });
    } catch (error) {
      console.error('Lỗi khi share file:', error);
      Alert.alert('Lỗi', 'Không thể share file. Vui lòng thử lại.');
    } finally {
      setDownloading(false);
    }
  };

  // Hiển thị thông tin thư mục đích
  const getDestinationInfo = () => {
    if (Platform.OS === 'ios') {
      return {
        title: '📱 Lưu vào Documents của iPhone',
        subtitle: 'File sẽ được lưu trong thư mục Documents của điện thoại',
        icon: 'phone-iphone',
      };
    } else {
      return {
        title: '🤖 Lưu vào Downloads của Android',
        subtitle: 'File sẽ được lưu trong thư mục Downloads của điện thoại',
        icon: 'android',
      };
    }
  };

  const destinationInfo = getDestinationInfo();

  return (
    <View style={[styles.container, style]}>
      {/* Thông tin thư mục đích */}
      <View style={styles.destinationInfo}>
        <Icon name={destinationInfo.icon} size={24} color="#007AFF" />
        <View style={styles.destinationText}>
          <Text style={styles.destinationTitle}>{destinationInfo.title}</Text>
          <Text style={styles.destinationSubtitle}>
            {destinationInfo.subtitle}
          </Text>
        </View>
      </View>

      {/* Nút tải về điện thoại */}
      <TouchableOpacity
        style={[styles.downloadButton, downloading && styles.downloadingButton]}
        onPress={downloadToPhone}
        disabled={downloading}>
        {downloading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Icon name="file-download" size={20} color="#fff" />
        )}
        <Text style={styles.downloadButtonText}>
          {downloading ? 'Đang tải...' : 'Tải về điện thoại'}
        </Text>
      </TouchableOpacity>

      {/* Nút share file */}
      <TouchableOpacity
        style={styles.shareButton}
        onPress={shareFile}
        disabled={downloading}>
        <Icon name="share" size={20} color="#007AFF" />
        <Text style={styles.shareButtonText}>Share file</Text>
      </TouchableOpacity>

      {/* Thông tin bổ sung */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>ℹ️ Lưu ý:</Text>
        <Text style={styles.infoText}>
          • File sẽ được lưu trong thư mục{' '}
          {Platform.OS === 'ios' ? 'Documents' : 'Downloads'} của điện thoại
        </Text>
        <Text style={styles.infoText}>
          • Có thể truy cập từ File Manager của điện thoại
        </Text>
        <Text style={styles.infoText}>
          • Sử dụng "Share" để gửi file qua email hoặc cloud
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  destinationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  destinationText: {
    marginLeft: 12,
    flex: 1,
  },
  destinationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  destinationSubtitle: {
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
  shareButton: {
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
  shareButtonText: {
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

export default PdfPhoneDownloader;
