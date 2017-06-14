'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDocument = createDocument;
exports.creatingDocument = creatingDocument;
exports.listDocumentSuccess = listDocumentSuccess;
exports.listUserDocumentSuccess = listUserDocumentSuccess;
exports.listDocument = listDocument;
exports.listUserDocument = listUserDocument;
exports.viewDocument = viewDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDocument(document) {
  console.log(document, 'document in documentAction');
  return function (dispatch) {
    _axios2.default.post('/documents/', document).then(function (response) {
      console.log(response.data);
      dispatch({ type: _actionTypes2.default.ADD_DOCUMENT, document: document });
    });
  };
  // return { type: 'ADD_DOCUMENT', document };
}

function creatingDocument() {
  return { type: _actionTypes2.default.ADDING_DOCUMENT };
}

function listDocumentSuccess(documents) {
  return { type: _actionTypes2.default.LIST_DOCUMENT, documents: documents };
}

function listUserDocumentSuccess(documents) {
  return { type: _actionTypes2.default.LIST_USER_DOCUMENT, documents: documents };
}

function listDocument() {
  console.log(_axios2.default.defaults.headers);
  return function (dispatch) {
    _axios2.default.get('/documents').then(function (response) {
      console.log(response.data.document);
      var documents = response.data.document;
      dispatch(listDocumentSuccess(documents));
    }).catch(function (error) {
      console.log(error.response);
    });
  };
  // return { type: 'LIST_DOCUMENT', documentList };
}

function listUserDocument(id) {
  // console.log('')
  console.log(_axios2.default.defaults.headers);
  return function (dispatch) {
    _axios2.default.get('/users/' + id + '/documents').then(function (response) {
      console.log('user doc', console.log(_axios2.default.defaults.headers));
      var documents = response.data.documents;
      dispatch(listUserDocumentSuccess(documents));
    }).catch(function (error) {
      console.log(error.response);
    });
  };
  // return { type: 'LIST_DOCUMENT', documentList };
}

function viewDocument(id) {
  return function (dispatch) {
    _axios2.default.get('/documents/' + id).then(function (response) {
      console.log('document =>', response.data);
      var document = response.data.document;
      dispatch({ type: _actionTypes2.default.VIEW_DOCUMENT, document: document });
      // dispatch(listUserDocumentSuccess(documents));
    }).catch(function (error) {
      console.log(error);
    });
  };
  // return { type: 'VIEW_DOCUMENT', viewDocument };
}

function updateDocument(id) {
  return function (dispatch) {
    _axios2.default.put('/documents/' + id).then(function (response) {
      console.log('message', response.data);
      dispatch({ type: _actionTypes2.default.UPDATE_DOCUMENT, id: id });
    }).catch(function (error) {
      console.log(error);
      dispatch({ type: _actionTypes2.default.UPDATE_ERROR, error: error });
    });
  };
  // return { type: types.UPDATE_DOCUMENT, documentUpdate };
}

function deleteDocument(id) {
  return function (dispatch) {
    _axios2.default.delete('/documents/' + id).then(function (response) {
      console.log('message', response.data);
      dispatch({ type: _actionTypes2.default.DELETE_DOCUMENT, id: id });
    }).catch(function (error) {
      console.log(error);
    });
  };
}