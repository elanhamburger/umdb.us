import React from 'react';

import SearchResults from './SearchResults';

import '../css/SearchBar.css';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onResultClicked = this.onResultClicked.bind(this);
    }

    render() {
        return (
            <div className="SearchBar">
                <input className="SearchBar-Input" type="text" placeholder="Search UMD..." onChange={this.onInputChanged} />
                <SearchResults onResultClicked={this.onResultClicked} query={this.state.query} />
            </div>
        );
    }

    onInputChanged(e) {
        this.setState({ query: e.target.value });
    }

    onResultClicked(result) {
        this.setState({ query: null });
        this.props.onStopSelected(result);
    }
}