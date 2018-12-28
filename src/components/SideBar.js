import React from 'react';

import SearchBar from './SearchBar';
import DirectionsBar from './DirectionsBar';

import '../css/SideBar.css';

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchMode: true };
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <div className="SideBar">
                {
                    this.state.searchMode
                    ? <SearchBar onStopSelected={this.props.onStopSelected} />
                    : <DirectionsBar />
                }
            </div>
        );
    }

    onClick() {
        this.setState((state, props) => ({ searchMode: !state.searchMode }));
    }
}