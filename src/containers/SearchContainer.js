import React, { Component } from 'react';
import Search from '../components/Search';
import PropTypes from 'prop-types';

export default class SearchContainer extends Component {
    constructor (props) {
        super(props);
        this.goToPage = this.goToPage.bind(this);
    }

  goToPage = (searchParams) => {
      this.props.goToPage(searchParams);
  }

  render () {
      return (
          <div className="center-align pt-2">
              <Search goToPage={this.goToPage} currentPage={this.props.currentPage} />
          </div>
      );
  }
}

SearchContainer.propTypes = {
    goToPage: PropTypes.func,
    currentPage: PropTypes.number
};
