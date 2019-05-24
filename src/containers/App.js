import React, {Component} from 'react';
import Nav from '../components/Nav';
import SearchContainer from '../containers/SearchContainer';
import ResultsContainer from '../containers/ResultsContainer';

export default class App extends Component {

  render() {
    return (
      <>
        <Nav />
        <SearchContainer />
        <ResultsContainer />       
      </>
    )
  }
}

