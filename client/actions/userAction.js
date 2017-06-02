import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import types from './actionTypes';


export const listUsersSuccess = users => ({
  type: types.LIST_USERS, users });

export const deleteUserSuccess = id => ({
  type: types.DELETE_USER, id
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
    .then(response => dispatch(listUsersSuccess({ users: response.data.users,
      totalUsers: response.data.totalUsers
    }))
    )
    .catch((error) => {
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
      dispatch({ type: types.UPDATE_USER, userUpdate: { id, ...response.data.updatedUser } });
    }).catch((error) => {
      dispatch({ type: types.UPDATE_ERROR, error });
    });
  };
}

export function deleteUser(id) {
  return (dispatch) => {
    return axios.delete(`/users/${id}`)
    .then(() => dispatch(deleteUserSuccess(id))
    )
    .catch((error) => {
    });
  };
}

