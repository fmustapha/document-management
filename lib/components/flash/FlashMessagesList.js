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

var _FlashMessage = require('./FlashMessage.jsx');

var _FlashMessage2 = _interopRequireDefault(_FlashMessage);

var _flashMessages = require('../../actions/flashMessages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  FlashMessagesList: {
    displayName: 'FlashMessagesList'
  }
};

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'client/components/flash/FlashMessagesList.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'client/components/flash/FlashMessagesList.js',
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
 * @class FlashMessagesList
 * @extends {React.Component}
 */
var FlashMessagesList = _wrapComponent('FlashMessagesList')(function (_React$Component) {
  _inherits(FlashMessagesList, _React$Component);

  function FlashMessagesList() {
    _classCallCheck(this, FlashMessagesList);

    return _possibleConstructorReturn(this, (FlashMessagesList.__proto__ || Object.getPrototypeOf(FlashMessagesList)).apply(this, arguments));
  }

  _createClass(FlashMessagesList, [{
    key: 'render',

    /**
     *
     *
     * @returns {void} jsx content
     *
     * @memberof FlashMessagesList
     */
    value: function render() {
      var _this2 = this;

      var messages = this.props.messages.map(function (message) {
        return _react3.default.createElement(_FlashMessage2.default, {
          key: message.id,
          message: message,
          deleteFlashMessage: _this2.props.deleteFlashMessage });
      });
      return _react3.default.createElement(
        'div',
        null,
        messages
      );
    }
  }]);

  return FlashMessagesList;
}(_react3.default.Component));

FlashMessagesList.propTypes = {
  messages: _react3.default.PropTypes.array.isRequired,
  deleteFlashMessage: _react3.default.PropTypes.func.isRequired
};

/**
 *
 *
 * @param {object} state
 * @returns {object} message
 */
function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { deleteFlashMessage: _flashMessages.deleteFlashMessage })(FlashMessagesList);