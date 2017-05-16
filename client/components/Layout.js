import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

class Layout extends React.Component {
  render() {
    return (
      <div className="header">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}


Layout.propTypes = {
  children: React.PropTypes.object.isRequired
};
export default Layout;
