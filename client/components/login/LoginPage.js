import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as auth from '../../actions/auth';

/**
 *
 *
 * @class LoginPage
 * @extends {React.Component}
 */
class LoginPage extends React.Component {

  /**
   * Creates an instance of LoginPage.
   * @param {Object} props
   * @param {Object} context
   *
   * @memberof LoginPage
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: {
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
   * @memberof LoginPage
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.action.isAuthenticated) {
      browserHistory.push('/dms/document');
    }
  }

  /**
   *
   * @returns {void}
   * @param {Object} event
   *
   * @memberof LoginPage
   */
  onChange(event) {
    const login = this.state.login;
    const field = event.target.name;
    login[field] = event.target.value;
    this.setState(
      {
        login
      }
    );
  }

  /**
   *
   *
   * @returns {void}
   * @memberof LoginPage
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.actions.login(this.state.login)
    .then(() => {
      this.context.router.push('/dms/document');
    }).catch((error) => {
      console.log(error);
    });
  }

  /**
   *
   *
   * @returns {Object} contains JSX code
   *
   * @memberof LoginPage
   */
  render() {
    return (
      <div id="login-padding">
        <h3>login</h3>
        <form onSubmit={this.onSubmit} method="post">
          <i className="material-icons prefix">email
              </i>
          <div className="row">
            <div className="input-field col s6">
              <input
                onChange={this.onChange}
                value={this.state.login.email}
                name="email"
                type="text"
                className="col 5 s12" />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <i className="material-icons prefix">lock</i>
          <div className="row">
            <div className="input-field col s6">
              <input
                onChange={this.onChange}
                value={this.state.login.password}
                name="password"
                type="password"
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

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

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
 mapDispatchToProps)(LoginPage);

