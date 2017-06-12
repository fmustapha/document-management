import axios from 'axios';
import types from './actionTypes';
import { listDocument } from './documentAction';
import { listUsers } from './userAction';

/**
 *
 *
 * @export
 * @param {Object} result
 * @returns {Object}
 */
export function searchUserSuccess(result) {
  return { type: types.SEARCH_USER, result };
}

/**
 *
 *
 * @export
 * @param {Object} result
 * @returns {Object}
 */
export function searchDocumentSuccess(result) {
  return { type: types.SEARCH_DOCUMENT, result };
}

/**
 *
 *
 * @export
 * @param {String} term
 * @returns {Object}
 */
export function searchUser(event, term, offset) {
  return (dispatch) => {
    if (term === '') {
      dispatch(listUsers());
    }
    return axios
    .get(`/search/users/?term=${term}&offset=${offset}`)
    .then((response) => {
      dispatch(searchUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch({ type: types.SEARCH_USER_ERROR, error });
    });
  };
}

/**
 *
 *
 * @export
 * @param {Object} event
 * @param {String} term
 * @returns {func|Object} containing type and/response data
 */
export function searchDocument(event, term, offset) {
  return (dispatch) => {
    if (term === '') {
      dispatch(searchDocumentSuccess({
        message: '',
        documents: {
          rows: []
        },
        pagination: {}
      }));
      return dispatch(listDocument());
    }
    return axios
    .get(`/search/documents/?term=${term}&offset=${offset}`)
    .then((response) => {
      response.data.term = term;
      dispatch(searchDocumentSuccess(response.data));
    })
    .catch((error) => {
      dispatch({ type: types.SEARCH_DOCUMENT_ERROR, error });
    });
  };
}

