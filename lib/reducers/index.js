'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _documentReducer = require('./documentReducer');

var _documentReducer2 = _interopRequireDefault(_documentReducer);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  auth: _auth2.default,
  documents: _documentReducer2.default
});

exports.default = rootReducer;