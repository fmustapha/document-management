import { combineReducers } from 'redux';
import { reducer } from 'react-redux-sweetalert';
import users from './userReducer';
import documents from './documentReducer';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
  documents,
  users,
  sweetalert: reducer
});

export default rootReducer;

