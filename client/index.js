import React from 'react';
import axios from 'axios';
import ReactDom from 'react-dom';
import jwtDecode from 'jwt-decode';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import './styles/styles.scss';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import store from './store/configureStore';
import { setCurrentUser } from './actions/auth';
import setAuthorizationToken from './utils/setAuthorizationToken';

// const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

