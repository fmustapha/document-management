import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import '../../../node_modules/sweetalert/dist/sweetalert.css';
import * as documentAction from '../../actions/documentAction';
import { addFlashMessage } from '../../actions/flashMessages';
import { SearchBar } from '../../components/searchBar/searchBar';
import * as searchAction from '../../actions/searchAction';

/**
 *
 *
 * @class DocumentsListPage
 * @extends {React.Component}
 */
class DocumentsListPage extends React.Component {
  /**
   * Creates an instance of DocumentsListPage.
   * @param {Object} props
   * @param {Object} context
   * @returns {void}
   * @memberof DocumentsListPage
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: 0,
      offset: 0,
      limit: 10
    };
    this.deleteDocument = this.deleteDocument.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }
  /**
   *
   *
   * @returns {void}
   *
   * @memberof DocumentsListPage
   */
  componentWillMount() {
    const loggedInUser = this.props.auth.loggedInUser.data.id;
    this.props.actions.listDocument(this.state.limit, this.state.offset);
    this.props.actions.listUserDocument(loggedInUser);
  }

  /**
   *
   *
   * @returns {void}
   *
   * @memberof DocumentsListPage
   */
  componentDidMount() {
    $('#modal1').modal('open');
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'allDocuments');
    $('.tooltipped').tooltip({ delay: 50 });
  }

  /**
   *
   * @returns {void}
   *
   * @memberof DocumentsListPage
   */
  componentWillUnmount() {
    $('.tooltipped').tooltip('remove');
  }

   /**
   *
   *
   * @param {Object} data
   * @returns {void}
   *
   * @memberof DocumentsListPage
   */
  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.state.limit);
    this.setState({ offset }, () => {
      this.props.actions.listDocument(this.state.limit, offset);
    });
  }

  /**
   *
   * @return {void}
   * @param {Number} id
   *
   * @memberof DocumentsListPage
   */
  deleteDocument(id) {
    this.props.actions.deleteDocument(id)
    .then(() => toastr.success('Document Successfully Deleted'))
    .catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to delete document' });
      toastr.error(
        'Unable to delete document, contact your Admin');
    });
    this.setState({ id: 0 });
  }

