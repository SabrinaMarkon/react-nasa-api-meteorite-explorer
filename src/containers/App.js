import React, {Component} from 'react';
import Nav from '../components/Nav';
import SearchContainer from '../containers/SearchContainer';
import ResultsContainer from '../containers/ResultsContainer';

export default class App extends Component {

  doSearch = searchtext => {
    // API CALL!
    console.log(searchtext);
  }

  render() {
    return (
      <>
        <Nav />
        <SearchContainer doSearch={this.doSearch} />
        <ResultsContainer />       
      </>
    )
  }
}

