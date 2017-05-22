'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = authReducer;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _InitialState = require('./InitialState');

var _actionTypes = require('../actions/actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  isAuthenticated: _InitialState.isAuthenticated,
  loggedInUser: _InitialState.loggedInUser
};

/**
 *
 *
 * @export
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} containing authentication status and user details
 */
function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes2.default.SIGNUP_USER:
      return { isAuthenticated: true,
        loggedInUser: { id: action.response.id, user: action.response.user } };
    case _actionTypes2.default.SET_CURRENT_USER:
      return {
        isAuthenticated: true,
        loggedInUser: action.user
      };
    case _actionTypes2.default.LOGOUT_USER:
      return { isAuthenticated: false,
        loggedInUser: null };
    default:
      return state;
  }
}