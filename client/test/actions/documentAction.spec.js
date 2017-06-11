import * as auth from '../../actions/documentAction';
import types from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('documentActions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should set the current user', () => {
    const users = { id: 1 };
    expect(auth.createDocumentSuccess(users)).to.eql({
      type: types.LIST_USERS,
      users
    });
  });

  it('should set the current user', () => {
    expect(auth.creatingDocument()).to.eql({
      type: types.ADDING_DOCUMENT
    });
  });

  it('should set the current user', () => {
    expect(auth.deleteDocumentSuccess()).to.eql({
      type: types.DELETING_DOCUMENT
    });
  });

  it('should set the current user', () => {
    const documents = { id: 1 };
    expect(auth.listDocumentSuccess(documents)).to.eql({
      type: types.LIST_DOCUMENT,
      documents
    });
  });

  // it('should login a user', (done) => {
  //   const expectedActions = [
  //     { type: types.SET_CURRENT_USER, user: { userName: 'abc' } }
  //   ];

  //   const store = mockStore({ auth: { loggedInUser: null, isAuthenticated: false } });

  //   store.dispatch(auth.login({
  //     email: 'any@gmail.com',
  //     password: 'password'
  //   })).then(() => {
  //     console.log('dsdsds');
  //     expect(store.getActions()).to.eql(expectedActions);
  //     done();
  //   });

  //   moxios.wait(() => {
  //     const request = moxios.requests.mostRecent();
  //     request.respondWith({
  //       status: 200,
  //       response: { user: 'abc' }
  //     });
  //   });
  // });

  it('should logout a user', (done) => {
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
      console.log(store.getActions());
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

  it('should logout a user', (done) => {
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
      console.log(store.getActions());
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

  it('should logout a user', (done) => {
    const expectedActions = [
       { type: 'LIST_USER_DOCUMENT',
        documents: { documents: [], pagination: {} } }
    ];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.listUserDocument(1)).then(() => {
      console.log(store.getActions());
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

  it('should logout a user', (done) => {
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
      console.log(store.getActions());
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

  it('should logout a user', (done) => {
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
      console.log(store.getActions());
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
  
  it('should logout a user', (done) => {
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
      console.log(store.getActions());
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
