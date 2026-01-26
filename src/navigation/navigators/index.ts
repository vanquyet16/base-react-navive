// ============================================================================
// NAVIGATORS CENTRALIZED EXPORTS
// ============================================================================

/**
 * Centralized export cho tất cả navigators
 * 
 * Mục đích:
 * - Single source of truth cho navigator imports
 * - Dễ dàng import từ các file khác: import { AuthStackNavigator } from '@/navigation/navigators'
 * - Maintainability: thêm/xóa navigators chỉ cần update file này
 */

export { AuthStackNavigator } from './AuthStackNavigator';
export { MainStackNavigator } from './MainStackNavigator';
