/**
 * DEEP LINKING
 * ============
 * Ánh xạ URL → màn hình, theo đúng cây navigator. Ví dụ:
 *   basern://login        → AuthStack/Login
 *   basern://home         → Drawer/MainStack/MainTabsScreen/Home
 *
 * Native đã khai báo scheme `basern` (AndroidManifest intent-filter). iOS: thêm URL Type `basern`
 * trong Info.plist và chuyển tiếp `openURL` sang RCTLinkingManager trong AppDelegate.
 * Link tới màn cần đăng nhập khi chưa đăng nhập sẽ không khớp (route chưa tồn tại) — xử lý
 * "đăng nhập rồi chuyển tiếp" nếu nghiệp vụ cần.
 */

import type { LinkingOptions } from '@react-navigation/native';
import type { RootStackParamList } from '@/shared/types/navigation.types';
import { NAVIGATION_KEYS } from './config/navigationConfig';

export const DEEP_LINK_SCHEME = 'basern';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [`${DEEP_LINK_SCHEME}://`],
  config: {
    screens: {
      [NAVIGATION_KEYS.ROOT.AUTH_STACK]: {
        screens: {
          [NAVIGATION_KEYS.AUTH.LOGIN]: 'login',
          [NAVIGATION_KEYS.AUTH.REGISTER]: 'register',
        },
      },
      [NAVIGATION_KEYS.ROOT.DRAWER]: {
        screens: {
          [NAVIGATION_KEYS.DRAWER.MAIN_STACK]: {
            screens: {
              [NAVIGATION_KEYS.MAIN_STACK.MAIN_TABS]: {
                screens: {
                  [NAVIGATION_KEYS.TAB.HOME]: 'home',
                },
              },
            },
          },
        },
      },
    },
  },
};
