import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as auth from '../../actions/auth';

class SignUpPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      signUp: { userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '' }
    };
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
    this.boundActionCreators = bindActionCreators(auth, this.props.dispatch);
  }

  onUserNameChange(event) {
    const signUp = this.state.signUp;
    signUp.email = event.target.value;
    this.setState({ signUp });
  }
  
  onFirstNameChange(event) {
    const signUp = this.state.signUp;
    login.email = event.target.value;
    this.setState({ login });
  }

  onLastNameChange(event) {
    const signUp = this.state.signUp;
    signUp.email = event.target.value;
    this.setState({ signUp });
  }

  onEmailChange(event) {
    const signUp = this.state.signUp;
    signUp.email = event.target.value;
    this.setState({ signUp });
  }

  onPasswordChange(event) {
    const signUp = this.state.signUp;
    signUp.password = event.target.value;
    this.setState({ signUp });
  }

  onClickDone() {
    alert(`Saving ${this.state.signUp.email}
    and the content`);
    console.log(this.boundActionCreators);
    this.boundActionCreators.signUp(this.state.signUp);
  }

  render() {
    console.log(this.props);
    return (
      <div id="page-center-padding">
        <h3>SignUp</h3>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input
              onChange={this.onUserNameChange}
              value={this.state.signUp.UserName} type="text" className="col 5 s12" />
            <label htmlFor="userName">Username</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input
              onChange={this.onFirstNameChange}
              value={this.state.signUp.FirstName} type="text" className="col 5 s12" />
            <label htmlFor="firstName">FirstName</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input
              onChange={this.onLastNameChange}
              value={this.state.signUp.LastName} type="text" className="col 5 s12" />
            <label htmlFor="lastName">LastName</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">email</i>
            <input
              onChange={this.onEmailChange}
              value={this.state.signUp.email} type="text" className="col 5 s12" />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">lock</i>
            <input
              onChange={this.onPasswordChange}
              value={this.state.signUp.password} type="password" className="col 5 s12" />
            <label htmlFor="password">Password</label>
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
)(SignUpPage);

