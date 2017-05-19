import * as types from '../actions/actionTypes';

const initialState = {
  users: [],
  isListing: false,
  currentDocuments: null,
  userDocuments: []
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.LIST_USERS: {
      return Object.assign({}, state, {
        users: [...state.users, action.users],
        isListing: false
      });
    }

    case types.UPDATE_USER: {
      return Object.assign({}, state, {
        users: [...state.users, action.users],
        isListing: false
      });
    }

    case types.DELETE_USER: {
      console.log(Object.assign({}, state, { users: action.users }));
      return Object.assign({}, state, { isListing: false });
    }
    default:
      return state;
  }
}
