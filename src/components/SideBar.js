import React, { useState } from 'react';

import SearchBar from './SearchBar';
import DirectionsBar from './DirectionsBar';

import '../css/SideBar.css';

export default (props) => {
    const [directionsMode, setDirectionsMode] = useState(false);

    return (
        <div className="SideBar">
        {
            directionsMode
            ? <DirectionsBar onSwitchMode={() => setDirectionsMode(false)} />
            : <SearchBar onStopSelected={props.onStopSelected} onSwitchMode={() => setDirectionsMode(true)} />
        }
        </div>
    );
}