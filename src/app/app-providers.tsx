/**
 * APP PROVIDERS
 * =============
 * Centralized providers wrapper cho toàn app.
 * Wrap QueryProvider, custom providers nếu cần.
 *
 * @senior-pattern Provider composition với clear order
 */

import React from 'react';
import { QueryProvider } from '@/query/query-provider';

/**
 * AppProviders Props
 */
interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * AppProviders Component
 * Wrap tất cả providers theo order: outer -> inner
 * Order matters: Query -> Theme -> Navigation -> Children
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryProvider>
      {/* Zustand store không cần provider - global by default */}
      {/* Theme được access qua useTheme hook từ Zustand */}
      {children}
    </QueryProvider>
  );
};
