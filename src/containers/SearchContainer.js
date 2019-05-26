import React, { Component } from 'react';
import Search from '../components/Search';

export default class SearchContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.doSearch = this.doSearch.bind(this);
  }

  doSearch = searchinput => {
    this.props.doSearch(searchinput);
  }

  render() {
    return (
      <div>
        <Search doSearch={this.doSearch} />
      </div>
    );
  }
}