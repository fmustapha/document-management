import React from 'react';
import { Link , browserHistory } from 'react-router';
import toastr from 'toastr';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import { bindActionCreators } from 'redux';
import * as userAction from '../../actions/userAction';

import { addFlashMessage } from '../../actions/flashMessages';

/**
 *
 *
 * @class UserAccountPage
 * @extends {React.Component}
 */
class UserAccountPage extends React.Component {
  /**
   * Creates an instance of ViewDocumentPage.
   * @param {Object} props
   * @param {Object} context
   *
   * @memberof ViewDocumentPage
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      account: {
        username: props.username,
        firstname: props.firstname,
        lastname: props.lastname,
        email: props.email,
        password: props.password
      },
    };
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   *
   * @param {Object} event
   * @returns {void}
   * @memberof UserAccountPage
   */
  onChange(event) {
    const account = this.state.account;
    const field = event.target.name;
    account[field] = event.target.value;
    this.setState(
      {
        account
      }
    );
  }


  /**
   *
   *
   * @returns {void}
   * @memberof UserAccountPage
   */
  onClickBack() {
    this.context.router.push('/dms/');
  }

onClickEdit() {
    this.props.userUpdateAction(this.props.id, this.state.account)
    .then(() => toastr.success('User Successfully Updated'))
    .catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to update user' });
      toastr.error(
        'Unable to update user');
    });
    this.props.endEdit();
  }
userUpdateAction
  /**
   *
   *
   * @returns {Object} contains JSX code
   *
   * @memberof UserAccountPage
   */
  render() {
    return (
      <div className="">
      <div id="account">
        <h3>My Account</h3>
        <form onSubmit={this.onClickEdit} method="post" id="form">
          <div className="" >
            <div className="input-field col s6">
              <i className="material-icons prefix pad-icons">account_circle</i>
              <input
                onChange={this.onChange}
                value={this.state.account.username}
                name="username"
                type="text"
                className="col 5 s12" />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="">
            <div className="input-field col s6">
              <i className="material-icons prefix pad-icons">account_circle</i>
              <input
                onChange={this.onChange}
                value={this.state.account.firstname}
                name="firstname"
                type="text"
                className="col 5 s12" />
              <label htmlFor="firstname">Firstname</label>
            </div>
          </div>
          <div className="">
            <div className="input-field col s6">
              <i className="material-icons prefix pad-icons">account_circle</i>
              <input
                onChange={this.onChange}
                value={this.state.account.lastname}
                name="lastname"
                type="text"
                className="col 5 s12" />
              <label htmlFor="lastname">Lastname</label>
            </div>
          </div>
          <div className="">
            <div className="input-field col s6">
              <i className="material-icons prefix pad-icons">email</i>
              <input
                onChange={this.onChange}
                value={this.state.account.email}
                type="text"
                name="email"
                className="col 5 s12" />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="">
            <div className="input-field col s6">
              <i className="material-icons prefix pad-icons">lock</i>
              <input
                onChange={this.onChange}
                value={this.state.account.password}
                type="password"
                name="password"
                className="col 5 s12" />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <input
          type="submit"
          value="Edit"
          className="waves-effect waves-light btn"
          />
          <input
          type="submit"
          value="Back"
          className="waves-effect waves-light btn"
          />
        </form>
          <div className="account-side">
          </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.loggedInUser.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userUpdateAction: bindActionCreators(userAction.updateUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountPage);
