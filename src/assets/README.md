# Assets Directory

## 📁 Cấu trúc

```
assets/
├── images/       # Ảnh PNG, JPG, WebP
│   ├── logo.png
│   ├── logo@2x.png
│   └── logo@3x.png
│
├── icons/        # SVG Icons
│   └── custom icons ở đây
│
└── fonts/        # Custom fonts
    └── custom fonts ở đây
```

## 🖼️ Images (PNG/JPG/WebP)

### Quy ước đặt tên:

- `filename.png` - Base resolution (1x)
- `filename@2x.png` - Retina displays (2x)
- `filename@3x.png` - High-res displays (3x)

### Import:

```typescript
const logo = require('@/assets/images/logo.png');
<Image source={logo} />;
```

## 🎨 Icons (SVG)

### Install react-native-svg:

```bash
yarn add react-native-svg
cd ios && pod install && cd ..
```

### Sử dụng:

```typescript
import HomeIcon from '@/assets/icons/HomeIcon';
<HomeIcon size={24} color="#000" />;
```

## ✅ TODO

- [ ] Thêm logo.png, logo@2x.png, logo@3x.png
- [ ] Thêm các SVG icons cần thiết
- [ ] Optimize tất cả ảnh trước khi commit (TinyPNG, Squoosh)

---

Chi tiết xem: `/artifacts/assets_guide.md`
