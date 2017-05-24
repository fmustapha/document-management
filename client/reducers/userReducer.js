import types from '../actions/actionTypes';
import initialState from '../reducers/InitialState';

export default function userReducer(state = initialState.users, action) {
  console.log(initialState.users, 'hello');
  switch (action.type) {
    case types.LIST_USERS:
      return action.users;

    case types.UPDATE_USER:
      return Object.assign({}, state, {
        users: [...state.users, action.users],
        isListing: false
      });


    // case types.DELETE_USER:
    //   return Object.assign({}, state, {action.user});

    default:
      return state;
  }
}

