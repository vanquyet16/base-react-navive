/**
 * BUILD INFO
 * ==========
 * Thông tin phiên bản lấy từ native (versionName/versionCode, bundle id) — không hardcode.
 */

import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { ENV } from './env';

export const BUILD_INFO = {
    appName: DeviceInfo.getApplicationName(),
    version: DeviceInfo.getVersion(),
    buildNumber: DeviceInfo.getBuildNumber(),
    bundleId: DeviceInfo.getBundleId(),
    platform: Platform.OS,
    appEnv: ENV.APP_ENV,
} as const;

/** Ví dụ: "1.0.0 (42) · staging" — môi trường prod không hiển thị hậu tố */
export const getVersionString = (): string => {
    const base = `${BUILD_INFO.version} (${BUILD_INFO.buildNumber})`;
    return ENV.IS_PROD ? base : `${base} · ${BUILD_INFO.appEnv}`;
};
