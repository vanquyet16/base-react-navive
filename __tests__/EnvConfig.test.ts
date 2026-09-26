type Env = Record<string, string | undefined>;

const BASE: Env = {
  APP_ENV: 'prod',
  API_MAIN_URL: 'https://api.example.vn',
  API_AUTH_URL: 'https://auth.example.vn/',
  API_MANAGER_URL: 'https://manager.example.vn/',
};

const loadEnv = (overrides: Env = {}) => {
  jest.resetModules();
  jest.doMock('react-native-config', () => ({ __esModule: true, default: { ...BASE, ...overrides } }));
  return require('@/shared/config/env') as typeof import('@/shared/config/env');
};

describe('Env config', () => {
  afterEach(() => jest.dontMock('react-native-config'));

  it('đọc URL theo flavor và chuẩn hoá dấu / cuối', () => {
    const { API_URLS, ENV } = loadEnv();
    expect(ENV.APP_ENV).toBe('prod');
    expect(API_URLS.MAIN).toBe('https://api.example.vn/');
  });

  it('chặn http:// ở môi trường không phải dev', () => {
    expect(() => loadEnv({ APP_ENV: 'staging', API_MAIN_URL: 'http://10.0.0.1/' })).toThrow(/https/);
  });

  it('cho phép http:// ở dev', () => {
    const { API_URLS } = loadEnv({ APP_ENV: 'dev', API_MAIN_URL: 'http://172.20.20.175:40000/' });
    expect(API_URLS.MAIN).toBe('http://172.20.20.175:40000/');
  });

  it('APP_ENV không hợp lệ → dừng ngay', () => {
    expect(() => loadEnv({ APP_ENV: 'production' })).toThrow(/APP_ENV/);
  });

  it('flavor Android lệch APP_ENV (nhúng nhầm .env) → dừng ngay', () => {
    expect(() => loadEnv({ FLAVOR: 'dev' })).toThrow(/Flavor/);
  });

  it('thiếu URL → báo lỗi rõ ràng', () => {
    expect(() => loadEnv({ API_AUTH_URL: undefined })).toThrow(/API_AUTH_URL/);
  });
});
