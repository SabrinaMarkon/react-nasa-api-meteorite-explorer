import React, { Component } from 'react';
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

    let results = searchresults.map(row => {
      return (
      <tr key={row.Id}>
        <td>{row.name}</td>
        <td>{row.Id}</td>
        <td>{row.nametype}</td>
        <td>{row.recclass}</td>
        <td>{row.mass}</td>
        <td>{row.fall}</td>
        <td>{row.year}</td>
        <td>{row.reclat}</td>
        <td>{row.reclong}</td>
      </tr>
      );
    }

    );
    return (
    <section className="center-align">
      <ResultHeadings />
      <table align="center" border="1">
        <tbody>{results}</tbody>
      </table>
    </section>
    );
  }
}