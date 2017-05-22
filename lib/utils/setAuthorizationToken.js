'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setAuthorizationToken;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setAuthorizationToken(token) {
  if (token) {
    _axios2.default.defaults.headers.common.authorization = token;
  } else {
    delete _axios2.default.defaults.headers.common.authorization;
  }
}