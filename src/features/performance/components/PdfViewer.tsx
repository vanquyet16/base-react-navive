import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  Alert,
  Platform,
} from 'react-native';
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';

interface PdfViewerProps {
  uri?: string;
  base64?: string;
  fileName?: string;
  onLoadComplete?: (numberOfPages: number, filePath: string) => void;
  onError?: (error: any) => void;
  onPageChanged?: (page: number, numberOfPages: number) => void;
  style?: any;
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  uri,
  base64,
  fileName = 'document.pdf',
  onLoadComplete,
  onError,
  onPageChanged,
  style,
}) => {
  const [pdfSource, setPdfSource] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const setupPdfSource = async () => {
      try {
        setLoading(true);
        setError(null);

        let source: any;

        if (base64) {
          // Handle base64 PDF
          const filePath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${fileName}`;

          await ReactNativeBlobUtil.fs.writeFile(filePath, base64, 'base64');

          source = {
            uri: `file://${filePath}`,
            cache: true,
          };
        } else if (uri) {
          // Handle remote or local URI
          if (uri.startsWith('http://') || uri.startsWith('https://')) {
            // Remote PDF
            source = {
              uri,
              cache: true,
            };
          } else {
            // Local file
            source = {
              uri: Platform.OS === 'ios' ? uri : `file://${uri}`,
              cache: true,
            };
          }
        } else {
          throw new Error('Either uri or base64 must be provided');
        }

        setPdfSource(source);
      } catch (err: any) {
        setError(err.message || 'Failed to load PDF');
        onError?.(err);
      } finally {
        setLoading(false);
      }
    };

    setupPdfSource();
  }, [uri, base64, fileName, onError]);

  const handleLoadComplete = (numberOfPages: number, filePath: string) => {
    onLoadComplete?.(numberOfPages, filePath);
  };

  const handleError = (error: any) => {
    setError(error.message || 'Error loading PDF');
    onError?.(error);
  };

  const handlePageChanged = (page: number, numberOfPages: number) => {
    onPageChanged?.(page, numberOfPages);
  };

  if (loading) {
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading PDF...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!pdfSource) {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.errorText}>No PDF source provided</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Pdf
        source={pdfSource}
        style={styles.pdf}
        onLoadComplete={handleLoadComplete}
        onError={handleError}
        onPageChanged={handlePageChanged}
        enablePaging={true}
        horizontal={false}
        enableAnnotationRendering={true}
        enableAntialiasing={true}
        trustAllCerts={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PdfViewer;
