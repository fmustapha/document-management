'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchUsers = searchUsers;
exports.searchDocument = searchDocument;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchUsers() {
  return { type: types.SEARCH_USER };
}

function searchDocument(user) {
  return { type: types.SEARCH_DOCUMENT, user: user };
}