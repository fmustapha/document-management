'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('/Users/andeladeveloper/Documents/Andela-projects/document-management/node_modules/redbox-react/lib/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('/Users/andeladeveloper/Documents/Andela-projects/document-management/node_modules/react-transform-catch-errors/lib/index.js');

var _index4 = _interopRequireDefault(_index3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _index5 = require('/Users/andeladeveloper/Documents/Andela-projects/document-management/node_modules/react-transform-hmr/lib/index.js');

var _index6 = _interopRequireDefault(_index5);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactRouter = require('react-router');

var _auth = require('../../actions/auth');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Header: {
    displayName: 'Header'
  }
};

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'client/components/common/Header.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'client/components/common/Header.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformHmrLibIndexJs2(_UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

/**
 *
 *
 * @class Header
 * @extends {React.Component}
 */
var Header = _wrapComponent('Header')(function (_React$Component) {
  _inherits(Header, _React$Component);

  /**
   * Creates an instance of Header.
   * @param {Object} props
   * @param {Object} context
   *
   * @memberof Header
   */
  function Header(props, context) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props, context));

    _this.logout = _this.logout.bind(_this);
    return _this;
  }

  /**
   *
   *
   * @param {Object} event
   *
   * @memberof Header
   * @returns {void}
   */


  _createClass(Header, [{
    key: 'logout',
    value: function logout(event) {
      event.preventDefault();
      this.props.actions.logout();
      _reactRouter.browserHistory.push('/dms/');
    }

    /**
     *
     *
     * @returns {Object} contains JSX code
     *
     * @memberof Header
     */

  }, {
    key: 'render',
    value: function render() {
      var isAuthenticated = this.props.auth.isAuthenticated;

      var userLinks = _react3.default.createElement(
        'ul',
        { id: 'nav-mobile', className: 'right hide-on-med-and-down' },
        _react3.default.createElement(
          'li',
          null,
          _react3.default.createElement(
            _reactRouter.Link,
            { to: '/dms/document', activeClassName: 'active' },
            'Dashboard'
          )
        ),
        _react3.default.createElement(
          'li',
          null,
          _react3.default.createElement(
            _reactRouter.Link,
            { to: '/dms/userUpdate', activeClassName: 'active' },
            'My Account'
          )
        ),
        _react3.default.createElement(
          'li',
          null,
          _react3.default.createElement(
            'a',
            { href: '', onClick: this.logout, activeClassName: 'active' },
            'Logout'
          )
        ),
        _react3.default.createElement(
          'li',
          null,
          _react3.default.createElement(
            _reactRouter.Link,
            { to: '/dms/search', activeClassName: 'active' },
            'Search'
          )
        ),
        _react3.default.createElement(
          _reactRouter.Link,
          { to: '/dms/about', className: 'waves-effect waves-light btn' },
          'Learn More'
        )
      );
      var guestLinks = _react3.default.createElement(
        'ul',
        { className: 'nav navbar-nav navbar-right' },
        _react3.default.createElement(
          'li',
          null,
          _react3.default.createElement(
            _reactRouter.Link,
            { to: '/dms/login', activeClassName: 'active' },
            'Login'
          )
        ),
        _react3.default.createElement(
          'li',
          null,
          _react3.default.createElement(
            _reactRouter.Link,
            { to: '/dms/signup', activeClassName: 'active' },
            'SignUp'
          )
        ),
        _react3.default.createElement(
          'li',
          null,
          _react3.default.createElement(
            'a',
            { href: 'https://github.com/andela-fmustapha/document-management' },
            'GitHub'
          )
        ),
        _react3.default.createElement(
          _reactRouter.Link,
          { to: '/dms/about', className: 'waves-effect waves-light btn' },
          'Learn More'
        )
      );
      var adminLinks = _react3.default.createElement(
        'ul',
        { id: 'nav-mobile', className: 'right hide-on-med-and-down' },
        _react3.default.createElement(
          'li',
          null,
          _react3.default.createElement(
            _reactRouter.Link,
            { to: '/dms/document', activeClassName: 'active' },
            'Dashboard'
          )
        ),
        _react3.default.createElement(
          'li',
          null,
          _react3.default.createElement(
            _reactRouter.Link,
            { to: '/dms/user', activeClassName: 'active' },
            'Manage Users'
          )
        ),
        _react3.default.createElement(
          'li',
          null,
          _react3.default.createElement(
            _reactRouter.Link,
            { to: '/dms/userUpdate', activeClassName: 'active' },
            'My Account'
          )
        ),
        _react3.default.createElement(
          'li',
          null,
          _react3.default.createElement(
            _reactRouter.Link,
            { to: '/dms/search', activeClassName: 'active' },
            'Search'
          )
        ),
        _react3.default.createElement(
          'li',
          null,
          _react3.default.createElement(
            'a',
            { href: '', onClick: this.logout, activeClassName: 'active' },
            'Logout'
          )
        )
      );

      return _react3.default.createElement(
        'div',
        null,
        _react3.default.createElement(
          'div',
          { id: 'nav-support' },
          '.'
        ),
        _react3.default.createElement(
          'nav',
          null,
          _react3.default.createElement(
            'div',
            { className: 'nav-wrapper teal darken-4' },
            _react3.default.createElement(
              _reactRouter.IndexLink,
              { 'page-padding': true, to: '/dms/', className: 'brand-logo' },
              'ODAHI DMS'
            ),
            _react3.default.createElement(
              'div',
              { id: 'nav-mobile', className: 'right hide-on-med-and-down' },
              isAuthenticated ? userLinks : guestLinks
            )
          )
        ),
        _react3.default.createElement(
          'div',
          { id: 'nav-support' },
          '.'
        )
      );
    }
  }]);

  return Header;
}(_react3.default.Component));

// Header.contextTypes = {
//   router: PropTypes.object.isRequired
// };

Header.propTypes = {
  actions: _react3.default.PropTypes.object.isRequired,
  auth: _react3.default.PropTypes.object.isRequired
};
/**
 *
 *
 * @param {any} dispatch
 * @returns {Object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(auth, dispatch)
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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Header);