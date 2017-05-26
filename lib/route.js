'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Layout = require('./components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _HomePage = require('./components/home/HomePage');

var _HomePage2 = _interopRequireDefault(_HomePage);

var _AboutPage = require('./components/about/AboutPage');

var _AboutPage2 = _interopRequireDefault(_AboutPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _Layout2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _HomePage2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _AboutPage2.default })
);