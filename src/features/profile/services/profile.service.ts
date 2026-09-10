/**
 * PROFILE SERVICE — PLACEHOLDER
 */
import { createHttpClient } from '@/shared/services/http/http-client';
class ProfileService {
  private client = createHttpClient('MAIN');
  // TODO: Thêm methods khi có API thực
}
export const profileService = new ProfileService();
