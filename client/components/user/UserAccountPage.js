import React from 'react';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../../actions/userAction';
import * as auth from '../../actions/auth';

/**
 *
 *
 * @class UserAccountPage
 * @extends {React.Component}
 */
export class UserAccountPage extends React.Component {
  /**
   * Creates an instance of UserAccountPage.
   * @param {Object} props
   * @param {Object} context
   *
   * @memberof UserAccountPage
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      account: {
        username: props.user.username,
        firstname: props.user.firstname,
        lastname: props.user.lastname,
        email: props.user.email,
        password: ''
      }
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
   * @param {Object} event
   * @returns {void}
   * @memberof UserAccountPage
   */
  onClickEdit(event) {
    event.preventDefault();
    if (this.state.account.password.length < 1) {
      delete this.state.account.password;
    }
    this.props.userUpdateAction(this.props.params.id, this.state.account)
    .then(() => {
      toastr.success('User Successfully Updated');
    })
      .catch(() => {
        toastr.error(
          'An error occurred, user account was not updated');
      });
  }


/**
   *
   *
   * @returns {void}
   * @memberof UserAccountPage
   */
  onClickBack() {
    browserHistory.goBack();
  }

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
                <label htmlFor="Username" className="active">Username</label>
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
                <label htmlFor="firstname" className="active">Firstname</label>
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
                <label htmlFor="lastname" className="active">Lastname</label>
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
                <label htmlFor="email" className="active">Email</label>
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
                <label
                htmlFor="password">
                Enter new password to change the current one</label>
              </div>
            </div>
            <div className="right">
              <span>
                <input
          type="submit"
          value="Update"
          onClick={() => this.onClickEdit}
          className="waves-effect waves-light btn"
          />
              </span>
              <span>
                <input
              type="button"
              value="Back"
              onClick={this.onClickBack}
              className="waves-effect waves-light btn"
              />
              </span>
            </div>
          </form>
          <div className="account-side">
          </div>
        </div>
      </div>
    );
  }
}

UserAccountPage.prpTypes = {
  userUpdateAction: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.func.isRequired,
  user: React.PropTypes.func.isRequired,
  actions: React.PropTypes.func.isRequired
};

/**
 *
 *
 * @param {Object} state
 * @returns {Object} containing user details
 */
function mapStateToProps(state) {
  return {
    user: state.auth.loggedInUser.data,
    userUpdate: state.users.userProfile
  };
}

/**
 *
 *
 * @param {any} dispatch
 * @returns {Object} containing user authentication and update details
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(auth, dispatch),
    userUpdateAction: bindActionCreators(userAction.updateUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountPage);
