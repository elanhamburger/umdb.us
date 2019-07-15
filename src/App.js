import React, { Component } from 'react';

import Map from './components/Map';
import SideBar from './components/SideBar';
import Predictions from './components/Predictions';

class App extends Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.state = { };
        this.onStopSelected = this.onStopSelected.bind(this);
        this.onPredictionsCloseClicked = this.onPredictionsCloseClicked.bind(this);
    }

    render() {
        return (
            <div className="App">
                <Map ref={this.mapRef} onStopSelected={this.onStopSelected} selection={this.state.selected} />
                <SideBar onStopSelected={this.onStopSelected} />
                <Predictions stop={this.state.selected} onCloseClicked={this.onPredictionsCloseClicked} />
            </div>
        );
    }

    onStopSelected(stop) {
        this.setState({ selected: stop });
        this.mapRef.current.panTo({ lat: stop.lat, lng: stop.lng });
    }

    onPredictionsCloseClicked() {
        this.setState({ selected: null });
    }
}

export default App;
