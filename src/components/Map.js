import React from 'react';

import bus from '../img/bus.svg';

import '../css/Map.css';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this);
        this.panTo = this.panTo.bind(this);
    }

    render() {
        return (
            <div id="Map">
                <div className="Map-Loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (!(window.google && window.google.maps)) {
            let s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyDJpOnkWxiMjRMY_CJOLQRAswjTHKnI3R0';
            s.addEventListener('load', (e) => this.initMap());

            let x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
        } else {
            this.initMap();
        }
    }

    initMap() {
        const options = {
            center: { lat: 38.98754114838913, lng: -76.9440220668912 },
            zoom: 16,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false
        };

        this.map = new window.google.maps.Map(
            document.getElementById('Map'),
            options
        );

        fetch('https://api.momentumbus.com/stops.json')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let marker = new window.google.maps.Marker({
                    map: this.map,
                    position: { lat: data[i].lat, lng: data[i].lng },
                    title: data[i].name,
                    icon: bus
                });
                marker.addListener('click', () => {
                    //this.map.panTo(marker.position);
                    this.props.onStopSelected({
                        id: data[i].id,
                        name: data[i].name,
                        lat: data[i].lat,
                        lng: data[i].lng,
                        type: 'stop'
                    });
                });
            }
        });
    }

    panTo(coords) {
        this.map.panTo(coords);
    }
}