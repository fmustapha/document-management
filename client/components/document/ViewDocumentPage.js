import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import * as documentActions from '../../actions/documentAction';

class ViewDocumentPage
 extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: { title: '', access: 'public', content: '' }
    };
  }

  createMarkup() {
    return { __html: this.props.documents.currentDocument.content };
  }


  componentWillMount() {
    setTimeout(() => this.props.dispatch(documentActions.viewDocument(this.props.params.id)), 3000);
  }

  onClickEdit() {
    this.props.dispatch(documentActions.createDocument(this.state.document));
  }

  onClickBack() {
    window.history.back();
  }

  render() {

    return (this.props.documents.currentDocument) ?
        <div className="document-view">
          <h2>{this.props.documents.currentDocument.title}</h2>
          <p dangerouslySetInnerHTML={this.createMarkup()} />
          <div>
            <input
          type="submit"
          value="Edit"
          className="waves-effect waves-light btn"
          onClick={this.onClickEdit} />
            <input
          type="submit"
          value="Back"
          className="waves-effect waves-light btn"
          onClick={this.onClickBack}>
            </input>
          </div>
        </div>
        :
        <div className="page-center-padding">Please Wait...</div>;
  }
 }

function mapStateToProps(state) {
  console.log(state);
  return {
    documents: state.documents,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(ViewDocumentPage);


