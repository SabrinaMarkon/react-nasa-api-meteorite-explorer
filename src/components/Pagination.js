import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
    const props = {
      totalRecords: null, 
      pageLimit: 100, 
      pageNeighbors = 0
    }
    this.pageLimit = typeof pageLimit === 'number' ? pageLimit: 100;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
    /* pageNeighbors means the page numbers on either side of the current page.
    The minimum value is 0 and the maximum value is 2. If not specified, 
    it defaults to 0 as defined in the constructor(). */
    this.pageNeighbors = typeof pageNeighbors === 'number'
      ? Math.max(0, Math.min(pageNeighbors, 2))
      : 0;
    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbors: PropTypes.number,
  OnPageChanged: PropTypes.func
}