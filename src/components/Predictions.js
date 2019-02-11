import React from 'react';

import Prediction from './Prediction';

import close from '../img/close.svg';

import '../css/Predictions.css';

const wrap = x => x[0] ? x : [x];
const unwrap = x => x[0] || x;

export default class Predictions extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, data: [] };
        this.updatePredictions = this.updatePredictions.bind(this);
    }

    render() {
        if (!this.props.stop) {
            return null;
        }

        return (
            <div className="Predictions-Wrapper">
                <div className="Predictions">
                    <div className="Predictions-Header">
                        <div className="Predictions-Stop">
                            <h2 className="Predictions-StopName">{this.props.stop.name}</h2>
                            <p className="Predictions-StopId">Stop #{this.props.stop.id}</p>
                        </div>
                        <div className="Predictions-Close" onClick={this.props.onCloseClicked}>
                            <img src={close} alt="Close" />
                        </div>
                    </div>
                    <div className="Predictions-List">
                    {
                        this.state.data.length > 0
                        ? [
                            <div>
                            {
                                this.state.data.slice(0, Math.ceil(this.state.data.length / 2))
                                .map(x => <Prediction key={x.id} id={x.id} name={x.title} min={x.pred} />)
                            }
                            </div>,
                            <div>
                            {
                                this.state.data.slice(Math.ceil(this.state.data.length / 2))
                                .map(x => <Prediction key={x.id} id={x.id} name={x.title} min={x.pred} />)
                            }
                            </div>
                          ]
                        : <p className="Predictions-Note">
                            {
                                this.state.loading
                                ? 'Loading...'
                                : 'No buses arriving'
                            }
                          </p>
                    }
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(props) {
        if (this.props.stop !== props.stop) {
            clearInterval(this.interval);
            this.setState({ data: [] });
            if (this.props.stop) {
                this.setState({ loading: true });
                this.updatePredictions();
                this.interval = setInterval(this.updatePredictions, 30000);
            }
        }
    }

    updatePredictions() {
        fetch('https://nextbus.momentumbus.com/service/publicJSONFeed?command=predictions&a=umd&stopId=' + this.props.stop.id)
        .then(response => response.json())
        .then(json => wrap(json.predictions).filter(x => x.direction))
        .then(data => data.map(x => ({
            id: x.routeTag,
            title: /^\d{3} /.test(x.routeTitle) ? x.routeTitle.substring(4) : x.routeTitle,
            pred: unwrap(unwrap(x.direction).prediction).minutes
        })))
        .then(data => data.sort((a,b) => a.id - b.id))
        .then(data => this.setState({ loading: false, data: data }));
    }
}