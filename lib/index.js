'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactDom = require('react-dom');

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

require('./styles/styles.scss');

require('../node_modules/materialize-css/dist/css/materialize.min.css');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _auth = require('./actions/auth');

var _setAuthorizationToken = require('./utils/setAuthorizationToken');

var _setAuthorizationToken2 = _interopRequireDefault(_setAuthorizationToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const store = configureStore();

if (localStorage.jwtToken) {
  (0, _setAuthorizationToken2.default)(localStorage.jwtToken);
  _configureStore2.default.dispatch((0, _auth.setCurrentUser)((0, _jwtDecode2.default)(localStorage.jwtToken)));
}

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _configureStore2.default },
  _react2.default.createElement(_reactRouter.Router, { history: _reactRouter.browserHistory, routes: _routes2.default })
), document.getElementById('app'));