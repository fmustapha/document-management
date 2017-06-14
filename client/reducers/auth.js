import lodash from 'lodash';
import { isAuthenticated, loggedInUser } from './InitialState';
import types from '../actions/actionTypes';

const initialState = {
  isAuthenticated,
  loggedInUser
};

/**
 *
 *
 * @export
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} containing authentication status and user details
 */
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGNUP_USER:
      return { isAuthenticated: true,
        loggedInUser: {
          data: { id: action.response.id, user: action.response.user } } };
    case types.SET_CURRENT_USER:
      return {
        isAuthenticated: true,
        loggedInUser: action.user
      };
    case types.LOGOUT_USER:
      return { isAuthenticated: false,
        loggedInUser: null };
    case types.VALIDATION_ERROR:
      return { ...state, error: action.response };
    default:
      return state;
  }
}
