import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import UserMessage from '../components/UserMessage';
import SearchContainer from '../containers/SearchContainer';
import ResultsContainer from '../containers/ResultsContainer';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import axios from 'axios';

const PAGE_LIMIT = 100;

export default function App (props) {
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchField, setSearchField] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const doSearch = () => {
        /* -1 to make offset zero-based (since NASA API wants 0 for the first page's offset) */
        const offset = (currentPage - 1) * PAGE_LIMIT;
        let API_URL = `https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=${PAGE_LIMIT}&$offset=${offset}`;

        // When searchInput is not blank:
        if (searchInput) {
        // Check for special characters that aren't allowed:
            let originalSearchInput = searchInput;
            let searchInputCopy = originalSearchInput.replace(/[^a-z0-9,-. ]/gi, '');
            if (searchInputCopy !== originalSearchInput) {
                // User included weird characters the server doesn't accept.
                setSearchField('name');
                setSearchInput('');
                setSearchResults([]);
                setErrorMessage('Special characters are not allowed except (space, comma, decimal, dash, apostrophe).');
                return;
            }
            // Add search info since it was submitted.
            API_URL = `https://data.nasa.gov/resource/gh4g-9sfh.json?$order=name&$limit=${PAGE_LIMIT}&$offset=${offset}&${searchField}='${searchInput}'`;
        }

        axios.get(API_URL)
            .then(res => {
                const searchResults = res.data;
                if (searchResults && searchResults.length) {
                    setSearchResults(searchResults);
                    setErrorMessage('');
                } else {
                    setSearchResults([]);
                    setErrorMessage('No Results Found');
                }
            })
            .catch(err => {
                setSearchResults([]);
                setErrorMessage(err.response.data.code);
                setCurrentPage(1);
                //   console.error("Error response:");
                //   console.error(err.response.data);
                //   console.error(err.response.status);
                //   console.error(err.response.headers);
            });
    };

    /* Called with data of the current pagination state, then carry on to doSearch method: */
    const goToPage = (searchParams) => {
        setSearchField(searchParams.searchField);
        setSearchInput(searchParams.searchInput);
        setCurrentPage(searchParams.currentPage);
        doSearch();
    };

    useEffect(() => {
        goToPage({
            searchField: '',
            searchInput: '',
            currentPage: 1
        });
    }, []);

    return (
        <>
            <Nav />
            <Header />
            <div className="fixed-bg">
                {errorMessage ?
                    <>
                <UserMessage userMessage={errorMessage} />
                <SearchContainer goToPage={goToPage} currentPage={currentPage} />
                </> :
                    <>
                <SearchContainer goToPage={goToPage} currentPage={currentPage} />
                <ResultsContainer searchResults={searchResults} currentPage={currentPage} />
                <Pagination
                    pageLimit={PAGE_LIMIT}
                    goToPage={goToPage}
                    searchField={searchField}
                    searchInput={searchInput}
                    currentPage={currentPage}
                />
                </>
                }
                <Footer />
            </div>
        </>
    );
}
