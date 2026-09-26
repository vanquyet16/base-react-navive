const React = require('react');

/**
 * Mock component cho các file .svg khi chạy Unit Test với Jest
 */
const SvgMock = React.forwardRef((props, ref) => {
  return React.createElement('svg', { ...props, ref });
});

module.exports = SvgMock;
module.exports.default = SvgMock;
