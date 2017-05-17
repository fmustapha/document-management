import axios from 'axios';

export function signIn(loginDetails) {
  return (dispatch) => axios.post('/users/login', loginDetails)
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('id', response.data.id);
        axios.defaults.headers.common.authorization = response.data.token;
        console.log(response.data);
        dispatch({
          type: 'LOGIN_USER',
          response: response.data
        });
        dispatch({
          type: 'CLEAR_ERROR'
        });

      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: 'VALIDATION_ERROR',
          response: error.response.data.message
        });
      });
}

export function signUp(userDetails) {
  return (dispatch) => axios.post('/users/', userDetails)
      .then((response) => {
        axios.defaults.headers.common.Authorization = response.data.token;
        console.log(response.data);
        dispatch({
          type: 'SIGNUP_USER',
          response: response.data
        });
        dispatch({
          type: 'CLEAR_ERROR'
        });
      })
      .catch((error) => {
        dispatch({
          type: 'VALIDATION_ERROR',
          response: error.response.data.message
        });
      });
}

export function logOut(userDetails) {
  return (dispatch) => axios.post('/users/logout', userDetails)
      .then((response) => {
        axios.defaults.headers.common.Authorization = response.data.token;
        console.log(response.data);
        dispatch({
          type: 'LOGOUT_USER',
          response: response.data
        });
        dispatch({
          type: 'CLEAR_ERROR'
        });
      })
      .catch((error) => {
        dispatch({
          type: 'VALIDATION_ERROR',
          response: error.response.data.message
        });
      });
}
