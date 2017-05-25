import axios from 'axios';
import jwtDecode from 'jwt-decode';
import types from '../actions/actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {Object}
 */
export function setCurrentUser(user) {
  console.log(user, ' reached the login action');
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

/**
 *
 *
 * @export
 * @param {Object} loginDetails
 * @returns {Object}
 */
export function login(loginDetails) {
  return dispatch => axios.post('/users/login', loginDetails)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: types.VALIDATION_ERROR,
          response: error.response.data.message
        });
      });
}

/**
 * 
 * 
 * @export
 * @param {any} userDetails 
 * @returns
 */
export function signUp(userDetails) {
  return dispatch => axios.post('/users/', userDetails)
      .then((response) => {
        axios.defaults.headers.common.Authorization = response.data.token;
        console.log(response.data);
        dispatch({
          type: types.SIGNUP_USER,
          response: response.data
        });
        dispatch({
          type: types.CLEAR_ERROR
        });
      })
      .catch((error) => {
        dispatch({
          type: types.VALIDATION_ERROR,
          response: error.response.data.message
        });
      });
}

export function logout(userDetails) {
  return dispatch => axios.post('/users/logout')
      .then((response) => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch({
          type: types.LOGOUT_USER
        });
      })
      .catch((error) => {
        dispatch({
          type: types.LOGOUT_ERROR,
          response: error.response.data.message
        });
      });
}
