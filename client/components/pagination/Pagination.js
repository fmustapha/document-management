import React, { PropTypes } from 'react';

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number
};

const defaultProps = {
  initialPage: 1
};

/**
 *
 *
 * @class Pagination
 * @extends {React.Component}
 */
class Pagination extends React.Component {
  /**
   * Creates an instance of Pagination.
   * @param {any} props
   *
   * @memberof Pagination
   */
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  /**
   *
   *
   *
   * @memberof Pagination
   */
  componentWillMount() {
    this.setPage(this.props.initialPage);
  }

  /**
   *
   *
   * @param {any} page
   * @returns
   *
   * @memberof Pagination
   */
  setPage(page) {
    const items = this.props.items;
    let pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

        // get new pager object for specified page
    pager = this.getPager(items.length, page);

        // get new page of items from items array
    let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
    this.setState({ pager });

        // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  /**
   *
   *
   * @param {any} totalItems
   * @param {any} currentPage
   * @param {any} pageSize
   * @returns
   *
   * @memberof Pagination
   */
  getPager(totalItems, currentPage, pageSize) {
        // default to first page
    currentPage = currentPage || 1;

        // default page size is 10
    pageSize = pageSize || 10;

        // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 10) {
            // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
            // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

        // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + (pageSize - 1), totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }

  /**
   *
   *
   * @returns
   *
   * @memberof Pagination
   */
  render() {
    let pager = this.state.pager;

    return (
      <ul className="pagination">
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
        </li>
        {pager.pages.map((page, index) =>
          <li key={index} className={pager.currentPage === page ? 'active' : ''}>
            <a onClick={() => this.setPage(page)}>{page}</a>
          </li>
                )}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps;
export default Pagination;
