import React from 'react';

import SearchResults from './SearchResults';

import { ReactComponent as Directions } from '../img/directions.svg';

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
                <div className="SearchBar-Inputs">
                    <input className="SearchBar-Input" type="text" placeholder="Search UMD..."
                        onChange={this.onInputChanged} autoComplete="off" />
                    <div className="SearchBar-ModeButton">
                        <Directions className="SearchBar-ModeButton-Icon" onClick={this.props.onSwitchMode} />
                    </div>
                </div>
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