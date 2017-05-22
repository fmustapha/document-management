'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = userReducer;

var _actionTypes = require('../actions/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
  users: [],
  isListing: false,
  currentDocuments: null,
  userDocuments: []
};

function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.LIST_USERS:
      {
        return Object.assign({}, state, {
          users: [].concat(_toConsumableArray(state.users), [action.users]),
          isListing: false
        });
      }

    case types.UPDATE_USER:
      {
        return Object.assign({}, state, {
          users: [].concat(_toConsumableArray(state.users), [action.users]),
          isListing: false
        });
      }

    case types.DELETE_USER:
      {
        console.log(Object.assign({}, state, { users: action.users }));
        return Object.assign({}, state, { isListing: false });
      }
    default:
      return state;
  }
}