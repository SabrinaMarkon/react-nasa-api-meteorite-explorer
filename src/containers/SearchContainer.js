import React, { Component } from 'react';
import Search from '../components/Search';

export default class SearchContainer extends Component {

  doSearch = searchtext => {
    this.props.doSearch(searchtext);
  }

  render() {
    return (
      <div>
        <Search doSearch={this.doSearch} />
      </div>
    );
  }
}