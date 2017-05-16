import React from 'react';
import { Link } from 'react-router';
import TinyMCE from 'react-tinymce';

class AddDocumentsPage
 extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: { title: '' }
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
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

  onClickSave() {
    alert(`Saving ${this.state.document.title}
    and the content`);
  }

  onClickCancel() {
    alert(`Cancelling ${this.state.document.title}
    and the content`);
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

export default AddDocumentsPage
;
