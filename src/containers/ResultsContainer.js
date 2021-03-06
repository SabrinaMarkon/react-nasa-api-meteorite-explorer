import React, { Fragment } from 'react';
import ResultHeadings from '../components/ResultHeadings';
import PropTypes from 'prop-types';

export default function ResultsContainer (props) {
    let searchResults = Array.from(props.searchResults);

    // format the year property to only show 4 digit year.
    searchResults.forEach(result => {
        if (result.year) {
            result.year = result.year.slice(0, 4);
        }
    });

    let results = searchResults.map((row) => {
        return (
            <Fragment key={row.id}>
                <div className="grid-item">{row.name}</div>
                <div className="grid-item">{row.id}</div>
                <div className="grid-item">{row.nametype}</div>
                <div className="grid-item">{row.recclass}</div>
                <div className="grid-item">{row.mass}</div>
                <div className="grid-item">{row.fall}</div>
                <div className="grid-item">{row.year}</div>
                <div className="grid-item">{row.reclat}</div>
                <div className="grid-item">{row.reclong}</div>
            </Fragment>
        );
    }

    );
    return (
        <section className="grid center-align p-2">
            <ResultHeadings />
            {results}
        </section>
    );
}

ResultsContainer.propTypes = {
    searchResults: PropTypes.array
};
