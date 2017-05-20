import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import * as documentActions from '../../actions/documentAction';

/**
 *
 *
 * @class ViewDocumentPage
 * @extends {React.Component}
 */
class ViewDocumentPage
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
      document: { title: '', access: 'public', content: '' }
    };
  }

  /**
   *
   *
   * @returns {String} Jsx content
   *
   * @memberof ViewDocumentPage
   */
  createMarkup() {
    return { __html: this.props.documents.currentDocument.content };
  }


  /**
   *
   *
   * @returns {void}
   * @memberof ViewDocumentPage
   */
  componentWillMount() {
    setTimeout(() => this.props.dispatch(documentActions.viewDocument(this.props.params.id)), 3000);
  }

  /**
   *
   *
   * @returns {void}
   * @memberof ViewDocumentPage
   */
  onClickEdit() {
    this.props.dispatch(documentActions.createDocument(this.state.document));
  }

  /**
   *
   *
   * @returns {void}
   * @memberof ViewDocumentPage
   */
  onClickBack() {
    this.window.history.back();
  }

  /**
   *
   *
   * @returns Jsx Content
   *
   * @memberof ViewDocumentPage
   */
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

/**
 *
 *
 * @param {Object} state
 * @returns {Object} object containing document and authourization details
 */
function mapStateToProps(state) {
  return {
    documents: state.documents,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(ViewDocumentPage);
