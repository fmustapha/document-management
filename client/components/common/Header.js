import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink, browserHistory } from 'react-router';
import * as auth from '../../actions/auth';

/**
 *
 *
 * @class Header
 * @extends {React.Component}
 */
class Header extends React.Component {

  /**
   * Creates an instance of Header.
   * @param {Object} props
   * @param {Object} context
   *
   * @memberof Header
   */
  constructor(props, context) {
    super(props, context);
    this.logout = this.logout.bind(this);
  }

  /**
   *
   *
   * @param {Object} event
   *
   * @memberof Header
   * @returns {void}
   */
  logout(event) {
    event.preventDefault();
    this.props.actions.logout();
    browserHistory.push('/dms/');
  }

  /**
   *
   *
   * @returns {Object} contains JSX code
   *
   * @memberof Header
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/dms/document" activeClassName="active">Dashboard</Link></li>
        <li><Link to="/dms/user/account/:id" activeClassName="active">My Account</Link></li>
        <li><Link to="/dms/users" activeClassName="active">Users</Link></li>
        <li><a href="" onClick={this.logout} activeClassName="active">Logout</a></li>
        <li><Link to="/dms/search" activeClassName="active">Search</Link></li>
        <Link to="/dms/about" className="waves-effect waves-light btn">Learn More</Link>
      </ul>
      );
    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/dms/login" activeClassName="active">Login</Link></li>
        <li><Link to="/dms/signup" activeClassName="active">SignUp</Link></li>
        <li><a href="https://github.com/andela-fmustapha/document-management">GitHub</a></li>
        <Link to="/dms/about" className="waves-effect waves-light btn">Learn More</Link>
      </ul>
    );
    const adminLinks = (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/dms/document" activeClassName="active">Dashboard</Link></li>
        <li><Link to="/dms/user" activeClassName="active">Manage Users</Link></li>
        <li><Link to="/dms/userUpdate" activeClassName="active">My Account</Link></li>
        <li><Link to="/dms/search" activeClassName="active">Search</Link></li>
        <li><a href="" onClick={this.logout} activeClassName="active">Logout</a></li>
      </ul>
    );

    return (
      <div>
        <div id="nav-support">.</div>
        <nav>
          <div className="nav-wrapper teal darken-4">
            <IndexLink page-padding to="/dms/" className="brand-logo">ODAHI DMS</IndexLink>         
          <div id="nav-mobile" className="right hide-on-med-and-down">
            { isAuthenticated ? userLinks : guestLinks }
          </div>
          </div>
        </nav>
        <div id="nav-support">.</div>
      </div>);
  }
}

// Header.contextTypes = {
//   router: PropTypes.object.isRequired
// };

Header.propTypes = {
  actions: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired
};
/**
 *
 *
 * @param {any} dispatch
 * @returns {Object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(auth, dispatch)
  };
}

/**
 *
 *
 * @param {any} state
 * @returns {Object} auth
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

