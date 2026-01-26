// ============================================================================
// NAVIGATION FACTORIES - EXPORT TẤT CẢ FACTORY FUNCTIONS
// ============================================================================

/**
 * SCREEN WRAPPER FACTORIES
 * Export tất cả factory functions từ screenFactory
 * 
 * Bao gồm:
 * - createMainStackScreenWrapper: Tạo wrapper cho main stack screens
 * - createTabScreenWrapper: Tạo wrapper cho tab screens
 * - createAuthScreenWrapper: Tạo wrapper cho auth screens
 * - createMainStackScreenWrappers: Tạo hàng loạt main stack wrappers
 * - createTabScreenWrappers: Tạo hàng loạt tab wrappers
 * - createAuthScreenWrappers: Tạo hàng loạt auth wrappers
 */
export * from './screenFactory';

/**
 * NAVIGATOR FACTORIES
 * Export tất cả generic navigator factory functions
 * 
 * Bao gồm:
 * - createMainStackNavigatorComponent: Tạo Main Stack Navigator với generic types
 * - createAuthStackNavigatorComponent: Tạo Auth Stack Navigator với generic types
 * - AdditionalScreen: Type cho additional screens
 * - NavigatorOptions: Type cho navigator options
 */
export * from './navigatorFactory';
