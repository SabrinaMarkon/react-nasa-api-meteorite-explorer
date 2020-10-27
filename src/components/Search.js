import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search (props) {
    const [searchInput, setSearchInput] = useState('');
    const [searchField, setSearchField] = useState('name');

    const handleChange = event => {
        let searchInput = (event.target.value);
        setSearchInput(searchInput);
    };

    const handleSelected = event => {
        let searchField = (event.target.value);
        setSearchField(searchField);
    };

    const handleSubmit = event => {
        event.preventDefault();
        props.goToPage({
            searchField,
            searchInput,
            currentPage: props.currentPage
        });
    };

    const handleResetSearch = event => {
        event.preventDefault();
        props.goToPage({
            searchField: '',
            searchInput: '',
            currentPage: 1
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <select className="form-input" value={searchField} onChange={handleSelected}>
                <option value="name">Name</option>
                <option value="nametype">Name Type</option>
                <option value="recclass">Rec Class</option>
                {/* <option value="mass">Mass (g)</option> */}
                <option value="fall">Fall</option>
                {/* <option value="year">Year</option> */}
                <option value="reclat">Latitude</option>
                <option value="reclong">Longitude</option>
            </select>
            <input
                className="form-input"
                type="text"
                value={searchInput}
                onChange={handleChange}
            />
            <button className="form-input" type="button" onClick={handleSubmit}>Search!</button>
            <button className="form-input" type="button" onClick={handleResetSearch}>Reset</button>
        </form>
    );
}

Search.propTypes = {
    goToPage: PropTypes.func,
    currentPage: PropTypes.number
};
