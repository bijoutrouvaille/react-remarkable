'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _remarkable = require('remarkable');

var _remarkable2 = _interopRequireDefault(_remarkable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iterable = function iterable(o) {
  return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) == 'object' && o != null;
};
var deepEqual = function deepEqual(a, b) {
  if (!iterable(a) || !iterable(b)) return a === b;
  for (var key in a) {
    if (a.hasOwnProperty(key)) if (!deepEqual(a[k], b[k])) return false;
  }return true;
};

var Remarkable = _react2.default.createClass({
  displayName: 'Remarkable',
  getDefaultProps: function getDefaultProps() {
    return {
      container: 'div',
      options: {}
    };
  },
  render: function render() {
    var Container = this.props.container;

    return _react2.default.createElement(
      Container,
      null,
      this.content()
    );
  },
  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    if (!deepEqual(nextProps.options, this.props.options) || !deepEqual(nextProps.plugins, this.props.plugins)) {
      this.createMd(nextProps);
    }
  },
  content: function content() {
    var _this = this;

    if (this.props.source) {
      return _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: this.renderMarkdown(this.props.source) } });
    } else {
      return _react2.default.Children.map(this.props.children, function (child) {
        if (typeof child === 'string') {
          return _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: _this.renderMarkdown(child) } });
        } else {
          return child;
        }
      });
    }
  },
  createMd: function createMd(props) {
    var _this2 = this;

    this.md = new _remarkable2.default(props.options);
    if (props.plugins) props.plugins.forEach(function (plugin) {
      return _this2.md.use(plugin);
    });
  },
  renderMarkdown: function renderMarkdown(source) {
    if (!this.md) {
      this.createMd(this.props);
    }

    return this.md.render(source);
  }
});

exports.default = Remarkable;