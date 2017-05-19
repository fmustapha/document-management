import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import types from './actionTypes';


export function listUsersSuccess(users) {
  return { type: types.LIST_USER, users };
}

export function listUsers() {
  return (dispatch) => {
    axios.get('/users')
    .then((response) => {
      console.log(response.data.user);
      const users = response.data.user;
      dispatch(listUsersSuccess(users));
    })
    .catch((error) => {
      console.log(error);
    });
  };
  // return { type: types.LIST_USERS };
}

export function updateUser(user) {
  return { type: types.UPDATE_USER, user };
}

export function deleteUser(user) {
  return { type: types.DELETE_USER, user };
}
