import React from 'react';

/**
 *
 *
 * @class AboutPage
 * @extends {React.Component}
 */
class AboutPage extends React.Component {
  /**
   *
   *
   * @returns {void} JSX content
   *
   * @memberof AboutPage
   */
  render() {
    return (
      <div className="about" id="page-padding">
        <h1>About</h1>
        <p>This application enables you create and edit documents online</p>
        <h5>How to Sign up/ Log in</h5>
        <ol>
          <li>Click on Sign Up to register , you will be redirected to your dashboard</li>
          <li>Click on Login to Sign In (If you have already registered)</li>
          <li>  On the dashboard, view public documents and documents that belong to your role</li>
          <li>Click on My Account on the main menu, to view and update your account details</li>
        </ol>
        <h5>How to create/edit documents</h5>
        <ol>
          <li>click on Dashbaord on the main menu</li>
          <li> On the dashboard, view public documents and documents that belong to your role.</li>
          <li> Click on the blinking button at the bottom of the page to your right.</li>
          <li> On the create document page, enter the title of document, content and select</li>
          <li> the access of your document. Access can only be [public, private or role]</li>         
        </ol>
        <h5>Updating your account</h5>
        <ol>
          <li>
            Click on My Account on the main menu, to view and update your account details
          </li>
        </ol>
        <h5>Signing out</h5>
        <ol>
          <li>
            Click on the logout button on the main menu to sign out.
          </li>
        </ol>
      </div>
    );
  }
}

export default AboutPage;
