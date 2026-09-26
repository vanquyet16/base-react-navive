/**
 * HOME SERVICE — PLACEHOLDER
 * Thêm các lời gọi API của màn Home tại đây.
 */
import { getHttpClient } from '@/shared/services/http/http-client';

class HomeService {
  private readonly client = getHttpClient('MAIN');
}

export const homeService = new HomeService();
