import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchInput: '',
            searchField: 'name'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleChange = event => {
      let searchInput = (event.target.value);
      this.setState({
          searchInput
      });
  }

  handleSelected = event => {
      let searchField = (event.target.value);
      this.setState({
          searchField
      });
  }

  handleSubmit = event => {
      event.preventDefault();
      this.props.doSearch({
          searchField: this.state.searchField,
          searchInput: this.state.searchInput
      });
  }

  render () {
      return (
          <form onSubmit={this.handleSubmit}>
              <select className="form-input" value={this.state.searchField} onChange={this.handleSelected}>
                  <option value="name">Name</option>
                  <option value="nametype">Name Type</option>
                  <option value="recclass">Rec Class</option>
                  {/* <option value="mass">Mass (g)</option> */}
                  <option value="fall">Fall</option>
                  {/* <option value="year">Year</option> */}
                  <option value="reclat">Latitude</option>
                  <option value="reclong">Longitude</option>
              </select>
              <input
                  className="form-input"
                  type="text"
                  value={this.state.searchInput}
                  onChange={this.handleChange}
              />
              <button className="form-input" type="button" onClick={this.handleSubmit}>Search!</button>
          </form>
      );
  }
}

Search.propTypes = {
    doSearch: PropTypes.func
};
