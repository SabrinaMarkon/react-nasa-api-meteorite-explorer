import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime'; // async/await support for babel.

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

export default function Pagination (props) {
    const [totalPages, setTotalPages] = useState(1);
    const [pageButtons, setpageButtons] = useState([]);

    let TOTALCOUNT_URL = "https://data.nasa.gov/resource/gh4g-9sfh.json?$select=count%28*%29";
    if (props.searchInput) {
        TOTALCOUNT_URL = "https://data.nasa.gov/resource/gh4g-9sfh.json?$select=count%28*%29&" +
        props.searchField + "=%27" + props.searchInput + "%27";
    }

    useEffect(() => {
        (async function getPaginationButtons () {
            try {
                const resp = await axios.get(TOTALCOUNT_URL);
                const totalRecords = parseInt(resp.data[0].count, 10);
                // Figure out how many pages and pagination buttons there should be:
                const totalPages = Math.ceil(totalRecords / props.pageLimit);
                setTotalPages(totalPages);
                let pageButtons = range(1, totalPages);
                setpageButtons(pageButtons);
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        })();
    }, [props.searchInput]);

    const handleClick = pageButton => event => {
        event.preventDefault();
        props.goToPage({
            searchField: props.searchField,
            searchInput: props.searchInput,
            currentPage: pageButton
        });
    };

    if (pageButtons.length === 0 || totalPages === 1) {
        return null;
    }
    return (
        <Fragment>
            <nav aria-label="Meteorite Database Pagination">
                <ul className="pagination">
                    { pageButtons.map((pageButton, index) => {
                        return (
                            <li key={index}
                                className={`page-item${ props.currentPage === pageButton ? ' active' : ''}`}>
                                <a className="page-link" href="#"
                                    onClick={handleClick(pageButton)}>{ pageButton }</a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </Fragment>
    );
}

/* goToPage - is a function that will be called with data
of the current pagination state only when the current page changes. */
Pagination.propTypes = {
    pageLimit: PropTypes.number,
    pageNeighbors: PropTypes.number,
    goToPage: PropTypes.func,
    searchField: PropTypes.string,
    searchInput: PropTypes.string,
    currentPage: PropTypes.number,
    totalRecords: PropTypes.number
};
