import types from '../actions/actionTypes';
import initialState from '../reducers/InitialState';

/**
 *
 *
 * @export
 * @param {Object} [state=initialState.search]
 * @param {Object} action
 * @returns {Object} store's state
 */
export default function userReducer(state = initialState.search, action) {
  switch (action.type) {
    case types.SEARCH_USER:
      console.log(action, 'user search action');
      return Object.assign({}, state, { user: action.result });

    case types.SEARCH_DOCUMENT:
      console.log(action, 'doc search action');
      return Object.assign({}, state, { document: action.result });

    default:
      return state;
  }
}

