import React, {Component} from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import SearchContainer from '../containers/SearchContainer';
import ResultsContainer from '../containers/ResultsContainer';
import Footer from '../components/Footer';
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchresults: []
    }
    this.doSearch = this.doSearch.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    let API_URL = 'https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=100&$offset=0';
    axios.get(API_URL)
    .then(res => {
      /* Add a check in the .then() handler so this.setState is not called if the component has been unmounted:
      That is, how should react 'react' when you call setState on a component that has already unmounted. The right way 
      to handle it would be to cancel the data fetching request if the component will be unmounted for some reason
      (like user navigating away) */
      if (this._isMounted) {
        const searchresults = res.data;
        this.setState({
          searchresults
        });
      }
    })
    .catch(err => { console.log('Error fetching results: ' + err) })
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  doSearch = (searchfield, searchinput) => {
    let API_URL = 'https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=100&$offset=0';
    if (searchinput) {
      API_URL = 'https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=100&$offset=0&$where=upper(' + searchfield + ')=upper(\'' + searchinput + '\')';
    }
    axios.get(API_URL)
    .then(res => {
      const searchresults = res.data;
      this.setState({
        searchresults
      });
    })
    .catch(err => { console.log('Error fetching results: ' + err) })
  }

  render() {
    return (
      <>
        <Nav />
        <Header />
        <div className="fixed-bg">
          <SearchContainer doSearch={this.doSearch} />
          <ResultsContainer searchresults={this.state.searchresults} />
          <Footer />          
        </div>
      </>
    )
  }
}

