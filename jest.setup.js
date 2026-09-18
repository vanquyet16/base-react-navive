/* eslint-disable no-undef */
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

// 6. Mock React Native Toast Message
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

// 7. Mock React Native Vector Icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Feather', () => 'Icon');
jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');

// 8. Mock Safe Area Context
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaConsumer: ({ children }) => children(inset),
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => inset,
  };
});

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
