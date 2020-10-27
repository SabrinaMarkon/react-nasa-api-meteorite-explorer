import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime'; // async/await support for babel.

export default function Pagination (props) {
    const PAGE_NEIGHBORS = 5; // How many pagination buttons should on each side of the current page's button.
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [pageButtons, setpageButtons] = useState([]);

    let TOTALCOUNT_URL = "https://data.nasa.gov/resource/gh4g-9sfh.json?$select=count%28*%29";
    if (props.searchInput) {
        TOTALCOUNT_URL = "https://data.nasa.gov/resource/gh4g-9sfh.json?$select=count%28*%29&" +
        props.searchField + "=%27" + props.searchInput + "%27";
    }
    useEffect(() => {
        let isCancelled = false;
        (async function getPaginationButtons () {
            try {
                const resp = await axios.get(TOTALCOUNT_URL);
                const totalRecords = parseInt(resp.data[0].count, 10);
                // Figure out how many pages and pagination buttons there should be:
                const totalPages = Math.ceil(totalRecords / props.pageLimit);
                let pageButtons = [];
                for (let i = 1; i <= totalPages; i++) {
                    pageButtons.push({
                        id: i,
                        pagenum: i
                    // eslint-disable-next-line semi
                    });
                }
                if (!isCancelled) {
                    setTotalRecords(totalRecords);
                    setTotalPages(totalPages);
                    setpageButtons(pageButtons);
                }
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        })();
        return () => {
            isCancelled = true;
        };
    }, [props.searchInput]);

    const handleClick = pageButton => event => {
        event.preventDefault();
        props.goToPage({
            searchField: props.searchField,
            searchInput: props.searchInput,
            currentPage: pageButton
        });
    };

    const renderLeftPageButtons = (() => {
        if (props.currentPage > PAGE_NEIGHBORS) {
            // include the < and <<
            return (
                <>
                <li key="doubleleft" className="page-item">
                    <a className="page-link arrow-link" href="#"
                        onClick={handleClick(1)}>&lt;&lt;</a>
                </li>
                <li key="singleleft" className="page-item">
                    <a className="page-link arrow-link" href="#"
                        onClick={handleClick(props.currentPage - 1)}>&lt;</a>
                </li>
                </>
            );
        }
    })();

    const renderRightPageButtons = (() => {
        if (props.currentPage < pageButtons.length - PAGE_NEIGHBORS) {
            // include the > and >>
            return (
                <>
                <li key="singleright" className="page-item">
                    <a className="page-link arrow-link" href="#"
                        onClick={handleClick(props.currentPage + 1)}>&gt;</a>
                </li>
                <li key="doubleright" className="page-item">
                    <a className="page-link arrow-link" href="#"
                        onClick={handleClick(pageButtons.length)}>&gt;&gt;</a>
                </li>
                </>
            );
        }
    })();

    const renderPageButtons = pageButtons.map((pageButton) => {
        // For large datasets we only want to show #PAGE_NEIGHBORS pagination buttons on each side of the current page,
        // except for pages #1 and the last page:
        if (pageButton.pagenum >= props.currentPage - PAGE_NEIGHBORS &&
            pageButton.pagenum <= props.currentPage + PAGE_NEIGHBORS) {
            return (
                <li key={pageButton.id} id={pageButton.id}
                    className={`page-item${ props.currentPage === pageButton.pagenum ? ' active' : ''}`}>
                    <a className="page-link" href="#"
                        onClick={handleClick(pageButton.pagenum)}>{ pageButton.pagenum }</a>
                </li>
            );
        }
    });

    if (pageButtons.length === 0 || totalPages === 1) {
        return null;
    }
    return (
        <Fragment>
            <div className="pagination-wrapper" aria-label="Meteorite Database Pagination">
                <div className="pagination-totals">Results: {totalRecords} records in {totalPages} pages</div>
                <ul className="pagination">
                    { renderLeftPageButtons }
                    { renderPageButtons }
                    { renderRightPageButtons }
                </ul>
            </div>
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
    currentPage: PropTypes.number
};
