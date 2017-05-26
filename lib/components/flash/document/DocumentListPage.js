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

var _reactTinymce = require('react-tinymce');

var _reactTinymce2 = _interopRequireDefault(_reactTinymce);

var _toastr = require('toastr');

var _toastr2 = _interopRequireDefault(_toastr);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactReduxSweetalert = require('react-redux-sweetalert');

var _reactReduxSweetalert2 = _interopRequireDefault(_reactReduxSweetalert);

var _documentAction = require('../../actions/documentAction');

var documentAction = _interopRequireWildcard(_documentAction);

var _flashMessages = require('../../actions/flashMessages');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  DocumentsListPage: {
    displayName: 'DocumentsListPage'
  }
};

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'client/components/flash/document/DocumentListPage.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersAndeladeveloperDocumentsAndelaProjectsDocumentManagementNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'client/components/flash/document/DocumentListPage.js',
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
 * @class DocumentsListPage
 * @extends {React.Component}
 */
var DocumentsListPage = _wrapComponent('DocumentsListPage')(function (_React$Component) {
  _inherits(DocumentsListPage, _React$Component);

  function DocumentsListPage(props, context) {
    _classCallCheck(this, DocumentsListPage);

    var _this = _possibleConstructorReturn(this, (DocumentsListPage.__proto__ || Object.getPrototypeOf(DocumentsListPage)).call(this, props, context));

    _this.state = {
      id: 0
    };
    _this.deleteDocument = _this.deleteDocument.bind(_this);
    return _this;
  }
  /**
   * 
   * 
   * 
   * @memberof DocumentsListPage
   */


  _createClass(DocumentsListPage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.dispatch(documentAction.listDocument());
      this.props.dispatch(documentAction.listUserDocument(localStorage.getItem('id')));
    }

    /**
     * 
     * 
     * 
     * @memberof DocumentsListPage
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('#modal1').modal('open');
      $('ul.tabs').tabs();
      $('ul.tabs').tabs('select_tab', 'allDocuments');
      $('.tooltipped').tooltip({ delay: 50 });
      $('.read-file-tooltip').tooltip({ delay: 50 });
    }

    /**
     * 
     * 
     * @param {any} document 
     * @param {any} index 
     * @returns 
     * 
     * @memberof DocumentsListPage
     */

  }, {
    key: 'documentRow',
    value: function documentRow(document, index) {
      return _react3.default.createElement(
        'div',
        { key: index },
        document.title
      );
    }

    /**
     *
     *
     * @param {Number} id
     * 
     * @memberof DocumentsListPage
     */

  }, {
    key: 'deleteDocument',
    value: function deleteDocument(id) {
      var _this2 = this;

      this.props.dispatch(documentAction.deleteDocument(id)).then(function () {
        return _toastr2.default.success('Document Successfully Deleted');
      }).catch(function () {
        _this2.props.dispatch((0, _flashMessages.addFlashMessage)({
          type: 'error',
          text: 'Unable to delete document' }));
        _toastr2.default.error('Unable to delete document');
      });
      this.setState({ id: 0 });
    }

    /**
     *
     *
     * @returns {void} jsx content
     *
     * @memberof DocumentsListPage
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      console.log(this.props.documents, 'documents');
      var user = this.props.auth.loggedInUser.data.username;
      return _react3.default.createElement(
        'div',
        null,
        _react3.default.createElement(
          'div',
          { className: 'page-header' },
          _react3.default.createElement(
            'div',
            { className: 'dashboard-header' },
            _react3.default.createElement(
              'h4',
              null,
              'Dashboard'
            )
          ),
          _react3.default.createElement(
            'div',
            { className: 'welcome-message' },
            _react3.default.createElement(
              'h4',
              null,
              'Welcome ',
              user
            )
          )
        ),
        _react3.default.createElement(
          'div',
          { id: 'page-padding' },
          _react3.default.createElement(
            'div',
            { className: 'create-logo' },
            _react3.default.createElement(
              'a',
              {
                className: 'btn btn-floating btn-large pulse create-logo tooltipped',
                'data-position': 'left', 'data-delay': '50',
                'data-tooltip': 'create new document',
                onClick: function onClick() {
                  return _reactRouter.browserHistory.push('/dms/document/create');
                } },
              _react3.default.createElement(
                'i',
                { className: 'material-icons' },
                'edit'
              )
            )
          ),
          _react3.default.createElement(
            'div',
            { className: 'row' },
            _react3.default.createElement(
              'div',
              { className: 'col s12 white-text' },
              _react3.default.createElement(
                'ul',
                { className: 'tabs teal darken-4 tab-text' },
                _react3.default.createElement(
                  'li',
                  { className: 'tab col s3 white-text' },
                  _react3.default.createElement(
                    'a',
                    {
                      className: 's',
                      href: '#allDocuments' },
                    'All Public Documents'
                  )
                ),
                _react3.default.createElement(
                  'li',
                  { className: 'tab col s3 white-text' },
                  _react3.default.createElement(
                    'a',
                    {
                      className: 's',
                      href: '#myDocuments' },
                    'My Documents'
                  )
                )
              )
            ),
            _react3.default.createElement(
              'div',
              { id: 'allDocuments', className: 'col s12' },
              _react3.default.createElement(
                'div',
                { className: 'row' },
                this.props.documents.documents.map(function (document) {
                  return _react3.default.createElement(
                    'div',
                    { className: 'col s12 m12', key: document.id },
                    _react3.default.createElement(
                      'div',
                      { className: 'card' },
                      _react3.default.createElement(
                        'div',
                        { className: 'card-content teal-text lighten-1' },
                        _react3.default.createElement(
                          'div',
                          { className: 'card-title' },
                          _react3.default.createElement(
                            'div',
                            { className: 'document-title' },
                            _react3.default.createElement('i', {
                              id: 'float-icons-left',
                              className: 'fa fa-file-text read-file-tooltip',
                              'aria-hidden': 'true',
                              'data-position': 'bottom', 'data-delay': '50',
                              'data-tooltip': 'create new document' }),
                            _react3.default.createElement(
                              _reactRouter.Link,
                              { to: '/dms/document/' + document.id },
                              document.title
                            )
                          ),
                          _react3.default.createElement(
                            'div',
                            { className: 'action-icons' },
                            _react3.default.createElement('i', { id: 'float-icons-left', className: 'fa fa-pencil-square-o', 'aria-hidden': 'true' }),
                            _react3.default.createElement('i', { id: 'float-icons-left', className: 'fa fa-trash', 'aria-hidden': 'true', onClick: function onClick() {
                                return _this3.deleteDocument(document.id);
                              } })
                          ),
                          _react3.default.createElement('div', { className: 'clear' })
                        )
                      )
                    )
                  );
                })
              )
            ),
            _react3.default.createElement(
              'div',
              { id: 'myDocuments', className: 'col s12' },
              _react3.default.createElement(
                'div',
                { className: 'row' },
                this.props.documents.userDocuments.length < 1 ? _react3.default.createElement(
                  'div',
                  { className: 'col s12 m12', key: document.id },
                  _react3.default.createElement(
                    'div',
                    { className: 'card' },
                    _react3.default.createElement(
                      'div',
                      { className: 'card-content teal-text lighten-1' },
                      _react3.default.createElement(
                        'div',
                        { className: 'card-title' },
                        _react3.default.createElement(
                          'div',
                          { className: 'document-title' },
                          _react3.default.createElement(
                            'p',
                            null,
                            'No Documents yet! CLick create icon below'
                          )
                        ),
                        _react3.default.createElement('div', { className: 'clear' })
                      )
                    )
                  )
                ) : this.props.documents.userDocuments.map(function (document) {
                  return _react3.default.createElement(
                    'div',
                    { className: 'col s12 m12', key: document.id },
                    _react3.default.createElement(
                      'div',
                      { className: 'card' },
                      _react3.default.createElement(
                        'div',
                        { className: 'card-content green-text' },
                        _react3.default.createElement(
                          'div',
                          { className: 'card-title' },
                          _react3.default.createElement(
                            'div',
                            { className: 'document-title' },
                            _react3.default.createElement('i', { id: 'float-icons-left', className: 'fa fa-file-text', 'aria-hidden': 'true' }),
                            _react3.default.createElement(
                              _reactRouter.Link,
                              { to: '/dms/document/' + document.id },
                              document.title
                            )
                          ),
                          _react3.default.createElement(
                            'div',
                            { className: 'action-icons' },
                            _react3.default.createElement('i', { id: 'float-icons-left', className: 'fa fa-pencil-square-o', 'aria-hidden': 'true' }),
                            _react3.default.createElement('i', { id: 'float-icons-left', className: 'fa fa-trash', 'aria-hidden': 'true' })
                          ),
                          _react3.default.createElement('div', { className: 'clear' })
                        )
                      )
                    )
                  );
                })
              )
            )
          )
        )
      );
    }
  }]);

  return DocumentsListPage;
}(_react3.default.Component));

DocumentsListPage.PropTypes = {
  dispatch: _react2.PropTypes.func.isRequired,
  documents: _react2.PropTypes.object.isRequired
};

/**
 * 
 * 
 * @param {any} state 
 * @returns 
 */
function mapStateToProps(state) {
  console.log(state);
  return {
    documents: state.documents,
    auth: state.auth
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(DocumentsListPage);