# 📁 Vị trí lưu trữ File PDF

## 🎯 **Tổng quan**

Khi tải PDF từ internet, file sẽ được lưu vào thư mục **Documents** của ứng dụng trên thiết bị. Đây là thư mục riêng tư của ứng dụng, không thể truy cập từ bên ngoài.

## 📂 **Đường dẫn lưu trữ:**

### **iOS Simulator:**

```
/Users/[username]/Library/Developer/CoreSimulator/Devices/[device-id]/data/Containers/Data/Application/[app-id]/Documents/
```

### **iOS Device:**

```
/var/mobile/Containers/Data/Application/[app-id]/Documents/
```

### **Android:**

```
/storage/emulated/0/Android/data/[package-name]/files/Documents/
```

## 🔍 **Cách kiểm tra file đã tải:**

### **1. Sử dụng PdfFileManager Component**

```tsx
import PdfFileManager from '../../components/PdfFileManager';

<PdfFileManager
  onFileSelect={filePath => {
    console.log('Selected file:', filePath);
    // Mở file trong PdfViewer
  }}
/>;
```

### **2. Sử dụng PdfUtils**

```tsx
import {PdfUtils} from '../../utils';

// Lấy danh sách file đã tải
const savedFiles = await PdfUtils.getSavedPdfs();
console.log('Saved files:', savedFiles);

// Kiểm tra file tồn tại
const filePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/document.pdf`;
const exists = await PdfUtils.fileExists(filePath);
console.log('File exists:', exists);

// Lấy kích thước file
const size = await PdfUtils.getFileSize(filePath);
console.log('File size:', PdfUtils.formatFileSize(size));
```

## 📱 **Tính năng quản lý file:**

### **PdfFileManager Component:**

- ✅ **Hiển thị danh sách** - Tất cả file PDF đã tải
- ✅ **Thông tin chi tiết** - Tên file, kích thước
- ✅ **Nút xem file** - Mở file trong PdfViewer
- ✅ **Nút xóa file** - Xóa file không cần thiết
- ✅ **Refresh danh sách** - Cập nhật danh sách file
- ✅ **Thông tin thư mục** - Đường dẫn lưu trữ

### **Thông tin hiển thị:**

- 📁 **Thư mục Documents** - Đường dẫn đầy đủ
- 📊 **Tổng số file** - Số lượng file PDF
- 💾 **Dung lượng sử dụng** - Tổng dung lượng file
- 📏 **Kích thước từng file** - KB, MB, GB

## 🛠 **Cách truy cập:**

### **1. Từ HomeScreen:**

- Nhấn nút "Quản lý PDF"
- Xem danh sách file đã tải
- Chọn file để xem hoặc xóa

### **2. Từ PdfDemoScreen:**

- Section "Tải PDF về thiết bị"
- Tải file mới và xem ngay
- Quản lý file local

### **3. Từ PdfAdvancedDemoScreen:**

- Quản lý file nâng cao
- Hiển thị thông tin chi tiết
- Xóa file theo từng file

## 🔧 **Code mẫu:**

### **Lấy đường dẫn thư mục:**

```tsx
import ReactNativeBlobUtil from 'react-native-blob-util';

const documentsDir = ReactNativeBlobUtil.fs.dirs.DocumentDir;
console.log('Documents directory:', documentsDir);
```

### **Tạo đường dẫn file:**

```tsx
const fileName = 'document.pdf';
const filePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;
```

### **Kiểm tra file tồn tại:**

```tsx
const exists = await PdfUtils.fileExists(filePath);
if (exists) {
  console.log('File exists at:', filePath);
}
```

### **Lấy thông tin file:**

```tsx
const size = await PdfUtils.getFileSize(filePath);
const formattedSize = PdfUtils.formatFileSize(size);
console.log('File size:', formattedSize);
```

## 📋 **Lưu ý quan trọng:**

### **1. Bảo mật:**

- ✅ File được lưu trong thư mục riêng tư của ứng dụng
- ✅ Không thể truy cập từ ứng dụng khác
- ✅ Tự động xóa khi gỡ cài đặt ứng dụng

### **2. Dung lượng:**

- ⚠️ File PDF có thể chiếm nhiều dung lượng
- ⚠️ Nên xóa file không cần thiết
- ⚠️ Kiểm tra dung lượng trước khi tải

### **3. Tương thích:**

- ✅ Hoạt động trên iOS và Android
- ✅ Tự động tạo thư mục nếu chưa có
- ✅ Xử lý lỗi khi thư mục không tồn tại

## 🎨 **Giao diện quản lý:**

### **PdfFileManager Screen:**

- 📁 **Header** - Tiêu đề và nút refresh
- 📂 **Thông tin thư mục** - Đường dẫn và số file
- 📄 **Danh sách file** - Tên, kích thước, nút tác vụ
- 💡 **Footer** - Tip về vị trí lưu trữ

### **Tính năng:**

- 🔄 **Refresh** - Cập nhật danh sách
- ℹ️ **Info** - Xem thông tin thư mục
- 👁️ **View** - Xem file trong PdfViewer
- 🗑️ **Delete** - Xóa file

## 🔄 **Workflow sử dụng:**

1. **Tải PDF** → File lưu vào Documents
2. **Quản lý file** → Xem danh sách trong PdfFileManager
3. **Xem file** → Mở trong PdfViewer
4. **Xóa file** → Giải phóng dung lượng

## 📊 **Thống kê:**

- 📁 **Thư mục:** Documents của ứng dụng
- 📄 **Định dạng:** Chỉ file .pdf
- 🔒 **Bảo mật:** Thư mục riêng tư
- 🗂️ **Quản lý:** Tự động tạo/xóa thư mục

## 🎉 **Kết luận:**

File PDF được lưu an toàn trong thư mục Documents của ứng dụng, có thể quản lý dễ dàng thông qua các component đã tạo. Người dùng có thể xem, xóa và quản lý file một cách trực quan.
