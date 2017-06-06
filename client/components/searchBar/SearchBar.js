import React, { PropTypes } from 'react';


/**
 *
 *
 * @export
 * @class SearchBar
 * @extends {React.Component}
 */
export class SearchBar extends React.Component {

  /**
   * Creates an instance of SearchBar.
   * @param {any} props
   *
   * @memberof SearchBar
   */
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
    // this.performSearch = this.performSearch.bind(this);
    this.onTermChange = this.onTermChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
  onCancel(event) {
    event.preventDefault();
    this.setState({
      term: ''
    });
  }
  /**
   *
   *
   * @param {Object} event
   * @returns {void}
   * @memberof UpdateDocumentPage
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.performSearch(event, this.state.term);
  }

  /**
   *
   *
   * @returns
   *
   * @memberof SearchBar
   */
  render() {
    return (
      <div>
        <nav className="search_nav">
          <div className="nav-wrapper">
            <form onSubmit={event => this.onSubmit(event)} method="post">
              <div className="input-field">
                <input
                  id="search_type"
                  type="search"
                  placeholder="Search..."
                  required
              value={this.state.term} onChange={this.onTermChange} />
                <label className="label-icon search-icon" htmlFor="search">
                  <a onClick={this.onCancel}>
                    <i className="material-icons">
                      close
                    </i>
                  </a>
                </label>
                <i
                type="submit"
                className="material-icons waves-effect waves-light"
                onClick={event => this.props.performSearch(event, this.state.term)}
                >search
                </i>
              </div>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

SearchBar.propTypes = {
  performSearch: PropTypes.func.isRequired,
  searchFor: PropTypes.string.isRequired
};

/**
 *
 *
 * @param {Object} dispatch
 * @returns
 */


export default SearchBar;


