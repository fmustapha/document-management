import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import { addFlashMessage } from '../../actions/flashMessages';
import { createDocument } from '../../actions/documentAction';

/**
 *
 *
 * @class AddDocumentsPage
 * @extends {React.Component}
 */
class AddDocumentsPage
 extends React.Component {
  /**
   * Creates an instance of AddDocumentsPage.
   * @param {any} props
   * @param {any} context
   *
   * @memberof AddDocumentsPage
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      document:
      { title: '',
        access: 'public',
        content: '',
        ownerId: this.props.userId
      }
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onAccessChange = this.onAccessChange.bind(this);
  }

  // componentDidMount() {
  //   this.props.dispatch(documentActions.creatingDocument());
  // }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.documents.isCreating) {
      browserHistory.push('/dms/document');
    }
  }

  onTitleChange(event) {
    const document = this.state.document;
    document.title = event.target.value;
    this.setState({ document });
  }

    handleEditorChange(event) {
      const document = this.state.document;
      document.content = event.target.getContent();
      this.setState({ document });
    }

  onAccessChange(access) {
    const document = this.state.document;
    document.access = access;
    this.setState({ document });
  }

  onClickSave() {
    this.props.createDocumentActions(this.state.document)
    .then(() => toastr.success('Document successfully created'))
    .catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to create document' });
      toastr.error(
        'Unable to create document, kindly contact your Admin');
    });
  }

  onClickCancel() {
    this.props.dispatch();
  }

  render() {
    return (
      <div id="page-padding">
        <h3>Add Document</h3>
        <div className="row">
          <div className="input-field col s6 pad-icons">
            <div className="pad-icons">
              <i className="material-icons prefix">mode_edit</i>
            </div>
            <input
              onChange={this.onTitleChange}
              value={this.state.document.title}
              name="title"
              type="text" className="col 5 s12" />
            <label htmlFor="title">Document Title</label>
          </div>
          <div className="input-field col s12">
            <TinyMCE
            content={this.state.document.content}
            name="content"
            config={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
            onChange={this.handleEditorChange}
              />
          </div>

          <div>
            <p id="access">Select Access Type</p>
            <a className="dropdown-button btn" href="#" data-activates="dropdown1">
              {this.state.document.access}<span className="fa fa-sort-desc"></span>
            </a>
            <ul id="dropdown1" className="dropdown-content">
              <li onClick={() => this.onAccessChange('public')}><a htmlFor="public">public</a></li>
              <li onClick={() => this.onAccessChange('private')}><a htmlFor="private">private</a></li>
              <li onClick={() => this.onAccessChange('role')}><a htmlFor="role">role</a></li>
            </ul>
          </div>
        </div>
        <span>
          <input
        type="submit"
        value="Save"
        className="waves-effect waves-light btn"
        onClick={this.onClickSave} />
        </span>
        <span>
          <input
        type="submit"
        value="Cancel"
        className="waves-effect waves-light btn"
        onClick={this.onClickCancel} />
        </span>
      </div>
    );
  }
}

/**
 *
 *
 * @param {any} state
 * @param {any} ownProps
 * @returns
 */
function mapStateToProps(state) {
  const user = state.auth.loggedInUser;
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
  userId: React.PropTypes.number.isRequired,
  createDocumentActions: React.PropTypes.object.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
};

/**
 *
 *
 * @param {any} dispatch
 * @returns {Object} containing actions to create document and add flash message
 */
function mapDispatchToProps(dispatch) {
  return {
    createDocumentActions: bindActionCreators(createDocument, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDocumentsPage);
