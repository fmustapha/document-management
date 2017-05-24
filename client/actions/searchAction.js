import axios from 'axios';
import types from './actionTypes';

export function searchUserSuccess(result) {
  return { type: types.SEARCH_USER, result };
}

export function searchDocumentSuccess(result) {
  return { type: types.SEARCH_DOCUMENT, result };
}

export function searchUser(term) {
  console.log(types.SEARCH_USER_ERROR);
  return (dispatch) => {
    return axios.get(`/search/users/?term=${term}`)
    .then((response) => {
      console.log(response.data);
      dispatch(searchUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch({ type: types.SEARCH_USER_ERROR, error });
    });
  };
}

export function searchDocument(term) {
  console.log(types);
  return (dispatch) => {
    return axios.get(`/search/documents/?term=${term}`)
    .then((response) => {
      console.log(response.data);
      dispatch(searchDocumentSuccess(response.data));
    })
    .catch((error) => {
      dispatch({ type: types.SEARCH_DOCUMENT_ERROR, error });
    });
  };
}

