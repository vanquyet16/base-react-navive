import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { PdfFileManager, PdfViewer } from '@/features/performance/components';

const PdfFileManagerScreen: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const handleFileSelect = (filePath: string) => {
    setSelectedPdf(filePath);
  };

  const handleClosePdf = () => {
    setSelectedPdf(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedPdf ? (
        <View style={styles.pdfContainer}>
          <PdfViewer
            uri={selectedPdf}
            onLoadComplete={(pages, filePath) => {
              console.log(`PDF loaded: ${pages} pages`);
            }}
            onError={error => {
              console.error('PDF error:', error);
            }}
            style={styles.pdfViewer}
          />
        </View>
      ) : (
        <PdfFileManager onFileSelect={handleFileSelect} style={styles.fileManager} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fileManager: {
    flex: 1,
  },
  pdfContainer: {
    flex: 1,
  },
  pdfViewer: {
    flex: 1,
  },
});

export default PdfFileManagerScreen;
