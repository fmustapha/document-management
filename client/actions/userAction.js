import axios from 'axios';
import types from './actionTypes';
import { setCurrentUser } from './auth';

export const listUsersSuccess = users => ({
  type: types.LIST_USERS, users });

export const deleteUserSuccess = id => ({
  type: types.DELETE_USER, id
});

export const updateUserSuccess = user => ({
  type: types.UPDATE_USER, user
});

export const viewUserSuccess = user => ({
  type: types.VIEW_USER, user
});

export const adminUpdateUserSuccess = user => ({
  type: types.UPDATE_USER, user
});


/**
 *
 * @param {Number} limit
 * @param {Number} offset
 * @export
 * @returns {func} cdispatch
 */
export function listUsers(limit, offset) {
  return dispatch => axios.get(`/users/?limit=${limit}&offset=${offset}`)
    .then((response) => {
      const users = response.data.users;
      const totalUsers = response.data.totalUsers;
      const pagination = response.data.pagination;
      const userList = { users, totalUsers, pagination };
      dispatch(listUsersSuccess(userList));
    })
    .catch((error) => {
      dispatch({ type: types.LIST_USER_ERROR, error });
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
      dispatch({ type: types.UPDATE_USER_LIST, id, userUpdate: { id, ...response.data.updatedUser } });
      dispatch(setCurrentUser({ data: { id, ...response.data.updatedUser } }));
    }).catch((error) => {
      dispatch({ type: types.UPDATE_ERROR, error });
    });
  };
}

/**
 *
 *
 * @export
 * @param {Number} id
 * @param {Object} user
 * @returns {func}
 */
export function viewUser(id, user) {
  return (dispatch) => {
    return axios.get(`/users/${id}`, user)
    .then((response) => {
      dispatch(dispatch(viewUserSuccess(response.data)));
    }).catch((error) => {
      dispatch({ type: types.VIEW_ERROR, error });
    });
  };
}

/**
 *
 *
 * @export
 * @param {Number} id
 * @returns {Object} containing successful message or error message
 */
export function deleteUser(id) {
  return (dispatch) => {
    return axios.delete(`/users/${id}`)
    .then(() => dispatch(deleteUserSuccess(id))
    )
    .catch((error) => {
      dispatch({ type: types.DELETE_USER_ERROR, error });
    });
  };
}

