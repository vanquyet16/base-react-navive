/**
 * NAVIGATION HOOKS
 * ================
 * Custom hooks cho navigation với proper TypeScript typing
 * Provide autocomplete cho screen names khi gọi navigation.navigate()
 */

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { AuthStackParamList, MainStackParamList } from '@/shared/types/navigation.types';

/**
 * useAuthNavigation
 * Hook cho Auth stack navigation
 * 
 * @returns Navigation object với autocomplete cho Auth screens: 'Login' | 'Register'
 * 
 * @example
 * const navigation = useAuthNavigation();
 * navigation.navigate('Login');    // ← Autocomplete works!
 * navigation.navigate('Register'); // ← Autocomplete works!
 */
export const useAuthNavigation = () => {
    return useNavigation<StackNavigationProp<AuthStackParamList>>();
};

/**
 * useMainNavigation
 * Hook cho Main stack navigation
 * 
 * @returns Navigation object với autocomplete cho Main screens
 * 
 * @example
 * const navigation = useMainNavigation();
 * navigation.navigate('ProductScreen');
 * navigation.navigate('LazyDemoScreen');
 */
export const useMainNavigation = () => {
    return useNavigation<StackNavigationProp<MainStackParamList>>();
};
