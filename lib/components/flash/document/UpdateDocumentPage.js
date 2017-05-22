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

var _reactRouter = require('react-router');

var _toastr = require('toastr');

var _toastr2 = _interopRequireDefault(_toastr);

var _reactRedux = require('react-redux');

var _reactTinymce = require('react-tinymce');

var _reactTinymce2 = _interopRequireDefault(_reactTinymce);

var _redux = require('redux');

var _flashMessages = require('../../actions/flashMessages');

var _documentAction = require('../../actions/documentAction');

var documentActions = _interopRequireWildcard(_documentAction);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  UpdateDocumentPage: {
    displayName: 'UpdateDocumentPage'
  }
};

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'client/components/flash/document/UpdateDocumentPage.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'client/components/flash/document/UpdateDocumentPage.js',
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
 * @class ViewDocumentPage
 * @extends {React.Component}
 */
var UpdateDocumentPage = _wrapComponent('UpdateDocumentPage')(function (_React$Component) {
  _inherits(UpdateDocumentPage, _React$Component);

  /**
   * Creates an instance of ViewDocumentPage.
   * @param {Object} props
   * @param {Object} context
   *
   * @memberof ViewDocumentPage
   */
  function UpdateDocumentPage(props, context) {
    _classCallCheck(this, UpdateDocumentPage);

    var _this = _possibleConstructorReturn(this, (UpdateDocumentPage.__proto__ || Object.getPrototypeOf(UpdateDocumentPage)).call(this, props, context));

    _this.state = {
      document: { title: props.title,
        access: props.access,
        content: props.content
      }
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.onClickSave = _this.onClickSave.bind(_this);
    _this.onClickCancel = _this.onClickCancel.bind(_this);
    // this.onTitleChange = this.onTitleChange.bind(this);
    _this.handleEditorChange = _this.handleEditorChange.bind(_this);
    // this.onAccessChange = this.onAccessChange.bind(this);
    return _this;
  }

  /**
   *
   * @returns {void}
   * @param {Object} event
   *
   * @memberof LoginPage
   */


  _createClass(UpdateDocumentPage, [{
    key: 'onChange',
    value: function onChange(event) {
      var document = this.state.document;
      var field = event.target.name;
      document[field] = event.target.value;
      this.setState({
        document: document
      });
    }
  }, {
    key: 'handleEditorChange',
    value: function handleEditorChange(event) {
      var document = this.state.document;
      document.ownerId = this.params.id;
      document.content = event.target.getContent();
      this.setState({ document: document });
    }

    // onAccessChange(access) {
    //   const document = this.state.document;
    //   document.ownerId = this.props.id;
    //   document.access = access;
    //   this.setState({ document });
    // }
    /**
     *
     *
     * @returns {void}
     * @memberof ViewDocumentPage
     */

  }, {
    key: 'onClickSave',
    value: function onClickSave() {
      var _this2 = this;

      this.props.updateDocumentAction(this.props.id).then(function () {
        return _toastr2.default.success('Document Successfully Deleted');
      }).catch(function () {
        _this2.props.addFlashMessage({
          type: 'error',
          text: 'Unable to delete document' });
        _toastr2.default.error('Unable to delete document');
      });
      this.props.endEdit();
    }

    /**
     *
     *
     * @returns {void}
     * @memberof ViewDocumentPage
     */

  }, {
    key: 'onClickCancel',
    value: function onClickCancel() {
      _reactRouter.browserHistory.goBack();
    }

    /**
     *
     *
     * @returns Jsx Content
     *
     * @memberof ViewDocumentPage
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react3.default.createElement(
        'div',
        { id: 'page-padding' },
        _react3.default.createElement(
          'h3',
          null,
          'Update Document'
        ),
        _react3.default.createElement(
          'div',
          { className: 'row' },
          _react3.default.createElement(
            'div',
            { className: 'input-field col s6' },
            _react3.default.createElement(
              'div',
              { className: 'pad-icons' },
              _react3.default.createElement(
                'i',
                { className: 'material-icons prefix' },
                'mode_edit'
              )
            ),
            _react3.default.createElement('input', {
              onChange: this.onChange,
              value: this.props.title, type: 'text', className: 'col 5 s12' })
          ),
          _react3.default.createElement(
            'div',
            { className: 'input-field col s12' },
            _react3.default.createElement(_reactTinymce2.default, {
              content: this.props.content,
              config: {
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
              },
              onChange: this.handleEditorChange
            })
          ),
          _react3.default.createElement(
            'div',
            null,
            _react3.default.createElement(
              'p',
              { id: 'access' },
              'Select Access Type'
            ),
            _react3.default.createElement(
              'a',
              {
                className: 'dropdown-button btn',
                href: '#',
                'data-activates': 'dropdown1' },
              this.props.access,
              _react3.default.createElement('span', { className: 'fa fa-sort-desc' })
            ),
            _react3.default.createElement(
              'ul',
              {
                id: 'dropdown1',
                className: 'dropdown-content',
                name: 'access' },
              _react3.default.createElement(
                'li',
                { onClick: function onClick() {
                    return _this3.onChange('public');
                  } },
                _react3.default.createElement(
                  'a',
                  { htmlFor: 'public' },
                  'public'
                )
              ),
              _react3.default.createElement(
                'li',
                { onClick: function onClick() {
                    return _this3.onChange('private');
                  } },
                _react3.default.createElement(
                  'a',
                  { htmlFor: 'private' },
                  'private'
                )
              ),
              _react3.default.createElement(
                'li',
                { onClick: function onClick() {
                    return _this3.onChange('role');
                  } },
                _react3.default.createElement(
                  'a',
                  { htmlFor: 'role' },
                  'role'
                )
              )
            )
          )
        ),
        _react3.default.createElement(
          'span',
          null,
          _react3.default.createElement('input', {
            type: 'submit',
            value: 'Save',
            className: 'waves-effect waves-light btn',
            onClick: this.onClickSave }),
          _react3.default.createElement('input', {
            type: 'submit',
            value: 'Cancel',
            className: 'waves-effect waves-light btn',
            onClick: this.onClickCancel })
        )
      );
    }
  }]);

  return UpdateDocumentPage;
}(_react3.default.Component));

/**
 *
 *
 * @param {Object} state
 * @returns {Object} object containing document and authourization details
 */


function mapDispatchProps(dispatch) {
  return {
    updateDocumentAction: (0, _redux.bindActionCreators)(documentActions.updateDocument, dispatch),
    addFlashMessage: (0, _redux.bindActionCreators)(_flashMessages.addFlashMessage, dispatch)
  };
}

UpdateDocumentPage.propTypes = {
  updateDocumentAction: _react3.default.PropTypes.func.isRequired,
  id: _react3.default.PropTypes.string.isRequired,
  endEdit: _react3.default.PropTypes.func.isRequired,
  title: _react3.default.PropTypes.string.isRequired,
  content: _react3.default.PropTypes.string.isRequired,
  addFlashMessage: _react3.default.PropTypes.func.isRequired,
  access: _react3.default.PropTypes.string.isRequired
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchProps)(UpdateDocumentPage);