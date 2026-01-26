/**
 * Shared Resources - Central export point
 * Barrel export cho tất cả shared modules
 * 
 * NOTE: Có một số export bị duplicate giữa config và constants:
 * - API_CONFIG: xuất từ cả config và constants (config là nguồn chính)
 * - APP_CONFIG: xuất từ cả config và constants (config là nguồn chính)
 * - ERROR_MESSAGES: xuất từ cả config và constants (config là nguồn chính)
 * - STORAGE_KEYS: xuất từ cả constants/index (legacy) và constants/storage-keys (mới)
 * 
 * Để tránh conflict, ưu tiên theo thứ tự:
 * 1. Config exports (API_CONFIG, APP_CONFIG, ERROR_MESSAGES)
 * 2. Constants exports khác
 */

// Export config trước (ưu tiên)
export * from './config';

// Export constants (có thể có conflicts nhưng config đã export trước nên được ưu tiên)
export * from './constants';

// Export các modules khác
export * from './hooks';
export * from './query';
export * from './services';
export * from './store';
export * from './theme';
export * from './types';
export * from './utils';
