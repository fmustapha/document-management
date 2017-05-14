import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => (
  <div>
    <div id="nav-support">.</div>
    <nav>
      <div className="nav-wrapper teal darken-4">
        <IndexLink to="/" activeClassName="brand-logo">ODAHI DMS</IndexLink>
        {/* <form>
          <div className="right input-field">
            <input id="search" type="search" required></input>
            <label className="label-icon" for="search">
              <i className="material-icons">search</i></label>
            <i className="material-icons">close</i>
          </div>
        </form>*/}
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="Login.js">Login</a></li>
          <li><Link to="/document" activeClassName="active">Documents</Link></li>
          <li><a href="badges.html">Components</a></li>
          <li><a href="https://github.com/andela-fmustapha/document-management">GitHub</a></li>
          <Link to="/about" className="waves-effect waves-light btn">Learn More</Link>
        </ul>
        </div>
    </nav>
    <div id="nav-support">.</div>
    </div>
  );

export default Header;
