import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MediaUploadButton } from '@/components/base';
import { moderateVerticalScale, scale } from 'react-native-size-matters';

/**
 * MediaUploadExample
 * ===================
 * Ví dụ sử dụng MediaUploadButton với 3 loại khác nhau
 */
const handleTakePhoto = () => {
  console.log('Chụp ảnh');
  // TODO: Implement camera logic
  // Ví dụ: sử dụng react-native-image-picker
};

const handleRecordVideo = () => {
  console.log('Quay video');
  // TODO: Implement video recording logic
};

const handlePickFile = () => {
  console.log('Chọn file');
  // TODO: Implement file picker logic
  // Ví dụ: sử dụng react-native-document-picker
};

export const MediaUploadExample = () => {

  return (
    <View style={styles.container}>
      {/* Row 1: Photo và Video */}
      <View style={styles.row}>
        <MediaUploadButton type="photo" onPress={handleTakePhoto} />
        <View style={styles.spacing} />
        <MediaUploadButton type="video" onPress={handleRecordVideo} />
      </View>

      {/* Row 2: File upload */}
      <MediaUploadButton type="file" onPress={handlePickFile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale(16),
  },
  row: {
    flexDirection: 'row',
    marginBottom: moderateVerticalScale(12),
  },
  spacing: {
    width: scale(12),
  },
});

export default MediaUploadExample;
