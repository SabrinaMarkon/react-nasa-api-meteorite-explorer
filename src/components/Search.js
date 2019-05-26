import React, { Component } from 'react';

export default class Search extends Component {

  state = {
    searchinput: []
  }

  handleChange = event => {
    this.setState({
      searchinput: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.doSearch(this.state.searchinput);
  }

  render() {
    return (
    <form>
      <input 
        type="text"
        value={this.state.searchinput}
        onChange={this.handleChange}
      />
      <button type="button" onClick={this.handleSubmit}>Search!</button>
    </form>
    )
  }
}