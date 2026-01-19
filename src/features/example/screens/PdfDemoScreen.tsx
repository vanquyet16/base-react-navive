import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import PdfViewer from '@/features/performance/components/PdfViewer';
import PdfDownloader from '@/features/performance/components/PdfDownloader';
import PdfPhoneDownloader from '@/features/performance/components/PdfPhoneDownloader';
import PdfIosDownloader from '@/features/performance/components/PdfIosDownloader';

const PdfDemoScreen: React.FC = () => {
  const [currentPdf, setCurrentPdf] = useState<string | null>(null);
  const [pdfType, setPdfType] = useState<string>('');

  // Sample PDF URLs for testing
  const samplePdfs = {
    remote: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    sample1: 'https://www.africau.edu/images/default/sample.pdf',
    sample2:
      'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-download-10-mb.pdf',
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

  const loadPdf = (type: string, url: string) => {
    setCurrentPdf(url);
    setPdfType(type);
  };

  const clearPdf = () => {
    setCurrentPdf(null);
    setPdfType('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>PDF Viewer Demo</Text>
          <Text style={styles.subtitle}>Test different PDF sources and configurations</Text>
        </View>

        {!currentPdf ? (
          <View style={styles.buttonContainer}>
            <Text style={styles.sectionTitle}>Load Sample PDFs</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => loadPdf('Remote', samplePdfs.remote)}>
              <Text style={styles.buttonText}>Load Remote PDF (W3C)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => loadPdf('Remote', samplePdfs.sample1)}>
              <Text style={styles.buttonText}>Load Remote PDF (Sample 1)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => loadPdf('Remote', samplePdfs.sample2)}>
              <Text style={styles.buttonText}>Load Remote PDF (Sample 2)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Example of base64 PDF (you would replace this with actual base64 data)
                Alert.alert(
                  'Base64 PDF',
                  'This would load a PDF from base64 data. In a real app, you would provide the actual base64 string.',
                  [{ text: 'OK' }],
                );
              }}>
              <Text style={styles.buttonText}>Load Base64 PDF (Demo)</Text>
            </TouchableOpacity>

            {/* PDF Download Section */}
            <View style={styles.downloadSection}>
              <Text style={styles.sectionTitle}>Tải PDF về thiết bị</Text>
              <Text style={styles.sectionSubtitle}>
                Tải PDF từ internet và lưu vào thiết bị để xem offline
              </Text>

              <PdfDownloader
                url={samplePdfs.remote}
                fileName='w3c-dummy.pdf'
                onDownloadComplete={localPath => {
                  setCurrentPdf(localPath);
                  setPdfType('Local (Downloaded)');
                }}
                onDownloadError={error => {
                  console.error('Download error:', error);
                }}
              />

              <PdfDownloader
                url={samplePdfs.sample1}
                fileName='sample-document.pdf'
                onDownloadComplete={localPath => {
                  setCurrentPdf(localPath);
                  setPdfType('Local (Downloaded)');
                }}
                onDownloadError={error => {
                  console.error('Download error:', error);
                }}
              />
            </View>

            {/* Tải PDF về điện thoại */}
            <View style={styles.downloadSection}>
              <Text style={styles.sectionTitle}>📱 Tải PDF về điện thoại</Text>
              <Text style={styles.sectionSubtitle}>
                Tải PDF về thư mục Downloads/Documents của điện thoại để truy cập từ File Manager
              </Text>

              <PdfPhoneDownloader
                url={samplePdfs.remote}
                fileName='w3c-dummy-phone.pdf'
                onDownloadComplete={localPath => {
                  console.log('PDF downloaded to phone:', localPath);
                  Alert.alert('Thành công', 'PDF đã được tải về điện thoại!');
                }}
                onDownloadError={error => {
                  console.error('Phone download error:', error);
                }}
              />

              <PdfPhoneDownloader
                url={samplePdfs.sample1}
                fileName='sample-document-phone.pdf'
                onDownloadComplete={localPath => {
                  console.log('PDF downloaded to phone:', localPath);
                  Alert.alert('Thành công', 'PDF đã được tải về điện thoại!');
                }}
                onDownloadError={error => {
                  console.error('Phone download error:', error);
                }}
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Features:</Text>
              <Text style={styles.infoText}>• Remote PDF loading</Text>
              <Text style={styles.infoText}>• Base64 PDF support</Text>
              <Text style={styles.infoText}>• Local file support</Text>
              <Text style={styles.infoText}>• PDF Download & Management</Text>
              <Text style={styles.infoText}>• Page navigation</Text>
              <Text style={styles.infoText}>• Error handling</Text>
              <Text style={styles.infoText}>• Loading states</Text>
            </View>

            {/* Tải PDF vào Files app của iOS */}
            <View style={styles.downloadSection}>
              <Text style={styles.sectionTitle}>📱 Tải PDF vào Files app (iOS)</Text>
              <Text style={styles.sectionSubtitle}>
                Sử dụng DocumentPicker để lưu file vào Files app của iPhone
              </Text>

              <PdfIosDownloader
                url={samplePdfs.remote}
                fileName='w3c-dummy-ios.pdf'
                onDownloadComplete={localPath => {
                  console.log('PDF saved to iOS Files:', localPath);
                  Alert.alert('Thành công', 'PDF đã được lưu vào Files app!');
                }}
                onDownloadError={error => {
                  console.error('iOS Files download error:', error);
                }}
              />

              <PdfIosDownloader
                url={samplePdfs.sample1}
                fileName='sample-document-ios.pdf'
                onDownloadComplete={localPath => {
                  console.log('PDF saved to iOS Files:', localPath);
                  Alert.alert('Thành công', 'PDF đã được lưu vào Files app!');
                }}
                onDownloadError={error => {
                  console.error('iOS Files download error:', error);
                }}
              />
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
  buttonContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
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
  downloadSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
});

export default PdfDemoScreen;
