import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import types from './actionTypes';


export function listUsersSuccess(users) {
  return { type: types.LIST_USER, users };
}

export function listUsers() {
  return (dispatch) => {
    return axios.get('/users')
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

export function updateUser(id, userUpdate) {
  return (dispatch) => {
    return axios.put(`/users/${id}`, userUpdate)
    .then((response) => {
      console.log(response.data, 'response');
      dispatch({ type: types.UPDATE_USER, userUpdate });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: types.UPDATE_ERROR, error });
    });
  };
}

export function deleteUser(id) {
  return (dispatch) => {
    axios.delete(`/users/${id}`)
    .then((response) => {
      console.log('response', response.data);
      dispatch({ type: types.DELETE_USER, id });
    }).catch((error) => {
      console.log(error);
    });
  };
}
