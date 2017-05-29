import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import AddDocumentsPage from './components/document/AddDocumentsPage';
import DocumentsListPage from './components/document/DocumentListPage';
import LoginPage from './components/login/LoginPage';
import SignUpPage from './components/signup/SignUpPage';
// import UserListPage from './components/user/UserListPage';
import ViewDocumentPage from './components/document/ViewDocumentPage';
import UpdateDocumentPage from './components/document/UpdateDocumentPage';
// import ViewUserPage from './components/user/ViewUserPage';
import UserAccountPage from './components/user/UserAccountPage';
import UserListPage from './components/user/UserListPage';
import SearchPage from './components/search/SearchPage';


export default (
  <Route exact path="/dms/" component={Layout}>
    <IndexRoute component={HomePage} />
    <Route path="/dms/login" component={LoginPage} />
    <Route path="/dms/signup" component={SignUpPage} />
    <Route path="/dms/document/create" component={AddDocumentsPage} />
    <Route path="/dms/document" component={DocumentsListPage} />
    <Route path="/dms/document/:id" component={ViewDocumentPage} />
    <Route path="/dms/users" component={UserListPage} />
    <Route path="/dms/user/account/:id" component={UserAccountPage} />
    <Route path="/dms/document/update/:id" component={UpdateDocumentPage} />
    <Route path="/dms/search" component={SearchPage} />
    <Route path="/dms/about" component={AboutPage} />
  </Route>
);

