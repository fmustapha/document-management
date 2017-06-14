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

var _reactTinymce = require('react-tinymce');

var _reactTinymce2 = _interopRequireDefault(_reactTinymce);

var _redux = require('redux');

var _UpdateDocumentPage = require('./UpdateDocumentPage');

var _UpdateDocumentPage2 = _interopRequireDefault(_UpdateDocumentPage);

var _documentAction = require('../../actions/documentAction');

var documentActions = _interopRequireWildcard(_documentAction);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  ViewDocumentPage: {
    displayName: 'ViewDocumentPage'
  }
};

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'client/components/flash/document/ViewDocumentPage.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'client/components/flash/document/ViewDocumentPage.js',
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
var ViewDocumentPage = _wrapComponent('ViewDocumentPage')(function (_React$Component) {
  _inherits(ViewDocumentPage, _React$Component);

  /**
   * Creates an instance of ViewDocumentPage.
   * @param {Object} props
   * @param {Object} context
   *
   * @memberof ViewDocumentPage
   */
  function ViewDocumentPage(props, context) {
    _classCallCheck(this, ViewDocumentPage);

    var _this = _possibleConstructorReturn(this, (ViewDocumentPage.__proto__ || Object.getPrototypeOf(ViewDocumentPage)).call(this, props, context));

    _this.state = {
      document: { title: '', access: 'public', content: '' },
      editing: false
    };
    _this.onClickEdit = _this.onClickEdit.bind(_this);
    _this.onClickBack = _this.onClickBack.bind(_this);
    return _this;
  }

  /**
   *
   *
   * @returns {String} Jsx content
   *
   * @memberof ViewDocumentPage
   */


  _createClass(ViewDocumentPage, [{
    key: 'createMarkup',
    value: function createMarkup() {
      return { __html: this.props.documents.currentDocument.content };
    }

    /**
     *
     *
     * @returns {void}
     * @memberof ViewDocumentPage
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.dispatch(documentActions.viewDocument(this.props.params.id));
    }

    /**
     *
     *
     * @returns {void}
     * @memberof ViewDocumentPage
     */

  }, {
    key: 'onClickEdit',
    value: function onClickEdit() {
      this.setState({ editing: !this.state.editing });
    }

    /**
     *
     *
     * @returns {void}
     * @memberof ViewDocumentPage
     */

  }, {
    key: 'onClickBack',
    value: function onClickBack() {
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
      var document = this.props.documents.currentDocument;
      if (this.state.editing) {
        return _react3.default.createElement(_UpdateDocumentPage2.default, {
          id: this.props.params.id,
          title: document.title,
          content: document.content,
          access: document.access,
          endEdit: this.onClickEdit
        });
      }
      return document ? _react3.default.createElement(
        'div',
        { className: 'document-view' },
        _react3.default.createElement(
          'h2',
          null,
          document.title
        ),
        _react3.default.createElement('p', { dangerouslySetInnerHTML: this.createMarkup() }),
        _react3.default.createElement(
          'div',
          null,
          _react3.default.createElement('input', {
            type: 'submit',
            value: 'Edit',
            className: 'waves-effect waves-light btn',
            onClick: this.onClickEdit }),
          _react3.default.createElement('input', {
            type: 'submit',
            value: 'Back',
            className: 'waves-effect waves-light btn',
            onClick: this.onClickBack })
        )
      ) : _react3.default.createElement(
        'div',
        { className: 'page-center-padding' },
        'Please Wait...'
      );
    }
  }]);

  return ViewDocumentPage;
}(_react3.default.Component));

/**
 *
 *
 * @param {Object} state
 * @returns {Object} object containing document and authourization details
 */


function mapStateToProps(state) {
  return {
    documents: state.documents,
    auth: state.auth
  };
}

// function mapDispatchProps(dispatch) {
//   return {
//     actions: bindActionCreators(auth, dispatch)
//   };
// }

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ViewDocumentPage);