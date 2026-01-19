# 📱 Tải PDF vào Files app của iOS - Hướng dẫn

## 🎯 **Tổng quan**

Tính năng này sử dụng `react-native-document-picker` để cho phép người dùng chọn vị trí lưu file PDF trong **Files app** của iPhone, bao gồm cả iCloud Drive và thư mục local.

## 📂 **Vị trí lưu trữ có thể:**

### **iOS Files app:**

- **📁 iCloud Drive** - Lưu vào iCloud, đồng bộ với các thiết bị
- **📱 On My iPhone** - Lưu vào thư mục local của iPhone
- **📂 Downloads** - Thư mục Downloads của iPhone
- **📋 Documents** - Thư mục Documents của iPhone
- **☁️ Dropbox/Google Drive** - Nếu đã kết nối

## 🚀 **Cách sử dụng:**

### **PdfIosDownloader Component:**

```tsx
import PdfIosDownloader from '../../components/test/PdfIosDownloader';

<PdfIosDownloader
  url="https://example.com/document.pdf"
  fileName="my-document.pdf"
  onDownloadComplete={localPath => {
    console.log('PDF saved to iOS Files:', localPath);
    Alert.alert('Thành công', 'PDF đã được lưu vào Files app!');
  }}
  onDownloadError={error => {
    console.error('iOS Files download error:', error);
  }}
/>;
```

## 🔧 **Tính năng chi tiết:**

### **PdfIosDownloader Component:**

- ✅ **DocumentPicker** - Chọn vị trí lưu file
- ✅ **iOS-only** - Chỉ hoạt động trên iOS
- ✅ **Files app** - Lưu vào Files app của iPhone
- ✅ **iCloud support** - Hỗ trợ lưu vào iCloud Drive
- ✅ **Directory picker** - Chọn thư mục cụ thể
- ✅ **Auto-detect** - Tự động phát hiện iOS

### **Tính năng:**

- 📱 **iOS Files** - Lưu vào Files app của iPhone
- ☁️ **iCloud Drive** - Đồng bộ với iCloud
- 📂 **Directory picker** - Chọn thư mục cụ thể
- 🔄 **Auto-detect** - Tự động phát hiện platform
- 📁 **File Manager** - Hướng dẫn mở Files app

## 🎨 **Giao diện:**

### **iOS Info:**

- 📱 **iOS:** "Lưu vào Files app của iPhone"
- 📋 **Subtitle:** Mô tả tính năng DocumentPicker

### **Action Buttons:**

- 📥 **Tải và lưu vào Files** - Nút chính để tải và chọn vị trí
- 📂 **Chọn thư mục cụ thể** - Chọn thư mục để lưu

### **Info Card:**

- ℹ️ **Lưu ý** - Thông tin về Files app
- ☁️ **iCloud** - Hỗ trợ iCloud Drive
- 📱 **iOS only** - Chỉ khả dụng trên iOS

## 🔄 **Workflow:**

### **1. Tải file:**

- Người dùng nhấn "Tải và lưu vào Files"
- File được tải về thư mục app trước
- DocumentPicker mở để chọn vị trí lưu

### **2. Chọn vị trí:**

- DocumentPicker hiển thị Files app
- Người dùng chọn iCloud Drive, On My iPhone, etc.
- File được copy đến vị trí đã chọn

### **3. Thông báo thành công:**

- Hiển thị thông báo "Tải thành công"
- Tùy chọn "Mở Files"
- Hướng dẫn tìm file

### **4. Truy cập file:**

- Mở Files app của iPhone
- Tìm file trong thư mục đã chọn
- Mở file bằng ứng dụng PDF

## 📱 **Platform-specific:**

### **iOS:**

- **DocumentPicker** - Chọn vị trí lưu file
- **Files app** - Lưu vào Files app của iPhone
- **iCloud Drive** - Đồng bộ với iCloud
- **On My iPhone** - Lưu vào thư mục local

### **Android:**

- **Not supported** - Hiển thị thông báo không hỗ trợ
- **Fallback** - Sử dụng PdfPhoneDownloader thay thế

## 💡 **Mẹo sử dụng:**

### **1. Chọn vị trí lưu:**

- **iCloud Drive** - Để đồng bộ với các thiết bị
- **On My iPhone** - Để lưu local
- **Downloads** - Để dễ tìm thấy
- **Documents** - Để tổ chức file

### **2. Truy cập nhanh:**

- Sau khi lưu, nhấn "Mở Files"
- Làm theo hướng dẫn để tìm file
- Mở file bằng ứng dụng PDF

### **3. Quản lý file:**

- Tổ chức file theo thư mục
- Sử dụng iCloud để backup
- Xóa file cũ để tiết kiệm dung lượng

## 🛠 **Code mẫu:**

### **Tải và lưu vào Files:**

```tsx
const downloadAndSaveToFiles = async () => {
  try {
    setDownloading(true);

    // Tải file trước
    const localPath = await PdfUtils.downloadPdf(url, getFileName());
    const appFilePath = `${
      ReactNativeBlobUtil.fs.dirs.DocumentDir
    }/${getFileName()}`;
    const fileData = await ReactNativeBlobUtil.fs.readFile(
      appFilePath,
      'base64',
    );

    // Sử dụng DocumentPicker để chọn vị trí lưu
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

      Alert.alert('Thành công!', `PDF đã được lưu vào Files app`);
    }
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      console.log('User cancelled the picker');
    } else {
      Alert.alert('Lỗi', 'Không thể tải hoặc lưu PDF.');
    }
  } finally {
    setDownloading(false);
  }
};
```

### **Chọn thư mục:**

```tsx
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

    // Chọn thư mục
    const result = await DocumentPicker.pickDirectory();

    if (result) {
      const targetPath = `${result.uri}/${getFileName()}`;
      await ReactNativeBlobUtil.fs.writeFile(targetPath, fileData, 'base64');

      Alert.alert('Thành công!', `PDF đã được lưu vào thư mục đã chọn`);
    }
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      console.log('User cancelled directory picker');
    } else {
      Alert.alert('Lỗi', 'Không thể chọn thư mục.');
    }
  } finally {
    setSaving(false);
  }
};
```

## 📋 **Lưu ý quan trọng:**

### **1. Platform support:**

- ✅ **iOS 13+:** Hỗ trợ đầy đủ DocumentPicker
- ❌ **Android:** Không hỗ trợ, hiển thị thông báo
- ⚠️ **Permissions:** Cần quyền truy cập Files

### **2. iCloud storage:**

- ⚠️ **Storage limit:** Kiểm tra dung lượng iCloud
- ⚠️ **Sync time:** Có thể mất thời gian đồng bộ
- 💡 **Backup:** Tự động backup với iCloud

### **3. File management:**

- ⚠️ **File size:** PDF có thể lớn
- ⚠️ **Storage:** Kiểm tra dung lượng trước khi lưu
- 💡 **Organization:** Tổ chức file theo thư mục

## 🎉 **Kết quả:**

Tính năng này giúp người dùng:

- **📱 Tải PDF** vào Files app của iPhone
- **☁️ iCloud sync** - Đồng bộ với các thiết bị
- **📂 Choose location** - Chọn vị trí lưu file
- **💾 File management** - Quản lý file hiệu quả

File PDF giờ đã có thể lưu vào Files app và hiển thị trong ứng dụng Files của iPhone! 🚀
