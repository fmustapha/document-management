'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import reduxImmutableStateInvariant from 'reduxImmutableStateInvariant';


var middleware = [_reduxThunk2.default];

var finalCreateStore = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (f) {
    return f;
})(_redux.createStore);

exports.default = finalCreateStore(_reducers2.default);

// export default function configureStore(initialState) {
//   return createStore(
//     rootReducer,
//     initialState
//     // applyMiddleware(reduxImmutableStateInvariant())
//   );
// }