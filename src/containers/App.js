import React, { Component } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import UserMessage from '../components/UserMessage';
import SearchContainer from '../containers/SearchContainer';
import ResultsContainer from '../containers/ResultsContainer';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import axios from 'axios';

const PAGE_LIMIT = 20;

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchResults: [],
            errorMessage: '',
            currentPage: 0
        };
        this.doSearch = this.doSearch.bind(this);
        this.goToPage = this.goToPage.bind(this);
    }

    // ?$select=count(*)

    componentDidMount () {
        this._isMounted = true;
        let API_URL = 'https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=' + PAGE_LIMIT + '&$offset=0';
        axios.get(API_URL)
            .then(res => {
                /* Add a check in the .then() handler so this.setState is not called if the component has been unmounted:
      That is, how should react 'react' when you call setState on a component that has already unmounted. The right way
      to handle it would be to cancel the data fetching request if the component will be unmounted for some reason
      (like user navigating away) */
                if (this._isMounted) {
                    const searchResults = res.data;
                    if (searchResults && searchResults.length) {
                        this.setState({
                            searchResults,
                            errorMessage: ''
                        });
                    } else {
                        this.setState({
                            searchResults: [],
                            errorMessage: 'No Results Found'
                        });
                    }
                }
            })
            .catch(err => {
                this.setState({
                    searchResults: [],
                    errorMessage: err.response.data.code,
                    currentPage: 0
                });
            });
    }

    componentWillUnmount () {
        this._isMounted = false;
    }

  doSearch = (searchParams) => {
      let { searchField, searchInput, page } = searchParams;
      if (!page) {
          page = this.state.currentPage;
      }
      /* -1 to make offset zero-based (since NASA API wants 0 for the first page's offset) */
      const offset = (page - 1) * PAGE_LIMIT;
      console.log(offset);
      let API_URL = 'https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=' + PAGE_LIMIT + '&$offset=' + offset;
      console.log(API_URL);
      if (searchInput) {
      // check for special characters.
          let originalSearchInput = searchInput;
          searchInput = originalSearchInput.replace(/[^a-z0-9,-. ]/gi, '');
          if (searchInput !== originalSearchInput) {
              // user included weird characters the server doesn't accept.
              this.setState({
                  searchResults: [],
                  errorMessage: 'Special characters are not allowed except (space, comma, decimal, dash, apostrophe).'
              });
              return;
          }
          API_URL = 'https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=' + PAGE_LIMIT + '&$offset=' + this.state.currentPage + '&$where=upper(' + searchField + ')=upper(\'' + searchInput + '\')';
      }
      axios.get(API_URL)
          .then(res => {
              const searchResults = res.data;
              if (searchResults && searchResults.length) {
                  this.setState({
                      searchResults,
                      errorMessage: ''
                  });
              } else {
                  this.setState({
                      searchResults: [],
                      errorMessage: 'No Results Found'
                  });
              }
          })
          .catch(err => {
              this.setState({
                  searchResults: [],
                  errorMessage: err.response.data.code,
                  currentPage: 0
              });
              // console.error("Error response:");
              // console.error(err.response.data);
              // console.error(err.response.status);
              // console.error(err.response.headers);
          });
  }

  /* Called with data of the current pagination state only when the current page changes. */
  goToPage = page => {
      this.setState({
          currentPage: page
      });
      console.log('in gotopage: ' + page);
      this.doSearch({ page });
  }

  render () {
      return (
      <>
        <Nav />
        <Header />
        <div className="fixed-bg">
            {this.state.errorMessage ?
                <>
              <UserMessage userMessage={this.state.errorMessage} />
              <SearchContainer doSearch={this.doSearch} />
              </> :
                <>
              <SearchContainer doSearch={this.doSearch} />
              <ResultsContainer searchResults={this.state.searchResults} />
              </>
            }
            <Pagination totalRecords={300} pageLimit={PAGE_LIMIT} pageNeighbors={0}
                goToPage={this.goToPage} />
            <Footer />
        </div>
      </>
      );
  }
}
