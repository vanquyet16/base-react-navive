#!/bin/sh
# ============================================================================
# ÁP CHÍNH SÁCH THEO MÔI TRƯỜNG VÀO APP iOS ĐÃ BUILD
# Chạy như một Run Script phase của target (sau khi Info.plist đã được xử lý).
#
# - Môi trường lấy từ ENVFILE (giống react-native-config): .env.dev / .env.staging / .env.prod.
# - staging/prod: bắt buộc URL https://, gỡ NSExceptionDomains (nếu có ngoại lệ HTTP cho dev).
# - Release của staging/prod: tắt thêm NSAllowsLocalNetworking.
#   → Info.plist trong repo có thể giữ cấu hình dev, bản phát hành luôn chỉ HTTPS.
# ============================================================================
set -eu

ENV_FILE_NAME="${ENVFILE:-.env}"
if [ -f /tmp/envfile ]; then
  ENV_FILE_NAME="$(cat /tmp/envfile)"
fi
ENV_PATH="${SRCROOT}/../${ENV_FILE_NAME}"

if [ ! -f "$ENV_PATH" ]; then
  echo "error: [env] Không tìm thấy file môi trường: $ENV_PATH"
  exit 1
fi

read_env() {
  grep -E "^${1}=" "$ENV_PATH" | tail -1 | cut -d= -f2- | tr -d "\"'" | tr -d '[:space:]'
}

APP_ENV="$(read_env APP_ENV)"
PLIST="${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"
echo "[env] ENVFILE=${ENV_FILE_NAME} APP_ENV=${APP_ENV} CONFIGURATION=${CONFIGURATION}"

case "$APP_ENV" in
  dev | staging | prod) ;;
  *)
    echo "error: [env] APP_ENV không hợp lệ: '${APP_ENV}'"
    exit 1
    ;;
esac

if [ "$APP_ENV" = "dev" ]; then
  exit 0
fi

for key in API_MAIN_URL API_AUTH_URL API_MANAGER_URL; do
  value="$(read_env "$key")"
  case "$value" in
    https://*) ;;
    *)
      echo "error: [env] ${key} phải là https:// ở môi trường ${APP_ENV} (hiện tại: '${value}')"
      exit 1
      ;;
  esac
done

/usr/libexec/PlistBuddy -c "Delete :NSAppTransportSecurity:NSExceptionDomains" "$PLIST" 2>/dev/null || true
if [ "$CONFIGURATION" = "Release" ]; then
  /usr/libexec/PlistBuddy -c "Set :NSAppTransportSecurity:NSAllowsLocalNetworking false" "$PLIST" 2>/dev/null || true
fi
echo "[env] Đã gỡ ngoại lệ HTTP khỏi Info.plist (${APP_ENV})"
