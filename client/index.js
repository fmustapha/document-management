import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css';
import '../node_modules/materialize-css/dist/css/materialize.min.css';


render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
);

