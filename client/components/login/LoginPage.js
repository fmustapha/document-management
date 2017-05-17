import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as auth from '../../actions/auth';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: { email: '', password: '' }
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
    this.boundActionCreators = bindActionCreators(auth, this.props.dispatch);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      browserHistory.push('/');
    }
  }

  onEmailChange(event) {
    const login = this.state.login;
    login.email = event.target.value;
    this.setState({ login });
  }

  onPasswordChange(event) {
    const login = this.state.login;
    login.password = event.target.value;
    this.setState({ login });
  }

  onClickDone() {
    alert(`Saving ${this.state.login.email}
    and the content`);
    console.log(this.boundActionCreators);
    this.boundActionCreators.signIn(this.state.login);
  }

  render() {
    console.log(this.props);
    return (
      <div id="login-padding">
        <h3>Login</h3>
        <i className="material-icons prefix">email
            </i>
        <div className="row">
          <div className="input-field col s6">
            <input
              onChange={this.onEmailChange}
              value={this.state.login.email} type="text" className="col 5 s12" />
            <label htmlFor="email">Email</label>
          </div>
        </div>
          
        <i className="material-icons prefix">lock</i>
        <div className="row">
          <div className="input-field col s6">
            <input
              onChange={this.onPasswordChange}
              value={this.state.login.password} type="password" className="col 5 s12" />
            <label htmlFor="email">Password</label>
          </div>
        </div>
        <input
        type="submit"
        value="Done"
        className="waves-effect waves-light btn"
        onClick={this.onClickDone} />
      </div>
    );
  }
}

export default connect(
  state => ({ auth: state.auth })
)(LoginPage);

