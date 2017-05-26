import axios from 'axios';
import types from './actionTypes';

export function createDocument(document) {
  return (dispatch) => {
    return axios.post('/documents/', document)
    .then(() => {
      dispatch({ type: types.ADD_DOCUMENT, document });
    });
  };
}

export function creatingDocument() {
  return { type: types.ADDING_DOCUMENT };
}

export function listDocumentSuccess(documents) {
  return { type: types.LIST_DOCUMENT, documents };
}

export function listUserDocumentSuccess(documents) {
  return { type: types.LIST_USER_DOCUMENT, documents };
}

export function listDocument() {
  return (dispatch) => {
    axios.get('/documents')
    .then((response) => {
      console.log(response.data);
      const documents = response.data.documents;
      dispatch(listDocumentSuccess(documents));
    })
    .catch((error) => {
      dispatch({ type: types.LIST_ERROR, error });
    });
  };
}

export function listUserDocument(id) {
  console.log('right here');
  return (dispatch) => {
    return axios.get(`/users/${id}/documents`)
    .then((response) => {
      console.log(response, 'response action')
      const documents = response.data.documents;
      dispatch(listUserDocumentSuccess(documents));
    })
    .catch((error) => {
      dispatch({ type: types.LIST_ERROR, error });
    });
  };
}

export function viewDocument(id) {
  return (dispatch) => {
    axios.get(`/documents/${id}`)
    .then((response) => {
      const document = response.data.document;
      dispatch({ type: types.VIEW_DOCUMENT, document });
    })
    .catch((error) => {
      dispatch({ type: types.GET_ERROR, error });
    });
  };
}

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

export function deleteDocument(id) {
  return (dispatch) => {
    axios.delete(`/documents/${id}`)
    .then((response) => {
      console.log('message', response.data);
      dispatch({ type: types.DELETE_DOCUMENT, id });
    }).catch((error) => {
      dispatch({ type: types.DELETE_ERROR, error });
    });
  };
}
