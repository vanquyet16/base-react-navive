/**
 * HOME SERVICE — PLACEHOLDER
 * Implement khi tích hợp API thực
 */
import { createHttpClient } from '@/shared/services/http/http-client';
class HomeService {
  private client = createHttpClient('MAIN');
  // TODO: Thêm methods khi có API thực
}
export const homeService = new HomeService();
