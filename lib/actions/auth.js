'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentUser = setCurrentUser;
exports.login = login;
exports.signUp = signUp;
exports.logout = logout;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _actionTypes = require('../actions/actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _setAuthorizationToken = require('../utils/setAuthorizationToken');

var _setAuthorizationToken2 = _interopRequireDefault(_setAuthorizationToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {Object}
 */
function setCurrentUser(user) {
  return {
    type: _actionTypes2.default.SET_CURRENT_USER,
    user: user
  };
}

/**
 *
 *
 * @export
 * @param {Object} loginDetails
 * @returns {Object}
 */
function login(loginDetails) {
  return function (dispatch) {
    return _axios2.default.post('/users/login', loginDetails).then(function (response) {
      var token = response.data.token;
      localStorage.setItem('jwtToken', token);
      (0, _setAuthorizationToken2.default)(token);
      dispatch(setCurrentUser((0, _jwtDecode2.default)(token)));
      console.log(response);
    }).catch(function (error) {
      console.log(error);
      dispatch({
        type: _actionTypes2.default.VALIDATION_ERROR,
        response: error.response.data.message
      });
    });
  };
}

/**
 * 
 * 
 * @export
 * @param {any} userDetails 
 * @returns
 */
function signUp(userDetails) {
  return function (dispatch) {
    return _axios2.default.post('/users/', userDetails).then(function (response) {
      _axios2.default.defaults.headers.common.Authorization = response.data.token;
      console.log(response.data);
      dispatch({
        type: _actionTypes2.default.SIGNUP_USER,
        response: response.data
      });
      dispatch({
        type: _actionTypes2.default.CLEAR_ERROR
      });
    }).catch(function (error) {
      dispatch({
        type: _actionTypes2.default.VALIDATION_ERROR,
        response: error.response.data.message
      });
    });
  };
}

function logout(userDetails) {
  return function (dispatch) {
    return _axios2.default.post('/users/logout').then(function (response) {
      localStorage.removeItem('jwtToken');
      (0, _setAuthorizationToken2.default)(false);
      dispatch({
        type: _actionTypes2.default.LOGOUT_USER
      });
    }).catch(function (error) {
      dispatch({
        type: _actionTypes2.default.LOGOUT_ERROR,
        response: error.response.data.message
      });
    });
  };
}