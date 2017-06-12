import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

/**
 *
 *
 * @export
 * @param {Object} ComposedComponent
 * @returns {void}
 */
export default function (ComposedComponent) {
  /**
   *
   *
   * @class Authenticate
   * @extends {React.Component}
   */
  class Authenticate extends React.Component {
    /**
     *
     *
     *
     * @memberof Authenticate
     * @returns {void}
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        toastr.error('Error: You need to login to access this page');
        this.context.router.push('/login');
      }
    }

    /**
     *
     *
     * @param {Object} nextProps
     * @returns {void}
     * @memberof Authenticate
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    /**
     *
     *
     * @returns {void}
     *
     * @memberof Authenticate
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired
  };

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  /**
   *
   *
   * @param {any} state
   * @returns {object} containing authentication status
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
