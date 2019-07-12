import React from 'react';

import SearchResults from './SearchResults';
import DirectionsResults from './DirectionsResults';

import { ReactComponent as Close } from '../img/close_white.svg';
import { ReactComponent as Swap } from '../img/swap.svg';

import '../css/DirectionsBar.css';

const isDaytime = () => {
    let d = new Date();
    return d.getDay() % 6 !== 0 && d.getHours() > 3 && d.getHours() <= 17;
};

export default class DirectionsBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { daytime: isDaytime() };
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onRouteSetChanged = this.onRouteSetChanged.bind(this);
        this.onResultClicked = this.onResultClicked.bind(this);
    }

    render() {
        return (
            <div className="DirectionsBar">
                <div className="DirectionsBar-Header">
                    <div>
                        <input className="DirectionsBar-Header-Input" name="from" type="text" placeholder="From" onChange={this.onInputChanged} autoComplete="off" />
                        <input className="DirectionsBar-Header-Input" name="to" type="text" placeholder="To" onChange={this.onInputChanged} autoComplete="off" />
                    </div>
                    <div className="DirectionsBar-Header-Close">
                        <Close className="DirectionsBar-Header-Close-Button" onClick={this.props.onSwitchMode} />
                    </div>
                </div>
                <div className="DirectionsBar-RouteSet" onClick={this.onRouteSetChanged}>
                    {this.state.daytime ? 'Daytime Routes' : 'Weekend/Evening Routes'}
                    <Swap />
                </div>
                <SearchResults onResultClicked={this.onResultClicked} query={this.state.query} />
                <DirectionsResults from={this.state.from} to={this.state.to} daytime={this.state.daytime} />
            </div>
        );
    }

    onInputChanged(e) {
        this.setState({
            query: e.target.value,
            active: e.target,
            [e.target.name]: null
        });
    }

    onRouteSetChanged(e) {
        this.setState((state, props) => ({ daytime: !state.daytime }));
    }

    onResultClicked(result) {
        let active = this.state.active;
        active.value = result.name;
        this.setState({
            query: null,
            active: null,
            [active.name]: result.id
        });
    }
}