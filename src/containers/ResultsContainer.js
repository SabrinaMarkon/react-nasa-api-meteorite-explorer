import React, { Component, Fragment } from 'react';
import ResultHeadings from '../components/ResultHeadings';

export default class ResultsContainer extends Component {

  render() {
    let searchresults = Array.from(this.props.searchresults);

    // format the year property to only show 4 digit year.
    searchresults.forEach(result => {
      if (result.year) {
        result.year = result.year.slice(0, 4);
      }
    });

    let results = searchresults.map((row,i) => {
      return (
        <Fragment key={i}>
          <div className="grid-item" key={i}>{row.name}</div>
          <div className="grid-item">{i}</div>
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
}