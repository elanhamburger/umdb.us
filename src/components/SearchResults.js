import React from 'react';

import { ReactComponent as Marker } from '../img/marker.svg';

import '../css/SearchResults.css';

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <div className="SearchResult" onClick={this.onClick}>
                <Marker className="SearchResult-Image" alt="Bus Stop" />
                <span className="SearchResult-Name">{this.props.result.name}</span>
                <span className="SearchResult-Id">Stop #{this.props.result.id}</span>
            </div>
        );
    }

    onClick() {
        this.props.onResultClicked(this.props.result);
    }
}

export default class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        if (!this.state.results) {
            return null;
        }
        
        return (
            <div className="SearchResults">
                {this.state.results.map(x => <SearchResult key={x.id} result={x} onResultClicked={this.props.onResultClicked}/>)}
            </div>
        );
    }

    componentDidUpdate(props) {
        if (this.props !== props) {
            if (this.props.query) {
                fetch('https://api.momentumbus.com/search?q=' + this.props.query)
                .then(response => response.json())
                .then(data => this.setState({ results: data }));
            } else {
                this.setState({ results: undefined });
            }
        }
    }
}
