'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listUsersSuccess = listUsersSuccess;
exports.listUsers = listUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listUsersSuccess(users) {
  return { type: _actionTypes2.default.LIST_USER, users: users };
}
// import jwtDecode from 'jwt-decode';
function listUsers() {
  return function (dispatch) {
    _axios2.default.get('/users').then(function (response) {
      console.log(response.data.user);
      var users = response.data.user;
      dispatch(listUsersSuccess(users));
    }).catch(function (error) {
      console.log(error);
    });
  };
  // return { type: types.LIST_USERS };
}

function updateUser(user) {
  return { type: _actionTypes2.default.UPDATE_USER, user: user };
}

function deleteUser(user) {
  return { type: _actionTypes2.default.DELETE_USER, user: user };
}