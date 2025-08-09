# 🚀 Drawer Navigation - Hướng Dẫn Sử Dụng

## 📋 Tổng Quan

Drawer Navigation đã được tích hợp thành công vào ứng dụng React Native với các tính năng:

### **✅ Đã Hoàn Thành:**

- ✅ **Custom Drawer**: Giao diện drawer tùy chỉnh với header user info
- ✅ **Menu Items**: Danh sách các màn hình có thể điều hướng
- ✅ **Gesture Support**: Hỗ trợ vuốt để mở/đóng drawer
- ✅ **Animation**: Animation mượt mà với react-native-reanimated
- ✅ **Menu Button**: Button hamburger ở header để mở drawer
- ✅ **Logout Function**: Chức năng đăng xuất từ drawer

## 🎨 Giao Diện Drawer

### **Header Section:**

- Avatar người dùng
- Tên người dùng
- Email người dùng

### **Menu Items:**

- Trang chủ
- Quản lý sản phẩm
- Lazy Loading Demo
- API Demo
- Cache Demo
- PDF Demo
- Performance Demo
- Responsive Demo

### **Footer Section:**

- Button đăng xuất

## 🔧 Cách Sử Dụng

### **1. Mở Drawer:**

```typescript
// Từ bất kỳ màn hình nào, nhấn button menu (hamburger) ở header
// Hoặc vuốt từ cạnh trái sang phải
```

### **2. Điều Hướng:**

```typescript
// Nhấn vào menu item để điều hướng
// Drawer sẽ tự động đóng sau khi điều hướng
```

### **3. Đăng Xuất:**

```typescript
// Nhấn button "Đăng xuất" ở footer drawer
// Sẽ đăng xuất và chuyển về màn hình Auth
```

## 📁 Cấu Trúc Files

### **Drawer Navigator:**

```typescript
// src/navigation/DrawerNavigator.tsx
const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer props={props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 280,
          backgroundColor: COLORS.background,
        },
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.textSecondary,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
      }}>
      <Drawer.Screen
        name='MainStack'
        component={MainStack}
        options={{
          drawerLabel: 'Trang chủ',
        }}
      />
    </Drawer.Navigator>
  );
};
```

### **Custom Drawer:**

```typescript
// src/components/navigation/CustomDrawer.tsx
const CustomDrawer: React.FC<CustomDrawerProps> = ({ props }) => {
  const navigation = useNavigation();
  const { logout } = useAuthStore();

  const menuItems = [
    {
      label: 'Trang chủ',
      icon: 'home',
      onPress: () => {
        navigation.navigate('MainTabs' as never);
        props.navigation.closeDrawer();
      },
    },
    // ... các menu items khác
  ];

  return (
    <View style={styles.container}>
      {/* Header với user info */}
      {/* Menu items */}
      {/* Footer với logout button */}
    </View>
  );
};
```

## 🎨 Tùy Chỉnh

### **Thay Đổi Màu Sắc:**

```typescript
// Trong CustomDrawer.tsx
const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary, // Thay đổi màu header
  },
  menuText: {
    color: COLORS.text, // Thay đổi màu text menu
  },
});
```

### **Thay Đổi Kích Thước:**

```typescript
// Trong DrawerNavigator.tsx
drawerStyle: {
  width: 280, // Thay đổi chiều rộng drawer
  backgroundColor: COLORS.background,
},
```

### **Thêm Menu Items:**

```typescript
// Trong CustomDrawer.tsx
const menuItems = [
  // ... menu items hiện tại
  {
    label: 'Màn hình mới',
    icon: 'new-screen',
    onPress: () => {
      navigation.navigate('NewScreen' as never);
      props.navigation.closeDrawer();
    },
  },
];
```

## 🔄 Tích Hợp

### **Tự Động Hiển Thị:**

- Button menu (hamburger) tự động hiển thị ở header
- Có thể mở drawer bằng cách:
  - Nhấn button menu
  - Vuốt từ cạnh trái sang phải

### **Cấu Hình Button:**

```typescript
// Trong MainLayout.tsx
<CustomHeader {...headerProps} showMenu={true} onMenuPress={openDrawer} />
```

## 🚀 Gesture Support

### **Mở Drawer:**

- Vuốt từ cạnh trái sang phải
- Nhấn button menu

### **Đóng Drawer:**

- Vuốt từ phải sang trái
- Nhấn bên ngoài drawer
- Nhấn button menu

## 📱 Platform Support

### **iOS:**

- Hỗ trợ đầy đủ gesture
- Animation mượt mà
- Tương thích với SafeArea

### **Android:**

- Hỗ trợ đầy đủ gesture
- Back button tự động đóng drawer
- Material Design guidelines

## ⚡ Performance

### **1. Performance:**

- Sử dụng React.memo cho CustomDrawer
- Tối ưu re-render với useCallback
- Lazy load các màn hình

### **2. UX:**

- Animation mượt mà
- Feedback khi nhấn menu items
- Loading states khi cần thiết

### **3. Accessibility:**

- Hỗ trợ VoiceOver/TalkBack
- Keyboard navigation
- Screen reader friendly

## 🛠️ Troubleshooting

### **Drawer Không Mở:**

1. Kiểm tra `react-native-gesture-handler` đã được import
2. Kiểm tra `react-native-reanimated/plugin` trong babel config
3. Rebuild app sau khi thêm dependencies

### **Animation Không Mượt:**

1. Đảm bảo `react-native-reanimated` được cài đặt đúng
2. Kiểm tra version compatibility
3. Clear cache và rebuild

### **Gesture Không Hoạt Động:**

1. Kiểm tra `react-native-gesture-handler` setup
2. Đảm bảo import ở đầu index.js
3. Kiểm tra iOS/Android specific setup

## 🎉 Kết Quả

**Drawer Navigation đã được tích hợp thành công!**

Bây giờ bạn có thể:

- ✅ Mở drawer bằng button menu hoặc gesture
- ✅ Điều hướng giữa các màn hình dễ dàng
- ✅ Tùy chỉnh giao diện drawer
- ✅ Sử dụng gesture để mở/đóng drawer
- ✅ Đăng xuất từ drawer

**Drawer hoạt động mượt mà và responsive trên cả iOS và Android!** 🚀

