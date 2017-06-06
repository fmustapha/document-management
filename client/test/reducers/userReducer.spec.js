import chai from 'chai';
import userReducer from '../../reducers/userReducer';
import types from '../../actions/actionTypes';

const expect = chai.expect;

describe('User Reducer', () => {
  describe('LIST_USERS', () => {
    it('should return a list of users available in the database', () => {
      const initialState = { users: {} };
      const action = { type: types.LIST_USERS,
        users:
        { users: {},
          totalUsers: 0,
          pagination: {}
        } };
      const finalState = userReducer(initialState, action);
      expect(finalState.users).to.eql(action.users.users);
    });
  });
  describe('UPDATE_USER', () => {
    it('should change the state of user with the update', () => {
      const initialState = { users: {} };
      const action = { type: types.UPDATE_USER,
        users:
        { users: {},
          totalUsers: 0,
          pagination: {}
        } };
      const finalState = userReducer(initialState, action);
      expect(finalState.users).to.eql(action.users.users);
    });
  });
});

