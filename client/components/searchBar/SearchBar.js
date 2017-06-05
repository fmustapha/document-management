import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchAction from '../../actions/searchAction';


export class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
    // this.performSearch = this.performSearch.bind(this);
    this.onTermChange = this.onTermChange.bind(this);
  }

  /**
  *
  * @returns {void}
  * @param {Object} event
  *
  * @memberof SearchPage
  */
  onTermChange(event) {
    const term = event.target.value;
    this.setState({ term });
  }
  /**
   *
   *
   * @param {Object} event
   * @returns {void}
   * @memberof UpdateDocumentPage
   */
  // performSearch(event, type) {
  //   event.preventDefault();
  //   console.log(this.props, '<==props');
  //   // if (type && type === 'user') {
  //   //   this.props.action.searchUser(this.state.term)
  //   //   .then((response) => {
  //   //     console.log(response, '<==response');
  //   //   });
  //   // } else {
  //   //   this.props.searchAction.searchDocument(this.state.term);
  //   // }
  // }

  render() {
    return (
      <nav className="search_nav">
        <div className="nav-wrapper">
          <form>
            <div className="input-field">
              <input id="search_type" type="search" required value={this.state.term} onChange={this.onTermChange} />
              <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
              <input
                type="button"
                value="Search"
                className="waves-effect waves-light btn"
                onClick={(e) => this.props.performSearch(e, this.state.term)}
              />
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.object.isRequired,
  searchFor: PropTypes.string.isRequired,
  action: PropTypes.object.isRequired
};

/**
 *
 *
 * @param {Object} dispatch
 * @returns
 */


export default SearchBar;


