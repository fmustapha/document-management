import { combineReducers } from 'redux';
import documents from './documentReducer';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
  documents
});

export default rootReducer;

