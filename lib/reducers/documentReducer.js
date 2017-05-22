'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = documentReducer;

var _actionTypes = require('../actions/actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
  documents: [],
  isCreating: false,
  currentDocument: null,
  userDocuments: []
};

/**
 *
 *
 * @export
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} containing the new state for the store
 */
function documentReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes2.default.ADD_DOCUMENT:
      {
        return Object.assign({}, state, {
          documents: [].concat(_toConsumableArray(state.documents), [action.document]),
          isCreating: false
        });
      }

    case _actionTypes2.default.DELETE_DOCUMENT:
      {
        console.log(action);
        // return Object.assign({}, state, {
        //   documents: [...state.documents, action.document],
        //   isCreating: false
        // });
      }
    case _actionTypes2.default.ADDING_DOCUMENT:
      return Object.assign({}, state, { isCreating: true });

    case _actionTypes2.default.VIEW_DOCUMENT:
      return Object.assign({}, state, { currentDocument: action.document });

    case _actionTypes2.default.LIST_DOCUMENT:
      console.log(Object.assign({}, state, { documents: action.documents }));
      return Object.assign({}, state, { documents: action.documents });

    case _actionTypes2.default.LIST_USER_DOCUMENT:
      console.log(Object.assign({}, state, { userDocuments: action.documents }));
      return Object.assign({}, state, { userDocuments: action.documents });
    default:
      return _extends({}, state);
  }
}