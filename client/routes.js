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
import ViewDocumentPage from './components/document/ViewDocumentPage';
import SearchPage from './components/search/SearchPage';


export default (
  <Route exact path="/dms/" component={Layout}>
    <IndexRoute component={HomePage} />
    <Route path="/dms/login" component={LoginPage} />
    <Route path="/dms/signup" component={SingUpPage} />
    <Route path="/dms/document/create" component={AddDocumentsPage} />
    <Route path="/dms/document" component={DocumentsListPage} />
    <Route path="/dms/document/:id" component={ViewDocumentPage} />
    <Route path="/dms/user" component={UsersPage} />
    <Route path="/dms/search" component={SearchPage} />
    <Route path="/dms/about" component={AboutPage} />
  </Route>
);

