import chai from 'chai';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import * as auth from '../../actions/documentAction';
import types from '../../actions/actionTypes';

const expect = chai.expect;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('documentActions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should successfully create document', () => {
    const users = { id: 1 };
    expect(auth.createDocumentSuccess(users)).to.eql({
      type: types.LIST_USERS,
      users
    });
  });

  it('should update the state of adding document in the store', () => {
    expect(auth.creatingDocument()).to.eql({
      type: types.ADDING_DOCUMENT
    });
  });

  it('should successfully delete a document', () => {
    expect(auth.deleteDocumentSuccess()).to.eql({
      type: types.DELETING_DOCUMENT
    });
  });

  it('should successfully return type and payload that list documents', () => {
    const documents = { id: 1 };
    expect(auth.listDocumentSuccess(documents)).to.eql({
      type: types.LIST_DOCUMENT,
      documents
    });
  });

  it('should return payload and action type that creates a document', (done) => {
    const expectedActions = [
      { type: types.ADD_DOCUMENT, document: { id: 1 } }
    ];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.createDocument({ id: 1 })).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { id: 1 }
      });
    });
  });

  it('should return payload and action type that lists documents', (done) => {
    const expectedActions = [
      { type: 'LIST_DOCUMENT',
        documents: { documents: [], pagination: {} } }
    ];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.listDocument()).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { documents: [], pagination: {} }
      });
    });
  });

  it(`should return payload and action type
   that lists a users document`, (done) => {
    const expectedActions = [
      { type: 'LIST_DOCUMENT',
        documents: { documents: [], pagination: {} } }
    ];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });
  
    store.dispatch(auth.listUserDocument(1)).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { documents: [], pagination: {} }
      });
    });
  });

  it(`should return payload and action type
   that enables a document to be viewed`, (done) => {
    const expectedActions = [
      { type: types.VIEW_DOCUMENT,
        document: { id: 1 } }
    ];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.viewDocument(1)).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { document: { id: 1 } }
      });
    });
  });

  it(`should return payload and action
   type that updates state of document in the store`, (done) => {
    const expectedActions = [
      { type: types.UPDATE_DOCUMENT,
        updatedDocument: { } }
    ];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.updateDocument(1, {})).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { }
      });
    });
  });

  it(`should return payload and action
   type that removes a document from the store`, (done) => {
    const expectedActions = [
      { type: 'DELETING_DOCUMENT' },
      { type: 'DELETE_DOCUMENT', id: 1 }
    ];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.deleteDocument(1)).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {}
      });
    });
  });
});
