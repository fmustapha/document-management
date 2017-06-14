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

var _reactRedux = require('react-redux');

var _toastr = require('toastr');

var _toastr2 = _interopRequireDefault(_toastr);

var _redux = require('redux');

var _flashMessages = require('../../actions/flashMessages');

var _reactTinymce = require('react-tinymce');

var _reactTinymce2 = _interopRequireDefault(_reactTinymce);

var _documentAction = require('../../../actions/documentAction');

var documentActions = _interopRequireWildcard(_documentAction);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  AddDocumentsPage: {
    displayName: 'AddDocumentsPage'
  }
};

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'client/components/flash/document/AddDocumentsPage.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'client/components/flash/document/AddDocumentsPage.js',
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
 * @class AddDocumentsPage
 * @extends {React.Component}
 */
var AddDocumentsPage = _wrapComponent('AddDocumentsPage')(function (_React$Component) {
  _inherits(AddDocumentsPage, _React$Component);

  /**
   * Creates an instance of AddDocumentsPage.
   * @param {any} props
   * @param {any} context
   *
   * @memberof AddDocumentsPage
   */
  function AddDocumentsPage(props, context) {
    _classCallCheck(this, AddDocumentsPage);

    var _this = _possibleConstructorReturn(this, (AddDocumentsPage.__proto__ || Object.getPrototypeOf(AddDocumentsPage)).call(this, props, context));

    _this.state = {
      document: { title: '',
        access: 'public',
        content: '',
        ownerId: _this.props.userId
      }
    };
    _this.onTitleChange = _this.onTitleChange.bind(_this);
    _this.handleEditorChange = _this.handleEditorChange.bind(_this);
    _this.onClickSave = _this.onClickSave.bind(_this);
    _this.onClickCancel = _this.onClickCancel.bind(_this);
    _this.onAccessChange = _this.onAccessChange.bind(_this);
    return _this;
  }

  // componentDidMount() {
  //   this.props.dispatch(documentActions.creatingDocument());
  // }

  _createClass(AddDocumentsPage, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.documents.isCreating) {
        _reactRouter.browserHistory.push('/dms/document');
      }
    }
  }, {
    key: 'onTitleChange',
    value: function onTitleChange(event) {
      var document = this.state.document;
      document.title = event.target.value;
      this.setState({ document: document });
    }
  }, {
    key: 'handleEditorChange',
    value: function handleEditorChange(event) {
      var document = this.state.document;
      document.content = event.target.getContent();
      this.setState({ document: document });
    }
  }, {
    key: 'onAccessChange',
    value: function onAccessChange(access) {
      var document = this.state.document;
      document.access = access;
      this.setState({ document: document });
    }
  }, {
    key: 'onClickSave',
    value: function onClickSave() {
      // this.props.createDocumentAction.createDocument(this.state.document)
      // .then(() => toastr.success('Document successfully created'))
      // .catch(() => {
      //   this.props.addFlashMessage({
      //     type: 'error',
      //     text: 'Unable to create document' });
      //   toastr.error(
      //     'Unable to create document, kindly contact your Admin');
      // });
    }
  }, {
    key: 'onClickCancel',
    value: function onClickCancel() {
      this.props.dispatch();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      debugger;
      return _react3.default.createElement(
        'div',
        { id: 'page-padding' },
        _react3.default.createElement(
          'h3',
          null,
          'Add Document'
        ),
        _react3.default.createElement(
          'div',
          { className: 'row' },
          _react3.default.createElement(
            'div',
            { className: 'input-field col s6 pad-icons' },
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
              onChange: this.onTitleChange,
              value: this.state.document.title, type: 'text', className: 'col 5 s12' }),
            _react3.default.createElement(
              'label',
              { htmlFor: 'title' },
              'Document Title'
            )
          ),
          _react3.default.createElement(
            'div',
            { className: 'input-field col s12' },
            _react3.default.createElement(_reactTinymce2.default, {
              content: '<p>This is the initial content of the editor</p>',
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
              { className: 'dropdown-button btn', href: '#', 'data-activates': 'dropdown1' },
              this.state.document.access,
              _react3.default.createElement('span', { className: 'fa fa-sort-desc' })
            ),
            _react3.default.createElement(
              'ul',
              { id: 'dropdown1', className: 'dropdown-content' },
              _react3.default.createElement(
                'li',
                { onClick: function onClick() {
                    return _this2.onAccessChange('public');
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
                    return _this2.onAccessChange('private');
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
                    return _this2.onAccessChange('role');
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
            onClick: this.onClickSave })
        ),
        _react3.default.createElement(
          'span',
          null,
          _react3.default.createElement('input', {
            type: 'submit',
            value: 'Cancel',
            className: 'waves-effect waves-light btn',
            onClick: this.onClickCancel })
        )
      );
    }
  }]);

  return AddDocumentsPage;
}(_react3.default.Component));

/**
 *
 *
 * @param {any} state
 * @param {any} ownProps
 * @returns
 */


function mapStateToProps(state) {
  var user = state.auth.loggedInUser;
  return {
    // documents: state.documents,
    userId: user.data.id
  };
}

/**
 *
 *
 * @param {any} dispatch
 * @returns
 */
// function mapDispatchProps(dispatch) {
//   return {
//     createDocumentAction:
//     bindActionCreators(documentActions.createDocument, dispatch),
//     addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
//   };
// }

AddDocumentsPage.propTypes = {
  userId: _react3.default.PropTypes.number.isRequired,
  createDocumentAction: _react3.default.PropTypes.object.isRequired,
  addFlashMessage: _react3.default.PropTypes.func.isRequired
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, documentActions)(AddDocumentsPage);