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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  FlashMessage: {
    displayName: 'FlashMessage'
  }
};

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'client/components/flash/FlashMessage.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'client/components/flash/FlashMessage.js',
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
 * @class FlashMessage
 * @extends {React.Component}
 */
var FlashMessage = _wrapComponent('FlashMessage')(function (_React$Component) {
  _inherits(FlashMessage, _React$Component);

  /**
   * Creates an instance of FlashMessage.
   * @param {any} props
   *
   * @memberof FlashMessage
   */
  function FlashMessage(props) {
    _classCallCheck(this, FlashMessage);

    var _this = _possibleConstructorReturn(this, (FlashMessage.__proto__ || Object.getPrototypeOf(FlashMessage)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  /**
   *
   *
   *
   * @memberof FlashMessage
   */


  _createClass(FlashMessage, [{
    key: 'onClick',
    value: function onClick() {
      this.props.deleteFlashMessage(this.props.message.id);
    }

    /**
     *
     *
     * @returns
     *
     * @memberof FlashMessage
     */

  }, {
    key: 'render',
    value: function render() {
      var _props$message = this.props.message,
          type = _props$message.type,
          text = _props$message.text;

      return _react3.default.createElement(
        'div',
        { className: 'row' },
        _react3.default.createElement(
          'div',
          { className: 'col s12 l12' },
          _react3.default.createElement(
            'div',
            {
              id: 'card-alert',
              className: (0, _classnames2.default)('card', {
                green: type === 'success',
                red: type === 'error'
              }) },
            _react3.default.createElement(
              'div',
              { className: 'card-content white-text' },
              _react3.default.createElement(
                'p',
                null,
                text
              )
            ),
            _react3.default.createElement(
              'div',
              { className: 'fixed-action-btn horizontal edit' },
              _react3.default.createElement(
                'a',
                { className: 'btn-floating white', onClick: this.onClick },
                _react3.default.createElement(
                  'i',
                  { className: 'material-icons black' },
                  'close'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return FlashMessage;
}(_react3.default.Component));

FlashMessage.propTypes = {
  message: _react3.default.PropTypes.object.isRequired,
  deleteFlashMessage: _react3.default.PropTypes.func.isRequired
};

exports.default = FlashMessage;