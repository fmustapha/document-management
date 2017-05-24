import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import types from './actionTypes';


export const listUsersSuccess = users => ({
  type: types.LIST_USERS, users });

export const deleteUserSuccess = user => ({
  type: types.DELETE_USER, user
});

export const UpdateUserSuccess = user => ({
  type: types.UPDATE_USER, user
});

export const adminUpdateUserSuccess = user => ({
  type: types.UPDATE_USER, user
});


/**
 *
 *
 * @export
 * @returns {Object} containing users and user details
 */
export function listUsers() {
  return dispatch => axios.get('/users/')
    .then(response => dispatch(listUsersSuccess(response.data.users))
    )
    .catch((error) => {
      console.log('Error', error);
    });
}

/**
 *
 *
 * @export
 * @param {Number} id
 * @param {Object} userUpdate
 * @returns {Object} containing successful message or error message
 */
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

export function adminUpdateUser(id, userRoleUpdate) {
  return (dispatch) => {
    return axios.put(`/users/${id}`, userRoleUpdate)
    .then(response => dispatch(adminUpdateUserSuccess(response.data.users))
    )
    .catch((error) => {
      console.log('Error', error);
    });
  };
}

export function deleteUser(id) {
  return (dispatch) => {
    axios.delete(`/users/${id}`)
    .then(response => dispatch(deleteUserSuccess(response.data.users))
    )
    .catch((error) => {
      console.log('Error', error);
    });
  };
}

