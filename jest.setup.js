/**
 * JEST SETUP CONFIGURATION
 * ========================
 * Mock các native modules cho môi trường kiểm thử Jest.
 */

// 1. Mock Worklets (Cần thiết cho Reanimated v4 / Worklets v0.7+)
jest.mock('react-native-worklets', () => {
  try {
    return require('react-native-worklets/lib/module/mock');
  } catch {
    return {
      createWorkletRuntime: jest.fn(),
      runOnRuntime: jest.fn(fn => fn),
      scheduleOnRuntime: jest.fn(fn => fn()),
    };
  }
});

// 2. Mock Gesture Handler
require('react-native-gesture-handler/jestSetup');

// 3. Mock Reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// 4. Mock React Native BootSplash
jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn().mockResolvedValue(true),
  isVisible: jest.fn().mockResolvedValue(false),
  useHideAnimation: jest.fn().mockReturnValue({ container: {}, logo: {}, brand: {} }),
}));

// 5. Mock React Native MMKV
jest.mock('react-native-mmkv', () => {
  const storageMap = new Map();
  return {
    MMKV: jest.fn().mockImplementation(() => ({
      getString: jest.fn((key) => storageMap.get(key) ?? null),
      set: jest.fn((key, value) => storageMap.set(key, value)),
      delete: jest.fn((key) => storageMap.delete(key)),
      clearAll: jest.fn(() => storageMap.clear()),
    })),
  };
});

// 6. Mock Fast Image (native view)
jest.mock('@d11/react-native-fast-image', () => {
  const { Image } = require('react-native');
  const FastImage = props => require('react').createElement(Image, props);
  FastImage.resizeMode = { contain: 'contain', cover: 'cover', stretch: 'stretch', center: 'center' };
  FastImage.priority = { low: 'low', normal: 'normal', high: 'high' };
  FastImage.preload = jest.fn();
  return { __esModule: true, default: FastImage };
});

// 7. Mock React Native Vector Icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Feather', () => 'Icon');
jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');

// 8. Mock Safe Area Context — mock chính thức (đủ SafeAreaInsetsContext cho React Navigation)
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

// 9. Mock React Native Blob Util
jest.mock('react-native-blob-util', () => ({
  fs: {
    dirs: {
      DocumentDir: '/documents',
      CacheDir: '/cache',
      DownloadDir: '/downloads',
    },
    exists: jest.fn().mockResolvedValue(true),
    writeFile: jest.fn().mockResolvedValue(true),
    unlink: jest.fn().mockResolvedValue(true),
  },
  config: jest.fn().mockReturnThis(),
  fetch: jest.fn().mockResolvedValue({
    info: () => ({ status: 200 }),
    path: () => '/path/to/file',
  }),
}));

// 10. Mock React Native Device Info
jest.mock('react-native-device-info', () => {
  return require('react-native-device-info/jest/react-native-device-info-mock');
});
