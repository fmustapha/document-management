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
    it(`should change the state of
    userProfile in the store with the update`, () => {
      const initialState = { userProfile: {} };
      const action = { type: types.UPDATE_USER,
        userUpdate:
        {
          id: 5,
          username: 'mikel'
        } };

      const expectedState = {
        userProfile: {
          id: 5,
          username: 'mikel'
        }
      };
      const newState = userReducer(initialState, action);
      expect(newState).to.eql(expectedState);
    });
  });

  describe('DELETE_USER', () => {
    it('should update the state with a list of users apart from the deleted user', () => {
      const initialState = { users: { rows: {
        id: 23,
        username: 'Galy',
        firstname: 'Galy',
        lastname: 'Yim',
        email: 'galy@gmail.com',
        roleId: 2,
        createdAt: '2017-05-31T16:24:33.529Z',
        updatedAt: '2017-05-31T16:24:33.529Z'
      }
      }
      };
      const action = { type: types.DELETE_USER, id: 23 };
      const expectedState = {
        users: { rows: [] }
      };
      const newState = userReducer(initialState, action);
      expect(newState.users).to.eql(expectedState.users);
    });
  });
});

