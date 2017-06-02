import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
// import 'jquery-validation';
import * as auth from '../../actions/auth';

/**
 *
 *
 * @class SignUpPage
 * @extends {React.Component}
 */
class SignUpPage extends React.Component {
  /**
   * Creates an instance of SignUpPage.
   * @returns {void}
   * @param {any} props
   * @param {any} context
   *
   * @memberof SignUpPage
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      signUp: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '' }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   *
   * @returns {void}
   * @param {any} nextProps
   *
   * @memberof SignUpPage
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      browserHistory.push('/dms/document');
    } else if (nextProps.auth.error) {
      toastr.error(nextProps.auth.error);
    }
//     $('form').validate();

//     define(["jquery", "jquery.validate"], function( $ ) {
//     $("form").validate();
// });
  }

  /**
   *
   * @returns {void}
   * @param {any} event
   *
   * @memberof SignUpPage
   */
  onChange(event) {
    const signUp = this.state.signUp;
    const field = event.target.name;
    signUp[field] = event.target.value;
    this.setState(
      {
        signUp
      }
    );
  }

  /**
   *
   *
   * @returns {void}
   * @memberof SignUpPage
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.actions.signUp(this.state.signUp);
    // .then(() => {
    //   if (this.props.auth.error) {
    //     toastr.success('error signed up');
    //   } else {
    //     toastr.success('successfully signed up');
    //   }
    // })
    // .catch(() => {
    //   toastr.error('Oops. Error occured during your sign up. Try again :)');
    // });
  }

  /**
   *
   *
   * @returns {Object} contains JSX code
   *
   * @memberof SignUpPage
   */
  render() {
    return (
      <div id="login-padding">
        <h3>Sign Up</h3>
        <form onSubmit={this.onSubmit} method="post">
          <div>
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input
                onChange={this.onChange}
                value={this.state.signUp.Username}
                name="username"
                type="text"
                className="col 5 s12" required />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div>
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input
                onChange={this.onChange}
                value={this.state.signUp.Firstname}
                name="firstname"
                type="text"
                className="col 5 s12" required />
              <label htmlFor="firstname">Firstname</label>
            </div>
          </div>
          <div>
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input
                onChange={this.onChange}
                value={this.state.signUp.Lastname}
                name="lastname"
                type="text"
                className="col 5 s12" required />
              <label htmlFor="lastname">Lastname</label>
            </div>
          </div>
          <div>
            <div className="input-field col s6">
              <i className="material-icons prefix">email</i>
              <input
                onChange={this.onChange}
                value={this.state.signUp.email}
                type="email"
                name="email"
                className="col 5 s12" />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div>
            <div className="input-field col s6">
              <i className="material-icons prefix">lock</i>
              <input
                onChange={this.onChange}
                value={this.state.signUp.password}
                type="password"
                name="password"
                className="col 5 s12" required />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="button-right">
          <input
          type="submit"
          value="Done"
          className="waves-effect waves-light btn "
          />
          </div>
        </form>
      </div>
    );
  }
}

/**
 *
 *
 * @param {any} dispatch
 * @returns {Object} action
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(auth, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

SignUpPage.propTypes = {
  actions: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps,
  mapDispatchToProps)(SignUpPage);

