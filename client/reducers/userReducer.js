import types from '../actions/actionTypes';
import initialState from '../reducers/InitialState';

/**
 *
 *
 * @export
 * @param {Object} [state=initialState.users]
 * @param {Object} action
 * @returns {Object} store's state
 */
export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.LIST_USERS:
      return Object.assign({}, state, { users: action.users.users,
        totalUsers: action.users.totalUsers,
        pagination: action.users.pagination }
        );

    case types.UPDATE_USER:
      return Object.assign({}, state, { userProfile: action.userUpdate });


    case types.DELETE_USER:
      return Object.assign({}, state, {
        users: {
          ...state.users,
          rows: [...state.users.rows].filter((user) => {
            if (user.id !== action.id) {
              return user;
            }
          })
        },
        totalUsers: state.totalUsers - 1,
      });
    default:
      return state;
  }
}

