import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {PdfUtils} from '@/shared/utils';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PdfFileManagerProps {
  onFileSelect?: (filePath: string) => void;
  style?: any;
}

const PdfFileManager: React.FC<PdfFileManagerProps> = ({
  onFileSelect,
  style,
}) => {
  const [files, setFiles] = useState<
    Array<{
      name: string;
      size: string;
      path: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Tải danh sách file
  const loadFiles = async () => {
    try {
      setLoading(true);
      const fileNames = await PdfUtils.getSavedPdfs();

      const fileList = await Promise.all(
        fileNames.map(async fileName => {
          const filePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;
          const size = await PdfUtils.getFileSize(filePath);
          return {
            name: fileName,
            size: PdfUtils.formatFileSize(size),
            path: filePath,
          };
        }),
      );

      setFiles(fileList);
    } catch (error) {
      console.error('Lỗi khi tải danh sách file:', error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh danh sách
  const refreshFiles = async () => {
    setRefreshing(true);
    await loadFiles();
    setRefreshing(false);
  };

  // Xóa file
  const deleteFile = async (fileName: string) => {
    Alert.alert('Xóa file', `Bạn có chắc muốn xóa "${fileName}"?`, [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          try {
            const success = await PdfUtils.deletePdf(fileName);
            if (success) {
              Alert.alert('Thành công', 'File đã được xóa.');
              await loadFiles(); // Refresh danh sách
            } else {
              Alert.alert('Lỗi', 'Không thể xóa file.');
            }
          } catch (error) {
            Alert.alert('Lỗi', 'Không thể xóa file.');
          }
        },
      },
    ]);
  };

  // Mở file
  const openFile = (filePath: string) => {
    const localPath =
      ReactNativeBlobUtil.fs.dirs.DocumentDir === 'ios'
        ? filePath
        : `file://${filePath}`;
    onFileSelect?.(localPath);
  };

  // Hiển thị thông tin thư mục
  const showDirectoryInfo = () => {
    const documentsDir = ReactNativeBlobUtil.fs.dirs.DocumentDir;
    Alert.alert(
      'Thông tin thư mục',
      `📁 Thư mục Documents:\n${documentsDir}\n\n📊 Tổng số file: ${
        files.length
      }\n\n💾 Dung lượng đã sử dụng: ${files
        .reduce((total, file) => {
          const sizeInBytes = parseInt(file.size.split(' ')[0]) * 1024; // Ước tính
          return total + sizeInBytes;
        }, 0)
        .toFixed(2)} KB`,
      [{text: 'OK'}],
    );
  };

  useEffect(() => {
    loadFiles();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Đang tải danh sách file...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📁 File PDF đã tải</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={showDirectoryInfo}>
            <Icon name="info" size={20} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.refreshButton} onPress={refreshFiles}>
            <Icon name="refresh" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Thông tin thư mục */}
      <View style={styles.directoryInfo}>
        <Text style={styles.directoryTitle}>📂 Thư mục lưu trữ:</Text>
        <Text style={styles.directoryPath}>
          {ReactNativeBlobUtil.fs.dirs.DocumentDir}
        </Text>
        <Text style={styles.fileCount}>📊 Tổng: {files.length} file PDF</Text>
      </View>

      {/* Danh sách file */}
      <ScrollView style={styles.fileList}>
        {files.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="folder-open" size={48} color="#ccc" />
            <Text style={styles.emptyText}>Chưa có file PDF nào</Text>
            <Text style={styles.emptySubtext}>
              Tải PDF từ màn hình chính để xem ở đây
            </Text>
          </View>
        ) : (
          files.map((file, index) => (
            <View key={index} style={styles.fileItem}>
              <View style={styles.fileInfo}>
                <Icon name="picture-as-pdf" size={24} color="#ff3b30" />
                <View style={styles.fileDetails}>
                  <Text style={styles.fileName}>{file.name}</Text>
                  <Text style={styles.fileSize}>📏 {file.size}</Text>
                </View>
              </View>

              <View style={styles.fileActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => openFile(file.path)}>
                  <Icon name="visibility" size={18} color="#007AFF" />
                  <Text style={styles.actionText}>Xem</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => deleteFile(file.name)}>
                  <Icon name="delete" size={18} color="#ff3b30" />
                  <Text style={[styles.actionText, styles.deleteText]}>
                    Xóa
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Tip: File PDF được lưu trong thư mục Documents của ứng dụng
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
  },
  infoButton: {
    padding: 8,
    marginRight: 8,
  },
  refreshButton: {
    padding: 8,
  },
  directoryInfo: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  directoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  directoryPath: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  fileCount: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  fileList: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
  },
  fileItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileDetails: {
    marginLeft: 12,
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: '#666',
  },
  fileActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
    backgroundColor: '#f0f8ff',
  },
  actionText: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#fff5f5',
  },
  deleteText: {
    color: '#ff3b30',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default PdfFileManager;
