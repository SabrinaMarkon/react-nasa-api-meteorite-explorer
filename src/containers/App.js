import React, { Component } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import UserMessage from '../components/UserMessage';
import SearchContainer from '../containers/SearchContainer';
import ResultsContainer from '../containers/ResultsContainer';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import axios from 'axios';

const PAGE_LIMIT = 100;

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchResults: [],
            errorMessage: '',
            searchField: '',
            searchInput: '',
            currentPage: 1
        };
        this.doSearch = this.doSearch.bind(this);
        this.goToPage = this.goToPage.bind(this);
    }

    componentDidMount () {
        this._isMounted = true;
        this.goToPage({
            searchField: '',
            searchInput: '',
            currentPage: 1
        });
    }

    componentWillUnmount () {
        this._isMounted = false;
    }

    doSearch = () => {
        let currentPage = this.state.currentPage;
        let searchField = this.state.searchField;
        let searchInput = this.state.searchInput;

        /* -1 to make offset zero-based (since NASA API wants 0 for the first page's offset) */
        const offset = (currentPage - 1) * PAGE_LIMIT;
        let API_URL = `https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=${PAGE_LIMIT}&$offset=${offset}`;

        // When searchInput is not blank:
        if (searchInput) {
        // Check for special characters that aren't allowed:
            let originalSearchInput = searchInput;
            searchInput = originalSearchInput.replace(/[^a-z0-9,-. ]/gi, '');
            if (searchInput !== originalSearchInput) {
                // User included weird characters the server doesn't accept.
                this.setState({
                    searchField: '',
                    searchInput: '',
                    searchResults: [],
                    errorMessage: 'Special characters are not allowed except (space, comma, decimal, dash, apostrophe).'
                });
                return;
            }

            // Add search info since it was submitted.
            API_URL = `https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=${PAGE_LIMIT}&$offset=${offset}&${searchField}='${searchInput}'`;
        }

        axios.get(API_URL)
            .then(res => {
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
                    currentPage: 1
                });
                //   console.error("Error response:");
                //   console.error(err.response.data);
                //   console.error(err.response.status);
                //   console.error(err.response.headers);
            });
    }

    /* Called with data of the current pagination state to setState, then carry on to doSearch method: */
    goToPage = (searchParams) => {
        this.setState({
            searchField: searchParams.searchField,
            searchInput: searchParams.searchInput,
            currentPage: searchParams.currentPage
        }, () => this.doSearch());
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
                <SearchContainer goToPage={this.goToPage} currentPage={this.state.currentPage} />
                </> :
                    <>
                <SearchContainer goToPage={this.goToPage} currentPage={this.state.currentPage} />
                <ResultsContainer searchResults={this.state.searchResults} currentPage={this.state.currentPage} />
                <Pagination
                    pageLimit={PAGE_LIMIT}
                    goToPage={this.goToPage}
                    searchField={this.state.searchField}
                    searchInput={this.state.searchInput}
                    currentPage={this.state.currentPage}
                />
                </>
                }
                <Footer />
            </div>
        </>
        );
    }
}
