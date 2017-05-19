import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TinyMCE from 'react-tinymce';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import * as documentAction from '../../actions/documentAction';

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
  componentWillMount() {
    this.props.dispatch(documentAction.listDocument());
    this.props.dispatch(documentAction.listUserDocument(localStorage.getItem('id')));
  }

  componentDidMount() {
    $('#modal1').modal('open');
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'allDocuments');
  }

  documentRow(document, index) {
    return <div key={index}>{document.title}</div>;
  }

  deleteDocument(id) {
    this.props.dispatch(documentAction.deleteDocument(id));
  }

  render() {
    console.log(this.props.documents, 'documents');
    const user = this.props.auth.loggedInUser.username;
    return (
      <div id="page-padding">
        <div className="row">
          <div>
          <h4>Dashboard</h4>
          <h4>Welcome {user}</h4>
           </div> 
          <div className="col s12">
            <ul className="tabs teal darken-4 tab-text">
              <li className="tab col s3"><a className="active" href="#allDocuments">All Documents</a></li>
              <li className="tab col s3"><a href="#myDocuments">My Documents</a></li>
            </ul>
          </div>
          <div id="allDocuments" className="col s12">
            <div className="row">
              {this.props.documents.documents.map((document) => (
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
              {this.props.documents.userDocuments.map((document) => (
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
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


DocumentsListPage.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  console.log(state);
  return {
    documents: state.documents,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(DocumentsListPage);
