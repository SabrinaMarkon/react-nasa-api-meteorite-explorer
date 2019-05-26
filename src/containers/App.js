import React, {Component} from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import SearchContainer from '../containers/SearchContainer';
import ResultsContainer from '../containers/ResultsContainer';
import Footer from '../components/Footer';
const API_URL = 'https://data.nasa.gov/resource/gh4g-9sfh.json';
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchresults: []
    }
    this.doSearch = this.doSearch.bind(this);
  }

  // componentDidMount() {
  //   fetch(API_URL)
  //     .then(res => res.json())
  //     .then(json => this.setState({ searchinput: json }))
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  doSearch = searchinput => {
    console.log(API_URL + '?name=' + searchinput);
    axios.get(API_URL + '?name=' + searchinput)
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
        <SearchContainer doSearch={this.doSearch} />
        <ResultsContainer searchresults={this.state.searchresults} />
        <Footer />  
      </>
    )
  }
}

