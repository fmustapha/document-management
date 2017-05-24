/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import ReactPaginate from 'react-paginate';
import * as documentActions from '../../actions/documentActions';
import * as searchAction from '../../actions/searchAction';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      value: '',
      limit: 10,
      offset: 0
    };
    this.onChange = this.onChange.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.searchDocumentsClick = this.searchDocumentsClick.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    $('.modal').modal();
  }


  /**
   * 
   * 
   * @param {any} event 
   * 
   * @memberof SearchPage
   */
  onChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }
  /**
   *
   *
   * @param {Object} event
   *
   * @memberof SearchPage
   */
  searchDocumentsClick(event) {
    event.preventDefault();
    const value = this.state.value;
    if (value.trim() !== '') {
      this.props.searchAction.searchDocuments(value, 10, 0).then(() => {
        this.setState({ value, showResult: true });
      }).catch(() => {
        toastr.error(
          'Document not found');
      });
    } else {
      toastr.error(
        'search text field is empty, please enter a search term');
    }
  }

  /**
   *
   * @returns {void}
   * @param {Object} event
   *
   * @memberof SearchPage
   */
  renderModal(event) {
    event.preventDefault();
    const documentId = event.target.id;
    this.props.actions.setCurrentDocument(documentId);
    $('#modal2').modal('close');
    $('#modal1').modal('open');
  }

  /**
   *
   * @returns {void}
   * @param {Object} data
   *
   * @memberof SearchPage
   */
  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.state.limit);

    this.setState({ offset }, () => {
      this.props.searchAction.searchUser(
        this.state.value, this.state.limit, offset);
    });
  }

  /**
   *
   *
   * @returns
   *
   * @memberof SearchPage
   */
  render() {
    return (
      <div>
        <div id="modal2" className="modal">
          <div>
            <a
            href="#"
            className="btn-floating pink closeModal modal-close">
              <i className="material-icons">close</i></a>
          </div>
          <div className="modal-content">
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s9">
                    <i className="material-icons prefix">search</i>
                    <input
                      id="search"
                      type="text"
                      className="validate"
                      onChange={this.onChange}
                       />
                    <label htmlFor="search" className="active">search</label>
                  </div>
                  <div className="input-field col s3">
                    <input
                      type="submit"
                      value="Search"
                      className="btn waves-effect waves-light pink darken-1"
                      onClick={this.searchDocumentsClick}/>
                  </div>
                </div>
              </form>
              <div id="result" className="col s12">
                <div className="row">
                  <div className="col s6 offset-s3">
                    {this.state.showResult ?
                      <h6 id="searchResult">
                      Result for "{this.state.value}"</h6>
                     : ''}
                    {this.props.searchedDocuments.map(document =>
                      <div
                      id="card-alert" className="card white"
                      key={document.id}>
                        <div className="card-content pink-text">
                          <a
                          className="pointer" id={document.id}
                            onClick={this.renderModal}>
                          Title: {document.title}
                          </a>
                        </div>
                      </div>)}
                    <ReactPaginate
                      previousLabel={'previous'}
                                     nextLabel={'next'}
                                     breakLabel={<a href="">...</a>}
                                     breakClassName={'break-me'}
                                     pageCount={this.props.pagination}
                                     marginPagesDisplayed={2}
                                     pageRangeDisplayed={5}
                                     onPageChange={this.handlePageClick}
                                     containerClassName={'pagination'}
                                     subContainerClassName={'pages pagination'}
                                     pageClassName={'waves-effect'}
                                     activeClassName={'active'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  searchedDocuments: PropTypes.array.isRequired,
  pagination: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  searchAction: React.PropTypes.object.isRequired,
};

/**
 * [mapStateToProps description]
 * @param  {object} state [description]
 * @return {object}  state     [description]
 */
const mapStateToProps = (state) => {
  let searchResult = [];
  searchResult = state.manageSearch.searchedDocuments;
  return {
    auth: state.auth,
    searchedDocuments: searchResult,
    pagination: state.manageSearch.searchedPageCount
  };
};
/**
 *
 *
 * @param {func} dispatch
 * @returns {Object} containing actions and searchAction value key pairs
 */
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(documentActions, dispatch),
    searchAction: bindActionCreators(searchAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
