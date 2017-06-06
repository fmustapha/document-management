import React, { PropTypes } from 'react';
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
        ownerId: ''
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
    this.props.actions.viewDocument(this.props.params.id);
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
    const currentDocument = this.props.documents.currentDocument;
    return { __html: currentDocument.content };
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
        ownerId={document.ownerId}
        endEdit={this.onClickEdit}
        />
    }
    return (document) ?
      <div className="document-view">
        <h2>{document.title}</h2>
        <p dangerouslySetInnerHTML={this.createMarkup()} />
        <div>
          <span>
            <input
          type="submit"
          value="Edit"
          className="waves-effect waves-light btn"
          onClick={this.onClickEdit} />
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
        :
      <div className="page-center-padding">Please Wait...</div>;
  }
 }

UpdateDocumentPage.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  browserHistory: React.PropTypes.func.isRequired
};

/**
 *
 *
 * @param {func} dispatch
 * @returns {Object} containing the action property
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch),
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewDocumentPage);
