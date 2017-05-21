import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
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
    if (nextProps.action.isAuthenticated) {
      browserHistory.push('/dms/document');
    }
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
  onSubmit() {
    console.log(this.state.signUp);
    this.props.actions.signUp(this.state.signUp)
    .then(() => {
      this.context.router.push('/dms/');
    }).catch((error) => {
      console.log(error);
    });
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
        <h3>SignUp</h3>
        <form onSubmit={this.onSubmit} method="post">
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix pad-icons">account_circle</i>
              <input
                onChange={this.onChange}
                value={this.state.signUp.Username}
                name="username"
                type="text"
                className="col 5 s12" />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix pad-icons">account_circle</i>
              <input
                onChange={this.onChange}
                value={this.state.signUp.Firstname}
                name="firstname"
                type="text"
                className="col 5 s12" />
              <label htmlFor="firstname">Firstname</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix pad-icons">account_circle</i>
              <input
                onChange={this.onChange}
                value={this.state.signUp.Lastname}
                name="lastname"
                type="text"
                className="col 5 s12" />
              <label htmlFor="lastname">Lastname</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix pad-icons">email</i>
              <input
                onChange={this.onChange}
                value={this.state.signUp.email}
                type="text"
                name="email"
                className="col 5 s12" />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix pad-icons">lock</i>
              <input
                onChange={this.onChange}
                value={this.state.signUp.password}
                type="password"
                name="password"
                className="col 5 s12" />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <input
          type="submit"
          value="Done"
          className="waves-effect waves-light btn"
          />
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


export default connect(null,
  mapDispatchToProps)(SignUpPage);

