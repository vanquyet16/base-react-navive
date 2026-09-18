module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // Cảnh báo biến không sử dụng (cho phép tiền tố _)
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // Quy tắc Hooks chuẩn của React
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // Giới hạn console.log trong production code
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
