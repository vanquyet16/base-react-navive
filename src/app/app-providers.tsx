/**
 * APP PROVIDERS
 * =============
 * Thứ tự (ngoài → trong):
 *   SafeAreaProvider → QueryProvider → ThemedAntdProvider → children
 * - SafeAreaProvider ở gốc: mọi màn (kể cả loading/lỗi ngoài navigator) đọc được insets.
 * - Antd Provider nhận theme của app → component antd đổi theo sáng/tối.
 * - Zustand không cần provider.
 */

import React, { useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as AntdProvider } from '@ant-design/react-native';
import { QueryProvider } from '@/shared/query/query-provider';
import { useTheme } from '@/shared/theme/use-theme';
import { toAntdTheme } from '@/shared/theme/antd-theme';

interface AppProvidersProps {
  children: React.ReactNode;
}

const ThemedAntdProvider: React.FC<AppProvidersProps> = ({ children }) => {
  const theme = useTheme();
  const antdTheme = useMemo(() => toAntdTheme(theme), [theme]);
  return <AntdProvider theme={antdTheme}>{children}</AntdProvider>;
};

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => (
  <SafeAreaProvider>
    <QueryProvider>
      <ThemedAntdProvider>{children}</ThemedAntdProvider>
    </QueryProvider>
  </SafeAreaProvider>
);
