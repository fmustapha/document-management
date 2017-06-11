import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import { createDocument } from '../../actions/documentAction';

/**
 *
 *
 * @class AddDocumentsPage
 * @extends {React.Component}
 */
export class AddDocumentsPage
 extends React.Component {
  /**
   * Creates an instance of AddDocumentsPage.
   * @param {Object} props
   * @param {Object} context
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
    this.onClickBack = this.onClickBack.bind(this);
    this.onAccessChange = this.onAccessChange.bind(this);
  }

  /**
   *
   * @returns {void}
   * @param {Object} nextProps
   *
   * @memberof AddDocumentsPage
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.documents.isCreated === true) {
      toastr.success('Document successfully created');
      browserHistory.push('/dms/document');
    } else if (nextProps.documents.error) {
      toastr.error(nextProps.documents.error);
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
    this.props.createDocumentActions(this.state.document);
  }

/**
   *
   *
   * @returns {void}
   * @memberof VAddDocumentsPage
   */
  onClickBack() {
    browserHistory.goBack();
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
        <h3 className="padded">Add Document</h3>
        <div className="row">
          <div className="input-field col s6 pad-icons">
            <div className="pad-icons">
              <i className="material-icons prefix">mode_edit</i>
            </div>
            <input
              onChange={this.onTitleChange}
              value={this.state.document.title}
              name="title"
              type="text" className="col 5 s12 padded" required />
          </div>
          <div className="input-field col s12 padded" >
            <TinyMCE
            content={this.state.document.content}
            name="content"
            config={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
            onChange={this.handleEditorChange}
            className="wysiwyg" required />
          </div>
          <div className="padded" id="select">
            <select onChange={this.onAccessChange} >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="role">Role</option>
            </select>
            <label htmlFor="access" className="active">Select Access type</label>
          </div>
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

AddDocumentsPage.propTypes = {
  userId: PropTypes.number.isRequired,
  createDocumentActions: PropTypes.func.isRequired,
  // documents: PropTypes.object.isRequired
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
    documents: state.documents,
    userId: user.data.id
  };
}

/**
 *
 *
 * @param {any} dispatch
 * @returns {Object} containing actions to create document
 */
function mapDispatchToProps(dispatch) {
  return {
    createDocumentActions: bindActionCreators(createDocument, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDocumentsPage);
