#!/bin/bash

echo "🧹 Đang clean build iOS..."

# Xóa các thư mục build cũ
echo "📁 Xóa thư mục build cũ..."
rm -rf ~/Library/Developer/Xcode/DerivedData/*
rm -rf ios/build
rm -rf ios/Pods
rm -rf ios/Podfile.lock

# Clean npm cache
echo "📦 Clean npm cache..."
npm cache clean --force

# Clean metro cache
echo "🚇 Clean metro cache..."
npx react-native start --reset-cache &

# Cài đặt lại pods
echo "📱 Cài đặt lại pods..."
cd ios
pod install

echo "✅ Clean build hoàn tất! Bây giờ bạn có thể build lại project."
echo "💡 Chạy: npx react-native run-ios"
