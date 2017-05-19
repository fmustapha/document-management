import React, {PropTypes} from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import * as documentActions from '../../actions/documentAction';

class AddDocumentsPage
 extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: { title: '', access: 'public', content: '' }
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onAccessChange = this.onAccessChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(documentActions.creatingDocument());
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.documents.isCreating) {
      browserHistory.push('/document');
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
    document.ownerId = this.props.userId;
    document.access = access;
    this.setState({ document });
  }

  onClickSave() {
    console.log(this.state.document);
    this.props.dispatch(documentActions.createDocument(this.state.document));
  }

  onClickCancel() {
    this.props.dispatch();
  }

  render() {
    return (
      <div id="page-padding">
        <h3>Add Document</h3>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">mode_edit</i>
            <input
              onChange={this.onTitleChange}
              value={this.state.document.title} type="text" className="col 5 s12" />
            <label htmlFor="title">Document Title</label>
          </div>
          <div className="input-field col s12">
            <TinyMCE
            content="<p>This is the initial content of the editor</p>"
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

function mapStateToProps(state, ownProps) {
  const user = state.auth.loggedInUser;
  console.log('========', state.auth);
  return {
    documents: state.documents,
    userId: user.id
  };
}

AddDocumentsPage.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(AddDocumentsPage);
