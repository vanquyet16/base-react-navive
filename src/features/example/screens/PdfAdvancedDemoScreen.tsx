import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import PdfViewer from '@/features/performance/components/PdfViewer';
import { PdfUtils } from '@/shared/utils';
import ReactNativeBlobUtil from 'react-native-blob-util';

const PdfAdvancedDemoScreen: React.FC = () => {
  const [currentPdf, setCurrentPdf] = useState<string | null>(null);
  const [pdfType, setPdfType] = useState<string>('');
  const [downloading, setDownloading] = useState(false);
  const [savedPdfs, setSavedPdfs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [fileSizes, setFileSizes] = useState<{ [key: string]: string }>({});

  // Sample PDF URLs for testing
  const samplePdfs = {
    w3c: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    sample1: 'https://www.africau.edu/images/default/sample.pdf',
    sample2:
      'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-download-10-mb.pdf',
  };

  useEffect(() => {
    loadSavedPdfs();
  }, []);

  const loadSavedPdfs = async () => {
    try {
      const files = await PdfUtils.getSavedPdfs();
      setSavedPdfs(files);

      // Load file sizes
      const sizes: { [key: string]: string } = {};
      for (const fileName of files) {
        try {
          const filePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;
          const size = await PdfUtils.getFileSize(filePath);
          sizes[fileName] = PdfUtils.formatFileSize(size);
        } catch {
          sizes[fileName] = 'Unknown';
        }
      }
      setFileSizes(sizes);
    } catch (error) {
      console.error('Error loading saved PDFs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePdfLoad = (numberOfPages: number, filePath: string) => {
    Alert.alert('PDF Loaded Successfully', `Pages: ${numberOfPages}\nFile: ${filePath}`, [
      { text: 'OK' },
    ]);
  };

  const handlePdfError = (error: any) => {
    Alert.alert('PDF Error', error.message || 'Failed to load PDF', [{ text: 'OK' }]);
  };

  const handlePageChange = (page: number, numberOfPages: number) => {
    console.log(`Page ${page} of ${numberOfPages}`);
  };

  const downloadAndViewPdf = async (url: string, type: string) => {
    try {
      setDownloading(true);
      const fileName = PdfUtils.getFilenameFromUrl(url);

      Alert.alert('Download PDF', `Do you want to download "${fileName}" to your device?`, [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Download',
          onPress: async () => {
            try {
              const localPath = await PdfUtils.downloadPdf(url, fileName);
              setCurrentPdf(localPath);
              setPdfType(`${type} (Local)`);
              await loadSavedPdfs(); // Refresh saved PDFs list
              Alert.alert('Success', 'PDF downloaded and saved locally!');
            } catch (error) {
              Alert.alert('Error', 'Failed to download PDF');
            }
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to download PDF');
    } finally {
      setDownloading(false);
    }
  };

  const viewRemotePdf = (url: string, type: string) => {
    setCurrentPdf(url);
    setPdfType(type);
  };

  const viewLocalPdf = (fileName: string) => {
    const filePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;
    setCurrentPdf(filePath);
    setPdfType('Local');
  };

  const deleteLocalPdf = async (fileName: string) => {
    Alert.alert('Delete PDF', `Are you sure you want to delete "${fileName}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const success = await PdfUtils.deletePdf(fileName);
            if (success) {
              await loadSavedPdfs();
              Alert.alert('Success', 'PDF deleted successfully!');
            } else {
              Alert.alert('Error', 'Failed to delete PDF');
            }
          } catch (error) {
            Alert.alert('Error', 'Failed to delete PDF');
          }
        },
      },
    ]);
  };

  const clearPdf = () => {
    setCurrentPdf(null);
    setPdfType('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Advanced PDF Demo</Text>
          <Text style={styles.subtitle}>Test PDF downloading, local storage, and management</Text>
        </View>

        {!currentPdf ? (
          <View style={styles.content}>
            {/* Remote PDFs Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Remote PDFs</Text>
              <Text style={styles.sectionSubtitle}>
                View PDFs directly from URLs or download them
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => viewRemotePdf(samplePdfs.w3c, 'Remote (W3C)')}
                disabled={downloading}>
                <Text style={styles.buttonText}>View Remote PDF (W3C)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => downloadAndViewPdf(samplePdfs.w3c, 'Downloaded')}
                disabled={downloading}>
                <Text style={styles.buttonText}>
                  {downloading ? 'Downloading...' : 'Download W3C PDF'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => viewRemotePdf(samplePdfs.sample1, 'Remote (Sample 1)')}
                disabled={downloading}>
                <Text style={styles.buttonText}>View Remote PDF (Sample 1)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => downloadAndViewPdf(samplePdfs.sample1, 'Downloaded')}
                disabled={downloading}>
                <Text style={styles.buttonText}>
                  {downloading ? 'Downloading...' : 'Download Sample 1 PDF'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Local PDFs Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Local PDFs</Text>
              <Text style={styles.sectionSubtitle}>View PDFs saved on your device</Text>

              {loading ? (
                <ActivityIndicator size='small' color='#007AFF' />
              ) : savedPdfs.length > 0 ? (
                savedPdfs.map((fileName, index) => (
                  <View key={index} style={styles.localPdfItem}>
                    <View style={styles.localPdfInfo}>
                      <Text style={styles.localPdfName}>{fileName}</Text>
                      <Text style={styles.localPdfSize}>
                        Size: {fileSizes[fileName] || 'Loading...'}
                      </Text>
                    </View>
                    <View style={styles.localPdfActions}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => viewLocalPdf(fileName)}>
                        <Text style={styles.actionButtonText}>View</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => deleteLocalPdf(fileName)}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noPdfsText}>No PDFs saved locally</Text>
              )}
            </View>

            {/* Info Section */}
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Features:</Text>
              <Text style={styles.infoText}>• View remote PDFs</Text>
              <Text style={styles.infoText}>• Download PDFs to device</Text>
              <Text style={styles.infoText}>• Manage local PDFs</Text>
              <Text style={styles.infoText}>• File size information</Text>
              <Text style={styles.infoText}>• Delete local files</Text>
              <Text style={styles.infoText}>• Offline viewing</Text>
            </View>
          </View>
        ) : (
          <View style={styles.pdfContainer}>
            <View style={styles.pdfHeader}>
              <Text style={styles.pdfTitle}>{pdfType} PDF Viewer</Text>
              <TouchableOpacity style={styles.closeButton} onPress={clearPdf}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>

            <PdfViewer
              uri={currentPdf}
              onLoadComplete={handlePdfLoad}
              onError={handlePdfError}
              onPageChanged={handlePageChange}
              style={styles.pdfViewer}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  localPdfItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  localPdfInfo: {
    marginBottom: 12,
  },
  localPdfName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  localPdfSize: {
    fontSize: 14,
    color: '#666',
  },
  localPdfActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 0.48,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  noPdfsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  infoContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
  pdfContainer: {
    flex: 1,
  },
  pdfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  pdfTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  pdfViewer: {
    flex: 1,
  },
});

export default PdfAdvancedDemoScreen;
