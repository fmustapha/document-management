import React from 'react';
import { browserHistory } from 'react-router';
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
        access: '',
        content: '',
        ownerId: this.props.userId
      }
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.onAccessChange = this.onAccessChange.bind(this);
  }

  // componentDidMount() {
  //   this.props.dispatch(documentActions.creatingDocument());
  // }

  /**
   *
   * @returns {void}
   * @param {Object} nextProps
   *
   * @memberof AddDocumentsPage
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.documents.isCreating === 'false') {
      browserHistory.push('/dms/document');
    }
  }

  /**
   *
   *
   * @param {Object} event
   * @returns {void}
   * @memberof AddDocumentsPage
   */
  onTitleChange(event) {
    const document = this.state.document;
    document.title = event.target.value;
    this.setState({ document });
  }

 /**
   *
   *
   * @param {Object} event
   * @returns {void}
   * @memberof AddDocumentsPage
   */
  onAccessChange(event) {
    const document = this.state.document;
    document.access = event.target.value;
    this.setState({ document });
  }

  /**
   *
   *
   * @returns {void}
   * @memberof AddDocumentsPage
   */
  onClickSave() {
    console.log(this.state.document, 'values');
    this.props.createDocumentActions(this.state.document)
    .then(() => toastr.success('Document successfully created'))
    .catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to create document' });
      toastr.error(
        'Unable to create document, kindly complete all fields');
    });
    this.props.endEdit();
  }

/**
   *
   *
   * @returns {void}
   * @memberof VAddDocumentsPage
   */
  onClickBack() {
    this.context.router.push('/dms/document');
  }

   /**
     *
     *
     * @param {Object} event
     * @returns {void}
     * @memberof AddDocumentsPage
     */
  handleEditorChange(event) {
    const document = this.state.document;
    document.content = event.target.getContent();
    this.setState({ document });
  }

  /**
   *
   *
   * @returns {void} Jsx Content
   *
   * @memberof AddDocumentsPage
   */
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
              type="text" className="col 5 s12" required />
            <label htmlFor="title">Document Title</label>
          </div>
          <div className="input-field col s12" >
            <TinyMCE
            content={this.state.document.content}
            name="content"
            config={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
            onChange={this.handleEditorChange}
            className="wysiwyg"
            required />
          </div>
          <div className="" id="select">
            <select onChange={this.onAccessChange} >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="role">Role</option>
            </select>
            <label>Select Access type</label>
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
        value="Back"
        className="waves-effect waves-light btn"
        onClick={this.onClickBack} />
        </span>
      </div>
    );
  }
}

AddDocumentsPage.propTypes = {
  userId: React.PropTypes.number.isRequired,
  createDocumentActions: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.func.isRequired,
  endEdit: React.PropTypes.func.isRequired,
};

/**
 *
 *
 * @param {Object} state
 * @returns {Object} containing userId property and value
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
 * @returns {Object} containing actions to create document and add flash message
 */
function mapDispatchToProps(dispatch) {
  return {
    createDocumentActions: bindActionCreators(createDocument, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDocumentsPage);
