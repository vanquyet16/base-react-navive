// Jest: giá trị env giống .env.dev (node_modules mock tự động nhờ đặt tại __mocks__/ ở root)
const Config = {
  APP_ENV: 'dev',
  API_MAIN_URL: 'http://localhost:40000/',
  API_AUTH_URL: 'http://localhost:40000/',
  API_MANAGER_URL: 'http://localhost:40000/',
  API_TIMEOUT_MS: '15000',
};
module.exports = Config;
module.exports.default = Config;
module.exports.Config = Config;
