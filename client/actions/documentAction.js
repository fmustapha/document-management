import axios from 'axios';
import types from './actionTypes';


export const createDocumentSuccess = users => ({
  type: types.LIST_USERS, users });

/**
 *
 *
 * @export
 * @param {object} document
 * @returns {func} containing an action type and a payload
 */
export function createDocument(document) {
  return (dispatch) => {
    return axios.post('/documents/', document)
    .then(() => {
      dispatch({ type: types.ADD_DOCUMENT, document });
    }).catch((error) => {
      dispatch({
        type: types.ADD_DOCUMENT_ERROR,
        error: error.response.data.message
      });
    });
  };
}

/**
 *
 *
 * @export
 * @returns {object} containing an action type
 */
export function creatingDocument() {
  return { type: types.ADDING_DOCUMENT };
}

/**
 *
 *
 * @export
 * @returns
 */
export function deleteDocumentSuccess() {
  return { type: types.DELETING_DOCUMENT };
}
/**
 *
 *
 * @export
 * @param {object} documents
 * @returns {object} containing an action type a payload
 */
export function listDocumentSuccess(documents) {
  return { type: types.LIST_DOCUMENT, documents };
}

/**
 *
 *
 * @export
 * @param {object} documents
 * @returns {object} containing action type and payload properties
 */
export function listUserDocumentSuccess(documents) {
  return { type: types.LIST_USER_DOCUMENT, documents };
}

/**
 *
 *
 * @export
 * @returns {func} containing a payload
 */
export function listDocument(limit, offset) {
  return (dispatch) => {
    return axios.get(`/documents/?limit=${limit}&offset=${offset}`)
    .then((response) => {
      const documents = response.data.documents;
      const pagination = response.data.pagination;
      const listDocuments = { documents, pagination };
      dispatch(listDocumentSuccess(listDocuments));
    })
    .catch((error) => {
      dispatch({ type: types.LIST_ERROR, error });
    });
  };
}

/**
 *
 *
 * @export
 * @param {Number} id
 * @returns {func} containing a payload
 */
export function listUserDocument(id) {
  return (dispatch) => {
    return axios.get(`/users/${id}/documents`)
    .then((response) => {
      const documents = response.data.documents;
      const pagination = response.data.pagination;
      const listUserDocuments = { documents, pagination };
      dispatch(listUserDocumentSuccess(listUserDocuments));
    })
    .catch((error) => {
      dispatch({ type: types.LIST_ERROR, error });
    });
  };
}

/**
 *
 *
 * @export
 * @param {Number} id
 * @returns {func} containing a payload and an action type
 */
export function viewDocument(id) {
  return (dispatch) => {
    return axios.get(`/documents/${id}`)
    .then((response) => {
      const document = response.data.document;
      dispatch({ type: types.VIEW_DOCUMENT, document });
    })
    .catch((error) => {
      dispatch({ type: types.GET_ERROR, error });
    });
  };
}

/**
 *
 *
 * @export
 * @param {Number} id
 * @param {Object} updatedDocument
 * @returns {func} containing a payload and an action type
 */
export function updateDocument(id, updatedDocument) {
  return (dispatch) => {
    return axios.put(`/documents/${id}`, updatedDocument)
    .then(() => {
      dispatch({ type: types.UPDATE_DOCUMENT, updatedDocument });
    }).catch((error) => {
      dispatch({ type: types.UPDATE_ERROR, error });
    });
  };
}

/**
 *
 *
 * @export
 * @param {Number} id
 * @returns {func} containing a payload and an action type
 */
export function deleteDocument(id) {
  return (dispatch) => {
    dispatch(deleteDocumentSuccess());
    return axios.delete(`/documents/${id}`)
    .then(() => {
      dispatch({ type: types.DELETE_DOCUMENT, id });
    }).catch((error) => {
      dispatch({ type: types.DELETE_ERROR, error });
    });
  };
}
