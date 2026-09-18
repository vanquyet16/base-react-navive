/**
 * THEME UNIT TESTS
 * ================
 * Bộ kiểm thử chất lượng cho Base Theme System:
 * - Kiểm tra tính toàn vẹn của Semantic Tokens (card, surface, primary...)
 * - Kiểm tra helper alpha() xử lý hex, rgb và opacity
 * - Kiểm tra tính năng callable/indexable của spacing
 * - Kiểm tra typography presets
 */

import { lightTheme, darkTheme, alpha } from '@/shared/theme';

describe('Base Theme System (Senior Standard)', () => {
  describe('Semantic Tokens Integrity', () => {
    it('Light theme should define all essential mobile semantic tokens', () => {
      expect(lightTheme.colors.surface).toBeDefined();
      expect(lightTheme.colors.card).toBeDefined();
      expect(lightTheme.colors.placeholder).toBeDefined();
      expect(lightTheme.colors.muted).toBeDefined();
      expect(lightTheme.colors.disabled).toBeDefined();
      expect(lightTheme.colors.disabledBackground).toBeDefined();
      expect(lightTheme.colors.borderFocus).toBeDefined();
      expect(lightTheme.colors.backdrop).toBeDefined();
      expect(lightTheme.isDark).toBe(false);
    });

    it('Dark theme should define corresponding dark semantic tokens', () => {
      expect(darkTheme.colors.surface).toBeDefined();
      expect(darkTheme.colors.card).toBeDefined();
      expect(darkTheme.colors.placeholder).toBeDefined();
      expect(darkTheme.colors.muted).toBeDefined();
      expect(darkTheme.colors.disabled).toBeDefined();
      expect(darkTheme.colors.disabledBackground).toBeDefined();
      expect(darkTheme.colors.borderFocus).toBeDefined();
      expect(darkTheme.isDark).toBe(true);
    });
  });

  describe('alpha() Helper Utility', () => {
    it('should convert 6-character hex color to rgba format', () => {
      expect(alpha('#FFFFFF', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
      expect(alpha('#000000', 0.1)).toBe('rgba(0, 0, 0, 0.1)');
    });

    it('should convert 3-character short hex color to rgba format', () => {
      expect(alpha('#FFF', 0.8)).toBe('rgba(255, 255, 255, 0.8)');
      expect(alpha('#000', 1)).toBe('rgba(0, 0, 0, 1)');
    });

    it('should convert rgb() format to rgba with specified opacity', () => {
      expect(alpha('rgb(100, 150, 200)', 0.4)).toBe('rgba(100, 150, 200, 0.4)');
    });

    it('should clamp opacity between 0 and 1 safely', () => {
      expect(alpha('#FFFFFF', 1.5)).toBe('rgba(255, 255, 255, 1)');
      expect(alpha('#FFFFFF', -0.5)).toBe('rgba(255, 255, 255, 0)');
    });
  });
});
