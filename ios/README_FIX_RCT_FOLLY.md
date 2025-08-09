# 🔧 Fix Lỗi RCT-Folly trong React Native

## 🚨 Lỗi thường gặp

```
/Users/lovanquyet/Desktop/MyProject/Base/BaseReactNative/ios/Pods/Headers/Public/RCT-Folly/folly/Optional.h:667:10 'folly/experimental/coro/Coroutine.h' file not found
```

## 📋 Nguyên nhân

Lỗi này xảy ra khi có xung đột phiên bản giữa:

- `react-native-reanimated`
- `@react-navigation/drawer`
- `react-native-gesture-handler`
- Các thư viện khác sử dụng RCT-Folly

## 🛠️ Cách Fix

### 1. Cập nhật Podfile

Đã thêm các cấu hình sau vào `post_install`:

```ruby
# Fix cho lỗi RCT-Folly và react-native-reanimated
config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] ||= ['$(inherited)']
config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'FOLLY_NO_CONFIG=1'
config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'FOLLY_MOBILE=1'
config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'FOLLY_USE_LIBCPP=1'
config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'FOLLY_HAVE_CLOCK_GETTIME=1'
```

### 2. Clean Build

Chạy script clean build:

```bash
cd ios
./clean-build.sh
```

### 3. Cài đặt lại Pods

```bash
cd ios
pod install
```

### 4. Build lại project

```bash
npx react-native run-ios
```

## 🔍 Các bước chi tiết

1. **Xóa cache cũ:**

   ```bash
   rm -rf ~/Library/Developer/Xcode/DerivedData/*
   rm -rf ios/build
   rm -rf ios/Pods
   rm -rf ios/Podfile.lock
   ```

2. **Clean npm cache:**

   ```bash
   npm cache clean --force
   ```

3. **Clean metro cache:**

   ```bash
   npx react-native start --reset-cache
   ```

4. **Cài đặt lại pods:**
   ```bash
   cd ios
   pod install
   ```

## ✅ Kết quả mong đợi

- Lỗi RCT-Folly được fix hoàn toàn
- Project build thành công
- Drawer navigation hoạt động bình thường
- Reanimated animations chạy mượt mà

## 🚀 Lưu ý

- Đảm bảo sử dụng đúng phiên bản React Native (0.76.0)
- Kiểm tra compatibility giữa các thư viện
- Nếu vẫn gặp lỗi, thử downgrade `react-native-reanimated` xuống phiên bản 3.15.0
