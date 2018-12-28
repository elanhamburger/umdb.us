import React from 'react';

import '../css/DirectionsBar.css';

export default class DirectionsBar extends React.Component {
    render() {
        return (
            <div className="DirectionsBar">
                <input className="DirectionsBar-Input" type="text" placeholder="From" onChange={this.onInputChanged} />
                <input className="DirectionsBar-Input" type="text" placeholder="To" onChange={this.onInputChanged} />
            </div>
        );
    }
}