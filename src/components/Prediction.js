import React from 'react';

import { color } from '../util/util';

import '../css/Prediction.css';

export default (props) => (
    <div className="Prediction">
        <div className="Prediction-RouteId" style={{backgroundColor: color(props.id)}}>{props.id}</div>
        <div className="Prediction-RouteName">{props.name}</div>
        <div className="Prediction-Time">{props.min} min</div>
    </div>
);