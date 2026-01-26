/**
 * Shared Hooks - Core utilities only
 * 
 * NOTE: Chỉ export truly shared hooks (base utilities).
 * Feature-specific hooks phải import trực tiếp từ feature namespace:
 * - Auth hooks: import from '@/features/auth/hooks'
 * - Example hooks: import from '@/features/example/hooks'
 * 
 * Lý do: Tránh naming conflicts và vi phạm separation of concerns.
 * @senior-pattern Strict separation between shared utilities và feature code
 */

// Export base hooks - truly shared utilities
export * from './useBaseForm';
export * from './useBaseMutation';
export * from './useBaseQuery';

// ❌ KHÔNG re-export feature hooks ở đây
// Features phải import trực tiếp từ namespace của chúng