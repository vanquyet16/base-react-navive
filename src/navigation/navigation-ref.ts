/**
 * NAVIGATION REF
 * ==============
 * Cho phép điều hướng từ ngoài cây React (push notification, deep link xử lý thủ công…).
 * Luôn kiểm tra `navigationRef.isReady()` trước khi dùng.
 */

import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from '@/shared/types/navigation.types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
