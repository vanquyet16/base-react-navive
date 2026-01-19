/**
 * QUERY PROVIDER
 * ==============
 * QueryClientProvider wrapper component.
 * Setup TanStack Query cho toàn app.
 *
 * @senior-pattern Provider pattern với error boundaries
 */

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './query-client';

/**
 * Query Provider Props
 */
interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * Query Provider Component
 * Wrap app với TanStack Query
 */
export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

/**
 * Dev Tools (optional)
 * Uncomment để enable React Query DevTools
 */
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
//
// export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       {children}
//       {__DEV__ && <ReactQueryDevtools initialIsOpen={false} />}
//     </QueryClientProvider>
//   );
// };
