import React, {Component} from 'react';
import PropTypes from 'prop-types';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

// Create a range of numbers ie. range(1, 5) => [1, 2, 3, 4, 5]
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];
  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
}

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

  /* Generates the page numbers to be shown on the pagination control.
  We want the first page and last page to always be visible. */
  fetchPageNumber = () => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbors = this.pageNeighbors;
    /* * 2 for each side, left and right of the current page. */
    const totalNumbersToShow = (this.pageNeighbors * 2) + 3;
    /* totalNumbersToShow + 2 for the < and > buttons. */
    const totalBlocksToShow = totalNumbersToShow + 2;
    if (totalPages > totalBlocksToShow) {
      // we hide some of the page number buttons at both ends.
      const startPage = Math.max(2, currentPage - pageNeighbors);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);
      let pages = range(startPage, endPage);
      /*hasLeftSpill: has hidden pages to the left
       hasRightSpill: has hidden pages to the right
       spillOffset: number of hidden pages either to the left or to the right. */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);


    }
    /* of the totalPages is smaller than the number of blocks to show,
    simply return a range of numbers from 1 to totalPages. */
    return range(1, totalPages);
  }

  render() {
    return (
      <div></div>
    );
  }
}
/* onPageChanged - is a function that will be called with data
of the current pagination state only when the current page changes. */
Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbors: PropTypes.number,
  OnPageChanged: PropTypes.func
}