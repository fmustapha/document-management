import React from 'react';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import { bindActionCreators } from 'redux';
import { addFlashMessage } from '../../actions/flashMessages';
import * as documentActions from '../../actions/documentAction';

/**
 *
 *
 * @class ViewDocumentPage
 * @extends {React.Component}
 */
class UpdateDocumentPage
 extends React.Component {
  /**
   * Creates an instance of ViewDocumentPage.
   * @param {Object} props
   * @param {Object} context
   *
   * @memberof ViewDocumentPage
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      document:
      { title: props.title,
        access: props.access,
        content: props.content,
        ownerId: this.props.documents.currentDocument.ownerId,
        id: this.props.id
      },
    };
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onAccessChange = this.onAccessChange.bind(this);
  }

  /**
   *
   *
   * @param {Object} event
   * @returns {void}
   * @memberof UpdateDocumentPage
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
   * @memberof UpdateDocumentPage
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
   * @memberof ViewDocumentPage
   */
  onClickSave() {
    this.props.updateDocumentAction(this.props.id, this.state.document)
    .then(() => toastr.success('Document Successfully Updated'))
    .catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to update document' });
      toastr.error(
        'Unable to update document');
    });
    this.props.endEdit();
  }

  /**
   *
   *
   * @returns {void}
   * @memberof ViewDocumentPage
   */
  onClickBack() {
    browserHistory.goBack();
  }

  /**
     *
     *
     * @param {Object} event
     * @returns {void}
     * @memberof UpdateDocumentPage
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
   * @memberof ViewDocumentPage
   */
  render() {
    return (
      <div id="page-padding">
        <h3 id="padded">Update Document</h3>
        <div className="row">
          <div className="input-field col s6">
            <div className="padded">
              <i className="material-icons prefix pad-icons">mode_edit</i>
            </div>
            <input
              onChange={this.onTitleChange}
              value={this.state.document.title}
              type="text"
              name="title"
              id="input-margin"
              className="col 5 s12" />
            <label htmlFor="title" className="active">Title</label>
          </div>
          <div className="input-field col s12">
            <TinyMCE
            content={this.state.document.content}
            config={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
            onChange={this.handleEditorChange}
              />
            <label htmlFor="content" className="active">Content</label>
          </div>
        </div>
        <div className="col s12 padded" id="select">
          <select name="access" value={this.state.document.access} onChange={this.onAccessChange} >
            <option value="" selected>Select Access Type</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="role">Role</option>
          </select>
          <label htmlFor="access" className="active">Select Access Type</label>
        </div>
        <div className="right">
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
      </div>
    );
  }
 }

/**
 *
 *
 * @param {object} state
 * @returns {Object} document property and values
 */
function mapStateToProps(state) {
  return {
    documents: state.documents
  };
}

/**
 *
 *
 * @param {Object} dispatch
 * @returns {Object} object containing document and authourization details
 */
function mapDispatchToProps(dispatch) {
  return {
    updateDocumentAction:
    bindActionCreators(documentActions.updateDocument, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
}

UpdateDocumentPage.propTypes = {
  updateDocumentAction: React.PropTypes.func.isRequired,
  id: React.PropTypes.number.isRequired,
  ownerId: React.PropTypes.number.isRequired,
  endEdit: React.PropTypes.func.isRequired,
  documents: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  access: React.PropTypes.string.isRequired,
  browserHistory: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDocumentPage);
