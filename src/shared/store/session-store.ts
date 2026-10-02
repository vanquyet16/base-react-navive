/**
 * SESSION STORE (Zustand slice)
 * =============================
 * Chỉ giữ TRẠNG THÁI phiên để điều hướng (Auth stack ↔ Main).
 * - Token: tokenStore (MMKV).
 * - Hồ sơ user: TanStack Query (`authKeys.me`) — một nguồn sự thật duy nhất.
 * Chỉ SessionManager được phép đổi state này.
 */

import type { StateCreator } from 'zustand';
import type { AppStoreState } from './app-store';

export type SessionStatus = 'unknown' | 'authenticated' | 'guest';

export interface SessionState {
    sessionStatus: SessionStatus;
    setSessionStatus: (status: SessionStatus) => void;
}

export const createSessionSlice: StateCreator<AppStoreState, [], [], SessionState> = set => ({
    sessionStatus: 'unknown',
    setSessionStatus: sessionStatus => set({ sessionStatus }),
});

export const sessionSelectors = {
    status: (state: SessionState) => state.sessionStatus,
    isAuthenticated: (state: SessionState) => state.sessionStatus === 'authenticated',
};
