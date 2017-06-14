'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function Footer() {
  return _react2.default.createElement(
    'footer',
    { className: 'page-footer grey darken-4 footer' },
    _react2.default.createElement(
      'div',
      { className: 'footer-copyright' },
      _react2.default.createElement(
        'div',
        { className: 'container' },
        '\xA9 2017 Copyright FAM Incoporated',
        _react2.default.createElement(
          'a',
          {
            className: 'grey-text text-lighten-4 right',
            href: 'https://github.com/andela-fmustapha/document-management' },
          'GitHub'
        )
      )
    )
  );
};

exports.default = Footer;