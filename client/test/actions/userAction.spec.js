import chai from 'chai';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import * as auth from '../../actions/userAction';
import types from '../../actions/actionTypes';

const expect = chai.expect;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('userActions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return action type and payload with a list of users', () => {
    const users = { id: 1 };
    expect(auth.listUsersSuccess(users)).to.eql({
      type: types.LIST_USERS,
      users
    });
  });

  it('should return action type and deleted user id', () => {
    expect(auth.deleteUserSuccess(1)).to.eql({
      type: types.DELETE_USER, id: 1
    });
  });

  it('should return action type and updated user id', () => {
    expect(auth.updateUserSuccess({ id: 1 })).to.eql({
      type: types.UPDATE_USER, user: { id: 1 }
    });
  });

  it('should return action type and user details', () => {
    const user = { id: 1 };
    expect(auth.viewUserSuccess(user)).to.eql({
      type: types.VIEW_USER,
      user
    });
  });

  it('should return action type and user update details', () => {
    const user = { id: 1 };
    expect(auth.adminUpdateUserSuccess(user)).to.eql({
      type: types.UPDATE_USER,
      user
    });
  });

  it('should return action type and a list of users to listUserSuccess action', (done) => {
    const expectedActions = [{ type: 'LIST_USERS',
      users: { users: [], totalUsers: 2, pagination: {} } }];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.listUsers(0, 1)).then(() => {
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

  it(`should return action type and user
   update details to updateUserSuccess action`, (done) => {
    const expectedActions = [
      { type: 'UPDATE_USER', userUpdate: { id: 1 } },
      { type: 'UPDATE_USER_LIST', id: 1, userUpdate: { id: 1 } }
    ];

    const store = mockStore({ user: {
      user: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.updateUser(1, {})).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { updatedUser: {} }
      });
      done();
    });
  });

  it('should return action type and user details ', (done) => {
    const expectedActions = [
      { type: 'VIEW_USER', user: { user: [], pagination: {} } },
      { type: 'VIEW_USER', user: { user: [], pagination: {} } }
    ];

    const store = mockStore({ user: {
      user: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.viewUser(1, {})).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { user: [], pagination: {} }
      });
    });
    done();
  });

  it('should return action type and delete a user', (done) => {
    const expectedActions = [{ type: 'DELETE_USER', id: 1 }];

    const store = mockStore({ user: {
      user: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.deleteUser(1)).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { user: { id: 1 } }
      });
    });
    done();
  });
});
