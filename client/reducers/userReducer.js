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
      return Object.assign({}, state, { rows: action.users.users.rows,
        totalUsers: action.users.totalUsers,
        pagination: action.users.pagination }
        );

    case types.UPDATE_USER:
      return Object.assign({}, state, { userProfile: action.userUpdate });

    case types.UPDATE_USER_LIST:
      return Object.assign({}, state, { rows: [...state.rows].map((user) => {
        if (user.id === action.userUpdate.id) {
          return { ...user, roleId: parseInt(action.userUpdate.roleId, 10) };
        }
        return user;
      }),
      });

    case types.VIEW_USER:
      return Object.assign({}, state, { userProfile: action.getUser });

    case types.DELETE_USER:
      return Object.assign({}, state, {
        rows: [...state.rows].filter(user => user.id !== action.id)
      });
    default:
      return state;
  }
}

