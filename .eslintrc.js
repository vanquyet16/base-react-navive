/**
 * Ranh giới kiến trúc (dependency một chiều):
 *   app → navigation → features → components → shared
 * - shared: hạ tầng thuần, không biết UI/feature.
 * - components: UI dùng chung, không biết feature/navigation.
 * - features: không import chéo nhau (dùng qua navigation/app). Thêm feature mới vào FEATURES.
 */
/** Barrel gốc nạp toàn bộ thư viện component/hạ tầng → chậm khởi động, dễ import vòng */
const ROOT_BARRELS = [
  { name: '@/components', message: 'Import trực tiếp file, vd: @/components/base/CustomText' },
  { name: '@/shared', message: 'Import trực tiếp module, vd: @/shared/hooks/useBaseForm' },
];

const layerRule = (message, patterns = [], paths = []) => [
  'error',
  {
    // `paths`: khớp chính xác tên module (gitignore-pattern của `patterns` sẽ chặn cả thư mục con)
    paths: [...ROOT_BARRELS, ...paths.map(name => ({ name, message }))],
    patterns: patterns.length ? [{ group: patterns, message }] : [],
  },
];

const FEATURES = ['auth', 'home'];

/** Feature chỉ được import chính nó + tầng dưới; từ navigation chỉ dùng hằng số route */
const featureOverride = feature => ({
  files: [`src/features/${feature}/**`],
  rules: {
    'no-restricted-imports': layerRule(
      'Feature không import chéo feature khác / navigator / app',
      [
        '@/app/*',
        '@/navigation/navigators',
        '@/navigation/navigators/**',
        '@/navigation/components/**',
        '@/navigation/MainTabs',
        ...FEATURES.filter(other => other !== feature).map(other => `@/features/${other}`),
      ],
      ['@/navigation'],
    ),
  },
});

module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // Strict typing: dùng `unknown` + type guard thay cho `any`
    '@typescript-eslint/no-explicit-any': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // Dùng logger (tự che dữ liệu nhạy cảm, im lặng ở release)
    'no-console': 'error',
    'no-restricted-imports': layerRule(''),
  },
  overrides: [
    {
      files: ['src/shared/**'],
      rules: {
        'no-restricted-imports': layerRule('shared không được phụ thuộc tầng trên', [
          '@/app/*',
          '@/navigation',
          '@/navigation/*',
          '@/features/*',
          '@/components',
          '@/components/*',
        ]),
      },
    },
    {
      files: ['src/components/**'],
      rules: {
        'no-restricted-imports': layerRule('components không được phụ thuộc feature/navigation/app', [
          '@/app/*',
          '@/navigation',
          '@/navigation/*',
          '@/features/*',
        ]),
      },
    },
    ...FEATURES.map(featureOverride),
    {
      files: ['__tests__/**', 'jest.setup.js', '__mocks__/**'],
      env: { jest: true },
      rules: { 'no-console': 'off' },
    },
  ],
};
