/**
 * EMERGENCY SERVICE — PLACEHOLDER
 */
import { createHttpClient } from '@/shared/services/http/http-client';
class EmergencyService {
  private client = createHttpClient('MAIN');
  // TODO: Thêm methods khi có API thực
}
export const emergencyService = new EmergencyService();
