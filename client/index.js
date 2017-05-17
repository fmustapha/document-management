import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import './styles/styles.scss';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import store from './store/configureStore';

// const store = configureStore();

if (window.localStorage.getItem('token')) {
  axios.defaults.headers.common.authorization = window.localStorage.getItem('token');
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

