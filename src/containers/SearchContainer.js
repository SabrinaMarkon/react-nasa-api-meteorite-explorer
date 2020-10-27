import React from 'react';
import Search from '../components/Search';
import PropTypes from 'prop-types';

export default function SearchContainer (props) {
    const goToPage = (searchParams) => {
        props.goToPage(searchParams);
    };

    return (
        <div className="center-align pt-2">
            <Search goToPage={goToPage} currentPage={props.currentPage} />
        </div>
    );
}

SearchContainer.propTypes = {
    goToPage: PropTypes.func,
    currentPage: PropTypes.number
};
