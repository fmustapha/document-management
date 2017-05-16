import React from 'react';
import { Link } from 'react-router';
import TinyMCE from 'react-tinymce';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import * as documentAction from '../../actions/documentAction';


class DocumentsListPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: 0
    };
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickView = this.onClickView.bind(this);
    this.displayAlert = this.displayAlert.bind(this);
  }

  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
  }

  onClickDelete(event) {
    const documentId = this.state.id;
    this.props.actions.deleteDocument(documentId)
    .then(() => toastr.success('Document Successfully Deleted'))
    .catch(() => {
      this.props.toastr.error({
        type: 'error',
        text: 'Unable to delete document' });
      toastr.error(
        'Unable to delete document');
    });
    this.setState({ id: 0 });
  }

  onClickEdit(event) {
    event.preventDefault();
    const documentId = event.target.id;
    this.props.actions.setCurrentDocument(documentId);
    this.props.actions.displayCurrentDocument(documentId);
  }

  onClickView() {
    alert(`Saving ${this.state.document.title}
    and the content`);
  }

  componentWillMount() {

  }

  displayAlert(event) {
    event.preventDefault();
    let id = this.state.id;
    id = event.target.id;
    this.setState({ show: true, id });
    this.props.swal({
      title: 'Warning!',
      text: 'Are you sure?',
      type: 'info',
      showCancelButton: true,
      onConfirm: this.deleteDocument,
      onCancel: this.props.close,
    });
  }

  render() {
    return (
      <div>
        <a href="/addDocument" className="btn-floating btn-large waves-effect waves-light green">
          <i className="material-icons">add</i></a>
      </div>
      /* <div> {
        this
          .props
          .myDocuments
          .map(document => <div id="card-alert" className="card white"
          key={document.id}>
            <div className="card-content pink-text">
              <a className="pointer tooltipped"
                data-position="bottom" data-delay="50"
                data-tooltip="click on me to view"
                href="#modal1" id={document.id}
                onClick={this.editDocument}>
              Title: {document.title}
              <span className="badge list-badge">
                Access: {document.viewAccess}</span>
              </a>


            </div>
            <div className="fixed-action-btn horizontal click-to-toggle edit">
              <a className="btn-floating pink tooltipped"
                data-position="top" data-delay="50"
                data-tooltip="click to view more"
                >
                <i className="material-icons">more_vert</i>
              </a>
              <ul>
                <li onClick={this.editDocument} className="editDoc">
                  <a
                  href="#modal1"
                  className="btn-floating pink tooltipped"
                  data-position="bottom" data-delay="50"
                  data-tooltip="edit document">
                    <i id={document.id} className="material-icons">mode_edit</i>
                  </a>
                </li>
                <li onClick={this.renderAlert}>
                  <a
                    className="btn-floating red darken-1 tooltipped"
                    data-position="bottom" data-delay="50"
                    data-tooltip="delete document"
                    >
                    <i id={document.id} className="material-icons">delete</i>
                  </a>
                </li>
              </ul>
            </div>
          </div>)}
        <ReduxSweetAlert />
      </div>*/
    );
  }
}

/**
 *
 * dispatch document actions
 * @param {any} dispatch
 * @returns {any}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch),
    swal: bindActionCreators(swal, dispatch),
    close: bindActionCreators(close, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
}

export default DocumentsListPage;
