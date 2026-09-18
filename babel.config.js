module.exports = {
  presets: [
    [
      'module:@react-native/babel-preset',
      { enableBabelRuntime: '^7.25.0' },
    ],
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