/**
   *
   *
   * @param {Number} documentId
   * @returns {func} call to deleteDocument
   *
   * @memberof DocumentsListPage
   */
  renderAlert(documentId) {
    event.preventDefault();
    this.props.swal({
      title: 'Warning!',
      text: 'Are you sure you want to delete this document?',
      type: 'info',
      showCancelButton: true,
      onConfirm: (() => this.deleteDocument(documentId)),
      onCancel: this.props.close,
    });
  }

  /**
   *
   *
   * @returns {void} jsx content
   *
   * @memberof DocumentsListPage
   */
  render() {
    const pagination = this.props.documents.pagination ?
     this.props.documents.pagination : 1;

    const user = this.props.auth.loggedInUser ?
     this.props.auth.loggedInUser.data.username : null;

    let allDocuments = this.props.documents.documents ?
      this.props.documents.documents.rows : '';
    allDocuments = this.props.search.document ?
      this.props.search.document.documents.rows : allDocuments;

    const userDocuments = this.props.documents.userDocuments ?
      this.props.documents.userDocuments : null;

    return (
      <div>
        <SearchBar searchFor="document" performSearch={this.props.searchAction} />
        <div id="page-padding">
          <div className="row">
            <div className="col s6">
              <div className="dashboard-title">Dashboard</div>
              <p>Welcome, { user }</p>
            </div>
          </div>
          <div className="create-logo">
            <a
          className="btn btn-floating btn-large pulse create-logo tooltipped"
          data-position="left" data-delay="50"
          data-tooltip="create new document"
           onClick={() => browserHistory.push('/dms/document/create')}>
              <i className="material-icons">edit</i>
            </a>
          </div>
          <div className="row">
            <div className="col s12 white-text">
              <ul className="tabs teal darken-4 tab-text">
                <li className="tab col s3 white-text">
                  <a
                className="s"
               href="#allDocuments">All Documents
               </a>
                </li>
                <li className="tab col s3 white-text">
                  <a
                className="s"
                href="#myDocuments">My Documents
                </a>
                </li>
              </ul>
            </div>
            <div id="allDocuments" className="col s12">
              <div className="row">
                {allDocuments ? allDocuments
                .map(document => (
                  <div className="col s12 m12" key={document.id}>
                    <div className="card">
                      <div className="card-content teal-text lighten-1">
                        <div className="card-title">
                          <div className="document-icon">
                            <i
                              id="float-icons-left"
                              className="fa fa-file-text tooltipped"
                              aria-hidden="true"
                              data-position="bottom"
                              data-delay="50"
                              data-tooltip="click to view/edit document" />
                          </div>
                          <div className="document-title">
                            <Link to={`/dms/document/${document.id}`}>
                              {document.title}</Link>
                            <h6 className="grey-text">
                              {`Access: ${document.access}`}
                            </h6>
                            <h6 className="grey-text">
                            Last updated: {new Date(document.updatedAt).toDateString()}
                            </h6>
                          </div>
                          <div className="action-icons">
                            {document.User && document.User.username}
                          </div>
                          <div className="clear" />
                        </div>
                      </div>
                    </div>
                  </div>
                )) : '' }
              </div>
            </div>
            <div id="myDocuments" className="col s12">
              <div className="row">
                {(!userDocuments
                || userDocuments.length < 1) ?
                  <div className="col s12 m12" key={document.id}>
                    <div className="card">
                      <div className="card-content teal-text lighten-1">
                        <div className="card-title">
                          <div className="document-title">
                            <p>No Documents yet! Click create icon below</p>
                          </div>
                          <div className="clear" />
                        </div>
                      </div>
                    </div>
                  </div>
                :
                userDocuments.map(document => (
                  <div className="col s12 m12" key={document.id}>
                    <div className="card">
                      <div className="card-content green-text">
                        <div className="card-title">
                          <div className="document-icon">
                            <i
                              id="float-icons-left"
                              className="fa fa-file-text tooltipped"
                              aria-hidden="true"
                              data-position="bottom"
                              data-delay="50"
                              data-tooltip="click to view/edit document" />
                          </div>
                          <div className="document-title">
                            <Link to={`/dms/document/${document.id}`}>
                              {document.title}</Link>
                            <h6 className="grey-text">
                              {`Access: ${document.access}`}
                            </h6>
                            <h6 className="grey-text">
                            Last updated: {new Date(document.updatedAt).toDateString()}
                            </h6>
                          </div>
                          <div className="action-icons">
                            <i
                            id="float-icons-left"
                            className="fa fa-pencil-square-o"
                             aria-hidden="true" />
                            <i
                            id="float-icons-left"
                            className="fa fa-trash"
                            aria-hidden="true"
                            onClick={() => this.renderAlert(document.id)}
                            />
                          </div>
                          <div className="clear" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                }
              </div>
            </div>
          </div>
        </div>
        <div id="pagination">
          <ReactPaginate
            previousLabel={'previous'}
                           nextLabel={'next'}
                           breakLabel={<a href="">...</a>}
                           breakClassName={'break-me'}
                           pageCount={pagination.page_count}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={this.handlePageClick}
                           containerClassName={'pagination'}
                           subContainerClassName={'pages pagination'}
                           pageClassName={'waves-effect'}
                           activeClassName={'active'} />
        </div>
        <ReduxSweetAlert />
      </div>
    );
  }
}

DocumentsListPage.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  documents: PropTypes.object.isRequired,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  searchAction: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

/**
 *
 *
 * @param {func} dispatch
 * @returns {Object} containing the action property
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentAction, dispatch),
    searchAction: bindActionCreators(searchAction.searchDocument, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch),
    swal: bindActionCreators(swal, dispatch),
    close: bindActionCreators(close, dispatch)
  };
}

/**
 *
 *
 * @param {Object} state
 * @returns {Object} contains document and authorization properties
 */
function mapStateToProps(state) {
  return {
    documents: state.documents,
    pagination: state.pagination,
    auth: state.auth,
    search: state.search
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsListPage);
