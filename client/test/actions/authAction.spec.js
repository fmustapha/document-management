import * as auth from '../../actions/auth';
import types from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authAction', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should set the current user', () => {
    const user = { id: 1 };
    expect(auth.setCurrentUser(user)).to.eql({
      type: types.SET_CURRENT_USER,
      user
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
      { type: types.LOGOUT_USER }
    ];

    const store = mockStore({ auth: { loggedInUser: null, isAuthenticated: false } });

    store.dispatch(auth.logout()).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { user: 'abc' }
      });
    });
  });
});
