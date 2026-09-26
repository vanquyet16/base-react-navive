/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text } from 'react-native';
import App from '../App';

jest.mock('@/shared/utils/CustomToast', () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn(), info: jest.fn(), loading: jest.fn(), hide: jest.fn() },
}));

const collectText = (renderer: ReactTestRenderer.ReactTestRenderer): string =>
  renderer.root
    .findAllByType(Text)
    .map(node => ([] as unknown[]).concat(node.props.children).join(''))
    .join(' | ');

test('khởi động xong và vào màn đăng nhập khi chưa có phiên', async () => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
  });
  // Chờ bootstrap (Keychain, kiểm tra thiết bị) hoàn tất
  await ReactTestRenderer.act(async () => {
    await new Promise<void>(resolve => setTimeout(resolve, 0));
  });

  expect(collectText(renderer)).toContain('Cổng công dân số');

  await ReactTestRenderer.act(async () => {
    renderer.unmount();
  });
});
