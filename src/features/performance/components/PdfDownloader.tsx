import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {PdfUtils} from '@/shared/utils';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PdfDownloaderProps {
  url: string;
  fileName?: string;
  onDownloadComplete?: (localPath: string) => void;
  onDownloadError?: (error: any) => void;
  style?: any;
}

const PdfDownloader: React.FC<PdfDownloaderProps> = ({
  url,
  fileName,
  onDownloadComplete,
  onDownloadError,
  style,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  // Tạo tên file từ URL nếu không được cung cấp
  const getFileName = () => {
    if (fileName) return fileName;
    return PdfUtils.getFilenameFromUrl(url);
  };

  // Kiểm tra xem file đã tồn tại chưa
  const checkFileExists = async () => {
    try {
      const filePath = `${
        ReactNativeBlobUtil.fs.dirs.DocumentDir
      }/${getFileName()}`;
      return await PdfUtils.fileExists(filePath);
    } catch {
      return false;
    }
  };

  // Tải PDF với tiến trình
  const downloadPdf = async () => {
    try {
      setDownloading(true);
      setShowProgress(true);
      setProgress(0);

      // Kiểm tra file đã tồn tại
      const exists = await checkFileExists();
      if (exists) {
        Alert.alert(
          'File đã tồn tại',
          `File "${getFileName()}" đã được tải trước đó. Bạn có muốn tải lại không?`,
          [
            {text: 'Hủy', style: 'cancel'},
            {text: 'Tải lại', onPress: () => startDownload()},
          ],
        );
        setShowProgress(false);
        setDownloading(false);
        return;
      }

      await startDownload();
    } catch (error) {
      console.error('Lỗi khi tải PDF:', error);
      Alert.alert('Lỗi', 'Không thể tải PDF. Vui lòng thử lại.');
      onDownloadError?.(error);
    } finally {
      setDownloading(false);
      setShowProgress(false);
      setProgress(0);
    }
  };

  const startDownload = async () => {
    try {
      setProgress(10);

      // Tải file với progress
      const response = await ReactNativeBlobUtil.config({
        fileCache: true,
        appendExt: 'pdf',
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: getFileName(),
          description: 'Đang tải PDF...',
        },
      }).fetch('GET', url);

      setProgress(50);

      // Di chuyển file đến thư mục Documents
      const filePath = `${
        ReactNativeBlobUtil.fs.dirs.DocumentDir
      }/${getFileName()}`;
      const data = await ReactNativeBlobUtil.fs.readFile(
        response.path(),
        'base64',
      );
      await ReactNativeBlobUtil.fs.writeFile(filePath, data, 'base64');

      setProgress(100);

      // Thông báo thành công
      const localPath =
        ReactNativeBlobUtil.fs.dirs.DocumentDir === 'ios'
          ? filePath
          : `file://${filePath}`;

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
      onDownloadError?.(error);
    }
  };

  // Xem file đã tải
  const viewDownloadedFile = async () => {
    try {
      const filePath = `${
        ReactNativeBlobUtil.fs.dirs.DocumentDir
      }/${getFileName()}`;
      const exists = await PdfUtils.fileExists(filePath);

      if (exists) {
        const localPath =
          ReactNativeBlobUtil.fs.dirs.DocumentDir === 'ios'
            ? filePath
            : `file://${filePath}`;
        onDownloadComplete?.(localPath);
      } else {
        Alert.alert('Thông báo', 'File chưa được tải. Vui lòng tải trước.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể mở file.');
    }
  };

  // Xóa file đã tải
  const deleteDownloadedFile = async () => {
    try {
      const success = await PdfUtils.deletePdf(getFileName());
      if (success) {
        Alert.alert('Thành công', 'File đã được xóa.');
      } else {
        Alert.alert('Lỗi', 'Không thể xóa file.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể xóa file.');
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Nút tải PDF */}
      <TouchableOpacity
        style={[styles.downloadButton, downloading && styles.downloadingButton]}
        onPress={downloadPdf}
        disabled={downloading}>
        {downloading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Icon name="file-download" size={20} color="#fff" />
        )}
        <Text style={styles.downloadButtonText}>
          {downloading ? 'Đang tải...' : 'Tải PDF'}
        </Text>
      </TouchableOpacity>

      {/* Nút xem file đã tải */}
      <TouchableOpacity style={styles.viewButton} onPress={viewDownloadedFile}>
        <Icon name="visibility" size={20} color="#007AFF" />
        <Text style={styles.viewButtonText}>Xem file đã tải</Text>
      </TouchableOpacity>

      {/* Nút xóa file */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={deleteDownloadedFile}>
        <Icon name="delete" size={20} color="#ff3b30" />
        <Text style={styles.deleteButtonText}>Xóa file</Text>
      </TouchableOpacity>

      {/* Modal hiển thị tiến trình */}
      <Modal visible={showProgress} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đang tải PDF...</Text>
            <Text style={styles.modalSubtitle}>{getFileName()}</Text>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, {width: `${progress}%`}]} />
              </View>
              <Text style={styles.progressText}>{progress}%</Text>
            </View>

            <ActivityIndicator
              size="large"
              color="#007AFF"
              style={styles.modalSpinner}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  viewButton: {
    backgroundColor: '#f0f8ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  viewButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#fff5f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff3b30',
  },
  deleteButtonText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  modalSpinner: {
    marginTop: 10,
  },
});

export default PdfDownloader;
