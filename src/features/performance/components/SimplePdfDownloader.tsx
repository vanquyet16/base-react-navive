import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {PdfUtils} from '@/shared/utils';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SimplePdfDownloaderProps {
  url: string;
  fileName?: string;
  onDownloadComplete?: (localPath: string) => void;
  style?: any;
}

const SimplePdfDownloader: React.FC<SimplePdfDownloaderProps> = ({
  url,
  fileName,
  onDownloadComplete,
  style,
}) => {
  const [downloading, setDownloading] = useState(false);

  // Tạo tên file từ URL nếu không được cung cấp
  const getFileName = () => {
    if (fileName) return fileName;
    return PdfUtils.getFilenameFromUrl(url);
  };

  // Tải PDF
  const downloadPdf = async () => {
    try {
      setDownloading(true);

      // Kiểm tra file đã tồn tại
      const filePath = `${
        ReactNativeBlobUtil.fs.dirs.DocumentDir
      }/${getFileName()}`;
      const exists = await PdfUtils.fileExists(filePath);

      if (exists) {
        Alert.alert(
          'File đã tồn tại',
          `File "${getFileName()}" đã được tải trước đó.`,
          [
            {text: 'OK'},
            {
              text: 'Xem ngay',
              onPress: () => {
                const localPath =
                  ReactNativeBlobUtil.fs.dirs.DocumentDir === 'ios'
                    ? filePath
                    : `file://${filePath}`;
                onDownloadComplete?.(localPath);
              },
            },
          ],
        );
        setDownloading(false);
        return;
      }

      // Tải file mới
      const localPath = await PdfUtils.downloadPdf(url, getFileName());

      Alert.alert(
        'Tải thành công!',
        `PDF "${getFileName()}" đã được tải về thiết bị.`,
        [
          {
            text: 'Xem ngay',
            onPress: () => onDownloadComplete?.(localPath),
          },
          {text: 'OK'},
        ],
      );

      onDownloadComplete?.(localPath);
    } catch (error) {
      console.error('Lỗi khi tải PDF:', error);
      Alert.alert('Lỗi', 'Không thể tải PDF. Vui lòng kiểm tra kết nối mạng.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.downloadButton,
        downloading && styles.downloadingButton,
        style,
      ]}
      onPress={downloadPdf}
      disabled={downloading}>
      {downloading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Icon name="file-download" size={16} color="#fff" />
      )}
      <Text style={styles.downloadButtonText}>
        {downloading ? 'Đang tải...' : 'Tải PDF'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  downloadButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginVertical: 4,
  },
  downloadingButton: {
    backgroundColor: '#666',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});

export default SimplePdfDownloader;
