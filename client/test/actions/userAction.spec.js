import * as auth from '../../actions/userAction';
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
    expect(auth.listUsersSuccess(users)).to.eql({
      type: types.LIST_USERS,
      users
    });
  });

  it('should successfully delete user', () => {
    expect(auth.deleteUserSuccess(1)).to.eql({
      type: types.DELETE_USER, id: 1
    });
  });

  it('should set the current user', () => {
    expect(auth.updateUserSuccess({ id: 1 })).to.eql({
      type: types.UPDATE_USER, user: { id: 1 }
    });
  });

  it('should set the current user', () => {
    const user = { id: 1 };
    expect(auth.viewUserSuccess(user)).to.eql({
      type: types.VIEW_USER,
      user
    });
  });

  it('should successfully update a user', () => {
    const user = { id: 1 };
    expect(auth.adminUpdateUserSuccess(user)).to.eql({
      type: types.UPDATE_USER,
      user
    });
  });

  it('should logout a user', (done) => {
    const expectedActions = [ { type: 'LIST_USERS',
    users: { users: [], totalUsers: 2, pagination: {} } } ];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.listUsers(0, 1)).then(() => {
      console.log(store.getActions());
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { users: [], totalUsers: 2, pagination: {} }
      });
    });
  });

  it('should logout a user', (done) => {
    const expectedActions = [
      { type: 'UPDATE_USER', userUpdate: { id: 1 } }
    ];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.updateUser(1, {})).then(() => {
      console.log(store.getActions());
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { updatedUser: {} }
      });
    });
  });

  it('should logout a user', (done) => {
    const expectedActions = [
      { type: 'VIEW_USER', user: { documents: [], pagination: {} } },
      { type: 'VIEW_USER', user: { documents: [], pagination: {} } }
    ];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.viewUser(1, {})).then(() => {
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
    const expectedActions = [{ type: 'DELETE_USER', id: 1 }];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.deleteUser(1)).then(() => {
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
});
