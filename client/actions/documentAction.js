import axios from 'axios';

export function createDocument(document) {
  console.log(document);
  return (dispatch) => {
    axios.post('/documents/', document)
    .then((response) => {
      console.log(response.data);
      dispatch({ type: 'ADD_DOCUMENT', document });
    });
  };
  // return { type: 'ADD_DOCUMENT', document };
}

export function creatingDocument() {
  return { type: 'ADDING_DOCUMENT' };
}

export function listDocumentSuccess(documents) {
  return { type: 'LIST_DOCUMENT', documents };
}

export function listUserDocumentSuccess(documents) {
  return { type: 'LIST_USER_DOCUMENT', documents };
}

export function listDocument() {
  return (dispatch) => {
    axios.get('/documents')
    .then((response) => {
      console.log(response.data.document);
      const documents = response.data.document;
      dispatch(listDocumentSuccess(documents));
    })
    .catch((error) => {
      console.log(error);
    });
  };
  // return { type: 'LIST_DOCUMENT', documentList };
}

export function listUserDocument(id) {
  return (dispatch) => {
    axios.get(`/users/${id}/documents`)
    .then((response) => {
      console.log('user doc', response.data);
      const documents = response.data.documents;
      dispatch(listUserDocumentSuccess(documents));
    })
    .catch((error) => {
      console.log(error);
    });
  };
  // return { type: 'LIST_DOCUMENT', documentList };
}

export function viewDocument(id) {
  return (dispatch) => {
    axios.get(`/documents/${id}`)
    .then((response) => {
      console.log('document =>', response.data);
      const document = response.data.document;
      dispatch({ type: 'VIEW_DOCUMENT', document })
      // dispatch(listUserDocumentSuccess(documents));
    })
    .catch((error) => {
      console.log(error);
    });
  };
  // return { type: 'VIEW_DOCUMENT', viewDocument };
}

export function updateDocument(documentUpdate) {
  return { type: 'UPDATE_DOCUMENT', documentUpdate };
}

export function deleteDocument(deleteDocument) {
  return { type: 'DELETE_DOCUMENT', deleteDocument };
}
