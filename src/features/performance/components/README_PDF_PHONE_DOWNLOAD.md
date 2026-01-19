# 📱 Tải PDF về điện thoại - Hướng dẫn

## 🎯 **Tổng quan**

Tính năng này cho phép tải PDF trực tiếp về thư mục **Downloads** (Android) hoặc **Documents** (iOS) của điện thoại, giúp người dùng có thể truy cập file từ File Manager của điện thoại.

## 📂 **Vị trí lưu trữ:**

### **iOS:**

```
/var/mobile/Containers/Data/Application/[app-id]/Documents/
```

- File được lưu trong thư mục Documents của điện thoại
- Có thể truy cập từ ứng dụng Files

### **Android:**

```
/storage/emulated/0/Download/
```

- File được lưu trong thư mục Downloads của điện thoại
- Có thể truy cập từ File Manager

## 🚀 **Cách sử dụng:**

### **PdfPhoneDownloader Component:**

```tsx
import PdfPhoneDownloader from '../../components/PdfPhoneDownloader';

<PdfPhoneDownloader
  url="https://example.com/document.pdf"
  fileName="my-document.pdf"
  onDownloadComplete={localPath => {
    console.log('PDF downloaded to phone:', localPath);
    Alert.alert('Thành công', 'PDF đã được tải về điện thoại!');
  }}
  onDownloadError={error => {
    console.error('Download error:', error);
  }}
/>;
```

## 🔧 **Tính năng chi tiết:**

### **PdfPhoneDownloader Component:**

- ✅ **Tải về điện thoại** - Lưu vào Downloads/Documents
- ✅ **Platform-specific** - Tự động chọn thư mục phù hợp
- ✅ **Share file** - Chia sẻ file qua email, cloud
- ✅ **Thông tin đích** - Hiển thị thư mục lưu trữ
- ✅ **Hướng dẫn** - Mở File Manager sau khi tải

### **Tính năng:**

- 📱 **iOS:** Lưu vào Documents của iPhone
- 🤖 **Android:** Lưu vào Downloads của Android
- 🔄 **Auto-detect:** Tự động phát hiện platform
- 📁 **File Manager:** Hướng dẫn mở File Manager
- 📤 **Share:** Chia sẻ file qua các ứng dụng

## 🎨 **Giao diện:**

### **Destination Info:**

- 📱 **iOS:** "Lưu vào Documents của iPhone"
- 🤖 **Android:** "Lưu vào Downloads của Android"
- 📋 **Subtitle:** Mô tả thư mục lưu trữ

### **Action Buttons:**

- 📥 **Tải về điện thoại** - Nút chính để tải file
- 📤 **Share file** - Chia sẻ file qua ứng dụng khác

### **Info Card:**

- ℹ️ **Lưu ý** - Thông tin về vị trí lưu trữ
- 📁 **File Manager** - Cách truy cập từ File Manager
- 📤 **Share** - Cách chia sẻ file

## 🔄 **Workflow:**

### **1. Tải file:**

- Người dùng nhấn "Tải về điện thoại"
- File được tải về thư mục app trước
- Sau đó copy sang thư mục điện thoại

### **2. Thông báo thành công:**

- Hiển thị thông báo "Tải thành công"
- Tùy chọn "Mở File Manager"
- Hướng dẫn tìm file

### **3. Truy cập file:**

- Mở File Manager của điện thoại
- Tìm file trong thư mục Downloads/Documents
- Mở file bằng ứng dụng PDF

## 📱 **Platform-specific:**

### **iOS:**

- **Thư mục đích:** Documents của iPhone
- **Truy cập:** Ứng dụng Files
- **Đường dẫn:** On My iPhone > Documents

### **Android:**

- **Thư mục đích:** Downloads
- **Truy cập:** File Manager
- **Đường dẫn:** Internal Storage > Downloads

## 💡 **Mẹo sử dụng:**

### **1. Share file:**

- Sử dụng nút "Share file"
- Chọn ứng dụng để chia sẻ
- Gửi qua email, cloud, messaging

### **2. Truy cập nhanh:**

- Sau khi tải, nhấn "Mở File Manager"
- Làm theo hướng dẫn để tìm file
- Mở file bằng ứng dụng PDF

### **3. Quản lý file:**

- Xóa file cũ để tiết kiệm dung lượng
- Tổ chức file theo thư mục
- Backup file quan trọng

## 🛠 **Code mẫu:**

### **Tải về điện thoại:**

```tsx
const downloadToPhone = async () => {
  try {
    setDownloading(true);

    let targetPath: string;
    let successMessage: string;

    if (Platform.OS === 'ios') {
      targetPath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;
      successMessage = `PDF đã được lưu vào Documents của điện thoại`;
    } else {
      targetPath = `${ReactNativeBlobUtil.fs.dirs.DownloadDir}/${fileName}`;
      successMessage = `PDF đã được lưu vào Downloads của điện thoại`;
    }

    // Tải và copy file
    const localPath = await PdfUtils.downloadPdf(url, fileName);
    const appFilePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;
    const data = await ReactNativeBlobUtil.fs.readFile(appFilePath, 'base64');
    await ReactNativeBlobUtil.fs.writeFile(targetPath, data, 'base64');

    Alert.alert('Tải thành công!', successMessage);
  } catch (error) {
    Alert.alert('Lỗi', 'Không thể tải PDF về điện thoại.');
  } finally {
    setDownloading(false);
  }
};
```

### **Share file:**

```tsx
const shareFile = async () => {
  try {
    const localPath = await PdfUtils.downloadPdf(url, fileName);
    const appFilePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;

    await Share.share({
      url: Platform.OS === 'ios' ? appFilePath : `file://${appFilePath}`,
      title: fileName,
      message: `PDF: ${fileName}`,
    });
  } catch (error) {
    Alert.alert('Lỗi', 'Không thể share file.');
  }
};
```

## 📋 **Lưu ý quan trọng:**

### **1. Quyền truy cập:**

- ✅ **iOS:** Cần quyền truy cập Documents
- ✅ **Android:** Cần quyền truy cập Storage
- ⚠️ **Permissions:** Có thể cần cấp quyền thủ công

### **2. Dung lượng:**

- ⚠️ **File size:** PDF có thể lớn
- ⚠️ **Storage:** Kiểm tra dung lượng trước khi tải
- 💡 **Cleanup:** Xóa file cũ để tiết kiệm dung lượng

### **3. Tương thích:**

- ✅ **iOS 13+:** Hỗ trợ đầy đủ
- ✅ **Android 6+:** Hỗ trợ đầy đủ
- ⚠️ **Older versions:** Có thể cần cấu hình thêm

## 🎉 **Kết quả:**

Tính năng này giúp người dùng:

- **📱 Tải PDF** về thư mục điện thoại
- **📁 Truy cập** từ File Manager
- **📤 Chia sẻ** file dễ dàng
- **💾 Quản lý** file hiệu quả

File PDF giờ đã có thể truy cập trực tiếp từ File Manager của điện thoại! 🚀
