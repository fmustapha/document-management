import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import TinyMCE from 'react-tinymce';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import * as documentAction from '../../actions/documentAction';
import { addFlashMessage } from '../../actions/flashMessages';

/**
 *
 *
 * @class DocumentsListPage
 * @extends {React.Component}
 */
class DocumentsListPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: 0
    };
    this.deleteDocument = this.deleteDocument.bind(this);
  }
  /**
   * 
   * 
   * 
   * @memberof DocumentsListPage
   */
  componentWillMount() {
    this.props.dispatch(documentAction.listDocument());
    this.props.dispatch(documentAction.listUserDocument(localStorage.getItem('id')));
  }

  /**
   * 
   * 
   * 
   * @memberof DocumentsListPage
   */
  componentDidMount() {
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
  documentRow(document, index) {
    return <div key={index}>{document.title}</div>;
  }

  /**
   *
   *
   * @param {Number} id
   * 
   * @memberof DocumentsListPage
   */
  deleteDocument(id) {
    this.props.dispatch(documentAction.deleteDocument(id))
    .then(() => toastr.success('Document Successfully Deleted'))
    .catch(() => {
      this.props.dispatch(addFlashMessage({
        type: 'error',
        text: 'Unable to delete document' }));
      toastr.error(
        'Unable to delete document');
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
  render() {
    console.log(this.props.documents, 'documents');
    const user = this.props.auth.loggedInUser.data.username;
    return (
      <div>
      <div className="page-header">
            <div className="dashboard-header">
              <h4>Dashboard</h4>
            </div>
            <div className="welcome-message">
              <h4>Welcome {user}</h4>
            </div>
          </div>
      <div id="page-padding">
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
               href="#allDocuments">All Public Documents
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
              {this.props.documents.documents.map((document) => (
                <div className="col s12 m12" key={document.id}>
                  <div className="card">
                    <div className="card-content teal-text lighten-1">
                      <div className="card-title">
                        <div className="document-title">
                          <i
                              id="float-icons-left"
                              className="fa fa-file-text read-file-tooltip"
                              aria-hidden="true"
                              data-position="bottom" data-delay="50"
                              data-tooltip="create new document" />
                          <Link to={`/dms/document/${document.id}`}>{document.title}</Link>
                        </div>
                        <div className="action-icons">
                          <i id="float-icons-left" className="fa fa-pencil-square-o" aria-hidden="true" />
                          <i id="float-icons-left" className="fa fa-trash" aria-hidden="true" onClick={() => this.deleteDocument(document.id)} />
                        </div>
                        <div className="clear" />
                      </div>
                    </div>
                  </div>
                </div>
                ))}
            </div>
          </div>
          <div id="myDocuments" className="col s12">
            <div className="row">
              {(this.props.documents.userDocuments.length < 1)? 
                <div className="col s12 m12" key={document.id}>
                <div className="card">
                    <div className="card-content teal-text lighten-1">
                      <div className="card-title">
                        <div className="document-title">
                          <p>No Documents yet! CLick create icon below</p>
                        </div>
                        <div className="clear" />
                      </div>
                    </div>
                  </div>
              </div>
                :
                this.props.documents.userDocuments.map((document) => (
                  <div className="col s12 m12" key={document.id}>
                  <div className="card">
                    <div className="card-content green-text">
                      <div className="card-title">
                        <div className="document-title">
                          <i id="float-icons-left" className="fa fa-file-text" aria-hidden="true" />
                          <Link to={`/dms/document/${document.id}`}>{document.title}</Link>
                        </div>
                        <div className="action-icons">
                          <i id="float-icons-left" className="fa fa-pencil-square-o" aria-hidden="true" />
                          <i id="float-icons-left" className="fa fa-trash" aria-hidden="true" />
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
      </div>
    );
  }
}


DocumentsListPage.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired
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

export default connect(mapStateToProps)(DocumentsListPage);
