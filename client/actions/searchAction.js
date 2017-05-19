import axios from 'axios';
import * as types from './actionTypes';

export function searchUsers() {
  return { type: types.SEARCH_USER };
}

export function searchDocument(user) {
  return { type: types.SEARCH_DOCUMENT, user };
}
