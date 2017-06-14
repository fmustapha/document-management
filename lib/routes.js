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

var _AddDocumentsPage = require('./components/document/AddDocumentsPage');

var _AddDocumentsPage2 = _interopRequireDefault(_AddDocumentsPage);

var _DocumentListPage = require('./components/document/DocumentListPage');

var _DocumentListPage2 = _interopRequireDefault(_DocumentListPage);

var _LoginPage = require('./components/login/LoginPage');

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _SignUpPage = require('./components/signup/SignUpPage');

var _SignUpPage2 = _interopRequireDefault(_SignUpPage);

var _ViewDocumentPage = require('./components/document/ViewDocumentPage');

var _ViewDocumentPage2 = _interopRequireDefault(_ViewDocumentPage);

var _SearchPage = require('./components/search/SearchPage');

var _SearchPage2 = _interopRequireDefault(_SearchPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import UserListPage from './components/user/UserListPage';
exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { exact: true, path: '/dms/', component: _Layout2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _HomePage2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/dms/login', component: _LoginPage2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/dms/signup', component: _SignUpPage2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/dms/document/create', component: _AddDocumentsPage2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/dms/document', component: _DocumentListPage2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/dms/document/:id', component: _ViewDocumentPage2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/dms/search', component: _SearchPage2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/dms/about', component: _AboutPage2.default })
);
// import ViewUserPage from './components/user/ViewUserPage';