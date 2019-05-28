import React, {Component} from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import UserMessage from '../components/UserMessage';
import SearchContainer from '../containers/SearchContainer';
import ResultsContainer from '../containers/ResultsContainer';
import Footer from '../components/Footer';
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchresults: [],
      errormessage: ''
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
        if (searchresults && searchresults.length) {
          this.setState({
            searchresults,
            errormessage: ''
          });
        } else {
          this.setState({
            searchresults: [],
            errormessage: 'No Results Found'
          });
        }
      }
    })
    .catch(err => {
      this.setState({
        searchresults: [],
        errormessage: err.response.data.code
      });
    })
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  doSearch = (searchfield, searchinput) => {
    let API_URL = 'https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=100&$offset=0';
    if (searchinput) {
      // check for special characters.
      let originalsearchinput = searchinput;
      searchinput = originalsearchinput.replace(/[^a-z0-9,-. ]/gi, '');
      if (searchinput !== originalsearchinput) {
        // user included weird characters the server doesn't accept.
        this.setState({
          searchresults: [],
          errormessage: 'Special characters are not allowed except (space, comma, decimal, dash, apostrophe).'
        }); 
        return; 
      }
      API_URL = 'https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=100&$offset=0&$where=upper(' + searchfield + ')=upper(\'' + searchinput + '\')';
    }
    axios.get(API_URL)
    .then(res => {
      const searchresults = res.data;
      if (searchresults && searchresults.length) {
        this.setState({
          searchresults,
          errormessage: ''
        });
      } else {
        this.setState({
          searchresults: [],
          errormessage: 'No Results Found'
        });
      }
    })
    .catch(err => { 
      this.setState({
        searchresults: [],
        errormessage: err.response.data.code
      });
      // console.error("Error response:");
      // console.error(err.response.data);
      // console.error(err.response.status);
      // console.error(err.response.headers);
    });
  }

  render() {
    return (
      <>
        <Nav />
        <Header />
        <div className="fixed-bg">
          {this.state.errormessage 
            ? <>
              <UserMessage usermessage={this.state.errormessage} />
              <SearchContainer doSearch={this.doSearch} />
              </>
            : <>
              <SearchContainer doSearch={this.doSearch} />
              <ResultsContainer searchresults={this.state.searchresults} />
              </>
          }
          <Footer />          
        </div>
      </>
    )
  }
}

