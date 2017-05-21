import React from 'react';
import { Link, browserHistory } from 'react-router';
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
        content: props.content
      },
    };
    this.onChange = this.onChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onAccessChange = this.onAccessChange.bind(this);
  }

  /**
   *
   * @returns {void}
   * @param {Object} event
   *
   * @memberof LoginPage
   */
  onChange(event) {
    const document = this.state.document;
    const field = event.target.name;
    document[field] = event.target.value;
    this.setState(
      {
        document
      }
    );
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

  onAccessChange(access) {
    const document = this.state.document;
    document.ownerId = this.props.id;
    document.access = access;
    this.setState({ document });
  }
  /**
   *
   *
   * @returns {void}
   * @memberof ViewDocumentPage
   */
  onClickSave() {
    this.props.updateDocumentAction(this.props.id, this.state.documents)
    .then(() => toastr.success('Document Successfully Deleted'))
    .catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to delete document' });
      toastr.error(
        'Unable to delete document');
    });
    this.props.endEdit();
  }

  /**
   *
   *
   * @returns {void}
   * @memberof ViewDocumentPage
   */
  onClickCancel() {
    browserHistory.goBack();
  }

  /**
   *
   *
   * @returns Jsx Content
   *
   * @memberof ViewDocumentPage
   */
  render() {
    return (
      <div id="page-padding">
        <h3>Update Document</h3>
        <div className="row">
          <div className="input-field col s6">
            <div className="pad-icons">
              <i className="material-icons prefix">mode_edit</i>
            </div>
            <input
              onChange={this.onTitleChange}
              value={this.props.title} type="text" className="col 5 s12" />
          </div>
          <div className="input-field col s12">
            <TinyMCE
            content={this.props.content}
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
              {this.props.access}<span className="fa fa-sort-desc"></span>
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
 * @param {Object} state
 * @returns {Object} object containing document and authourization details
 */
function mapDispatchProps(dispatch) {
  return {
    updateDocumentAction:
    bindActionCreators(documentActions.updateDocument, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
}

UpdateDocumentPage.propTypes = {
  updateDocumentAction: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  endEdit: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  access: React.PropTypes.string.isRequired
};

export default connect(null, mapDispatchProps)(UpdateDocumentPage);


/* <input
            type="submit"
            value="Save"
            className="waves-effect waves-light btn"
            onClick={this.onClickSave} />
          <input
            type="submit"
            value="Cancel"
            className="waves-effect waves-light btn"
            onClick={this.onClickCancel} />
*/
