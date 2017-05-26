import { combineReducers } from 'redux';
import users from './userReducer';
import documents from './documentReducer';
import search from './searchReducer';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
  documents,
  users,
  search
});

export default rootReducer;

