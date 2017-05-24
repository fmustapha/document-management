import { combineReducers } from 'redux';
import users from './userReducer';
import documents from './documentReducer';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
  documents,
  users
});

export default rootReducer;

