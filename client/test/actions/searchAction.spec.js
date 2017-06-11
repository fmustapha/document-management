import * as auth from '../../actions/searchAction';
import types from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('searchAction', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should set the current user', () => {
    const result = [{}];
    expect(auth.searchUserSuccess(result)).to.eql({
      type: types.SEARCH_USER,
      result
    });
  });

  it('should successfully delete user', () => {
    const result = [{}];
    expect(auth.searchDocumentSuccess(result)).to.eql({
      type: types.SEARCH_DOCUMENT, result
    });
  });

  it('should logout a user', (done) => {
    const expectedActions = [{ type: 'SEARCH_USER', result: { users: [], pagination: {} } }];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.searchUser(0, 1)).then(() => {
      console.log(store.getActions());
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { users: [], pagination: {} }
      });
    });
  });

  it('should logout a user', (done) => {
    const expectedActions = [
      { type: 'SEARCH_DOCUMENT', result: { documents: [], pagination: {} } }
    ];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.searchDocument(1, {})).then(() => {
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
});
