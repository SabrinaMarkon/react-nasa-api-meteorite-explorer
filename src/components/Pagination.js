import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Create a range of numbers ie. range(1, 5) => [1, 2, 3, 4, 5]
const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
        range.push(i);
        i += step;
    }
    return range;
};

export default class Pagination extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentPage: 1
        };
        const totalRecords = props.totalRecords;
        const pageLimit = props.pageLimit;
        const pageNeighbors = props.pageNeighbors;
        this.pageLimit = typeof props.pageLimit === 'number' ? pageLimit : 100;
        this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
        /* pageNeighbors means how many page number links are on either side of the current page.
    The minimum value is 0 and the maximum value is 2. If not specified,
    it defaults to 0 as defined in the constructor(). */
        this.pageNeighbors = typeof pageNeighbors === 'number' ?
            Math.max(0, Math.min(pageNeighbors, 2)) :
            0;
        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
        this.pageButtons = range(1, this.totalPages);
    }

    componentDidMount () {
    // First time rendering, so show page 1 of the results.
        this.gotoPage(1);
    }

  gotoPage = page => {
      const currentPage = page;
      const paginationData = {
          currentPage,
          totalRecords: this.totalRecords
      };
      /* calls the onPageChanged() function that was passed
     in as a prop, with data indicating the new pagination state. */
      this.props.onPageChanged(paginationData);
      this.setState({ currentPage });
      console.log('currentPage: ' + currentPage);
  }

  handleClick = page => evt => {
      evt.preventDefault();
      this.gotoPage(page);
  }

  render () {
      if (!this.totalRecords || this.totalPages === 1) {
          return null;
      }
      const { currentPage } = this.state;
      return (
          <Fragment>
              <nav aria-label="Meteorite Database Pagination">
                  <ul className="pagination">
                      { this.pageButtons.map((pageButton, index) => {
                          return (
                              <li key={index} className={`page-item${ currentPage === pageButton ? ' active' : ''}`}>
                                  <a className="page-link" href="#" onClick={this.handleClick(pageButton)}>{ pageButton }</a>
                              </li>
                          );
                      })}
                  </ul>
              </nav>
          </Fragment>
      );
  }
}

/* onPageChanged - is a function that will be called with data
of the current pagination state only when the current page changes. */
Pagination.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    pageNeighbors: PropTypes.number,
    onPageChanged: PropTypes.func
};
