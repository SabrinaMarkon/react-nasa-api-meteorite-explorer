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
        this.handleClick = this.handleClick.bind(this);

    //     let { totalRecords, pageLimit, pageNeighbors } = this.props;
    //     // Validate prop values:
    //     pageLimit = typeof pageLimit === 'number' ? pageLimit : 100;
    //     this.duhtotalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
    //     /* pageNeighbors means how many page number links are on either side of the current page.
    // The minimum value is 0 and the maximum value is 2. If not specified,
    // it defaults to 0 as defined in the constructor(). */
    //     this.pageNeighbors = typeof pageNeighbors === 'number' ?
    //         Math.max(0, Math.min(pageNeighbors, 2)) :
    //         0;
    //     this.totalPages = Math.ceil(this.duhtotalRecords / pageLimit);
    //     this.pageButtons = range(1, this.totalPages);
    }

    handleClick = page => evt => {
        evt.preventDefault();
        this.setState({ currentPage: page });
        this.props.goToPage(page);
    }

    render () {
        if (!this.duhtotalRecords || this.totalPages === 1) {
            return null;
        }
        const { currentPage } = this.state;
        return (
            <Fragment>
                <nav aria-label="Meteorite Database Pagination">
                    <ul className="pagination">
                        { this.pageButtons.map((pageButton, index) => {
                            return (
                                <li key={index}
                                    className={`page-item${ currentPage === pageButton ? ' active' : ''}`}>
                                    <a className="page-link" href="#"
                                        onClick={this.handleClick(pageButton)}>{ pageButton }</a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </Fragment>
        );
    }
}

/* goToPage - is a function that will be called with data
of the current pagination state only when the current page changes. */
Pagination.propTypes = {
    goToPage: PropTypes.func,
    pageLimit: PropTypes.number,
    pageNeighbors: PropTypes.number,
    currentPage: PropTypes.number
};
