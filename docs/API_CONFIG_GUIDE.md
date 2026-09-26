# Môi trường & Build (dev / staging / prod)

Môi trường được chọn bằng **build flavor**, không phải `__DEV__`. Vì vậy APK release vẫn có thể trỏ về server dev, và bản debug có thể chạy với cấu hình prod.

| Flavor | File env | applicationId | HTTP cleartext (bản release) | Keystore |
|---|---|---|---|---|
| `dev` | `.env.dev` | `com.basereactnative083.dev` | Chỉ IP nội bộ khai báo trong `src/dev/res/xml` | debug |
| `staging` | `.env.staging` | `com.basereactnative083.staging` | Không | release nếu có, không thì debug |
| `prod` | `.env.prod` | `com.basereactnative083` | Không | **Bắt buộc release** |

Mọi bản **debug** dùng `src/debug/res/xml/network_security_config.xml` (cho phép HTTP tới Metro và server dev).

Ba flavor có applicationId khác nhau nên cài song song được trên cùng một máy.

## Lệnh

```bash
npm run android:dev        # chạy debug + Metro, trỏ server dev
npm run apk:dev            # APK release trỏ server dev (gửi QA/tester nội bộ)
npm run apk:staging        # APK release, cấu hình bảo mật như prod, server staging
npm run apk:prod           # APK production (bị chặn nếu cấu hình bảo mật chưa đạt)
npm run aab:prod           # AAB để đưa lên Google Play
npm run verify             # typecheck + lint + test
```

APK nằm tại `android/app/build/outputs/apk/<flavor>/release/`.

> ⚠️ Mỗi lệnh gradle chỉ build **một** flavor. `react-native-config` chọn file `.env` theo tên task tại thời điểm cấu hình, nên `./gradlew assembleRelease` (build mọi flavor cùng lúc) sẽ nhúng sai env. Luôn dùng các script ở trên.

## Biến môi trường

| Biến | Ý nghĩa |
|---|---|
| `APP_ENV` | `dev` \| `staging` \| `prod`. Trên Android phải khớp flavor, nếu lệch app dừng ngay khi khởi động |
| `API_MAIN_URL`, `API_AUTH_URL`, `API_MANAGER_URL` | Base URL từng domain. Ngoài `dev` bắt buộc `https://` |
| `API_TIMEOUT_MS` | Timeout request (mặc định 15000) |

Tất cả được validate trong `src/shared/config/env.ts`. Cấu hình sai sẽ throw ngay lúc khởi động (fail fast).

> Mọi giá trị trong `.env.*` đều được nhúng vào APK và **có thể bị trích xuất**. Tuyệt đối không đặt secret (API key, client secret…) vào đây.

## Đổi IP server dev

1. Sửa URL trong `.env.dev` (và `.env`, dùng cho iOS/Jest).
2. Thêm IP vào `android/app/src/debug/res/xml/network_security_config.xml` (mọi bản debug, gồm cả Metro) và `android/app/src/dev/res/xml/network_security_config.xml` (bản release của flavor dev).
3. Build lại: file `.env` và XML đều được nhúng lúc build, reload Metro là chưa đủ.

Gợi ý URL dev:
- Android emulator gọi máy PC: `http://10.0.2.2:<port>/`
- Máy thật qua USB: `adb reverse tcp:40000 tcp:40000`, rồi dùng `http://localhost:40000/`

## Checklist trước khi phát hành prod

`verifyProdRelease` (trong `android/app/build.gradle`) tự chạy trước mọi build `prodRelease` và **chặn build** nếu:

- [ ] `.env.prod` thiếu `APP_ENV=prod` hoặc URL không phải `https://`
- [ ] Thiếu keystore release (`android/keystore.properties` hoặc biến môi trường `RELEASE_*`, xem `android/keystore.properties.example`)

## iOS

iOS đọc cùng bộ file `.env.*` qua biến `ENVFILE` lúc build.

```bash
npm run ios:dev              # Simulator, server dev
npm run ios:staging          # Simulator, server staging
npm run ios:prod             # bản Release, server prod
npm run archive:ios:prod     # tạo .xcarchive → Xcode Organizer → Distribute
```

Run Script **Apply Env Policy** (`ios/scripts/apply-env-policy.sh`) chạy trong mỗi lần build:

| Môi trường | Ngoại lệ HTTP (IP dev trong `NSExceptionDomains`) | `NSAllowsLocalNetworking` | URL bắt buộc https |
|---|---|---|---|
| dev | giữ (nếu có) | giữ | không |
| staging / prod | **gỡ khỏi app** | Release: **tắt** | có, sai thì **build fail** |

`Info.plist` trong repo vẫn giữ cấu hình dev, còn bản phát hành staging/prod luôn chỉ dùng HTTPS.

Lưu ý:
- **Build bằng nút Run trong Xcode** không có `ENVFILE`, nên sẽ dùng `.env` (= dev). Muốn build môi trường khác trong Xcode: *Product → Scheme → Edit Scheme → Build → Pre-actions*, thêm `echo ".env.prod" > /tmp/envfile`; sau đó xoá file này khi quay về dev. `react-native-config` ưu tiên `/tmp/envfile` hơn `ENVFILE`, nên nếu còn file này thì mọi lệnh `ios:*` sẽ dùng env ghi trong đó.
- Đổi môi trường cần build lại native. Reload Metro là chưa đủ.
- Khác Android, iOS hiện dùng **cùng bundle id** cho mọi môi trường, nên không cài song song được. Muốn tách thì tạo build configuration `Staging`/`Prod` trong Xcode, mỗi configuration có `PRODUCT_BUNDLE_IDENTIFIER` riêng.
- Sau khi cài dependency: `cd ios && pod install`.
