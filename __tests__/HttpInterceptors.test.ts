import axios, { AxiosError, type AxiosAdapter, type InternalAxiosRequestConfig } from 'axios';
import { configureHttpAuth, registerInterceptors, type HttpAuthBridge } from '@/shared/services/http/axios-interceptors';
import { AppHttpError } from '@/shared/services/http/http-error';

type Handler = (config: InternalAxiosRequestConfig) => { status: number; data?: unknown };

/** Adapter giả lập server: trả status theo handler, 4xx/5xx → AxiosError như axios thật */
const createClient = (handler: Handler) => {
  // Chụp lại header tại thời điểm gửi (config bị tái sử dụng khi retry)
  const calls: Array<{ url?: string; authorization: string | null }> = [];
  const adapter: AxiosAdapter = async config => {
    calls.push({ url: config.url, authorization: (config.headers.get('Authorization') as string) ?? null });
    const { status, data = {} } = handler(config);
    const response = { status, data, headers: {}, statusText: '', config };
    if (status >= 400) {
      throw new AxiosError('fail', undefined, config, undefined, response);
    }
    return response;
  };
  const instance = axios.create({ adapter, baseURL: 'https://api.test/' });
  registerInterceptors(instance);
  return { instance, calls };
};

const createBridge = (overrides: Partial<HttpAuthBridge> = {}) => {
  let token = 'old-token';
  const bridge: HttpAuthBridge = {
    getAccessToken: () => token,
    isAccessTokenExpired: () => false,
    refreshAccessToken: jest.fn(async () => {
      await new Promise<void>(resolve => setTimeout(resolve, 5));
      token = 'new-token';
      return token;
    }),
    onSessionExpired: jest.fn(),
    ...overrides,
  };
  configureHttpAuth(bridge);
  return bridge;
};

const authHeader = (config: InternalAxiosRequestConfig) => config.headers.get('Authorization');

describe('HTTP interceptors', () => {
  afterEach(() => configureHttpAuth(null));

  it('gắn Bearer token vào request', async () => {
    createBridge();
    const { instance, calls } = createClient(() => ({ status: 200 }));

    await instance.get('/me');

    expect(calls[0].authorization).toBe('Bearer old-token');
  });

  it('không gắn token khi skipAuth', async () => {
    createBridge();
    const { instance, calls } = createClient(() => ({ status: 200 }));

    await instance.post('/login', {}, { skipAuth: true } as never);

    expect(calls[0].authorization).toBeFalsy();
  });

  it('nhiều request cùng 401 chỉ refresh MỘT lần rồi gửi lại với token mới', async () => {
    const bridge = createBridge();
    const { instance, calls } = createClient(config =>
      authHeader(config) === 'Bearer new-token' ? { status: 200, data: { ok: true } } : { status: 401 },
    );

    const results = await Promise.all([instance.get('/a'), instance.get('/b'), instance.get('/c')]);

    expect(bridge.refreshAccessToken).toHaveBeenCalledTimes(1);
    expect(results.map(r => r.data)).toEqual([{ ok: true }, { ok: true }, { ok: true }]);
    expect(calls.filter(c => c.authorization === 'Bearer old-token')).toHaveLength(3);
    expect(calls.filter(c => c.authorization === 'Bearer new-token')).toHaveLength(3);
  });

  it('refresh bị server từ chối → báo hết phiên và trả AppHttpError', async () => {
    const rejected = new AppHttpError(
      new AxiosError('fail', undefined, undefined, undefined, {
        status: 401,
        data: {},
        headers: {},
        statusText: '',
        config: {} as InternalAxiosRequestConfig,
      }),
    );
    const bridge = createBridge({ refreshAccessToken: jest.fn().mockRejectedValue(rejected) });
    const { instance } = createClient(() => ({ status: 401 }));

    const error = await instance.get('/me').catch(e => e);

    expect(error).toBeInstanceOf(AppHttpError);
    expect(error.statusCode).toBe(401);
    expect(bridge.onSessionExpired).toHaveBeenCalledTimes(1);
  });

  it('refresh lỗi mạng → KHÔNG đăng xuất (giữ phiên khi offline)', async () => {
    const offline = new AppHttpError(new AxiosError('Network Error', 'ERR_NETWORK'));
    const bridge = createBridge({ refreshAccessToken: jest.fn().mockRejectedValue(offline) });
    const { instance } = createClient(() => ({ status: 401 }));

    const error = await instance.get('/me').catch(e => e);

    expect(error.isNetworkError).toBe(true);
    expect(bridge.onSessionExpired).not.toHaveBeenCalled();
  });

  it('request skipRefresh (vd: logout) gặp 401 không kích hoạt refresh — chống vòng lặp', async () => {
    const bridge = createBridge();
    const { instance, calls } = createClient(() => ({ status: 401 }));

    await expect(instance.post('/logout', {}, { skipRefresh: true } as never)).rejects.toBeInstanceOf(AppHttpError);

    expect(bridge.refreshAccessToken).not.toHaveBeenCalled();
    expect(calls).toHaveLength(1);
  });

  it('không retry quá một lần nếu token mới vẫn bị 401', async () => {
    const bridge = createBridge();
    const { instance, calls } = createClient(() => ({ status: 401 }));

    await expect(instance.get('/me')).rejects.toBeInstanceOf(AppHttpError);

    expect(bridge.refreshAccessToken).toHaveBeenCalledTimes(1);
    expect(calls).toHaveLength(2);
  });

  it('token sắp hết hạn được refresh TRƯỚC khi gửi request', async () => {
    let expired = true;
    const bridge = createBridge({ isAccessTokenExpired: () => expired });
    (bridge.refreshAccessToken as jest.Mock).mockImplementation(async () => {
      expired = false;
      return 'fresh-token';
    });
    const { instance, calls } = createClient(() => ({ status: 200 }));

    await instance.get('/me');

    expect(calls).toHaveLength(1);
    expect(calls[0].authorization).toBe('Bearer fresh-token');
  });

  it('lỗi mạng được chuẩn hoá thành AppHttpError.isNetworkError', async () => {
    createBridge();
    const instance = axios.create({
      adapter: async config => {
        throw new AxiosError('Network Error', 'ERR_NETWORK', config);
      },
    });
    registerInterceptors(instance);

    const error = await instance.get('/me').catch(e => e);

    expect(error).toBeInstanceOf(AppHttpError);
    expect(error.isNetworkError).toBe(true);
    expect(error.statusCode).toBe(0);
  });
});
