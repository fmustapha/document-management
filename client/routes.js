import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import AddDocumentsPage from './components/document/AddDocumentsPage';
import DocumentsListPage from './components/document/DocumentListPage';
import LoginPage from './components/login/LoginPage';
import SingUpPage from './components/signup/SignUpPage';
import UsersPage from './components/user/UsersPage';
import SearchPage from './components/search/SearchPage';


export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={LoginPage} />
    <Route path="signUp" component={SingUpPage} />
    <Route path="addDocument" component={AddDocumentsPage} />
    <Route path="document" component={DocumentsListPage} />
    <Route path="user" component={UsersPage} />
    <Route path="search" component={SearchPage} />
    <Route path="about" component={AboutPage} />
  </Route>
);

