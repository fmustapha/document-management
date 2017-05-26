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

exports.default = function (ComposedComponent) {
  var Authenticate = _wrapComponent('Authenticate')(function (_React$Component) {
    _inherits(Authenticate, _React$Component);

    function Authenticate() {
      _classCallCheck(this, Authenticate);

      return _possibleConstructorReturn(this, (Authenticate.__proto__ || Object.getPrototypeOf(Authenticate)).apply(this, arguments));
    }

    _createClass(Authenticate, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (!this.props.isAuthenticated) {
          this.props.addFlashMessage({
            type: 'error',
            text: 'You need to login to access this page'
          });
          this.context.router.push('/login');
        }
      }
    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate(nextProps) {
        if (!nextProps.isAuthenticated) {
          this.context.router.push('/');
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react3.default.createElement(ComposedComponent, this.props);
      }
    }]);

    return Authenticate;
  }(_react3.default.Component));

  Authenticate.propTypes = {
    isAuthenticated: _react3.default.PropTypes.bool.isRequired,
    addFlashMessage: _react3.default.PropTypes.func.isRequired
  };

  Authenticate.contextTypes = {
    router: _react3.default.PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return (0, _reactRedux.connect)(mapStateToProps, { addFlashMessage: _flashMessages.addFlashMessage })(Authenticate);
};

var _reactRedux = require('react-redux');

var _flashMessages = require('../actions/flashMessages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Authenticate: {
    displayName: 'Authenticate',
    isInFunction: true
  }
};

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'client/utils/requireAuth.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'client/utils/requireAuth.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformHmrLibIndexJs2(_UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}