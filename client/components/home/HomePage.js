import React from 'react';
import { Link } from 'react-router';

/**
 *
 *
 * @class HomePage
 * @extends {React.Component}
 */
class HomePage extends React.Component {

  /**
   *
   *
   * @returns {Object} contains JSX code
   *
   * @memberof HomePage
   */
  render() {
    return (
        <div id="bg">
          <div id="main"></div>
          <h1>ODAHI DMS</h1>
          <h3>Create and edit your documents in a click...</h3>
        </div>
    );
  }
}

export default HomePage;
