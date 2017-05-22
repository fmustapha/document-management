import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import { bindActionCreators } from 'redux';
import UpdateDocumentPage from './UpdateDocumentPage';
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
      document: { title: '',
        access: 'public',
        content: '',
        ownerId: this.props.documents.currentDocument.ownerId
      },
      editing: false
    };
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
  }


  /**
   *
   *
   * @returns {void}
   * @memberof ViewDocumentPage
   */
  componentWillMount() {
    this.props.dispatch(documentActions.viewDocument(this.props.params.id));
  }

  /**
   *
   *
   * @returns {void}
   * @memberof ViewDocumentPage
   */
  onClickEdit() {
    this.setState({ editing: !this.state.editing });
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
   * @returns {void} Jsx Content
   *
   * @memberof ViewDocumentPage
   */
  render() {
    const document = this.props.documents.currentDocument;
    if (this.state.editing) {
      return <UpdateDocumentPage
        id={this.props.params.id}
        title={document.title}
        content={document.content}
        access={document.access}
        endEdit={this.onClickEdit}
        />
    }
    return (document) ?
        <div className="document-view">
          <h2>{document.title}</h2>
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

UpdateDocumentPage.propTypes = {
  documents: React.PropTypes.object.isRequired,
  browserHistory: React.PropTypes.func.isRequired
};

// function mapDispatchProps(dispatch) {
//   return {
//     actions: bindActionCreators(auth, dispatch)
//   };
// }

export default connect(mapStateToProps)(ViewDocumentPage);
