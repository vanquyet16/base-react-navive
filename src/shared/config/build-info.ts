/**
 * BUILD INFO CONFIGURATION
 * ========================
 * App version, build number từ native modules.
 * Fallback values nếu chưa có native module.
 * 
 * @senior-pattern Build info với graceful fallbacks
 */

import { Platform } from 'react-native';

/**
 * Build info interface
 */
interface BuildInfo {
    /** App name */
    appName: string;
    /** App version (e.g., 1.0.0) */
    version: string;
    /** Build number (e.g., 42) */
    buildNumber: string;
    /** Bundle ID / Package name */
    bundleId: string;
    /** Platform */
    platform: 'ios' | 'android';
    /** OS version */
    osVersion: string;
}

/**
 * Get build info
 * TODO: Integrate với react-native-device-info khi cần real device info
 */
const getBuildInfo = (): BuildInfo => {
    return {
        appName: 'React Native Base',
        version: '1.0.0',
        buildNumber: '1',
        bundleId: Platform.select({
            ios: 'com.reactnativebase.app',
            android: 'com.reactnativebase.app',
            default: 'com.reactnativebase.app',
        }),
        platform: Platform.OS === 'ios' ? 'ios' : 'android',
        osVersion: Platform.Version.toString(),
    };
};

/**
 * Exported build info
 */
export const BUILD_INFO = getBuildInfo();

/**
 * Helper để format version string
 * E.g., "1.0.0 (42)"
 */
export const getVersionString = (): string => {
    return `${BUILD_INFO.version} (${BUILD_INFO.buildNumber})`;
};

/**
 * Helper để check platform
 */
export const isIOS = (): boolean => BUILD_INFO.platform === 'ios';
export const isAndroid = (): boolean => BUILD_INFO.platform === 'android';
