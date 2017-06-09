import axios from 'axios';
import types from './actionTypes';

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
export function searchUser(event, term) {
  return dispatch => axios.get(`/search/users/?term=${term}`)
    .then((response) => {
      dispatch(searchUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch({ type: types.SEARCH_USER_ERROR, error });
    });
}

/**
 *
 *
 * @export
 * @param {Object} event
 * @param {String} term
 * @returns {func|Object} containing type and/response data
 */
export function searchDocument(event, term) {
  return dispatch => axios.get(`/search/documents/?term=${term}`)
    .then((response) => {
      dispatch(searchDocumentSuccess(response.data));
    })
    .catch((error) => {
      dispatch({ type: types.SEARCH_DOCUMENT_ERROR, error });
    });
}

