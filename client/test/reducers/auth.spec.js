import chai from 'chai';
import authReducer from '../../reducers/auth';
import types from '../../actions/actionTypes';

const expect = chai.expect;

describe('Auth Reducer', () => {
  describe('SIGNUP_USER', () => {
    it('should change the state when a user signs up', () => {
      const initialState = { isAuthenticated: false, loggedInUser: null };
      const action = { type: types.SIGNUP_USER, response: { id: 2, user: { } } };
      const finalState = authReducer(initialState, action);
      expect(finalState.isAuthenticated).to.eql(true);
      expect(finalState).to.not.eql(initialState);
    });
  });
  describe('SET_CURRENT_USER', () => {
    it('should update the state of loggedIn user with user details', () => {
      const initialState = { isAuthenticated: false, loggedInUser: null };
      const action = { type: types.SET_CURRENT_USER,
        user: {
          data:
          { id: 1,
            username: 'faithm',
            firstname: 'Faith',
            lastname: 'Mustapha',
            email: 'fyoiza@gmail.com',
            roleId: 1 } } };
      const finalState = authReducer(initialState, action);
      expect(finalState.isAuthenticated).to.eql(true);
      expect(finalState.loggedInUser.data).to.eql(action.user.data);
    });
  });
  describe('LOGOUT_USER', () => {
    it('should update the state of loggedIn user with null', () => {
      const initialState = { isAuthenticated: false,
        loggedInUser: { data:
        { id: 1,
          username: 'faithm',
          firstname: 'Faith',
          latname: 'Mustapha',
          email: 'fyoiza@gmail.com',
          roleId: 1
        } } };
      const action = { type: types.LOGOUT_USER };
      const finalState = authReducer(initialState, action);
      expect(finalState.isAuthenticated).to.eql(false);
      expect(finalState.loggedInUser).to.be.null;
    });
  });
  describe('LOGOUT_USER', () => {
    it('should update the state of loggedIn user with null', () => {
      const initialState = { isAuthenticated: false,
        loggedInUser: { data:
        { id: 1,
          username: 'faithm',
          firstname: 'Faith',
          latname: 'Mustapha',
          email: 'fyoiza@gmail.com',
          roleId: 1
        } } };
      const action = { type: types.LOGOUT_USER };
      const finalState = authReducer(initialState, action);
      expect(finalState.isAuthenticated).to.eql(false);
      expect(finalState.loggedInUser).to.be.null;
    });
  });
  describe('VALIDATION_ERROR', () => {
    it('should return validation error when user SignUp/LogIn fails', () => {
      const initialState = { isAuthenticated: false,
        loggedInUser: null };
      const action = { type: types.VALIDATION_ERROR, response: 'Validation Error' };
      const finalState = authReducer(initialState, action);
      expect(finalState.isAuthenticated).to.eql(false);
      expect(finalState.error).to.eql(action.response);
    });
  });
});
