import React from 'react';

import { color } from '../util/util';

import walk from '../img/walk.svg';

import '../css/DirectionsResults.css';
import '../css/DirectionsResult.css';

const DirectionsResultStop = props => (
    <div className="DirectionsResult">
        {!props.first && <div className="DirectionsResult-Line-Top" />}
        <div className="DirectionsResult-Symbol" />
        {!props.last && <div className="DirectionsResult-Line-Bottom" />}
        <div className="DirectionsResult-Title">{props.stop.name}</div>
        <div className="DirectionsResult-Info">Stop #{props.stop.id}</div>
    </div>
);

const DirectionsResultRoute = props => (
    <div className="DirectionsResult">
        <div className="DirectionsResult-Line-Full" />
        <div className="DirectionsResult-Title">
            <span className="DirectionsResult-Route" style={{backgroundColor: color(props.route.id)}}>{props.route.id}</span>
            {props.route.name}
        </div>
        <div className="DirectionsResult-Info">{props.route.count} stops</div>
    </div>
);

const DirectionsResultWalk = props => (
    <div className="DirectionsResult">
        <div className="DirectionsResult-Line-Full" />
        <div className="DirectionsResult-Title">
            <img className="DirectionsResult-Walk" src={walk} alt="Walk" /> Walk
        </div>
        <div className="DirectionsResult-Info">Cross the street</div>
    </div>
);

const DirectionsResult = props => {
    if (props.result.type === 'stop') {
        return <DirectionsResultStop stop={props.result} {...props} />;
    } else if (props.result.type === 'route') {
        return <DirectionsResultRoute route={props.result} />;
    } else if (props.result.type === 'walk') {
        return <DirectionsResultWalk />
    }
};

export default class DirectionsResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        if (!this.state.data) {
            return null;
        }

        return (
            <div className="DirectionsResults">
            {
                this.state.data.length > 0
                ? this.state.data.map((x, i) => (<DirectionsResult key={i} result={x} first={i === 0} last={i === this.state.data.length - 1} />))
                : <div className="DirectionsResults-None">There are no routes that run between these two stops</div>
            }
            </div>
        );
    }

    componentDidUpdate(props) {
        if (this.props !== props) {
            if (this.props.from && this.props.to && this.props.daytime !== undefined) {
                fetch('https://api.momentumbus.com/directions?from=' + this.props.from +
                    '&to=' + this.props.to + '&daytime=' + this.props.daytime)
                .then(response => response.json())
                .then(data => this.setState({ data: data }));
            } else {
                this.setState({ data: null });
            }
        }
    }
}
